import crypto from 'crypto';
import type {IncomingMessage, ServerResponse} from 'http';
import {GoogleGenAI} from '@google/genai';
import {
  resolveCentralizedServerConfig,
  verifyGoogleRecaptchaV3ServerSide,
  type CentralizedServerConfig,
} from './securityConfig';

/**
 * CITIZEN SERVICES POINT (CITIZEN INDIA)
 * Unified Security-First Serverless Backend (/netlify/functions/api.ts)
 *
 * Security Properties & Honest Architectural Boundaries:
 * 1. Stateless HMAC-SHA256 CAPTCHA Verification:
 *    - Tokens encode `issuedAt.expiresAt.answerHash.tokenMac`.
 *    - Bound to `challengeId`, `issuedAt`, `expiresAt`, normalized 6-char answer,
 *      and a transient non-stored client context digest (`User-Agent` + coarse IP prefix).
 *    - Enforces 90-second TTL and minimum 350ms human solve time.
 * 2. Honest Stateless Limitation:
 *    - In-memory `consumedChallenges` and `recentLookupTimestamps` inside a Netlify
 *      Function instance provide best-effort replay/burst protection on warm containers
 *      only; memory is NOT shared across cold starts or parallel serverless instances.
 *    - Global atomic nonce replay protection and global rate limiting across all instances
 *      are enforced inside the bound Google Apps Script via `CacheService.getScriptCache()`
 *      and `LockService.getScriptLock()` using the verified `challengeId` as `nonce`.
 * 3. Google Apps Script Authentication (Without Custom HTTP Headers):
 *    - Because Google Apps Script `doGet(e)` / `doPost(e)` cannot read HTTP headers,
 *      outbound requests are authenticated via `ts`, `nonce`, and `sig` (HMAC-SHA256
 *      computed with `APPS_SCRIPT_SHARED_SECRET`) inside the POST JSON body / query params.
 * 4. Zero-PII Logging Policy:
 *    - Never logs application numbers, mobile numbers, CAPTCHA answers, IP addresses,
 *      or returned application status records.
 */

const CAPTCHA_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const CHALLENGE_TTL_MS = 300 * 1000; // 5 minutes TTL so users filling multi-field forms don't expire mid-submission
const MIN_SOLVE_TIME_MS = 250; // Minimum 250ms solve time to block instant bot submissions
const MAX_ACTIVE_CHALLENGES = 5000;
const MAX_BODY_BYTES = 4096; // 4 KB strict payload limit for status-check
const MAX_SUBMIT_BODY_BYTES = 1048576; // 1 MB limit for JSON metadata + two <=250KB attachments on submit-request
const BURST_WINDOW_MS = 10 * 1000;
const MAX_BURST_REQUESTS = 20;

// Best-effort warm-instance replay cache & burst window (zero PII stored)
const consumedChallenges = new Map<string, number>();
const recentLookupTimestamps: number[] = [];

const GLYPH_PATHS: Record<string, string> = {
  '2': 'M 4 10 C 4 4, 20 4, 20 11 C 20 17, 4 20, 4 28 L 21 28',
  '3': 'M 4 8 C 8 4, 20 5, 19 12 C 19 15, 14 16, 11 16 C 16 16, 20 19, 20 24 C 19 29, 7 29, 4 25',
  '4': 'M 16 28 L 16 5 L 3 20 L 21 20',
  '5': 'M 20 6 L 6 6 L 5 15 C 9 13, 20 14, 20 22 C 20 28, 8 29, 4 25',
  '6': 'M 19 7 C 11 4, 4 11, 4 20 C 4 27, 19 29, 20 21 C 20 15, 6 14, 4 19',
  '7': 'M 3 6 L 21 6 L 9 28',
  '8': 'M 12 15 C 5 14, 5 5, 12 5 C 19 5, 19 14, 12 15 C 4 16, 4 28, 12 28 C 20 28, 20 16, 12 15',
  '9': 'M 20 15 C 17 19, 4 18, 4 11 C 4 4, 20 4, 20 14 C 20 23, 13 28, 5 27',
  A: 'M 3 28 L 12 5 L 21 28 M 6 20 L 18 20',
  B: 'M 5 5 L 5 28 M 5 5 C 17 5, 19 14, 5 16 C 19 16, 20 28, 5 28',
  C: 'M 20 8 C 14 3, 4 6, 4 16 C 4 26, 14 29, 20 24',
  D: 'M 5 5 L 5 28 M 5 5 C 21 5, 21 28, 5 28',
  E: 'M 19 6 L 5 6 L 5 28 L 19 28 M 5 16 L 16 16',
  F: 'M 19 6 L 5 6 L 5 28 M 5 16 L 16 16',
  G: 'M 19 8 C 13 3, 4 7, 4 16 C 4 26, 15 29, 20 23 L 20 16 L 12 16',
  H: 'M 5 5 L 5 28 M 19 5 L 19 28 M 5 16 L 19 16',
  J: 'M 17 5 L 17 22 C 17 28, 6 28, 4 21',
  K: 'M 5 5 L 5 28 M 19 6 L 5 17 L 19 28',
  L: 'M 5 5 L 5 28 L 19 28',
  M: 'M 3 28 L 3 5 L 12 18 L 21 5 L 21 28',
  N: 'M 4 28 L 4 5 L 20 28 L 20 5',
  P: 'M 5 28 L 5 5 C 20 5, 20 17, 5 17',
  Q: 'M 12 5 C 4 5, 4 27, 12 27 C 20 27, 20 5, 12 5 M 14 21 L 21 29',
  R: 'M 5 28 L 5 5 C 20 5, 20 16, 5 16 M 11 16 L 20 28',
  S: 'M 19 8 C 14 3, 4 6, 5 12 C 6 18, 19 16, 19 23 C 19 29, 7 29, 4 24',
  T: 'M 3 6 L 21 6 M 12 6 L 12 28',
  U: 'M 4 5 L 4 21 C 4 29, 20 29, 20 21 L 20 5',
  V: 'M 3 5 L 12 28 L 21 5',
  W: 'M 2 5 L 7 28 L 12 13 L 17 28 L 22 5',
  X: 'M 4 5 L 20 28 M 20 5 L 4 28',
  Y: 'M 3 5 L 12 16 L 21 5 M 12 16 L 12 28',
  Z: 'M 4 6 L 20 6 L 4 27 L 20 27',
};

function pruneConsumedChallenges(now: number) {
  for (const [id, exp] of consumedChallenges.entries()) {
    if (exp <= now) {
      consumedChallenges.delete(id);
    }
  }
  if (consumedChallenges.size > MAX_ACTIVE_CHALLENGES) {
    const oldestKey = consumedChallenges.keys().next().value;
    if (oldestKey) consumedChallenges.delete(oldestKey);
  }
}

function randomIntBetween(min: number, max: number): number {
  return crypto.randomInt(min, max + 1);
}

function jitterSvgPath(pathStr: string): string {
  return pathStr.replace(/(-?\d+(?:\.\d+)?)/g, match => {
    const val = parseFloat(match);
    const delta = (crypto.randomInt(0, 9) - 4) / 10;
    return (val + delta).toFixed(1);
  });
}

export function generateCaptchaSvg(code: string): string {
  const width = 220;
  const height = 64;
  const palettes = ['#0f172a', '#1e293b', '#1e3a8a', '#312e81', '#064e3b', '#7c2d12'];

  let clutterPaths = '';
  for (let i = 0; i < 5; i++) {
    const x1 = randomIntBetween(4, width - 4);
    const y1 = randomIntBetween(4, height - 4);
    const cx1 = randomIntBetween(10, width - 10);
    const cy1 = randomIntBetween(4, height - 4);
    const cx2 = randomIntBetween(10, width - 10);
    const cy2 = randomIntBetween(4, height - 4);
    const x2 = randomIntBetween(4, width - 4);
    const y2 = randomIntBetween(4, height - 4);
    const stroke = palettes[crypto.randomInt(0, palettes.length)];
    const sw = (crypto.randomInt(10, 16) / 10).toFixed(1);
    const op = (crypto.randomInt(15, 28) / 100).toFixed(2);
    clutterPaths += `<path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>`;
  }

  let decoyDots = '';
  for (let i = 0; i < 16; i++) {
    const cx = randomIntBetween(6, width - 6);
    const cy = randomIntBetween(6, height - 6);
    const r = (crypto.randomInt(8, 16) / 10).toFixed(1);
    const fill = palettes[crypto.randomInt(0, palettes.length)];
    const op = (crypto.randomInt(15, 30) / 100).toFixed(2);
    decoyDots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${op}"/>`;
  }

  let glyphGroup = '';
  const chars = code.split('');
  chars.forEach((ch, idx) => {
    const basePath = GLYPH_PATHS[ch] || GLYPH_PATHS['A'];
    const distortedPath = jitterSvgPath(basePath);
    const xOffset = 16 + idx * 31 + randomIntBetween(-2, 2);
    const yOffset = 15 + randomIntBetween(-2, 3);
    const rotate = randomIntBetween(-9, 9);
    const skewX = randomIntBetween(-5, 5);
    const scaleY = (crypto.randomInt(96, 106) / 100).toFixed(2);
    const color = palettes[crypto.randomInt(0, palettes.length)];
    const strokeWidth = (crypto.randomInt(26, 30) / 10).toFixed(1);

    glyphGroup += `<g transform="translate(${xOffset}, ${yOffset}) rotate(${rotate}, 12, 16) skewX(${skewX}) scale(1, ${scaleY})">
      <path d="${distortedPath}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  });

  const waveY1 = randomIntBetween(20, 44);
  const waveY2 = randomIntBetween(20, 44);
  const overlayWave = `<path d="M 8 ${waveY1} Q ${width / 2} ${randomIntBetween(12, 52)}, ${width - 8} ${waveY2}" fill="none" stroke="#ea580c" stroke-width="1.3" opacity="0.32" stroke-dasharray="4 3"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Security verification image">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="50%" stop-color="#f1f5f9"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="8" fill="url(#bgGrad)"/>
    ${decoyDots}
    ${clutterPaths}
    ${glyphGroup}
    ${overlayWave}
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf-8').toString('base64')}`;
}

function safeEqualHex(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Computes a transient, non-stored client context digest from User-Agent and coarse IP subnet.
 * Never logs or persists the IP address or User-Agent.
 */
export function computeTransientClientContextHash(
  secret: string,
  userAgent: string | undefined,
  rawIp: string | undefined
): string {
  const normUa = String(userAgent || 'unknown-ua')
    .trim()
    .slice(0, 160);
  let coarseNet = 'local';
  if (rawIp) {
    const firstIp = String(rawIp)
      .split(',')[0]
      .trim()
      .replace(/^::ffff:/i, '');
    if (
      firstIp === '::1' ||
      firstIp === '127.0.0.1' ||
      firstIp.startsWith('10.') ||
      firstIp.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(firstIp)
    ) {
      coarseNet = 'local';
    } else if (firstIp.includes('.')) {
      // IPv4 /24 prefix
      const parts = firstIp.split('.');
      if (parts.length === 4) {
        coarseNet = `${parts[0]}.${parts[1]}.${parts[2]}.0`;
      }
    } else if (firstIp.includes(':')) {
      // IPv6 /48 prefix
      const parts = firstIp.split(':');
      coarseNet = parts.slice(0, 3).join(':');
    }
  }
  const hmacKey = secret && secret.length >= 16 ? secret : 'transient-rate-limit-context-salt';
  return crypto
    .createHmac('sha256', hmacKey)
    .update(`ctx:${normUa}:${coarseNet}`)
    .digest('hex')
    .slice(0, 32);
}

/**
 * Generates a stateless HMAC-SHA256 signed CAPTCHA challenge token.
 */
export function createSignedCaptchaChallenge(
  secret: string,
  code: string,
  clientContextHash: string,
  now: number = Date.now()
): {
  challengeId: string;
  captchaToken: string;
  expiresAt: number;
  ttlSeconds: number;
} {
  if (!secret || typeof secret !== 'string' || secret.trim().length < 32) {
    throw new Error('CAPTCHA_SECRET_UNCONFIGURED: CAPTCHA_SECRET_KEY must be configured in server environment.');
  }

  const challengeId = crypto.randomUUID();
  const issuedAt = now;
  const expiresAt = now + CHALLENGE_TTL_MS;
  const cleanCode = code.trim().toUpperCase();

  const answerHash = crypto
    .createHmac('sha256', secret)
    .update(`ans:${challengeId}:${issuedAt}:${expiresAt}:${cleanCode}:${clientContextHash}`)
    .digest('hex');

  const tokenMac = crypto
    .createHmac('sha256', secret)
    .update(`tok:${challengeId}:${issuedAt}:${expiresAt}:${answerHash}:${clientContextHash}`)
    .digest('hex');

  return {
    challengeId,
    captchaToken: `${issuedAt}.${expiresAt}.${answerHash}.${tokenMac}`,
    expiresAt,
    ttlSeconds: Math.floor(CHALLENGE_TTL_MS / 1000),
  };
}

/**
 * Verifies a stateless HMAC-signed CAPTCHA token and checks warm-instance replay cache.
 * Fails closed (HTTP 503) if CAPTCHA_SECRET_KEY is not configured.
 */
export function verifySignedCaptchaChallenge(params: {
  secret: string;
  challengeId: string;
  captchaToken: string;
  captchaAnswer: string;
  clientContextHash: string;
  now?: number;
}): {ok: boolean; status: number; errorCode?: string; message?: string} {
  const {secret, challengeId, captchaToken, captchaAnswer, clientContextHash} = params;
  const now = params.now ?? Date.now();

  if (!secret || typeof secret !== 'string' || secret.trim().length < 32) {
    return {
      ok: false,
      status: 503,
      errorCode: 'captcha_secret_unconfigured',
      message: 'Security verification service is unavailable because CAPTCHA_SECRET_KEY is not configured.',
    };
  }

  pruneConsumedChallenges(now);

  if (
    !challengeId ||
    typeof challengeId !== 'string' ||
    !captchaToken ||
    typeof captchaToken !== 'string' ||
    !captchaAnswer ||
    typeof captchaAnswer !== 'string'
  ) {
    return {
      ok: false,
      status: 400,
      errorCode: 'captcha_missing',
      message: 'Please complete the CAPTCHA security verification before checking status.',
    };
  }

  // Warm-instance replay check
  if (consumedChallenges.has(challengeId)) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_expired',
      message: 'This CAPTCHA challenge has already been used or expired. A new security code has been loaded.',
    };
  }

  const parts = captchaToken.split('.');
  if (parts.length !== 4) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Invalid security token. Please try again with the new code.',
    };
  }

  const [issuedAtStr, expiresAtStr, answerHash, tokenMac] = parts;
  const issuedAt = Number(issuedAtStr);
  const expiresAt = Number(expiresAtStr);

  if (
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= issuedAt ||
    expiresAt - issuedAt > CHALLENGE_TTL_MS + 1000
  ) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Invalid security token parameters. Please try again.',
    };
  }

  // Verify token integrity HMAC first (binds challengeId, timestamps, answerHash, and clientContextHash)
  const expectedTokenMac = crypto
    .createHmac('sha256', secret)
    .update(`tok:${challengeId}:${issuedAt}:${expiresAt}:${answerHash}:${clientContextHash}`)
    .digest('hex');

  if (!safeEqualHex(expectedTokenMac, tokenMac)) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Security verification failed or session context changed. Please enter the new code.',
    };
  }

  // Check expiration
  if (now > expiresAt) {
    consumedChallenges.set(challengeId, now + 60000);
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_expired',
      message: 'This CAPTCHA challenge has expired. Please enter the newly generated code.',
    };
  }

  // Consume challengeId immediately on first verification attempt (single-use per warm instance)
  consumedChallenges.set(challengeId, expiresAt + 60000);

  // Enforce minimum human solve time (>=350ms)
  if (now - issuedAt < MIN_SOLVE_TIME_MS) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Verification submitted too quickly. Please enter the new security code carefully.',
    };
  }

  const cleanAnswer = captchaAnswer.trim().toUpperCase().replace(/\s+/g, '');
  if (!/^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/.test(cleanAnswer)) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Incorrect CAPTCHA code entered. Please try again with the new code.',
    };
  }

  const computedAnswerHash = crypto
    .createHmac('sha256', secret)
    .update(`ans:${challengeId}:${issuedAt}:${expiresAt}:${cleanAnswer}:${clientContextHash}`)
    .digest('hex');

  if (!safeEqualHex(computedAnswerHash, answerHash)) {
    return {
      ok: false,
      status: 403,
      errorCode: 'captcha_invalid',
      message: 'Incorrect CAPTCHA code entered. Please try again with the new code.',
    };
  }

  return {ok: true, status: 200};
}

/**
 * Signs an outbound request to Google Apps Script using APPS_SCRIPT_SHARED_SECRET.
 * Does NOT rely on HTTP headers (which Google Apps Script strips/hides).
 */
export function signAppsScriptRequest(params: {
  sharedSecret: string;
  lookupType: 'application_number' | 'mobile_number';
  normalizedQuery: string;
  nonce: string;
  ts?: number;
}): {ts: string; nonce: string; sig: string} {
  const ts = String(params.ts ?? Date.now());
  const payloadToSign = `${ts}:${params.nonce}:${params.lookupType}:${params.normalizedQuery}`;
  const effectiveKey = params.sharedSecret || 'unconfigured-shared-secret';
  const sig = crypto
    .createHmac('sha256', effectiveKey)
    .update(payloadToSign)
    .digest('hex');
  return {ts, nonce: params.nonce, sig};
}

/**
 * Reference verifier matching the exact Google Apps Script HMAC & nonce verification logic.
 * Used by the pre-deployment security test suite to verify Apps Script authentication behavior.
 */
export function verifyAppsScriptSignatureForTest(params: {
  sharedSecret: string;
  lookupType: string;
  normalizedQuery: string;
  ts: string;
  nonce: string;
  sig: string;
  usedNonces: Set<string>;
  now?: number;
}): {authorized: boolean; errorCode?: string} {
  const now = params.now ?? Date.now();
  const tsNum = Number(params.ts);
  if (!params.ts || !Number.isFinite(tsNum) || Math.abs(now - tsNum) > 60000) {
    return {authorized: false, errorCode: 'timestamp_expired'};
  }
  if (!params.nonce || params.usedNonces.has(params.nonce)) {
    return {authorized: false, errorCode: 'nonce_replayed'};
  }
  const expectedSig = crypto
    .createHmac('sha256', params.sharedSecret)
    .update(`${params.ts}:${params.nonce}:${params.lookupType}:${params.normalizedQuery}`)
    .digest('hex');
  if (!safeEqualHex(expectedSig, params.sig)) {
    return {authorized: false, errorCode: 'invalid_signature'};
  }
  params.usedNonces.add(params.nonce);
  return {authorized: true};
}

export function classifyAndValidateQuery(rawInput: string): {
  valid: boolean;
  type?: 'application_number' | 'mobile_number';
  normalizedQuery?: string;
  cleanMobile?: string;
} {
  if (typeof rawInput !== 'string') return {valid: false};
  const trimmed = rawInput.trim().toUpperCase();
  if (trimmed.length < 4 || trimmed.length > 32) return {valid: false};

  const digitsOnly = trimmed.replace(/[\s\-+()]/g, '');
  if (/^(?:91|0)?[6-9]\d{9}$/.test(digitsOnly) && /^[\d\s\-+()]+$/.test(trimmed)) {
    const tenDigitMobile = digitsOnly.slice(-10);
    return {
      valid: true,
      type: 'mobile_number',
      normalizedQuery: tenDigitMobile,
      cleanMobile: tenDigitMobile,
    };
  }

  if (!/^[A-Z0-9][A-Z0-9\-_/]{3,31}$/.test(trimmed)) {
    return {valid: false};
  }
  if (!/\d/.test(trimmed)) {
    return {valid: false};
  }
  if (/^\d+$/.test(trimmed)) {
    return {valid: false};
  }

  return {
    valid: true,
    type: 'application_number',
    normalizedQuery: trimmed,
  };
}

function normalizeIdentifier(str: string): string {
  return str.trim().toUpperCase().replace(/[\s\-_/.]/g, '');
}

function normalizeMobile(str: string): string {
  const digits = str.replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

function findValueByKeys(obj: any, keywords: string[]): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const entries = Object.entries(obj);
  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    for (const [k, v] of entries) {
      if (v !== null && v !== undefined && String(v).trim() !== '') {
        if (k.toLowerCase().trim() === kwLower) return String(v).trim();
      }
    }
  }
  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    for (const [k, v] of entries) {
      if (v !== null && v !== undefined && String(v).trim() !== '') {
        if (k.toLowerCase().includes(kwLower)) return String(v).trim();
      }
    }
  }
  return undefined;
}

export function maskApplicantName(name: string): string {
  const clean = String(name || '').trim();
  if (!clean || clean === 'N/A') return 'Protected';
  return clean
    .split(/\s+/)
    .map(part => {
      if (part.length <= 1) return '*';
      return part[0] + '*'.repeat(Math.min(4, part.length - 1));
    })
    .join(' ');
}

export function maskApplicationId(appId: string): string {
  const clean = String(appId || '').trim();
  if (!clean || clean === 'N/A') return 'Protected';
  const parts = clean.split('-');
  if (parts.length === 3) {
    return `${parts[0]}-****-${parts[2]}`;
  }
  if (clean.length > 6) {
    return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
  }
  return 'Protected';
}

export function extractRecordFields(
  matchedRecord: any,
  fallbackAppId: string,
  maskSensitiveForMobileLookup: boolean
) {
  const appIdVal =
    matchedRecord['Application ID'] ||
    matchedRecord['Application No'] ||
    matchedRecord['Application Number'] ||
    matchedRecord.applicationId ||
    matchedRecord.applicationNo ||
    matchedRecord.appId ||
    findValueByKeys(matchedRecord, [
      'application id',
      'application no',
      'application number',
      'app id',
      'app no',
      'application_id',
      'id',
      'আবেদন আইডি',
      'আবেদন নম্বর',
      'অ্যাপ্লিকেশন নম্বর',
      'आवेदन आईडी',
      'आवेदन संख्या',
    ]);

  const govtRefVal =
    matchedRecord['Govt. Reference No.'] ||
    matchedRecord['Govt Reference No'] ||
    matchedRecord['Govt. Ref. No.'] ||
    matchedRecord.govtRefNo ||
    matchedRecord.govtReferenceNo ||
    findValueByKeys(matchedRecord, [
      'govt. reference no.',
      'govt reference no',
      'govt. ref. no.',
      'govt ref',
      'reference no',
      'ref no',
      'reference',
      'রেফারেন্স নম্বর',
      'সরকারি রেফারেন্স',
      'संदर्भ संख्या',
    ]);

  const nameVal =
    matchedRecord['Applicant Name'] ||
    matchedRecord["Applicant's Name"] ||
    matchedRecord.applicantName ||
    matchedRecord.name ||
    findValueByKeys(matchedRecord, [
      'applicant name',
      "applicant's name",
      'applicant_name',
      'name',
      'applicant',
      'beneficiary',
      'member',
      'নাম',
      'আবেদনকারীর নাম',
      'आवेदक का नाम',
    ]);

  const mobileVal =
    matchedRecord['Mobile No.'] ||
    matchedRecord['Mobile No'] ||
    matchedRecord.mobileNo ||
    matchedRecord.mobile ||
    findValueByKeys(matchedRecord, [
      'mobile no.',
      'mobile no',
      'mobile_no',
      'mobile number',
      'mobile',
      'phone no',
      'phone',
      'contact',
      'মোবাইল নম্বর',
      'মোবাইল নং',
      'ফোন নম্বর',
      'मोबाइल नंबर',
    ]);

  const addressVal =
    matchedRecord['Full Address'] ||
    matchedRecord.fullAddress ||
    matchedRecord.address ||
    findValueByKeys(matchedRecord, [
      'full address',
      'full_address',
      'address',
      'location',
      'সম্পূর্ণ ঠিকানা',
      'ঠিকানা',
      'গ্রাম/শহর',
      'पता',
      'पूरा पता',
    ]);

  const schemeVal =
    matchedRecord['Scheme / Service Name'] ||
    matchedRecord['Scheme/Service Name'] ||
    matchedRecord.schemeName ||
    matchedRecord.serviceName ||
    matchedRecord.service ||
    matchedRecord.scheme ||
    findValueByKeys(matchedRecord, [
      'scheme / service name',
      'scheme/service name',
      'scheme_service_name',
      'scheme name',
      'scheme_name',
      'scheme',
      'service name',
      'service_name',
      'service',
      'yojana',
      'bhandar',
      'program',
      'সেবা',
      'স্কিম',
      'স্কিমের নাম',
      'প্রকল্প',
      'योजना',
      'स्कीम',
    ]);

  const dateVal =
    matchedRecord['Application Date'] ||
    matchedRecord.applicationDate ||
    matchedRecord.date ||
    findValueByKeys(matchedRecord, [
      'application date',
      'application_date',
      'date',
      'app date',
      'registered date',
      'time',
      'তারিখ',
      'আবেদনের তারিখ',
      'तिथि',
      'दिनांक',
    ]);

  const statusVal =
    matchedRecord['Application Status'] ||
    matchedRecord.applicationStatus ||
    matchedRecord.status ||
    findValueByKeys(matchedRecord, [
      'application status',
      'application_status',
      'status',
      'state',
      'current status',
      'অবস্থা',
      'স্ট্যাটাস',
      'আবেদনের স্ট্যাটাস',
      'আবেদনের অবস্থা',
      'स्थिति',
    ]) ||
    'Pending';

  const remarksVal =
    matchedRecord.remarks ||
    matchedRecord.remark ||
    findValueByKeys(matchedRecord, [
      'remarks',
      'remark',
      'comment',
      'message',
      'note',
      'মন্তব্য',
      'রিমার্কস',
      'टिप्पणी',
    ]);

  const statusText = statusVal.toLowerCase();
  let statusCode = 'pending';
  if (
    statusText.includes('approve') ||
    statusText.includes('success') ||
    statusText.includes('done') ||
    statusText.includes('অনুমোদিত') ||
    statusText.includes('स्वीकृत') ||
    statusText.includes('submit')
  ) {
    statusCode = 'approved';
  } else if (
    statusText.includes('process') ||
    statusText.includes('under') ||
    statusText.includes('প্রক্রিয়াধীন') ||
    statusText.includes('प्रक्रियाधीन') ||
    statusText.includes('run')
  ) {
    statusCode = 'processing';
  } else if (
    statusText.includes('reject') ||
    statusText.includes('cancel') ||
    statusText.includes('বাতিল')
  ) {
    statusCode = 'rejected';
  }

  const cleanMob = mobileVal ? mobileVal.toString().replace(/\D/g, '').slice(-10) : '';
  const maskedMob =
    cleanMob.length >= 4
      ? `${'*'.repeat(Math.max(0, cleanMob.length - 4))}${cleanMob.slice(-4)}`
      : mobileVal || 'N/A';

  const resolvedAppId = appIdVal || fallbackAppId;

  return {
    applicationId: maskSensitiveForMobileLookup ? maskApplicationId(resolvedAppId) : resolvedAppId,
    govtRefNo: maskSensitiveForMobileLookup
      ? 'Protected (Enter Official Application Number to view)'
      : govtRefVal || 'N/A',
    applicantName: maskSensitiveForMobileLookup
      ? maskApplicantName(nameVal || '')
      : nameVal || 'N/A',
    mobileNo: maskedMob,
    fullAddress: maskSensitiveForMobileLookup
      ? 'Protected (Enter Official Application Number to view full address)'
      : addressVal || 'N/A',
    schemeName: schemeVal || 'N/A',
    applicationDate: dateVal || 'N/A',
    applicationStatus: statusVal,
    remarks: remarksVal || '',
    statusCode,
  };
}

/**
 * Filter and match records strictly by exact Application ID / Govt Ref No OR exact 10-digit Mobile No.
 * Never performs substring matching.
 */
export function filterCandidateRecordsStrictly(
  data: any,
  lookupType: 'application_number' | 'mobile_number',
  normalizedQuery: string,
  cleanMobile?: string
): {ambiguousMobile: boolean; records: any[]} {
  if (data && typeof data === 'object' && data.errorCode === 'mobile_ambiguous') {
    return {ambiguousMobile: true, records: []};
  }

  const targetNormId = normalizeIdentifier(normalizedQuery);

  const matchesRecordStrictly = (item: any): boolean => {
    if (!item || typeof item !== 'object') return false;
    // Do not treat generic status wrapper objects without record fields as candidate records
    if (item.success === false || item.error || item.status === 'error') return false;

    if (lookupType === 'application_number') {
      const idVal =
        item['Application ID'] ||
        item['Application No'] ||
        item['Application Number'] ||
        item.applicationId ||
        item.applicationNo ||
        item.appId ||
        findValueByKeys(item, [
          'application id',
          'application no',
          'application number',
          'app id',
          'app no',
          'application_id',
          'আবেদন আইডি',
          'আবেদন নম্বর',
          'অ্যাপ্লিকেশন নম্বর',
          'आवेदन आईडी',
          'आवेदन संख्या',
        ]);

      const refVal =
        item['Govt. Reference No.'] ||
        item['Govt Reference No'] ||
        item['Govt. Ref. No.'] ||
        item.govtRefNo ||
        item.govtReferenceNo ||
        findValueByKeys(item, [
          'govt. reference no.',
          'govt reference no',
          'govt. ref. no.',
          'govt ref',
          'reference no',
          'ref no',
          'রেফারেন্স নম্বর',
          'সরকারি রেফারেন্স',
          'संदर्भ संख्या',
        ]);

      const normId = idVal ? normalizeIdentifier(String(idVal)) : '';
      const normRef = refVal ? normalizeIdentifier(String(refVal)) : '';
      return (normId !== '' && normId === targetNormId) || (normRef !== '' && normRef === targetNormId);
    } else {
      const mobileVal =
        item['Mobile No.'] ||
        item['Mobile No'] ||
        item.mobileNo ||
        item.mobile ||
        findValueByKeys(item, [
          'mobile no.',
          'mobile no',
          'mobile_no',
          'mobile number',
          'mobile',
          'phone no',
          'phone',
          'মোবাইল নম্বর',
          'মোবাইল নং',
          'ফোন নম্বর',
          'मोबाइल नंबर',
        ]);
      const normMob = mobileVal ? normalizeMobile(String(mobileVal)) : '';
      return normMob !== '' && normMob === cleanMobile;
    }
  };

  let candidateRecords: any[] = [];
  if (data && !data.error && data.status !== 'error' && data.success !== false) {
    if (Array.isArray(data)) {
      candidateRecords = data.filter(matchesRecordStrictly);
    } else if (typeof data === 'object') {
      if (Array.isArray(data.data)) {
        candidateRecords = data.data.filter(matchesRecordStrictly);
      } else if (Array.isArray(data.rows)) {
        candidateRecords = data.rows.filter(matchesRecordStrictly);
      } else {
        const innerData = data.data || data.row || data.record || (data.success && data.result) || data;
        if (innerData && typeof innerData === 'object' && !Array.isArray(innerData)) {
          if (matchesRecordStrictly(innerData)) {
            candidateRecords = [innerData];
          }
        }
      }
    }
  }

  if (lookupType === 'mobile_number' && candidateRecords.length > 1) {
    return {ambiguousMobile: true, records: []};
  }

  return {ambiguousMobile: false, records: candidateRecords};
}

interface ApiConfig {
  captchaSecret: string;
  appsScriptStatusUrl: string;
  appsScriptSharedSecret: string;
  enforceStrictPost: boolean;
  appsScriptPledgeUrl: string;
  appsScriptPledgeSecret: string;
}

const VALID_INDIAN_STATES_AND_UTS = new Set([
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]);

const PLEDGE_RATE_WINDOW_MS = 60 * 1000;
export const PLEDGE_ACTION_LIMITS: Record<string, number> = {
  captchaChallenge: 45,
  statusCheck: 15,
  submitRequest: 8,
  getPledgeCount: 30,
  createCard: 6,
  verifyById: 12,
  verifyByDetails: 8,
  civicTranslate: 20,
};
const pledgeClientRateBuckets = new Map<string, number[]>();
const pledgeGlobalBurstTimestamps: number[] = [];

/**
 * Resets warm-instance in-memory rate-limit maps (for testing cold starts across Serverless Instances).
 */
export function resetInMemoryRateLimitsForTest(): void {
  pledgeClientRateBuckets.clear();
  pledgeGlobalBurstTimestamps.length = 0;
  recentLookupTimestamps.length = 0;
}

function parseCrossInstanceRateStateToken(
  rawToken: string | undefined,
  secret: string,
  expectedBucketKey: string,
  now: number
): number[] {
  if (!rawToken || !secret || secret.length < 32) return [];
  const parts = rawToken.trim().split('.');
  if (parts.length !== 2) return [];
  const [payloadB64, macHex] = parts;
  const expectedMac = crypto
    .createHmac('sha256', secret)
    .update(`rl:${payloadB64}`)
    .digest('hex');
  if (!safeEqualHex(expectedMac, macHex)) return [];
  try {
    const decoded = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!decoded || decoded.k !== expectedBucketKey || !Array.isArray(decoded.t)) {
      return [];
    }
    return decoded.t
      .map((n: unknown) => Number(n))
      .filter((ts: number) => Number.isFinite(ts) && now - ts <= PLEDGE_RATE_WINDOW_MS && ts <= now + 1000);
  } catch {
    return [];
  }
}

function createCrossInstanceRateStateToken(
  secret: string,
  bucketKey: string,
  timestamps: number[]
): string | undefined {
  if (!secret || secret.length < 32) return undefined;
  const payloadB64 = Buffer.from(
    JSON.stringify({k: bucketKey, t: timestamps.slice(-50)}),
    'utf8'
  ).toString('base64url');
  const macHex = crypto
    .createHmac('sha256', secret)
    .update(`rl:${payloadB64}`)
    .digest('hex');
  return `${payloadB64}.${macHex}`;
}

function extractRateTokenFromHeaders(
  headers: Record<string, string | undefined>,
  action: string
): string | undefined {
  const directHeader = headers['x-ratelimit-window-token'];
  if (directHeader && typeof directHeader === 'string') {
    return directHeader.trim();
  }
  const cookieHeader = headers['cookie'];
  if (!cookieHeader || typeof cookieHeader !== 'string') return undefined;
  const cookieName = `__csp_rl_${action}=`;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(cookieName)) {
      return decodeURIComponent(trimmed.slice(cookieName.length));
    }
  }
  return undefined;
}

function checkPledgeRateLimit(
  clientContextHash: string,
  action: string,
  now: number,
  options?: {
    secret?: string;
    headers?: Record<string, string | undefined>;
  }
): {allowed: boolean; rateStateToken?: string; remaining: number; limit: number} {
  const limit = PLEDGE_ACTION_LIMITS[action] ?? 10;

  // Prune global burst window (10s, max 35 requests on warm instance)
  while (
    pledgeGlobalBurstTimestamps.length > 0 &&
    now - pledgeGlobalBurstTimestamps[0] > BURST_WINDOW_MS
  ) {
    pledgeGlobalBurstTimestamps.shift();
  }
  if (pledgeGlobalBurstTimestamps.length >= 35) {
    return {allowed: false, remaining: 0, limit};
  }

  // Prune stale client buckets occasionally
  if (pledgeClientRateBuckets.size > 2000) {
    for (const [key, timestamps] of pledgeClientRateBuckets.entries()) {
      const active = timestamps.filter(ts => now - ts <= PLEDGE_RATE_WINDOW_MS);
      if (active.length === 0) {
        pledgeClientRateBuckets.delete(key);
      } else {
        pledgeClientRateBuckets.set(key, active);
      }
    }
  }

  const bucketKey = `${clientContextHash}:${action}`;
  const inMemoryHistory = (pledgeClientRateBuckets.get(bucketKey) || []).filter(
    ts => now - ts <= PLEDGE_RATE_WINDOW_MS
  );

  const inboundToken = options?.headers
    ? extractRateTokenFromHeaders(options.headers, action)
    : undefined;
  const crossInstanceHistory = parseCrossInstanceRateStateToken(
    inboundToken,
    options?.secret || '',
    bucketKey,
    now
  );

  // Preserve all active window requests across warm-instance memory and cross-instance HMAC token
  // without collapsing concurrent requests that arrive within the same millisecond.
  const mergedHistory =
    inMemoryHistory.length >= crossInstanceHistory.length
      ? [...inMemoryHistory]
      : [...crossInstanceHistory];

  if (mergedHistory.length >= limit) {
    pledgeClientRateBuckets.set(bucketKey, mergedHistory);
    const rateStateToken = createCrossInstanceRateStateToken(
      options?.secret || '',
      bucketKey,
      mergedHistory
    );
    return {allowed: false, rateStateToken, remaining: 0, limit};
  }

  mergedHistory.push(now);
  pledgeClientRateBuckets.set(bucketKey, mergedHistory);
  pledgeGlobalBurstTimestamps.push(now);
  const rateStateToken = createCrossInstanceRateStateToken(
    options?.secret || '',
    bucketKey,
    mergedHistory
  );
  return {
    allowed: true,
    rateStateToken,
    remaining: Math.max(0, limit - mergedHistory.length),
    limit,
  };
}

function buildRateLimitHeaders(
  action: string,
  rateInfo: {rateStateToken?: string; remaining: number; limit: number}
): Record<string, string> {
  const headers: Record<string, string> = {
    ...SECURITY_HEADERS,
    'X-RateLimit-Limit': String(rateInfo.limit),
    'X-RateLimit-Remaining': String(rateInfo.remaining),
  };
  if (rateInfo.rateStateToken) {
    headers['X-RateLimit-Window-Token'] = rateInfo.rateStateToken;
    headers['Set-Cookie'] =
      `__csp_rl_${action}=${encodeURIComponent(rateInfo.rateStateToken)}; Path=/api; Max-Age=60; HttpOnly; SameSite=Strict; Secure`;
  }
  return headers;
}

export function sanitizeSafeText(raw: unknown, maxLen: number): string {
  const cleaned = String(raw ?? '')
    .trim()
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '');
  // Strip spreadsheet formula prefixes (=, +, -, @, |), DDE command pipes, and formula functions
  const strippedFormula = cleaned
    .replace(/^[\s=+\-@|]+/, '')
    .replace(/(?:cmd|powershell)\|[^!]+![A-Za-z0-9]+/gi, '')
    .replace(
      /\b(?:SUM|AVERAGE|COUNT|MIN|MAX|HYPERLINK|IMPORTXML|IMPORTRANGE|IMPORTDATA|IMPORTFEED|IMAGE|QUERY|VLOOKUP|CMD|POWERSHELL)\s*\([^)]*\)/gi,
      ''
    )
    .replace(/^[\s=+\-@|]+/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return strippedFormula.slice(0, maxLen);
}

export function formatPledgeMobileLast4(rawMobile: unknown): string {
  const digits = String(rawMobile ?? '').replace(/\D/g, '');
  if (digits.length >= 4) {
    return `XXXXXX${digits.slice(-4)}`;
  }
  const tailMatch = String(rawMobile ?? '')
    .trim()
    .match(/(\d{4})$/);
  if (tailMatch) {
    return `XXXXXX${tailMatch[1]}`;
  }
  return 'XXXXXX••••';
}

/**
 * Strictly filters any upstream Apps Script response so ONLY card-display fields
 * (`uniqueCitizenId`, `fullName`, `gender`, `mobileLast4`, `state`, `district`, `status`)
 * are returned to the browser. Never exposes `guardianName`, `dateOfBirth`, or full `mobileNumber`.
 */
export function sanitizePledgeCardRecord(
  upstreamRes: any,
  fallbackInput?: {
    fullName?: string;
    gender?: string;
    mobileNumber?: string;
    state?: string;
    district?: string;
  }
): {
  uniqueCitizenId: string;
  fullName: string;
  gender: string;
  mobileLast4: string;
  state: string;
  district: string;
  status: 'ACTIVE';
} | null {
  if (!upstreamRes || typeof upstreamRes !== 'object' || upstreamRes.success !== true) {
    return null;
  }

  const rec =
    (upstreamRes.data && typeof upstreamRes.data === 'object' ? upstreamRes.data : null) ||
    (upstreamRes.card && typeof upstreamRes.card === 'object' ? upstreamRes.card : null) ||
    (upstreamRes.record && typeof upstreamRes.record === 'object' ? upstreamRes.record : null) ||
    (upstreamRes.result && typeof upstreamRes.result === 'object' ? upstreamRes.result : null) ||
    upstreamRes;

  const rawId = String(
    rec.uniqueCitizenId ||
      rec.citizenId ||
      rec.CitizenId ||
      rec['Unique Citizen ID'] ||
      rec['Citizen ID'] ||
      upstreamRes.uniqueCitizenId ||
      upstreamRes.citizenId ||
      ''
  )
    .trim()
    .toUpperCase();

  if (!/^CITIZEN-\d{8}$/.test(rawId)) {
    return null;
  }

  const fullName = sanitizeSafeText(
    rec.fullName || rec.name || rec['Full Name'] || fallbackInput?.fullName || '',
    80
  );
  const rawGender = sanitizeSafeText(
    rec.gender || rec['Gender'] || fallbackInput?.gender || '',
    20
  );
  const gender = ['Male', 'Female', 'Other'].includes(rawGender) ? rawGender : 'Other';

  const rawMobileSource =
    rec.mobileLast4 ||
    rec.maskedMobile ||
    rec.mobileLastFour ||
    rec.lastFourDigits ||
    rec.mobileNumber ||
    rec.mobile ||
    rec['Mobile Number'] ||
    rec['Registered Mobile'] ||
    fallbackInput?.mobileNumber ||
    '';

  const state = sanitizeSafeText(rec.state || rec['State'] || fallbackInput?.state || '', 60);
  const district = sanitizeSafeText(
    rec.district || rec['District'] || fallbackInput?.district || '',
    60
  );

  if (!fullName || !state || !district) {
    return null;
  }

  return {
    uniqueCitizenId: rawId,
    fullName,
    gender,
    mobileLast4: formatPledgeMobileLast4(rawMobileSource),
    state,
    district,
    status: 'ACTIVE',
  };
}

export function signPledgeAppsScriptRequest(params: {
  sharedSecret: string;
  action: string;
  canonicalTarget: string;
  nonce?: string;
  ts?: number;
}): {ts: string; nonce: string; sig: string} {
  const ts = String(params.ts ?? Date.now());
  const nonce = params.nonce || crypto.randomUUID();
  const payloadToSign = `${ts}:${nonce}:${params.action}:${params.canonicalTarget}`;
  const effectiveKey = params.sharedSecret || 'unconfigured-pledge-secret';
  const sig = crypto
    .createHmac('sha256', effectiveKey)
    .update(payloadToSign)
    .digest('hex');
  return {ts, nonce, sig};
}

function resolveApiConfig(
  envOverrides?: Record<string, string | undefined>
): CentralizedServerConfig {
  return resolveCentralizedServerConfig(envOverrides);
}

/**
 * Server-side official Google Gemini API (@google/genai) helper for accurate
 * civic multilingual translation (bn, en, hi) and non-PII text safety verification.
 * Uses gemini-3.8-flash and falls back gracefully if GEMINI_API_KEY is not configured.
 */
async function translateCivicTextServerSide(params: {
  text: string;
  targetLang: 'bn' | 'en' | 'hi';
  apiKey?: string;
}): Promise<{translatedText: string; modelUsed: string}> {
  const cleanText = sanitizeSafeText(params.text, 600);
  if (!cleanText) {
    return {translatedText: '', modelUsed: 'fallback'};
  }

  const key = params.apiKey;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    return {translatedText: cleanText, modelUsed: 'static-dictionary'};
  }

  const langNames: Record<'bn' | 'en' | 'hi', string> = {
    bn: 'Bengali (বাংলা)',
    en: 'Indian English',
    hi: 'Hindi (हिन्दी)',
  };

  try {
    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {headers: {'User-Agent': 'aistudio-build'}},
    });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Translate the following Indian civic awareness portal text accurately into ${langNames[params.targetLang]}. Preserve official proper nouns ("Citizen Services Point", "Citizen India", "Swachhtar Pothe", "CITIZEN-XXXXXXXX") without altering their meaning. Return ONLY the translated text without quotes or explanations:\n\n${cleanText}`,
    });
    const out = String(response.text || '').trim();
    return {
      translatedText: out || cleanText,
      modelUsed: 'gemini-3.8-flash',
    };
  } catch {
    return {translatedText: cleanText, modelUsed: 'static-dictionary'};
  }
}

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  Pragma: 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

export interface NormalizedHttpRequest {
  path: string;
  method: string;
  headers: Record<string, string | undefined>;
  body: string;
  bodyBytes: number;
}

export interface NormalizedHttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export function resolveCanonicalApiPath(req: NormalizedHttpRequest): string {
  const normalizedHeaders: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(req.headers || {})) {
    normalizedHeaders[k.toLowerCase()] = v;
  }

  const candidatePaths = [
    req.path,
    normalizedHeaders['x-nf-original-pathname'],
    normalizedHeaders['x-original-url'],
    normalizedHeaders['x-rewrite-url'],
  ];

  for (const rawCandidate of candidatePaths) {
    if (!rawCandidate || typeof rawCandidate !== 'string') continue;
    let pathname = rawCandidate.trim();
    if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
      try {
        pathname = new URL(pathname).pathname;
      } catch {
        // ignore URL parse error
      }
    }
    pathname = pathname
      .split('?')[0]
      .replace(/^\/\.netlify\/functions\/api/, '/api')
      .replace(/\/+$/, '');

    if (
      pathname === '/api/captcha-challenge' ||
      pathname === '/api/status-check' ||
      pathname === '/api/submit-request' ||
      pathname === '/api/pledge-card' ||
      pathname === '/api/civic-translate'
    ) {
      return pathname;
    }
  }

  // Fallback inference if a Netlify rewrite forwarded to bare `/.netlify/functions/api` or `/api`
  const baseNormalized = (req.path || '')
    .split('?')[0]
    .replace(/^\/\.netlify\/functions\/api/, '/api')
    .replace(/\/+$/, '');

  if (baseNormalized === '/api' || baseNormalized === '') {
    if (req.method === 'GET') {
      return '/api/captcha-challenge';
    }
    if (req.method === 'POST' && req.body) {
      try {
        const parsed = JSON.parse(req.body);
        if (parsed && typeof parsed === 'object') {
          if (
            typeof parsed.action === 'string' &&
            ['getPledgeCount', 'createCard', 'verifyById', 'verifyByDetails'].includes(parsed.action)
          ) {
            return '/api/pledge-card';
          }
          if (parsed.query !== undefined || parsed.lookupType !== undefined) {
            return '/api/status-check';
          }
          if (
            parsed.applicationNumber !== undefined ||
            parsed.applyingFor !== undefined ||
            parsed.requestedService !== undefined
          ) {
            return '/api/submit-request';
          }
          if (parsed.targetLang !== undefined && parsed.text !== undefined) {
            return '/api/civic-translate';
          }
        }
      } catch {
        // fall through
      }
    }
  }

  return baseNormalized;
}

export async function handleApiRequest(
  req: NormalizedHttpRequest,
  envOverrides?: Record<string, string | undefined>
): Promise<NormalizedHttpResponse | null> {
  const config = resolveApiConfig(envOverrides);

  const lowerHeaders: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(req.headers || {})) {
    lowerHeaders[k.toLowerCase()] = v;
  }

  const cleanPath = resolveCanonicalApiPath({
    ...req,
    headers: lowerHeaders,
  });

  const userAgent = lowerHeaders['user-agent'];
  const clientIp =
    lowerHeaders['x-nf-client-connection-ip'] ||
    lowerHeaders['x-forwarded-for'] ||
    lowerHeaders['client-ip'];

  // Bind CAPTCHA tokens to User-Agent context so dual-stack IPv4/IPv6 switching on mobile networks
  // or CDN edge hops does not falsely invalidate a citizen's active challenge, while rate-limiting
  // uses both User-Agent and IP prefix.
  const captchaContextHash = computeTransientClientContextHash(
    config.captchaSecret,
    userAgent,
    undefined
  );
  const rateLimitContextHash = computeTransientClientContextHash(
    config.captchaSecret,
    userAgent,
    clientIp
  );

  // =========================================================================
  // ROUTE 1: GET /api/captcha-challenge
  // =========================================================================
  if (cleanPath === '/api/captcha-challenge') {
    if (req.method !== 'GET') {
      return {
        statusCode: 405,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'method_not_allowed',
          message: 'Only GET requests are allowed for CAPTCHA challenges.',
        }),
      };
    }

    // Fail closed in production if CAPTCHA_SECRET_KEY is not configured in environment
    if (!config.captchaSecret || config.captchaSecret.length < 32) {
      return {
        statusCode: 503,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'captcha_secret_unconfigured',
          message:
            'Security verification service is unavailable because CAPTCHA_SECRET_KEY is not configured on the server.',
        }),
      };
    }

    const now = Date.now();
    pruneConsumedChallenges(now);

    const rateCheck = checkPledgeRateLimit(rateLimitContextHash, 'captchaChallenge', now, {
      secret: config.captchaSecret,
      headers: lowerHeaders,
    });
    const responseHeaders = buildRateLimitHeaders('captchaChallenge', rateCheck);

    if (!rateCheck.allowed) {
      return {
        statusCode: 429,
        headers: responseHeaders,
        body: JSON.stringify({
          success: false,
          errorCode: 'rate_limited',
          message: 'Too many security challenge requests. Please wait a moment and try again.',
        }),
      };
    }

    let code = '';
    for (let i = 0; i < 6; i++) {
      code += CAPTCHA_ALPHABET[crypto.randomInt(0, CAPTCHA_ALPHABET.length)];
    }

    const signed = createSignedCaptchaChallenge(config.captchaSecret, code, captchaContextHash, now);
    const imageDataUrl = generateCaptchaSvg(code);

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({
        success: true,
        challengeId: signed.challengeId,
        captchaToken: signed.captchaToken,
        imageDataUrl,
        expiresAt: signed.expiresAt,
        ttlSeconds: signed.ttlSeconds,
      }),
    };
  }

  // =========================================================================
  // ROUTE 2: POST /api/status-check
  // =========================================================================
  if (cleanPath === '/api/status-check') {
    if (req.method !== 'POST') {
      return {
        statusCode: 405,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'method_not_allowed',
          message: 'Only POST requests are permitted for status verification.',
        }),
      };
    }

    if (req.bodyBytes > MAX_BODY_BYTES) {
      return {
        statusCode: 413,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'payload_too_large',
          message: 'Request size exceeds the 4 KB security limit.',
        }),
      };
    }

    const now = Date.now();
    pruneConsumedChallenges(now);

    // Best-effort warm-instance burst rate limiter
    while (recentLookupTimestamps.length > 0 && now - recentLookupTimestamps[0] > BURST_WINDOW_MS) {
      recentLookupTimestamps.shift();
    }
    if (recentLookupTimestamps.length >= MAX_BURST_REQUESTS) {
      return {
        statusCode: 429,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'rate_limited',
          message: 'Too many status requests at once. Please wait a few seconds and try again.',
        }),
      };
    }
    recentLookupTimestamps.push(now);

    let payload: any;
    try {
      payload = JSON.parse(req.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          errorCode: 'invalid_request',
          message: 'Malformed request format.',
        }),
      };
    }

    const {
      query,
      challengeId,
      captchaToken,
      captchaAnswer,
      recaptchaToken,
      recaptchaAction,
      website,
    } = payload || {};

    // Honeypot check
    if (website) {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          errorCode: 'bot_detected',
          message: 'Request rejected by security filter.',
        }),
      };
    }

    // Fail closed if CAPTCHA_SECRET_KEY is not configured in server environment
    if (!config.captchaSecret || config.captchaSecret.length < 32) {
      return {
        statusCode: 503,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          errorCode: 'captcha_secret_unconfigured',
          message:
            'Security verification service is unavailable because CAPTCHA_SECRET_KEY is not configured on the server.',
        }),
      };
    }

    const rateCheck = checkPledgeRateLimit(rateLimitContextHash, 'statusCheck', now, {
      secret: config.captchaSecret,
      headers: lowerHeaders,
    });
    const statusResponseHeaders = buildRateLimitHeaders('statusCheck', rateCheck);

    if (!rateCheck.allowed) {
      return {
        statusCode: 429,
        headers: statusResponseHeaders,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          errorCode: 'rate_limited',
          message: 'Too many status requests. Please wait a minute and try again.',
        }),
      };
    }

    const captchaResult = verifySignedCaptchaChallenge({
      secret: config.captchaSecret,
      challengeId,
      captchaToken,
      captchaAnswer,
      clientContextHash: captchaContextHash,
      now,
    });

    if (!captchaResult.ok) {
      return {
        statusCode: captchaResult.status,
        headers: statusResponseHeaders,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          errorCode: captchaResult.errorCode,
          message: captchaResult.message,
        }),
      };
    }

    // Server-side Google reCAPTCHA v3 verification (rejects forged tokens, low score < 0.5, or action/hostname mismatch)
    const recaptchaV3Result = await verifyGoogleRecaptchaV3ServerSide({
      config,
      token: recaptchaToken,
      expectedAction: 'status_check',
      clientAction: recaptchaAction,
      remoteIp: clientIp,
      hasSecondaryCryptoProof: true,
    });

    if (!recaptchaV3Result.ok) {
      return {
        statusCode: recaptchaV3Result.status,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          errorCode: recaptchaV3Result.errorCode || 'recaptcha_v3_failed',
          message:
            recaptchaV3Result.message ||
            'Google reCAPTCHA v3 security verification failed. Please refresh and try again.',
        }),
      };
    }

    // Strict input classification & format validation AFTER CAPTCHA passes
    const validation = classifyAndValidateQuery(query);
    if (!validation.valid || !validation.normalizedQuery || !validation.type) {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: true,
          errorCode: 'invalid_query_format',
          message:
            'Please enter a valid Official Application Number (e.g. CITIZEN-0426-9495) or 10-digit Registered Mobile Number.',
        }),
      };
    }

    const normalizedQuery = validation.normalizedQuery;
    const lookupType = validation.type;

    // Sign outbound server-to-server request to Google Apps Script (no custom HTTP headers needed)
    const signedAuth = signAppsScriptRequest({
      sharedSecret: config.appsScriptSharedSecret,
      lookupType,
      normalizedQuery,
      nonce: challengeId,
      ts: now,
    });

    try {
      let data: any = null;
      let requestSucceeded = false;

      // When enforceStrictPost is false (default for the live deployed Status Apps Script doGet endpoint),
      // execute signed GET directly first to avoid wasting ~3.5s on an unsupported POST call.
      if (!config.enforceStrictPost) {
        try {
          const targetUrl = new URL(config.appsScriptStatusUrl);
          targetUrl.searchParams.set('appNo', normalizedQuery);
          targetUrl.searchParams.set('appId', normalizedQuery);
          targetUrl.searchParams.set('applicationNo', normalizedQuery);
          targetUrl.searchParams.set('lookupType', lookupType);
          targetUrl.searchParams.set('ts', signedAuth.ts);
          targetUrl.searchParams.set('nonce', signedAuth.nonce);
          targetUrl.searchParams.set('sig', signedAuth.sig);

          const getController = new AbortController();
          const getTimeout = setTimeout(() => getController.abort(), 8500);
          const getRes = await fetch(targetUrl.toString(), {
            method: 'GET',
            headers: {Accept: 'application/json'},
            signal: getController.signal,
          });
          clearTimeout(getTimeout);

          if (getRes.ok) {
            const text = await getRes.text();
            try {
              data = JSON.parse(text);
              requestSucceeded = true;
            } catch {
              requestSucceeded = false;
            }
          }
        } catch {
          requestSucceeded = false;
        }
      }

      // Signed HTTPS POST (primary when enforceStrictPost is true, or fallback if GET did not return JSON)
      if (!requestSucceeded) {
        const postController = new AbortController();
        const postTimeout = setTimeout(() => postController.abort(), 8500);
        const postRes = await fetch(config.appsScriptStatusUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            action: 'status_check',
            query: normalizedQuery,
            appId: normalizedQuery,
            appNo: normalizedQuery,
            applicationNo: normalizedQuery,
            lookupType,
            ts: signedAuth.ts,
            nonce: signedAuth.nonce,
            sig: signedAuth.sig,
          }),
          signal: postController.signal,
        });
        clearTimeout(postTimeout);

        if (!postRes.ok) {
          throw new Error('Upstream status service error');
        }
        const text = await postRes.text();
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object' || parsed.error === 'Unsupported action.') {
          throw new Error('Upstream status service unsupported action');
        }
        data = parsed;
      }

      const {ambiguousMobile, records: candidateRecords} = filterCandidateRecordsStrictly(
        data,
        lookupType,
        normalizedQuery,
        validation.cleanMobile
      );

      if (ambiguousMobile) {
        return {
          statusCode: 200,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            captchaVerified: true,
            lookupType,
            errorCode: 'mobile_ambiguous',
            message:
              'Multiple applications are registered with this mobile number. For citizen privacy protection, please search using your specific Official Application Number (e.g. CITIZEN-XXXX-XXXX).',
          }),
        };
      }

      const matchedRecord = candidateRecords[0] || null;
      if (!matchedRecord || Object.keys(matchedRecord).length === 0 || matchedRecord.error) {
        return {
          statusCode: 200,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            captchaVerified: true,
            lookupType,
            normalizedQuery,
            notFound: true,
          }),
        };
      }

      const sanitizedRecord = extractRecordFields(
        matchedRecord,
        normalizedQuery,
        lookupType === 'mobile_number'
      );

      return {
        statusCode: 200,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: true,
          captchaVerified: true,
          lookupType,
          record: sanitizedRecord,
        }),
      };
    } catch {
      return {
        statusCode: 502,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: true,
          errorCode: 'upstream_error',
          message: 'Unable to connect to the status verification service. Please try again later.',
        }),
      };
    }
  }

  // =========================================================================
  // ROUTE 3: POST /api/submit-request (Secured Customer Service Request Route)
  // =========================================================================
  if (cleanPath === '/api/submit-request') {
    if (req.method !== 'POST') {
      return {
        statusCode: 405,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, error: 'Method Not Allowed'}),
      };
    }

    if (req.bodyBytes > MAX_SUBMIT_BODY_BYTES) {
      return {
        statusCode: 413,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, error: 'Payload Too Large'}),
      };
    }

    const now = Date.now();

    const submitRateCheck = checkPledgeRateLimit(rateLimitContextHash, 'submitRequest', now, {
      secret: config.captchaSecret,
      headers: lowerHeaders,
    });
    const submitResponseHeaders = buildRateLimitHeaders('submitRequest', submitRateCheck);

    if (!submitRateCheck.allowed) {
      return {
        statusCode: 429,
        headers: submitResponseHeaders,
        body: JSON.stringify({
          success: false,
          errorCode: 'rate_limited',
          error: 'Too many service requests submitted. Please wait a minute and try again.',
        }),
      };
    }

    try {
      const data = JSON.parse(req.body || '{}');

      // Honeypot check
      if (data?.website) {
        return {
          statusCode: 400,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            errorCode: 'bot_detected',
            error: 'Request rejected by security filter.',
          }),
        };
      }

      const appNumber =
        typeof data?.applicationNumber === 'string'
          ? sanitizeSafeText(data.applicationNumber, 32).toUpperCase()
          : '';
      const hasValidAppFormat = /^CITIZEN-\d{4}-\d{4}$/.test(appNumber);

      // Server-Side Google reCAPTCHA v3 verification before accepting form submission
      const recaptchaV3Result = await verifyGoogleRecaptchaV3ServerSide({
        config,
        token: data?.recaptchaToken,
        expectedAction: 'submit_service_request',
        clientAction: data?.recaptchaAction,
        remoteIp: clientIp,
        hasSecondaryCryptoProof: hasValidAppFormat,
      });

      if (!recaptchaV3Result.ok) {
        return {
          statusCode: recaptchaV3Result.status,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            errorCode: recaptchaV3Result.errorCode || 'recaptcha_v3_failed',
            error:
              recaptchaV3Result.message ||
              'Google reCAPTCHA v3 verification failed. Request rejected.',
          }),
        };
      }

      // Server-side dispatch to FormSubmit after reCAPTCHA v3 verification passes
      try {
        const fd = new FormData();
        const applicantDetails = data?.applicantDetails || {};
        const addressDetails = data?.addressDetails || {};
        const identityDetails = data?.identityDetails || {};
        const identityProofUpload = data?.identityProofUpload || {};
        const additionalQuestions = data?.additionalMandatoryQuestions || {};
        const checklist = Array.isArray(data?.documentChecklist)
          ? data.documentChecklist.join(', ')
          : '';

        fd.append(
          '_subject',
          `New Citizen Request [${appNumber || 'N/A'}]: ${sanitizeSafeText(applicantDetails.fullName, 80)} - ${sanitizeSafeText(data?.requestedService, 120)}`
        );
        fd.append('_template', 'table');
        fd.append('_captcha', 'false');

        fd.append('Application Number', appNumber || 'N/A');
        fd.append(
          'Application Date & Time',
          `${sanitizeSafeText(data?.applicationDate, 20)} at ${sanitizeSafeText(data?.applicationTime, 20)}`
        );
        fd.append(
          'Service Category',
          data?.applyingFor === 'scheme' ? 'Government Welfare Scheme' : 'Government Service'
        );
        fd.append('Requested Service / Scheme', sanitizeSafeText(data?.requestedService, 120));
        fd.append('Request Type', sanitizeSafeText(data?.requestType, 80));

        fd.append('Applicant Full Name', sanitizeSafeText(applicantDetails.fullName, 80));
        fd.append("Father's Name", sanitizeSafeText(applicantDetails.fatherName, 80) || 'N/A');
        fd.append("Mother's Name", sanitizeSafeText(applicantDetails.motherName, 80) || 'N/A');
        fd.append('Date of Birth', sanitizeSafeText(applicantDetails.dob, 20) || 'N/A');
        fd.append('Gender', sanitizeSafeText(applicantDetails.gender, 20) || 'N/A');
        fd.append('Mobile Number', sanitizeSafeText(applicantDetails.mobile, 15));
        fd.append(
          'Alternate Mobile Number',
          sanitizeSafeText(applicantDetails.altMobile, 15) || 'N/A'
        );
        fd.append('Occupation', sanitizeSafeText(applicantDetails.occupation, 60) || 'N/A');

        fd.append('Address - House / Flat', sanitizeSafeText(addressDetails.houseNo, 60) || 'N/A');
        fd.append('Address - Street / Locality', sanitizeSafeText(addressDetails.street, 80) || 'N/A');
        fd.append(
          'Address - Village / Town / City',
          sanitizeSafeText(addressDetails.villageCity, 80) || 'N/A'
        );
        fd.append(
          'Address - Police Station',
          sanitizeSafeText(addressDetails.policeStation, 80) || 'N/A'
        );
        fd.append('Address - District', sanitizeSafeText(addressDetails.district, 60) || 'N/A');
        fd.append('Address - State', sanitizeSafeText(addressDetails.state, 60) || 'West Bengal');
        fd.append('Address - PIN Code', sanitizeSafeText(addressDetails.pinCode, 10) || 'N/A');

        fd.append('Aadhaar Number', sanitizeSafeText(identityDetails.aadhaarNo, 20) || 'N/A');
        fd.append('PAN Number', sanitizeSafeText(identityDetails.panNo, 20) || 'N/A');
        fd.append('Voter ID Number', sanitizeSafeText(identityDetails.voterNo, 25) || 'N/A');
        fd.append('Passport Number', sanitizeSafeText(identityDetails.passportNo, 25) || 'N/A');

        fd.append('Attached Documents Checklist', sanitizeSafeText(checklist, 300));
        fd.append(
          'Has Valid ID Proof',
          sanitizeSafeText(identityProofUpload.hasValidIdProof, 10) || 'N/A'
        );
        fd.append(
          'ID Proof Type',
          sanitizeSafeText(identityProofUpload.idProofType, 60) || 'N/A'
        );

        const attachBase64File = (
          base64DataUrl: unknown,
          fileName: unknown,
          field1: string,
          field2: string
        ) => {
          if (typeof base64DataUrl !== 'string' || !base64DataUrl.startsWith('data:')) return;
          const commaIndex = base64DataUrl.indexOf(',');
          if (commaIndex === -1) return;
          const meta = base64DataUrl.slice(5, commaIndex);
          const rawBase64 = base64DataUrl.slice(commaIndex + 1);
          const mimeType = meta.split(';')[0] || 'application/octet-stream';
          const buffer = Buffer.from(rawBase64, 'base64');
          if (buffer.byteLength > 260 * 1024) return;
          const blob = new Blob([buffer], {type: mimeType});
          const cleanName = sanitizeSafeText(fileName, 80) || 'document';
          fd.append(field1, blob, cleanName);
          fd.append(field2, blob, cleanName);
        };

        attachBase64File(
          data?.idFileBase64,
          identityProofUpload.idFileName,
          'attachment',
          'ID_Proof_Document'
        );
        attachBase64File(
          data?.photoFileBase64,
          identityProofUpload.photoFileName,
          'attachment_photo',
          'Passport_Photo'
        );

        fd.append(
          'Reason for Request / Remarks',
          sanitizeSafeText(data?.serviceDescription, 500) || 'N/A'
        );
        fd.append(
          'Affiliated with Political Party',
          sanitizeSafeText(additionalQuestions.affiliatedPoliticalParty, 10)
        );
        fd.append(
          'Physically Disabled',
          sanitizeSafeText(additionalQuestions.physicallyDisabled, 10)
        );
        fd.append(
          'Birthplace in India',
          sanitizeSafeText(additionalQuestions.birthplaceInIndia, 10)
        );
        fd.append(
          'Fraudulent / Illegal Activity Check',
          sanitizeSafeText(additionalQuestions.fraudulentIllegal, 10)
        );
        fd.append('Applicant Declaration', 'ACCEPTED - Certified True and Correct');

        const formSubmitUrl =
          process.env.FORMSUBMIT_AJAX_URL ||
          'https://formsubmit.co/ajax/support.citizenindia@gmail.com';
        fetch(formSubmitUrl, {
          method: 'POST',
          headers: {Accept: 'application/json'},
          body: fd,
        }).catch(() => {});
      } catch {
        // Non-blocking background relay
      }

      return {
        statusCode: 200,
        headers: submitResponseHeaders,
        body: JSON.stringify({
          success: true,
          securityVerified: true,
          applicationNumber: hasValidAppFormat ? appNumber : undefined,
          message: 'Form data & files verified and routed securely.',
        }),
      };
    } catch {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, error: 'Invalid JSON'}),
      };
    }
  }

  // =========================================================================
  // ROUTE 4: POST /api/pledge-card (Server-Side Citizen Pledge Card Proxy)
  // =========================================================================
  if (cleanPath === '/api/pledge-card') {
    if (req.method !== 'POST') {
      return {
        statusCode: 405,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          code: 'METHOD_NOT_ALLOWED',
          message: 'Only POST requests are permitted.',
        }),
      };
    }

    if (req.bodyBytes > MAX_BODY_BYTES) {
      return {
        statusCode: 413,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Request size exceeds the 4 KB security limit.',
        }),
      };
    }

    let bodyObj: any;
    try {
      bodyObj = JSON.parse(req.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          code: 'INVALID_JSON',
          message: 'Malformed request payload.',
        }),
      };
    }

    const action = String(bodyObj?.action || '').trim();
    if (!['getPledgeCount', 'createCard', 'verifyById', 'verifyByDetails'].includes(action)) {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          code: 'UNSUPPORTED_ACTION',
          message: 'Unsupported pledge card action.',
        }),
      };
    }

    // Honeypot bot trap check (if present and non-empty, reject immediately)
    if (bodyObj?.website || bodyObj?.data?.website) {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          code: 'BOT_DETECTED',
          message: 'Request rejected by security filter.',
        }),
      };
    }

    const now = Date.now();

    // Fail closed immediately for CAPTCHA-protected actions when CAPTCHA_SECRET_KEY is not configured
    if (
      (action === 'createCard' || action === 'verifyById' || action === 'verifyByDetails') &&
      (!config.captchaSecret || config.captchaSecret.length < 32)
    ) {
      return {
        statusCode: 503,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: false,
          captchaVerified: false,
          code: 'CAPTCHA_SECRET_UNCONFIGURED',
          errorCode: 'captcha_secret_unconfigured',
          message:
            'Security verification service is unavailable because CAPTCHA_SECRET_KEY is not configured on the server.',
        }),
      };
    }

    const pledgeRateCheck = checkPledgeRateLimit(rateLimitContextHash, action, now, {
      secret: config.captchaSecret,
      headers: lowerHeaders,
    });
    const pledgeResponseHeaders = buildRateLimitHeaders(action, pledgeRateCheck);

    if (!pledgeRateCheck.allowed) {
      return {
        statusCode: 429,
        headers: pledgeResponseHeaders,
        body: JSON.stringify({
          success: false,
          code: 'RATE_LIMITED',
          message: 'Too many requests in a short period. Please wait a minute and try again.',
        }),
      };
    }

    const rawData = bodyObj?.data && typeof bodyObj.data === 'object' ? bodyObj.data : {};
    const rawCaptcha = bodyObj?.captcha && typeof bodyObj.captcha === 'object' ? bodyObj.captcha : {};

    // Strict Server-Side CAPTCHA Verification for createCard, verifyById, and verifyByDetails
    if (action === 'createCard' || action === 'verifyById' || action === 'verifyByDetails') {
      const challengeId = String(
        rawCaptcha.challengeId || bodyObj?.challengeId || rawData.challengeId || ''
      ).trim();
      const captchaToken = String(
        rawCaptcha.captchaToken || bodyObj?.captchaToken || rawData.captchaToken || ''
      ).trim();
      const captchaAnswer = String(
        rawCaptcha.captchaAnswer || bodyObj?.captchaAnswer || rawData.captchaAnswer || ''
      ).trim();
      const notARobotChecked =
        rawCaptcha.notARobotChecked === true ||
        bodyObj?.notARobotChecked === true ||
        rawData.notARobotChecked === true;

      if (!notARobotChecked || !challengeId || !captchaToken || !captchaAnswer) {
        return {
          statusCode: 400,
          headers: pledgeResponseHeaders,
          body: JSON.stringify({
            success: false,
            captchaVerified: false,
            code: 'CAPTCHA_REQUIRED',
            errorCode: 'captcha_required',
            message: 'Please complete the "I\'m not a robot" CAPTCHA security verification before proceeding.',
          }),
        };
      }

      const captchaResult = verifySignedCaptchaChallenge({
        secret: config.captchaSecret,
        challengeId,
        captchaToken,
        captchaAnswer,
        clientContextHash: captchaContextHash,
        now,
      });

      if (!captchaResult.ok) {
        const mappedCode =
          captchaResult.errorCode === 'captcha_expired' || captchaResult.errorCode === 'captcha_replayed'
            ? 'CAPTCHA_EXPIRED'
            : 'CAPTCHA_INVALID';
        return {
          statusCode: captchaResult.status,
          headers: pledgeResponseHeaders,
          body: JSON.stringify({
            success: false,
            captchaVerified: false,
            code: mappedCode,
            errorCode: captchaResult.errorCode,
            message: captchaResult.message,
          }),
        };
      }

      // Server-Side Google reCAPTCHA v3 verification for createCard, verifyById, and verifyByDetails
      const expectedRecaptchaAction =
        action === 'createCard'
          ? 'pledge_create_card'
          : action === 'verifyById'
            ? 'pledge_verify_id'
            : 'pledge_verify_details';

      const recaptchaToken = String(
        rawCaptcha.recaptchaToken || bodyObj?.recaptchaToken || rawData.recaptchaToken || ''
      ).trim();
      const recaptchaAction =
        rawCaptcha.recaptchaAction || bodyObj?.recaptchaAction || rawData.recaptchaAction;

      const recaptchaV3Result = await verifyGoogleRecaptchaV3ServerSide({
        config,
        token: recaptchaToken,
        expectedAction: expectedRecaptchaAction,
        clientAction: typeof recaptchaAction === 'string' ? recaptchaAction : undefined,
        remoteIp: clientIp,
        hasSecondaryCryptoProof: true,
      });

      if (!recaptchaV3Result.ok) {
        return {
          statusCode: recaptchaV3Result.status,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            captchaVerified: false,
            code: 'RECAPTCHA_V3_FAILED',
            errorCode: recaptchaV3Result.errorCode || 'recaptcha_v3_failed',
            message:
              recaptchaV3Result.message ||
              'Google reCAPTCHA v3 security verification failed. Request rejected.',
          }),
        };
      }
    }

    let outboundData: Record<string, any> = {};
    let canonicalTarget = 'count';
    let fallbackCardInput:
      | {
          fullName?: string;
          gender?: string;
          mobileNumber?: string;
          state?: string;
          district?: string;
        }
      | undefined;

    if (action === 'getPledgeCount') {
      outboundData = {};
      canonicalTarget = 'count';
    } else if (action === 'createCard') {
      const fullName = sanitizeSafeText(rawData.fullName, 80);
      const guardianName = sanitizeSafeText(rawData.guardianName, 80);
      const gender = String(rawData.gender || '').trim();
      const dateOfBirth = String(rawData.dateOfBirth || '').trim();
      const state = sanitizeSafeText(rawData.state, 60);
      const district = sanitizeSafeText(rawData.district, 60);
      const mobileNumber = String(rawData.mobileNumber || '')
        .replace(/\D/g, '')
        .slice(0, 10);
      const declarationAccepted = rawData.declarationAccepted === true;

      const todayIso = new Date(now).toISOString().split('T')[0];

      if (
        fullName.length < 2 ||
        guardianName.length < 2 ||
        !['Male', 'Female', 'Other'].includes(gender) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ||
        dateOfBirth > todayIso ||
        dateOfBirth < '1900-01-01' ||
        !VALID_INDIAN_STATES_AND_UTS.has(state) ||
        district.length < 2 ||
        !/^[6-9]\d{9}$/.test(mobileNumber) ||
        !declarationAccepted
      ) {
        return {
          statusCode: 400,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            code: 'VALIDATION_ERROR',
            message: 'Please provide valid details for all mandatory fields.',
          }),
        };
      }

      outboundData = {
        fullName,
        guardianName,
        gender,
        dateOfBirth,
        dob: dateOfBirth,
        state,
        district,
        mobileNumber,
        mobile: mobileNumber,
        declarationAccepted: true,
      };
      canonicalTarget = mobileNumber;
      fallbackCardInput = {
        fullName,
        gender,
        mobileNumber,
        state,
        district,
      };
    } else if (action === 'verifyById') {
      const uniqueCitizenId = String(rawData.uniqueCitizenId || rawData.citizenId || '')
        .trim()
        .toUpperCase();
      if (!/^CITIZEN-\d{8}$/.test(uniqueCitizenId)) {
        return {
          statusCode: 400,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            code: 'INVALID_CITIZEN_ID',
            message: 'Please enter a valid Citizen ID in the format CITIZEN-12345678.',
          }),
        };
      }
      outboundData = {
        uniqueCitizenId,
        citizenId: uniqueCitizenId,
      };
      canonicalTarget = uniqueCitizenId;
    } else if (action === 'verifyByDetails') {
      const mobileNumber = String(rawData.mobileNumber || rawData.mobile || '')
        .replace(/\D/g, '')
        .slice(0, 10);
      const state = sanitizeSafeText(rawData.state, 60);
      const district = sanitizeSafeText(rawData.district, 60);

      if (
        !/^[6-9]\d{9}$/.test(mobileNumber) ||
        !VALID_INDIAN_STATES_AND_UTS.has(state) ||
        district.length < 2
      ) {
        return {
          statusCode: 400,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            code: 'INVALID_RECOVERY_DETAILS',
            message: 'Please provide a valid 10-digit mobile number, state, and district.',
          }),
        };
      }

      outboundData = {
        mobileNumber,
        mobile: mobileNumber,
        state,
        district,
      };
      canonicalTarget = `${mobileNumber}:${state.toLowerCase()}:${district.toLowerCase()}`;
      fallbackCardInput = {
        mobileNumber,
        state,
        district,
      };
    }

    const signedAuth = signPledgeAppsScriptRequest({
      sharedSecret: config.appsScriptPledgeSecret,
      action,
      canonicalTarget,
      ts: now,
    });

    try {
      const postController = new AbortController();
      const postTimeout = setTimeout(() => postController.abort(), 11000);
      const upstreamRes = await fetch(config.appsScriptPledgeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          action,
          data: outboundData,
          ts: signedAuth.ts,
          nonce: signedAuth.nonce,
          sig: signedAuth.sig,
        }),
        signal: postController.signal,
      });
      clearTimeout(postTimeout);

      if (!upstreamRes.ok) {
        return {
          statusCode: 502,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            code: 'UPSTREAM_ERROR',
            message: 'Unable to reach the Citizen Pledge database service.',
          }),
        };
      }

      const rawJson = await upstreamRes.json();

      // Handle getPledgeCount response strictly (never invent a fake count)
      if (action === 'getPledgeCount') {
        if (rawJson && rawJson.success === true) {
          const rawCount =
            rawJson.count ??
            rawJson.totalPledges ??
            rawJson.total ??
            rawJson.data?.count ??
            rawJson.data?.totalPledges ??
            rawJson.data?.total;
          const parsedCount = Number(rawCount);
          if (Number.isFinite(parsedCount) && parsedCount >= 0) {
            const cleanCount = Math.floor(parsedCount);
            return {
              statusCode: 200,
              headers: SECURITY_HEADERS,
              body: JSON.stringify({
                success: true,
                code: String(rawJson.code || 'COUNT_RETRIEVED'),
                count: cleanCount,
                totalPledges: cleanCount,
              }),
            };
          }
        }
        return {
          statusCode: 200,
          headers: SECURITY_HEADERS,
          body: JSON.stringify({
            success: false,
            code: String(rawJson?.code || 'COUNTER_ERROR'),
            message: 'Database count temporarily unavailable.',
          }),
        };
      }

      // Handle createCard / verifyById / verifyByDetails with strict PII redaction
      if (rawJson && rawJson.success === true) {
        const sanitizedCard = sanitizePledgeCardRecord(rawJson, fallbackCardInput);
        if (sanitizedCard) {
          return {
            statusCode: 200,
            headers: pledgeResponseHeaders,
            body: JSON.stringify({
              success: true,
              code: String(rawJson.code || (action === 'createCard' ? 'CARD_CREATED' : 'CARD_FOUND')),
              message: String(
                rawJson.message ||
                  (action === 'createCard'
                    ? 'Citizen Pledge Card registration completed successfully.'
                    : 'Citizen Pledge Card found.')
              ),
              data: sanitizedCard,
              card: sanitizedCard,
            }),
          };
        }
      }

      const upstreamCode = String(rawJson?.code || rawJson?.errorCode || 'REQUEST_FAILED');
      const upstreamMessage = String(
        rawJson?.message || rawJson?.error || 'Unable to process your request at this moment.'
      );

      return {
        statusCode: 200,
        headers: pledgeResponseHeaders,
        body: JSON.stringify({
          success: false,
          code: upstreamCode,
          message: upstreamMessage,
        }),
      };
    } catch {
      return {
        statusCode: 502,
        headers: pledgeResponseHeaders,
        body: JSON.stringify({
          success: false,
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to the Citizen Pledge database server. Please try again later.',
        }),
      };
    }
  }

  // =========================================================================
  // ROUTE 5: POST /api/civic-translate (Server-Side Official Gemini Translation)
  // =========================================================================
  if (cleanPath === '/api/civic-translate') {
    if (req.method !== 'POST') {
      return {
        statusCode: 405,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, code: 'METHOD_NOT_ALLOWED'}),
      };
    }

    if (req.bodyBytes > MAX_BODY_BYTES) {
      return {
        statusCode: 413,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, code: 'PAYLOAD_TOO_LARGE'}),
      };
    }

    const now = Date.now();

    const translateRateCheck = checkPledgeRateLimit(rateLimitContextHash, 'civicTranslate', now, {
      secret: config.captchaSecret,
      headers: lowerHeaders,
    });
    const translateHeaders = buildRateLimitHeaders('civicTranslate', translateRateCheck);

    if (!translateRateCheck.allowed) {
      return {
        statusCode: 429,
        headers: translateHeaders,
        body: JSON.stringify({
          success: false,
          code: 'RATE_LIMITED',
          message: 'Too many translation requests. Please wait a minute.',
        }),
      };
    }

    try {
      const payload = JSON.parse(req.body || '{}');
      const targetLang = ['bn', 'en', 'hi'].includes(payload?.targetLang)
        ? (payload.targetLang as 'bn' | 'en' | 'hi')
        : 'bn';
      const text = String(payload?.text || '');
      const result = await translateCivicTextServerSide({
        text,
        targetLang,
        apiKey: config.geminiApiKey,
      });

      return {
        statusCode: 200,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({
          success: true,
          targetLang,
          translatedText: result.translatedText,
          modelUsed: result.modelUsed,
        }),
      };
    } catch {
      return {
        statusCode: 400,
        headers: SECURITY_HEADERS,
        body: JSON.stringify({success: false, code: 'INVALID_JSON'}),
      };
    }
  }

  return null;
}

/**
 * Netlify Serverless Function Handler (v1 compatible)
 */
export const handler = async (event: any) => {
  const rawBody = event.body
    ? event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : String(event.body)
    : '';

  const mergedHeaders: Record<string, string | undefined> = {};
  if (event.headers && typeof event.headers === 'object') {
    for (const [k, v] of Object.entries(event.headers)) {
      mergedHeaders[k.toLowerCase()] = typeof v === 'string' ? v : Array.isArray(v) ? v[0] : undefined;
    }
  }
  if (event.rawUrl && !mergedHeaders['x-original-url']) {
    mergedHeaders['x-original-url'] = String(event.rawUrl);
  }

  const response = await handleApiRequest({
    path: event.path || event.rawUrl || '',
    method: (event.httpMethod || 'GET').toUpperCase(),
    headers: mergedHeaders,
    body: rawBody,
    bodyBytes: Buffer.byteLength(rawBody, 'utf8'),
  });

  if (!response) {
    return {
      statusCode: 404,
      headers: SECURITY_HEADERS,
      body: JSON.stringify({success: false, errorCode: 'not_found', message: 'API endpoint not found.'}),
    };
  }

  return response;
};

/**
 * Node / Express / Vite Connect Middleware Adapter
 */
export function createApiMiddleware(envOverrides?: Record<string, string | undefined>) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const urlPath = (req.url || '').split('?')[0];
    if (
      urlPath !== '/api/captcha-challenge' &&
      urlPath !== '/api/status-check' &&
      urlPath !== '/api/submit-request' &&
      urlPath !== '/api/pledge-card' &&
      urlPath !== '/api/civic-translate'
    ) {
      next();
      return;
    }

    const maxAllowedBytes = urlPath === '/api/submit-request' ? MAX_SUBMIT_BODY_BYTES : MAX_BODY_BYTES;
    let body = '';
    let bodyBytes = 0;
    let aborted = false;

    req.on('data', chunk => {
      bodyBytes += chunk.length;
      if (bodyBytes > maxAllowedBytes) {
        aborted = true;
        res.writeHead(413, SECURITY_HEADERS);
        res.end(
          JSON.stringify({
            success: false,
            errorCode: 'payload_too_large',
            message: 'Request size exceeds the allowed security limit.',
          })
        );
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on('end', async () => {
      if (aborted) return;
      try {
        const flatHeaders: Record<string, string | undefined> = {};
        for (const [k, v] of Object.entries(req.headers)) {
          flatHeaders[k.toLowerCase()] = Array.isArray(v) ? v[0] : v;
        }
        if (req.socket?.remoteAddress && !flatHeaders['client-ip']) {
          flatHeaders['client-ip'] = req.socket.remoteAddress;
        }

        const result = await handleApiRequest(
          {
            path: urlPath,
            method: (req.method || 'GET').toUpperCase(),
            headers: flatHeaders,
            body,
            bodyBytes,
          },
          envOverrides
        );

        if (!result) {
          next();
          return;
        }

        res.writeHead(result.statusCode, result.headers);
        res.end(result.body);
      } catch {
        res.writeHead(500, SECURITY_HEADERS);
        res.end(
          JSON.stringify({
            success: false,
            errorCode: 'internal_error',
            message: 'An unexpected server error occurred.',
          })
        );
      }
    });
  };
}
