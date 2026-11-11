/**
 * CITIZEN SERVICES POINT (CITIZEN INDIA)
 * CENTRALIZED SERVER-SIDE SECURITY & BACKEND CONFIGURATION
 * (/netlify/functions/securityConfig.ts)
 *
 * CRITICAL SECURITY BOUNDARY:
 * - This module executes EXCLUSIVELY on the server (Netlify Functions / Node.js middleware).
 * - It MUST NEVER be imported by any file under `/src/` or exposed to the browser bundle.
 * - Manages all sensitive credentials, Google reCAPTCHA v3 Secret Key, HMAC signing secrets,
 *   Google Apps Script Web App URLs, and endpoint rate-limiting policies in one place.
 */

// Server-only runtime fallbacks for Google Apps Script Web App endpoints
const SERVER_ONLY_APPS_SCRIPT_STATUS_URL_FALLBACK =
  'https://script.google.com/macros/s/AKfycbzdiuuIFfJ7sVmYNSy7wrBwvcQFX6kRDzbCyoNFOzM9ozHl5i41tZH-aNeJxyXxh7yizQ/exec';

const SERVER_ONLY_APPS_SCRIPT_PLEDGE_URL_FALLBACK =
  'https://script.google.com/macros/s/AKfycbzqkfXXHV2ZIRBOtFIdTwnxP0QhNVrDFIbe6DnRI9qG3u9QHY-2nCudupKr4W8ahdQ7dw/exec';

const SERVER_ONLY_FORMSUBMIT_URL_FALLBACK =
  'https://formsubmit.co/ajax/support.citizenindia@gmail.com';

const GOOGLE_RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

// Authorized Production and Preview Hostnames for Google reCAPTCHA v3 (No wildcards permitted)
export const DEFAULT_ALLOWED_RECAPTCHA_HOSTNAMES = [
  'citizenservicespoint.co.in',
  'www.citizenservicespoint.co.in',
  'citizenservicespoint.netlify.app',
  'ais-dev-ccywbxilblmquxnss3dg3s-690441376638.asia-southeast1.run.app',
  'ais-pre-ccywbxilblmquxnss3dg3s-690441376638.asia-southeast1.run.app',
  'localhost',
  '127.0.0.1',
] as const;

export interface CentralizedServerConfig {
  // 1. Cryptographic HMAC CAPTCHA & Proxy Secrets (Strictly from Environment Variables; empty if unconfigured)
  captchaSecret: string;
  appsScriptSharedSecret: string;
  appsScriptPledgeSecret: string;

  // 2. Protected Google Apps Script Web App Endpoints (Never exposed to frontend)
  appsScriptStatusUrl: string;
  appsScriptPledgeUrl: string;
  enforceStrictPost: boolean;

  // 3. Google reCAPTCHA v3 Configuration (Secret Key strictly from server environment)
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
  recaptchaVerifyUrl: string;
  recaptchaMinScore: number;
  recaptchaMaxAgeMs: number;
  recaptchaEnforceStrict: boolean;
  allowedHostnames: string[];

  // 4. External Dispatch & AI Translation Configuration
  formSubmitAjaxUrl: string;
  geminiApiKey: string;

  // 5. Payload & Rate Limit Thresholds
  maxBodyBytes: number;
  maxSubmitBodyBytes: number;
  burstWindowMs: number;
  maxBurstRequests: number;
  rateLimitsPerMinute: {
    captchaChallenge: number;
    statusCheck: number;
    submitRequest: number;
    getPledgeCount: number;
    createCard: number;
    verifyById: number;
    verifyByDetails: number;
    civicTranslate: number;
  };
}

function isNonPlaceholderSecret(val: string | undefined, placeholderPrefix = 'CHANGE_ME'): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith(placeholderPrefix) || trimmed.startsWith('YOUR_') || trimmed === 'MY_GEMINI_API_KEY') {
    return false;
  }
  return true;
}

export function resolveCentralizedServerConfig(
  envOverrides?: Record<string, string | undefined>
): CentralizedServerConfig {
  const env: Record<string, string | undefined> = {
    ...process.env,
    ...(envOverrides || {}),
  };

  // Strictly read CAPTCHA_SECRET_KEY from Netlify Environment Variables only.
  // NEVER derive from any hardcoded or static fallback. If missing or < 32 chars,
  // captchaSecret is '' and all CAPTCHA-dependent APIs safely fail closed (HTTP 503).
  const captchaSecret =
    isNonPlaceholderSecret(env.CAPTCHA_SECRET_KEY) && env.CAPTCHA_SECRET_KEY!.trim().length >= 32
      ? env.CAPTCHA_SECRET_KEY!.trim()
      : '';

  const appsScriptSharedSecret = isNonPlaceholderSecret(env.APPS_SCRIPT_SHARED_SECRET)
    ? env.APPS_SCRIPT_SHARED_SECRET!.trim()
    : captchaSecret;

  const appsScriptPledgeSecret = isNonPlaceholderSecret(env.APPS_SCRIPT_PLEDGE_SECRET)
    ? env.APPS_SCRIPT_PLEDGE_SECRET!.trim()
    : appsScriptSharedSecret;

  const appsScriptStatusUrl =
    (isNonPlaceholderSecret(env.APPS_SCRIPT_STATUS_URL) && env.APPS_SCRIPT_STATUS_URL!.trim()) ||
    SERVER_ONLY_APPS_SCRIPT_STATUS_URL_FALLBACK;

  const appsScriptPledgeUrl =
    (isNonPlaceholderSecret(env.APPS_SCRIPT_PLEDGE_URL) && env.APPS_SCRIPT_PLEDGE_URL!.trim()) ||
    SERVER_ONLY_APPS_SCRIPT_PLEDGE_URL_FALLBACK;

  const enforceStrictPost =
    String(env.APPS_SCRIPT_ENFORCE_STRICT_POST || '').toLowerCase() === 'true';

  const recaptchaSiteKey =
    (isNonPlaceholderSecret(env.VITE_RECAPTCHA_SITE_KEY) && env.VITE_RECAPTCHA_SITE_KEY!.trim()) ||
    '6LcZxwsuAAAAAAfSer968O7pBhQzWmRhtQ4sX-DO';

  // Strictly read RECAPTCHA_SECRET_KEY from server environment variables only (never hardcoded)
  const recaptchaSecretKey = isNonPlaceholderSecret(env.RECAPTCHA_SECRET_KEY)
    ? env.RECAPTCHA_SECRET_KEY!.trim()
    : '';

  const recaptchaVerifyUrl = GOOGLE_RECAPTCHA_VERIFY_URL;

  const parsedMinScore = Number(env.RECAPTCHA_MIN_SCORE);
  const recaptchaMinScore =
    Number.isFinite(parsedMinScore) && parsedMinScore >= 0.1 && parsedMinScore <= 0.9
      ? parsedMinScore
      : 0.5;

  const parsedMaxAgeSec = Number(env.RECAPTCHA_MAX_AGE_SECONDS);
  const recaptchaMaxAgeMs =
    Number.isFinite(parsedMaxAgeSec) && parsedMaxAgeSec >= 10 && parsedMaxAgeSec <= 300
      ? parsedMaxAgeSec * 1000
      : 120 * 1000; // Default 120 seconds (2 minutes) Google reCAPTCHA v3 token expiry window

  const recaptchaEnforceStrict =
    String(env.RECAPTCHA_ENFORCE_STRICT || '').toLowerCase() === 'true';

  const customHostnames = String(env.RECAPTCHA_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map(h => h.trim().toLowerCase())
    .filter(h => Boolean(h) && !h.includes('*'));

  const allowedHostnames = Array.from(
    new Set([
      ...DEFAULT_ALLOWED_RECAPTCHA_HOSTNAMES,
      ...customHostnames,
    ])
  );

  const formSubmitAjaxUrl = isNonPlaceholderSecret(env.FORMSUBMIT_AJAX_URL)
    ? env.FORMSUBMIT_AJAX_URL!.trim()
    : SERVER_ONLY_FORMSUBMIT_URL_FALLBACK;

  const geminiApiKey = isNonPlaceholderSecret(env.GEMINI_API_KEY)
    ? env.GEMINI_API_KEY!.trim()
    : '';

  return {
    captchaSecret,
    appsScriptSharedSecret,
    appsScriptPledgeSecret,
    appsScriptStatusUrl,
    appsScriptPledgeUrl,
    enforceStrictPost,
    recaptchaSiteKey,
    recaptchaSecretKey,
    recaptchaVerifyUrl,
    recaptchaMinScore,
    recaptchaMaxAgeMs,
    recaptchaEnforceStrict,
    allowedHostnames,
    formSubmitAjaxUrl,
    geminiApiKey,
    maxBodyBytes: 4096,
    maxSubmitBodyBytes: 65536,
    burstWindowMs: 10 * 1000,
    maxBurstRequests: 20,
    rateLimitsPerMinute: {
      captchaChallenge: 45,
      statusCheck: 15,
      submitRequest: 8,
      getPledgeCount: 30,
      createCard: 6,
      verifyById: 12,
      verifyByDetails: 8,
      civicTranslate: 20,
    },
  };
}

/**
 * Validates the hostname returned by Google reCAPTCHA v3 `siteverify` against
 * an explicit exact-match allowlist of authorized Production and Preview domains.
 * Wildcard suffixes (such as `*.netlify.app` or `*.run.app`) are strictly prohibited.
 */
export function isAllowedRecaptchaHostname(
  hostname: string | undefined,
  allowedHostnames: string[]
): boolean {
  if (!hostname || typeof hostname !== 'string') return false;
  const cleanHost = hostname.trim().toLowerCase();
  if (!cleanHost || cleanHost.includes('*')) return false;

  return allowedHostnames.includes(cleanHost);
}

export interface RecaptchaV3VerificationResult {
  ok: boolean;
  verifiedByGoogle: boolean;
  fallbackUsed: boolean;
  status: number;
  errorCode?: string;
  message?: string;
  score?: number;
  action?: string;
  hostname?: string;
  challengeTs?: string;
}

/**
 * Verifies a Google reCAPTCHA v3 token server-side with Google's official siteverify API.
 *
 * Strict Security Rules (Non-Bypassable):
 * 1. Never exposes `recaptchaSecretKey` in logs, errors, or HTTP responses.
 * 2. Secondary Crypto Proof (`hasSecondaryCryptoProof`) NEVER bypasses a failed Google
 *    `siteverify` check: invalid tokens, expired tokens (`timeout-or-duplicate` or >120s age),
 *    low scores (< minScore), mismatched actions, and unauthorized hostnames are ALWAYS rejected.
 * 3. Missing tokens are strictly rejected whenever `recaptchaSecretKey` is configured or
 *    `recaptchaEnforceStrict` is enabled.
 */
export async function verifyGoogleRecaptchaV3ServerSide(params: {
  config: CentralizedServerConfig;
  token: string | undefined;
  expectedAction: string;
  clientAction?: string;
  remoteIp?: string;
  hasSecondaryCryptoProof?: boolean;
  now?: number;
}): Promise<RecaptchaV3VerificationResult> {
  const {
    config,
    token,
    expectedAction,
    clientAction,
    remoteIp,
    hasSecondaryCryptoProof = false,
    now = Date.now(),
  } = params;

  const cleanToken = typeof token === 'string' ? token.trim() : '';

  // 1. If client explicitly sent a mismatched action name in the payload, reject immediately
  if (clientAction && typeof clientAction === 'string' && clientAction.trim() !== expectedAction) {
    return {
      ok: false,
      verifiedByGoogle: false,
      fallbackUsed: false,
      status: 403,
      errorCode: 'recaptcha_v3_action_mismatch',
      message: 'reCAPTCHA action verification mismatch. Request rejected.',
    };
  }

  // 2. If token is missing
  if (!cleanToken) {
    // Only allow secondary crypto proof if RECAPTCHA_SECRET_KEY is not yet configured in preview environment
    if (!config.recaptchaSecretKey && !config.recaptchaEnforceStrict && hasSecondaryCryptoProof) {
      return {
        ok: true,
        verifiedByGoogle: false,
        fallbackUsed: true,
        status: 200,
      };
    }
    return {
      ok: false,
      verifiedByGoogle: false,
      fallbackUsed: false,
      status: 400,
      errorCode: 'recaptcha_v3_missing',
      message: 'Google reCAPTCHA v3 security verification token is required.',
    };
  }

  // 3. Reject malformed/forged tokens before calling upstream
  if (cleanToken.length < 20 || cleanToken.length > 4096 || /[^a-zA-Z0-9_\-.]/.test(cleanToken)) {
    return {
      ok: false,
      verifiedByGoogle: false,
      fallbackUsed: false,
      status: 403,
      errorCode: 'recaptcha_v3_invalid_token',
      message: 'Invalid Google reCAPTCHA security token format. Request rejected.',
    };
  }

  // 4. If RECAPTCHA_SECRET_KEY is not configured in the server environment
  if (!config.recaptchaSecretKey) {
    if (config.recaptchaEnforceStrict || !hasSecondaryCryptoProof) {
      return {
        ok: false,
        verifiedByGoogle: false,
        fallbackUsed: false,
        status: 503,
        errorCode: 'recaptcha_v3_secret_unconfigured',
        message: 'Server-side reCAPTCHA secret key is not configured.',
      };
    }
    return {
      ok: true,
      verifiedByGoogle: false,
      fallbackUsed: true,
      status: 200,
    };
  }

  // 5. Call Google's official siteverify endpoint using the server-side Secret Key
  try {
    const formParams = new URLSearchParams();
    formParams.set('secret', config.recaptchaSecretKey);
    formParams.set('response', cleanToken);
    if (remoteIp) {
      const firstIp = String(remoteIp).split(',')[0].trim();
      if (firstIp && firstIp !== 'local') {
        formParams.set('remoteip', firstIp);
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(config.recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formParams.toString(),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return {
        ok: false,
        verifiedByGoogle: false,
        fallbackUsed: false,
        status: 502,
        errorCode: 'recaptcha_v3_upstream_error',
        message: 'Unable to reach Google reCAPTCHA verification service. Please try again.',
      };
    }

    const data: any = await res.json();

    // Check if Google returned success === false
    if (!data || data.success !== true) {
      const errorCodes: string[] = Array.isArray(data?.['error-codes']) ? data['error-codes'] : [];

      if (errorCodes.includes('timeout-or-duplicate')) {
        return {
          ok: false,
          verifiedByGoogle: true,
          fallbackUsed: false,
          status: 403,
          errorCode: 'recaptcha_v3_token_expired',
          message: 'Google reCAPTCHA token has expired or already been used. Please refresh and try again.',
        };
      }

      if (errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret')) {
        return {
          ok: false,
          verifiedByGoogle: true,
          fallbackUsed: false,
          status: 502,
          errorCode: 'recaptcha_v3_invalid_secret',
          message: 'Server-side reCAPTCHA secret configuration error.',
        };
      }

      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_invalid_token',
        message: 'Google reCAPTCHA v3 verification failed. Forged or invalid token rejected.',
      };
    }

    // 6. Validate Token Expiry (`challenge_ts`) — max 120 seconds (2 minutes)
    if (!data.challenge_ts || typeof data.challenge_ts !== 'string') {
      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_token_expired',
        message: 'reCAPTCHA token timestamp is missing. Request rejected.',
      };
    }

    const challengeTimeMs = Date.parse(data.challenge_ts);
    if (
      !Number.isFinite(challengeTimeMs) ||
      now - challengeTimeMs > config.recaptchaMaxAgeMs ||
      challengeTimeMs - now > 30000
    ) {
      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_token_expired',
        message: 'Google reCAPTCHA token has expired. Please try again.',
        challengeTs: String(data.challenge_ts),
      };
    }

    // 7. Validate Action strictly
    if (!data.action || String(data.action).trim() !== expectedAction) {
      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_action_mismatch',
        message: 'reCAPTCHA action verification mismatch. Request rejected.',
        action: String(data.action || ''),
      };
    }

    // 8. Validate Domain / Hostname strictly
    if (!data.hostname || !isAllowedRecaptchaHostname(String(data.hostname), config.allowedHostnames)) {
      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_hostname_mismatch',
        message: 'reCAPTCHA domain verification failed. Unauthorized origin.',
        hostname: String(data.hostname || ''),
      };
    }

    // 9. Validate Risk Score strictly (0.0 = bot, 1.0 = human)
    const score = typeof data.score === 'number' ? data.score : -1;
    if (score < config.recaptchaMinScore) {
      return {
        ok: false,
        verifiedByGoogle: true,
        fallbackUsed: false,
        status: 403,
        errorCode: 'recaptcha_v3_low_score',
        message: 'Suspicious automated activity detected by Google reCAPTCHA v3. Request blocked.',
        score,
      };
    }

    return {
      ok: true,
      verifiedByGoogle: true,
      fallbackUsed: false,
      status: 200,
      score,
      action: String(data.action),
      hostname: String(data.hostname),
      challengeTs: String(data.challenge_ts),
    };
  } catch {
    return {
      ok: false,
      verifiedByGoogle: false,
      fallbackUsed: false,
      status: 502,
      errorCode: 'recaptcha_v3_network_error',
      message: 'Unable to verify Google reCAPTCHA v3 token at this moment.',
    };
  }
}

/**
 * Defensive handler export in case Netlify Functions scans all top-level files
 * inside `netlify/functions/`. Blocks direct external HTTP access with 403.
 */
export const handler = async () => ({
  statusCode: 403,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify({
    success: false,
    errorCode: 'forbidden',
    message: 'Direct access to internal security configuration module is forbidden.',
  }),
});

