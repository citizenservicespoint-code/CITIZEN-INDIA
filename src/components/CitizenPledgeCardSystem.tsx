import React, { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Download,
  RefreshCw,
  Search,
  ShieldCheck,
  Award,
  UserCheck,
  FileCheck,
  RotateCcw,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import {
  PledgeCardUITranslations,
  INDIAN_STATES_AND_UTS
} from '../data/swachhtarPotheTranslations';
import { ensureRecaptchaV3Loaded, executeRecaptchaV3 } from '../utils/recaptchaV3';

// All Citizen Pledge Card requests are routed strictly through our secure server-side proxy
const PLEDGE_API_ENDPOINT = '/api/pledge-card';
const CAPTCHA_CHALLENGE_ENDPOINT = '/api/captcha-challenge';

export interface CaptchaBoxState {
  notARobotChecked: boolean;
  challengeId: string;
  captchaToken: string;
  imageDataUrl: string;
  captchaAnswer: string;
  loading: boolean;
  expiresAt: number;
}

const INITIAL_CAPTCHA_STATE: CaptchaBoxState = {
  notARobotChecked: false,
  challengeId: '',
  captchaToken: '',
  imageDataUrl: '',
  captchaAnswer: '',
  loading: false,
  expiresAt: 0
};

interface NotARobotCaptchaBoxProps {
  idPrefix: string;
  state: CaptchaBoxState;
  onChange: React.Dispatch<React.SetStateAction<CaptchaBoxState>>;
  onRefresh: () => void;
  captchaUi: PledgeCardUITranslations['captcha'];
  disabled?: boolean;
}

function NotARobotCaptchaBox({
  idPrefix,
  state,
  onChange,
  onRefresh,
  captchaUi,
  disabled = false
}: NotARobotCaptchaBoxProps) {
  const isCodeComplete =
    state.notARobotChecked &&
    Boolean(state.challengeId) &&
    Boolean(state.captchaToken) &&
    Boolean(state.imageDataUrl) &&
    state.captchaAnswer.trim().length === 6;

  // Automatically refresh CAPTCHA challenge if checked and nearing expiration
  useEffect(() => {
    if (!state.notARobotChecked || !state.expiresAt) return;
    const remainingMs = state.expiresAt - Date.now() - 5000;
    if (remainingMs <= 0) {
      onRefresh();
      return;
    }
    const timer = window.setTimeout(() => {
      onRefresh();
    }, remainingMs);
    return () => window.clearTimeout(timer);
  }, [state.notARobotChecked, state.expiresAt, onRefresh]);

  const handleToggleCheckbox = (checked: boolean) => {
    if (disabled) return;
    if (checked) {
      onChange((prev) => ({ ...prev, notARobotChecked: true }));
      const isExpired = state.expiresAt > 0 && Date.now() > state.expiresAt - 15000;
      if (!state.challengeId || !state.captchaToken || !state.imageDataUrl || isExpired) {
        onRefresh();
      }
    } else {
      onChange((prev) => ({
        ...prev,
        notARobotChecked: false,
        captchaAnswer: ''
      }));
    }
  };

  return (
    <div
      id={`${idPrefix}-captcha-container`}
      className="rounded-2xl border border-slate-300 bg-[#F9FAFB] p-4 shadow-2xs space-y-3 max-w-md"
    >
      {/* Top Row: Google reCAPTCHA-style "I'm not a robot" checkbox + security emblem */}
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`${idPrefix}-not-a-robot-checkbox`}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <input
            id={`${idPrefix}-not-a-robot-checkbox`}
            type="checkbox"
            checked={state.notARobotChecked}
            disabled={disabled}
            onChange={(e) => handleToggleCheckbox(e.target.checked)}
            className="w-6 h-6 rounded border-2 border-slate-400 text-[#138808] focus:ring-2 focus:ring-[#0B1F3A] cursor-pointer shrink-0"
          />
          <span className="text-sm font-bold text-slate-900">
            {captchaUi.notARobotLabel}
          </span>
        </label>

        {/* Security Emblem */}
        <div className="flex flex-col items-center text-center shrink-0 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-[#0B1F3A]/10 flex items-center justify-center text-[#0B1F3A]">
            <ShieldCheck className="w-4 h-4 text-[#0B1F3A]" />
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 mt-0.5">
            reCAPTCHA
          </span>
          <span className="text-[8px] text-slate-400 leading-none">
            {captchaUi.privacyTerms}
          </span>
        </div>
      </div>

      {/* Expanded Security Challenge when "I'm not a robot" is checked */}
      {state.notARobotChecked && (
        <div className="pt-3 border-t border-slate-200 space-y-2.5 animate-fade-in">
          <p className="text-[11px] font-semibold text-slate-700 leading-snug">
            {captchaUi.promptText}
          </p>

          <div className="flex items-center gap-2.5">
            <div className="flex-1 h-12 rounded-xl border border-slate-300 bg-white overflow-hidden flex items-center justify-center">
              {state.loading ? (
                <span className="text-xs font-semibold text-slate-500 px-2">
                  {captchaUi.loadingText}
                </span>
              ) : state.imageDataUrl ? (
                <img
                  src={state.imageDataUrl}
                  alt="Security CAPTCHA Challenge"
                  className="h-full w-full object-contain select-none pointer-events-none"
                />
              ) : (
                <button
                  type="button"
                  onClick={onRefresh}
                  className="text-xs font-semibold text-[#0B1F3A] underline px-2 cursor-pointer"
                >
                  {captchaUi.refreshBtn}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onRefresh}
              disabled={disabled || state.loading}
              title={captchaUi.refreshBtn}
              id={`${idPrefix}-captcha-refresh-btn`}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  state.loading ? 'animate-spin motion-reduce:animate-none' : ''
                }`}
              />
              <span>{captchaUi.refreshBtn}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              id={`${idPrefix}-captcha-input`}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={6}
              disabled={disabled || state.loading}
              value={state.captchaAnswer}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  captchaAnswer: e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6)
                }))
              }
              placeholder={captchaUi.inputPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
            />
          </div>

          {isCodeComplete && (
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
              <CheckCircle className="w-4 h-4 text-[#138808] shrink-0" />
              <span>{captchaUi.verifiedBadge}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface VerifiedPledgeCardData {
  uniqueCitizenId: string;
  fullName: string;
  gender: string;
  mobileLast4: string;
  state: string;
  district: string;
  status: 'ACTIVE';
}

interface CitizenPledgeCardSystemProps {
  ui: PledgeCardUITranslations;
  officialLogoSrc: string;
  externalActiveTab?: 'apply' | 'verify';
  onTabChange?: (tab: 'apply' | 'verify') => void;
}

/**
 * Masks any mobile string so ONLY the last 4 digits are visible (e.g. XXXXXX1234).
 * Never exposes the full 10-digit mobile number on the card.
 */
export function formatMaskedMobileLast4(rawMobile: string): string {
  const digits = String(rawMobile || '').replace(/\D/g, '');
  if (digits.length >= 4) {
    return `XXXXXX${digits.slice(-4)}`;
  }
  const clean = String(rawMobile || '').trim();
  const tailMatch = clean.match(/(\d{4})$/);
  if (tailMatch) {
    return `XXXXXX${tailMatch[1]}`;
  }
  return 'XXXXXX••••';
}

/**
 * Extracts and validates the server-returned sanitized card object.
 * Strictly requires a valid backend-issued "CITIZEN-XXXXXXXX" ID.
 * Never invents or generates a Citizen ID on the frontend.
 */
export function extractVerifiedCardFromResponse(
  res: any,
  fallbackInput?: {
    fullName?: string;
    gender?: string;
    mobileNumber?: string;
    state?: string;
    district?: string;
  }
): VerifiedPledgeCardData | null {
  if (!res || typeof res !== 'object' || res.success !== true) {
    return null;
  }

  const record =
    (res.data && typeof res.data === 'object' ? res.data : null) ||
    (res.card && typeof res.card === 'object' ? res.card : null) ||
    (res.record && typeof res.record === 'object' ? res.record : null) ||
    (res.result && typeof res.result === 'object' ? res.result : null) ||
    res;

  const rawId = String(
    record.uniqueCitizenId ||
      record.citizenId ||
      record.CitizenId ||
      record['Unique Citizen ID'] ||
      record['Citizen ID'] ||
      res.uniqueCitizenId ||
      res.citizenId ||
      ''
  )
    .trim()
    .toUpperCase();

  // Enforce strict backend format "CITIZEN-XXXXXXXX" (8 digits)
  if (!/^CITIZEN-\d{8}$/.test(rawId)) {
    return null;
  }

  const fullName = String(
    record.fullName ||
      record.name ||
      record['Full Name'] ||
      fallbackInput?.fullName ||
      ''
  ).trim();

  const gender = String(
    record.gender ||
      record['Gender'] ||
      fallbackInput?.gender ||
      ''
  ).trim();

  const rawMobileSource = String(
    record.mobileLast4 ||
      record.maskedMobile ||
      record.mobileLastFour ||
      record.lastFourDigits ||
      record.mobileNumber ||
      record.mobile ||
      record['Mobile Number'] ||
      record['Registered Mobile'] ||
      fallbackInput?.mobileNumber ||
      ''
  ).trim();

  const state = String(
    record.state ||
      record['State'] ||
      fallbackInput?.state ||
      ''
  ).trim();

  const district = String(
    record.district ||
      record['District'] ||
      fallbackInput?.district ||
      ''
  ).trim();

  if (!fullName || !state || !district) {
    return null;
  }

  return {
    uniqueCitizenId: rawId,
    fullName,
    gender: gender || 'Other',
    mobileLast4: formatMaskedMobileLast4(rawMobileSource),
    state,
    district,
    status: 'ACTIVE'
  };
}

/**
 * Draws a print-grade 1600x1040 commemorative Citizen Pledge Card on a 2D Canvas
 * and exports a high-resolution landscape PDF using dynamically imported jsPDF.
 */
async function generateCitizenPledgeCardPdf(
  card: VerifiedPledgeCardData,
  labels: PledgeCardUITranslations['cardDisplay']['cardLabels'],
  logoSrc: string
): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const canvas = document.createElement('canvas');
  const W = 1600;
  const H = 1040;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // Load official logo image
  const loadLogo = (src: string): Promise<HTMLImageElement | null> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });

  const logoImg = await loadLogo(logoSrc);

  // 1. Card Outer Background (Clean Warm Ivory / White)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // 2. Top Indian Tricolour Header Band
  const bandH = 18;
  ctx.fillStyle = '#FF9933'; // Saffron
  ctx.fillRect(0, 0, W / 3, bandH);
  ctx.fillStyle = '#FFFFFF'; // White
  ctx.fillRect(W / 3, 0, W / 3, bandH);
  ctx.fillStyle = '#138808'; // India Green
  ctx.fillRect((W * 2) / 3, 0, W / 3, bandH);

  // 3. Deep Navy Blue Header Section
  const headerTop = bandH;
  const headerH = 210;
  ctx.fillStyle = '#0B1F3A';
  ctx.fillRect(0, headerTop, W, headerH);

  // Gold Separator Line below Navy Header
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(0, headerTop + headerH, W, 6);

  // 4. Subtle Ashoka Chakra-Inspired 24-Spoke Decorative Watermark in Center Body
  ctx.save();
  ctx.translate(W - 290, 560);
  ctx.strokeStyle = 'rgba(11, 31, 58, 0.045)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 0, 210, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 182, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI * 2) / 24;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 32, Math.sin(angle) * 32);
    ctx.lineTo(Math.cos(angle) * 182, Math.sin(angle) * 182);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Draw Official Logo inside Header
  const logoBoxX = 64;
  const logoBoxY = headerTop + 33;
  const logoBoxSize = 144;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(logoBoxX, logoBoxY, logoBoxSize, logoBoxSize, 20);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.stroke();

  if (logoImg) {
    const pad = 12;
    ctx.drawImage(
      logoImg,
      logoBoxX + pad,
      logoBoxY + pad,
      logoBoxSize - pad * 2,
      logoBoxSize - pad * 2
    );
  }

  // 6. Header Text Hierarchy
  const textLeft = logoBoxX + logoBoxSize + 36;
  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 22px system-ui, -apple-system, sans-serif';
  ctx.fillText('CITIZEN INDIA · THIS PROJECT IS UNDER CITIZEN INDIA', textLeft, headerTop + 62);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 40px system-ui, -apple-system, sans-serif';
  ctx.fillText('স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह', textLeft, headerTop + 116);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 26px system-ui, -apple-system, sans-serif';
  ctx.fillText('CITIZEN PLEDGE CARD · VOLUNTARY CIVIC INITIATIVE', textLeft, headerTop + 162);

  // 7. Status Badge & Unique Citizen ID Ribbon Bar
  const idBarY = headerTop + headerH + 34;
  ctx.fillStyle = '#F8FAFC';
  ctx.beginPath();
  ctx.roundRect(64, idBarY, W - 128, 108, 18);
  ctx.fill();
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '700 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(labels.citizenId, 96, idBarY + 40);

  ctx.fillStyle = '#0B1F3A';
  ctx.font = '900 42px monospace';
  ctx.fillText(card.uniqueCitizenId, 96, idBarY + 86);

  // Status: ACTIVE Pill on Right
  const pillW = 250;
  const pillH = 60;
  const pillX = W - 64 - pillW - 32;
  const pillY = idBarY + 24;
  ctx.fillStyle = '#DCFCE7';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 30);
  ctx.fill();
  ctx.strokeStyle = '#15803D';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#166534';
  ctx.font = '800 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(`● ${labels.status}: ${card.status}`, pillX + 26, pillY + 39);

  // 8. Card Holder Details Grid (Full Name, Gender, Masked Mobile Last 4, State, District)
  const gridY = idBarY + 140;
  const col1X = 64;
  const col2X = 620;
  const col3X = 1110;

  const drawField = (label: string, value: string, x: number, y: number, maxW: number) => {
    ctx.fillStyle = '#64748B';
    ctx.font = '700 19px system-ui, -apple-system, sans-serif';
    ctx.fillText(label, x, y);

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 30px system-ui, -apple-system, sans-serif';
    const cleanVal = value.length > 34 ? value.slice(0, 32) + '…' : value;
    ctx.fillText(cleanVal, x, y + 40, maxW);
  };

  // Row 1: Full Name, Gender, Registered Mobile (Last 4 Digits Only)
  drawField(labels.fullName, card.fullName, col1X, gridY + 20, 520);
  drawField(labels.gender, card.gender, col2X, gridY + 20, 440);
  drawField(labels.mobileLast4, card.mobileLast4, col3X, gridY + 20, 400);

  // Row 2: State, District
  drawField(labels.state, card.state, col1X, gridY + 128, 520);
  drawField(labels.district, card.district, col2X, gridY + 128, 440);
  drawField('INITIATIVE', 'Swachhtar Pothe (Citizen India)', col3X, gridY + 128, 420);

  // 9. Short Civic Pledge Statement Box
  const pledgeBoxY = gridY + 225;
  const pledgeBoxH = 175;
  ctx.fillStyle = '#F0FDF4';
  ctx.beginPath();
  ctx.roundRect(64, pledgeBoxY, W - 128, pledgeBoxH, 20);
  ctx.fill();
  ctx.strokeStyle = '#86EFAC';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Left Saffron-Green Accent Strip on Pledge Box
  ctx.fillStyle = '#138808';
  ctx.fillRect(64, pledgeBoxY + 16, 8, pledgeBoxH - 32);

  ctx.fillStyle = '#14532D';
  ctx.font = '800 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(labels.pledgeHeading, 96, pledgeBoxY + 44);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'italic 700 26px Georgia, serif';
  const pledgeQuote =
    '“I pledge to keep my surroundings clean, protect public spaces, respect the environment, and encourage responsible civic behaviour.”';
  // Wrap text cleanly across 2 lines
  const words = pledgeQuote.split(' ');
  let line = '';
  let lineY = pledgeBoxY + 92;
  const maxLineWidth = W - 200;
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxLineWidth && i > 0) {
      ctx.fillText(line.trim(), 96, lineY);
      line = words[i] + ' ';
      lineY += 40;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), 96, lineY);
  }

  // 10. Footer Mandatory Non-Government Disclaimer & Bottom Tricolour Frame
  const footerY = H - 96;
  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(0, footerY, W, 80);

  ctx.fillStyle = '#334155';
  ctx.font = '600 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(
    'This is a voluntary civic pledge card issued under Citizen India. It is not a government-issued identity document or proof of citizenship.',
    64,
    footerY + 47,
    W - 128
  );

  // Bottom Indian Tricolour Band
  ctx.fillStyle = '#FF9933';
  ctx.fillRect(0, H - 16, W / 3, 16);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(W / 3, H - 16, W / 3, 16);
  ctx.fillStyle = '#138808';
  ctx.fillRect((W * 2) / 3, H - 16, W / 3, 16);

  // Outer Navy & Gold Border
  ctx.strokeStyle = '#0B1F3A';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, W - 6, H - 6);

  const imgData = canvas.toDataURL('image/png', 1.0);

  // Create Landscape PDF matching card proportions (240mm x 156mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [240, 156]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 240, 156, undefined, 'FAST');
  pdf.save(`SWACHHTAR-POTHE-${card.uniqueCitizenId}.pdf`);
}

export default function CitizenPledgeCardSystem({
  ui,
  officialLogoSrc,
  externalActiveTab,
  onTabChange
}: CitizenPledgeCardSystemProps) {
  const [activeTab, setActiveTab] = useState<'apply' | 'verify'>('apply');

  // Sync external tab switch requests (e.g., from Hero CTA buttons)
  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  const switchTab = (tab: 'apply' | 'verify') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  // =========================================================================
  // 1. LIVE PLEDGE COUNTER STATE ("getPledgeCount")
  // =========================================================================
  const [pledgeCount, setPledgeCount] = useState<number | null>(null);
  const [counterLoading, setCounterLoading] = useState<boolean>(true);
  const [counterError, setCounterError] = useState<string | null>(null);

  const fetchLivePledgeCount = useCallback(async () => {
    setCounterLoading(true);
    setCounterError(null);
    try {
      const response = await fetch(PLEDGE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'getPledgeCount' })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      if (res && res.success === true) {
        const rawCount =
          res.count ??
          res.totalPledges ??
          res.total ??
          res.data?.count ??
          res.data?.totalPledges ??
          res.data?.total;

        const parsedCount = Number(rawCount);
        if (Number.isFinite(parsedCount) && parsedCount >= 0) {
          setPledgeCount(parsedCount);
          setCounterLoading(false);
          return;
        }
      }

      setPledgeCount(null);
      setCounterError(ui.counterUnavailable);
    } catch {
      setPledgeCount(null);
      setCounterError(ui.counterUnavailable);
    } finally {
      setCounterLoading(false);
    }
  }, [ui.counterUnavailable]);

  // Fetch on mount, preload Google reCAPTCHA v3, and refresh counter periodically every 60 seconds
  useEffect(() => {
    ensureRecaptchaV3Loaded();
    fetchLivePledgeCount();
    const timer = window.setInterval(fetchLivePledgeCount, 60000);
    return () => window.clearInterval(timer);
  }, [fetchLivePledgeCount]);

  // =========================================================================
  // 2. APPLICATION FORM STATE ("createCard")
  // =========================================================================
  const [fullName, setFullName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [stateVal, setStateVal] = useState('West Bengal');
  const [districtVal, setDistrictVal] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [isDuplicateMobileError, setIsDuplicateMobileError] = useState(false);
  const [applyCaptcha, setApplyCaptcha] = useState<CaptchaBoxState>(INITIAL_CAPTCHA_STATE);

  // =========================================================================
  // 3. VERIFICATION & RECOVERY STATE ("verifyById" & "verifyByDetails")
  // =========================================================================
  const [verifyCitizenIdInput, setVerifyCitizenIdInput] = useState('');
  const [verifyIdLoading, setVerifyIdLoading] = useState(false);
  const [verifyIdError, setVerifyIdError] = useState<string | null>(null);
  const [verifyIdCaptcha, setVerifyIdCaptcha] = useState<CaptchaBoxState>(INITIAL_CAPTCHA_STATE);

  const [recoverMobileInput, setRecoverMobileInput] = useState('');
  const [recoverStateInput, setRecoverStateInput] = useState('West Bengal');
  const [recoverDistrictInput, setRecoverDistrictInput] = useState('');
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [recoverError, setRecoverError] = useState<string | null>(null);
  const [recoverCaptcha, setRecoverCaptcha] = useState<CaptchaBoxState>(INITIAL_CAPTCHA_STATE);

  // Fetch a fresh server-signed CAPTCHA challenge from /api/captcha-challenge
  const loadFreshCaptchaChallenge = useCallback(
    async (
      setter: React.Dispatch<React.SetStateAction<CaptchaBoxState>>,
      keepChecked = true
    ) => {
      setter((prev) => ({
        ...prev,
        notARobotChecked: keepChecked ? true : false,
        loading: true,
        captchaAnswer: ''
      }));
      try {
        const res = await fetch(`${CAPTCHA_CHALLENGE_ENDPOINT}?t=${Date.now()}`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store'
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.challengeId && data?.captchaToken && data?.imageDataUrl) {
          setter((prev) => ({
            ...prev,
            challengeId: String(data.challengeId),
            captchaToken: String(data.captchaToken),
            imageDataUrl: String(data.imageDataUrl),
            expiresAt: Number(data.expiresAt) || Date.now() + 290000,
            captchaAnswer: '',
            loading: false
          }));
          return;
        }
      } catch {
        // Handled below
      }
      setter((prev) => ({
        ...prev,
        challengeId: '',
        captchaToken: '',
        imageDataUrl: '',
        expiresAt: 0,
        captchaAnswer: '',
        loading: false
      }));
    },
    []
  );

  // =========================================================================
  // 4. VERIFIED / ISSUED CITIZEN PLEDGE CARD DISPLAY STATE
  // =========================================================================
  const [verifiedCard, setVerifiedCard] = useState<VerifiedPledgeCardData | null>(null);
  const [cardSourceMode, setCardSourceMode] = useState<'issued' | 'verified'>('issued');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const todayMaxDate = new Date().toISOString().split('T')[0];

  const handleResetApplicationForm = () => {
    setFullName('');
    setGuardianName('');
    setGender('');
    setDateOfBirth('');
    setStateVal('West Bengal');
    setDistrictVal('');
    setMobileNumber('');
    setDeclarationAccepted(false);
    setApplyCaptcha(INITIAL_CAPTCHA_STATE);
    setApplyError(null);
    setIsDuplicateMobileError(false);
  };

  const handleJumpToDuplicateRecovery = () => {
    const cleanMob = mobileNumber.replace(/\D/g, '').slice(-10);
    if (cleanMob) setRecoverMobileInput(cleanMob);
    if (stateVal) setRecoverStateInput(stateVal);
    if (districtVal.trim()) setRecoverDistrictInput(districtVal.trim());
    setIsDuplicateMobileError(false);
    setApplyError(null);
    switchTab('verify');
    const el = document.getElementById('pledge-method-b-recovery');
    if (el) {
      window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  };

  // Submit Application -> Server-Side "/api/pledge-card" ("createCard")
  const handleCreateCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplyError(null);
    setIsDuplicateMobileError(false);

    const cleanFullName = fullName.trim().replace(/[<>]/g, '');
    const cleanGuardianName = guardianName.trim().replace(/[<>]/g, '');
    const cleanDistrict = districtVal.trim().replace(/[<>]/g, '');
    const cleanMobile = mobileNumber.replace(/\D/g, '');

    if (cleanFullName.length < 2) {
      setApplyError(ui.validation.fullNameRequired);
      return;
    }
    if (cleanGuardianName.length < 2) {
      setApplyError(ui.validation.guardianNameRequired);
      return;
    }
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      setApplyError(ui.validation.genderRequired);
      return;
    }
    if (!dateOfBirth) {
      setApplyError(ui.validation.dobRequired);
      return;
    }
    if (dateOfBirth > todayMaxDate) {
      setApplyError(ui.validation.dobFutureError);
      return;
    }
    if (!stateVal) {
      setApplyError(ui.validation.stateRequired);
      return;
    }
    if (cleanDistrict.length < 2) {
      setApplyError(ui.validation.districtRequired);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setApplyError(ui.validation.mobileInvalid);
      return;
    }
    if (!declarationAccepted) {
      setApplyError(ui.validation.declarationRequired);
      return;
    }
    if (
      !applyCaptcha.notARobotChecked ||
      !applyCaptcha.challengeId ||
      !applyCaptcha.captchaToken ||
      applyCaptcha.captchaAnswer.trim().length !== 6
    ) {
      setApplyError(ui.captcha.requiredError);
      return;
    }

    setApplyLoading(true);
    try {
      const recaptchaToken = await executeRecaptchaV3('pledge_create_card');
      const response = await fetch(PLEDGE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'createCard',
          captcha: {
            notARobotChecked: applyCaptcha.notARobotChecked,
            challengeId: applyCaptcha.challengeId,
            captchaToken: applyCaptcha.captchaToken,
            captchaAnswer: applyCaptcha.captchaAnswer.trim().toUpperCase(),
            recaptchaToken,
            recaptchaAction: 'pledge_create_card'
          },
          data: {
            fullName: cleanFullName,
            guardianName: cleanGuardianName,
            gender,
            dateOfBirth,
            state: stateVal,
            district: cleanDistrict,
            mobileNumber: cleanMobile,
            declarationAccepted: true
          }
        })
      });

      const res = await response.json().catch(() => null);

      const errCode = String(res?.code || res?.errorCode || '').toUpperCase();
      const errMsg = String(res?.message || res?.error || '');

      if (errCode.includes('CAPTCHA')) {
        await loadFreshCaptchaChallenge(setApplyCaptcha, true);
        setApplyError(
          errCode.includes('EXPIRED')
            ? ui.captcha.expiredError
            : errCode.includes('REQUIRED')
              ? ui.captcha.requiredError
              : ui.captcha.invalidError
        );
        setApplyLoading(false);
        return;
      }

      if (response.ok && res?.success === true) {
        const extracted = extractVerifiedCardFromResponse(res);

        if (extracted) {
          setApplyCaptcha(INITIAL_CAPTCHA_STATE);
          setVerifiedCard(extracted);
          setCardSourceMode('issued');
          // Refresh live pledge counter immediately after successful database creation
          fetchLivePledgeCount();
          window.setTimeout(() => {
            document
              .getElementById('verified-pledge-card-display')
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
          setApplyLoading(false);
          return;
        }
      }

      // Single-use CAPTCHA nonce was consumed on server; load a fresh challenge so user can retry easily
      await loadFreshCaptchaChallenge(setApplyCaptcha, true);

      if (response.status === 429 || res?.code === 'RATE_LIMITED') {
        setApplyError(
          res?.message || 'Too many requests in a short period. Please wait a minute and try again.'
        );
        setApplyLoading(false);
        return;
      }

      // Check for duplicate mobile number protection response (e.g., MOBILE_ALREADY_REGISTERED / DUPLICATE_MOBILE)
      if (
        res?.success === false &&
        (errCode.includes('DUPLICATE') ||
          errCode.includes('ALREADY') ||
          errCode.includes('EXISTS') ||
          /already|duplicate|exists/i.test(errMsg))
      ) {
        setIsDuplicateMobileError(true);
        setApplyError(ui.duplicateMobileMessage || errMsg);
        setApplyLoading(false);
        return;
      }

      setApplyError(
        errMsg || 'Unable to complete registration at this moment. Please verify your details and try again.'
      );
    } catch {
      setApplyError(
        'Unable to connect to the Citizen Pledge database server. Please check your internet connection and try again.'
      );
    } finally {
      setApplyLoading(false);
    }
  };

  // Method A — Verify by Citizen ID ("verifyById")
  const handleVerifyByIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyIdError(null);

    const normalizedId = verifyCitizenIdInput.trim().toUpperCase();
    if (!/^CITIZEN-\d{8}$/.test(normalizedId)) {
      setVerifyIdError(ui.verifyValidation.invalidCitizenId);
      return;
    }

    if (
      !verifyIdCaptcha.notARobotChecked ||
      !verifyIdCaptcha.challengeId ||
      !verifyIdCaptcha.captchaToken ||
      verifyIdCaptcha.captchaAnswer.trim().length !== 6
    ) {
      setVerifyIdError(ui.captcha.requiredError);
      return;
    }

    setVerifyIdLoading(true);
    try {
      const recaptchaToken = await executeRecaptchaV3('pledge_verify_id');
      const response = await fetch(PLEDGE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'verifyById',
          captcha: {
            notARobotChecked: verifyIdCaptcha.notARobotChecked,
            challengeId: verifyIdCaptcha.challengeId,
            captchaToken: verifyIdCaptcha.captchaToken,
            captchaAnswer: verifyIdCaptcha.captchaAnswer.trim().toUpperCase(),
            recaptchaToken,
            recaptchaAction: 'pledge_verify_id'
          },
          data: {
            uniqueCitizenId: normalizedId
          }
        })
      });

      const res = await response.json().catch(() => null);
      const errCode = String(res?.code || res?.errorCode || '').toUpperCase();

      if (errCode.includes('CAPTCHA')) {
        await loadFreshCaptchaChallenge(setVerifyIdCaptcha, true);
        setVerifyIdError(
          errCode.includes('EXPIRED')
            ? ui.captcha.expiredError
            : errCode.includes('REQUIRED')
              ? ui.captcha.requiredError
              : ui.captcha.invalidError
        );
        setVerifyIdLoading(false);
        return;
      }

      if (response.ok && res?.success === true) {
        const extracted = extractVerifiedCardFromResponse(res);
        if (extracted) {
          setVerifyIdCaptcha(INITIAL_CAPTCHA_STATE);
          setVerifiedCard(extracted);
          setCardSourceMode('verified');
          window.setTimeout(() => {
            document
              .getElementById('verified-pledge-card-display')
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
          setVerifyIdLoading(false);
          return;
        }
      }

      // Single-use CAPTCHA nonce was consumed on server; load fresh challenge for retry
      await loadFreshCaptchaChallenge(setVerifyIdCaptcha, true);

      if (response.status === 429 || res?.code === 'RATE_LIMITED') {
        setVerifyIdError(
          res?.message || 'Too many requests in a short period. Please wait a minute and try again.'
        );
        setVerifyIdLoading(false);
        return;
      }

      setVerifyIdError(
        res?.message || 'No matching Citizen Pledge Card was found for this Citizen ID.'
      );
    } catch {
      setVerifyIdError(
        'Unable to reach the verification service. Please check your connection and try again.'
      );
    } finally {
      setVerifyIdLoading(false);
    }
  };

  // Method B — Recover by Registered Details ("verifyByDetails")
  const handleRecoverByDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverError(null);

    const cleanMob = recoverMobileInput.replace(/\D/g, '');
    const cleanDist = recoverDistrictInput.trim().replace(/[<>]/g, '');

    if (!/^[6-9]\d{9}$/.test(cleanMob) || !recoverStateInput || cleanDist.length < 2) {
      setRecoverError(ui.verifyValidation.invalidRecoveryDetails);
      return;
    }

    if (
      !recoverCaptcha.notARobotChecked ||
      !recoverCaptcha.challengeId ||
      !recoverCaptcha.captchaToken ||
      recoverCaptcha.captchaAnswer.trim().length !== 6
    ) {
      setRecoverError(ui.captcha.requiredError);
      return;
    }

    setRecoverLoading(true);
    try {
      const recaptchaToken = await executeRecaptchaV3('pledge_verify_details');
      const response = await fetch(PLEDGE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'verifyByDetails',
          captcha: {
            notARobotChecked: recoverCaptcha.notARobotChecked,
            challengeId: recoverCaptcha.challengeId,
            captchaToken: recoverCaptcha.captchaToken,
            captchaAnswer: recoverCaptcha.captchaAnswer.trim().toUpperCase(),
            recaptchaToken,
            recaptchaAction: 'pledge_verify_details'
          },
          data: {
            mobileNumber: cleanMob,
            state: recoverStateInput,
            district: cleanDist
          }
        })
      });

      const res = await response.json().catch(() => null);
      const errCode = String(res?.code || res?.errorCode || '').toUpperCase();

      if (errCode.includes('CAPTCHA')) {
        await loadFreshCaptchaChallenge(setRecoverCaptcha, true);
        setRecoverError(
          errCode.includes('EXPIRED')
            ? ui.captcha.expiredError
            : errCode.includes('REQUIRED')
              ? ui.captcha.requiredError
              : ui.captcha.invalidError
        );
        setRecoverLoading(false);
        return;
      }

      if (response.ok && res?.success === true) {
        const extracted = extractVerifiedCardFromResponse(res);
        if (extracted) {
          setRecoverCaptcha(INITIAL_CAPTCHA_STATE);
          setVerifiedCard(extracted);
          setCardSourceMode('verified');
          window.setTimeout(() => {
            document
              .getElementById('verified-pledge-card-display')
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
          setRecoverLoading(false);
          return;
        }
      }

      // Single-use CAPTCHA nonce was consumed on server; load fresh challenge for retry
      await loadFreshCaptchaChallenge(setRecoverCaptcha, true);

      if (response.status === 429 || res?.code === 'RATE_LIMITED') {
        setRecoverError(
          res?.message || 'Too many requests in a short period. Please wait a minute and try again.'
        );
        setRecoverLoading(false);
        return;
      }

      setRecoverError(
        res?.message ||
          'No Citizen Pledge Card matching this Mobile Number, State, and District was found.'
      );
    } catch {
      setRecoverError(
        'Unable to reach the card recovery service. Please check your connection and try again.'
      );
    } finally {
      setRecoverLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!verifiedCard || pdfGenerating) return;
    setPdfGenerating(true);
    try {
      await generateCitizenPledgeCardPdf(
        verifiedCard,
        ui.cardDisplay.cardLabels,
        officialLogoSrc
      );
    } finally {
      setPdfGenerating(false);
    }
  };

  const handleCopyCitizenId = async () => {
    if (!verifiedCard) return;
    try {
      await navigator.clipboard.writeText(verifiedCard.uniqueCitizenId);
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 2500);
    } catch {
      setCopiedId(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* =================================================================== */}
      {/* LIVE PLEDGE COUNTER BANNER ("getPledgeCount")                       */}
      {/* =================================================================== */}
      <div className="bg-[#0B1F3A] text-white rounded-3xl border border-slate-800 shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="h-1.5 w-full flex">
          <div className="bg-[#FF9933] w-1/3 h-full" />
          <div className="bg-white w-1/3 h-full" />
          <div className="bg-[#138808] w-1/3 h-full" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{ui.sectionBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {ui.sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {ui.sectionSubtitle}
            </p>
          </div>

          {/* Live Database Counter Box */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 sm:px-7 min-w-[270px] shrink-0 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {ui.counterLabel}
              </span>
              <button
                type="button"
                onClick={fetchLivePledgeCount}
                disabled={counterLoading}
                title={ui.counterRefreshBtn}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                id="refresh-pledge-count-btn"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    counterLoading ? 'animate-spin motion-reduce:animate-none' : ''
                  }`}
                />
              </button>
            </div>

            {counterLoading ? (
              <div className="py-1 flex items-center gap-2 text-sm font-bold text-slate-300">
                <span>{ui.counterLoading}</span>
              </div>
            ) : pledgeCount !== null ? (
              <div className="flex items-baseline gap-2" translate="no">
                <span
                  className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight notranslate"
                  id="live-pledge-count-value"
                >
                  {pledgeCount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider notranslate">
                  ACTIVE
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-amber-200/90 leading-snug">
                  {counterError || ui.counterUnavailable}
                </p>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-tight">{ui.counterSubtext}</p>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MAIN APPLICATION & VERIFICATION CONTAINER                           */}
      {/* =================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Navigation Tabs: Apply vs Verify/Re-Download */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-200 bg-slate-50"
          id="section-pledge-verify"
        >
          <button
            type="button"
            onClick={() => switchTab('apply')}
            disabled={applyLoading}
            className={`px-6 py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer border-b-2 ${
              activeTab === 'apply'
                ? 'bg-white text-[#0B1F3A] border-[#FF9933] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100/70'
            }`}
            id="pledge-tab-apply"
          >
            <FileCheck className="w-4 h-4 text-[#FF9933]" />
            <span>{ui.tabApply}</span>
          </button>

          <button
            type="button"
            onClick={() => switchTab('verify')}
            disabled={applyLoading}
            className={`px-6 py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer border-b-2 ${
              activeTab === 'verify'
                ? 'bg-white text-[#0B1F3A] border-[#138808] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100/70'
            }`}
            id="pledge-tab-verify"
          >
            <Search className="w-4 h-4 text-[#138808]" />
            <span>{ui.tabVerify}</span>
          </button>
        </div>

        {/* Mandatory Non-Government Voluntary Notice */}
        <div className="px-6 py-3.5 sm:px-10 bg-amber-50/80 border-b border-amber-200/80 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-amber-950 leading-relaxed">
            {ui.voluntaryNotice}
          </p>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: CITIZEN PLEDGE CARD APPLICATION FORM ("createCard")        */}
        {/* ================================================================= */}
        {activeTab === 'apply' && (
          <div className="p-6 sm:p-10 space-y-8">
            {applyLoading ? (
              /* Exclusive Application Processing Screen */
              <div
                role="status"
                aria-live="polite"
                id="pledge-processing-screen"
                className="py-16 px-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#0B1F3A] animate-spin motion-reduce:animate-none" />
                <p className="text-base sm:text-lg font-extrabold text-[#0B1F3A] tracking-tight">
                  {ui.submittingBtn}
                </p>
              </div>
            ) : (
              <>
                {/* The Civic Pledge Statement Box */}
                <div className="bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                    <Award className="w-4 h-4" />
                    <span>{ui.pledgeHeading}</span>
                  </div>
                  <blockquote className="text-base sm:text-lg lg:text-xl font-bold text-white leading-relaxed italic">
                    {ui.pledgeStatement}
                  </blockquote>
                </div>

                {/* Application Form */}
                <form
                  onSubmit={handleCreateCardSubmit}
                  className="space-y-6"
                  noValidate
                  id="citizen-pledge-application-form"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      {ui.formTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">{ui.formSubtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* 1. Full Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="pledge-full-name"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.fullNameLabel}
                      </label>
                      <input
                        id="pledge-full-name"
                        type="text"
                        required
                        maxLength={80}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={ui.fields.fullNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      />
                    </div>

                    {/* 2. Guardian Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="pledge-guardian-name"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.guardianNameLabel}
                      </label>
                      <input
                        id="pledge-guardian-name"
                        type="text"
                        required
                        maxLength={80}
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        placeholder={ui.fields.guardianNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      />
                    </div>

                    {/* 3. Gender (Backend requires exact "Male", "Female", or "Other") */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="pledge-gender"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.genderLabel}
                      </label>
                      <select
                        id="pledge-gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      >
                        <option value="">{ui.fields.genderPlaceholder}</option>
                        <option value="Male">{ui.fields.genderMale}</option>
                        <option value="Female">{ui.fields.genderFemale}</option>
                        <option value="Other">{ui.fields.genderOther}</option>
                      </select>
                    </div>

                    {/* 4. Date of Birth */}
                    <div className="space-y-1.5">
                      <label htmlFor="pledge-dob" className="block text-xs font-bold text-slate-800">
                        {ui.fields.dobLabel}
                      </label>
                      <input
                        id="pledge-dob"
                        type="date"
                        required
                        max={todayMaxDate}
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      />
                    </div>

                    {/* 5. State */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="pledge-state"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.stateLabel}
                      </label>
                      <select
                        id="pledge-state"
                        required
                        value={stateVal}
                        onChange={(e) => setStateVal(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      >
                        <option value="">{ui.fields.statePlaceholder}</option>
                        {INDIAN_STATES_AND_UTS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 6. District */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="pledge-district"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.districtLabel}
                      </label>
                      <input
                        id="pledge-district"
                        type="text"
                        required
                        maxLength={60}
                        value={districtVal}
                        onChange={(e) => setDistrictVal(e.target.value)}
                        placeholder={ui.fields.districtPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      />
                    </div>

                    {/* 7. Mobile Number */}
                    <div className="md:col-span-2 space-y-1.5">
                      <label
                        htmlFor="pledge-mobile"
                        className="block text-xs font-bold text-slate-800"
                      >
                        {ui.fields.mobileLabel}
                      </label>
                      <input
                        id="pledge-mobile"
                        type="tel"
                        inputMode="numeric"
                        required
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        placeholder={ui.fields.mobilePlaceholder}
                        className="w-full md:max-w-md px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                      />
                      <p className="text-[11px] text-slate-500">{ui.fields.mobileHelper}</p>
                    </div>
                  </div>

                  {/* 8. Mandatory Pledge/Declaration Acceptance Checkbox */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                    <label
                      htmlFor="pledge-declaration-checkbox"
                      className="flex items-start gap-3.5 cursor-pointer select-none"
                    >
                      <input
                        id="pledge-declaration-checkbox"
                        type="checkbox"
                        checked={declarationAccepted}
                        onChange={(e) => setDeclarationAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-slate-300 text-[#138808] focus:ring-[#138808] shrink-0 cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                        {ui.fields.declarationLabel}
                      </span>
                    </label>
                  </div>

                  {/* 9. Mandatory "I'm not a robot" CAPTCHA Security Verification */}
                  <div className="space-y-1.5">
                    <span className="block text-xs font-bold text-slate-800">
                      {ui.captcha.securityHeading}
                    </span>
                    <NotARobotCaptchaBox
                      idPrefix="pledge-apply"
                      state={applyCaptcha}
                      onChange={setApplyCaptcha}
                      onRefresh={() => loadFreshCaptchaChallenge(setApplyCaptcha, true)}
                      captchaUi={ui.captcha}
                      disabled={applyLoading}
                    />
                  </div>

                  {/* Duplicate Mobile Protection Banner */}
                  {isDuplicateMobileError && (
                    <div
                      role="alert"
                      className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-amber-950">
                            {ui.duplicateMobileTitle}
                          </h4>
                          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                            {ui.duplicateMobileMessage}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleJumpToDuplicateRecovery}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-extrabold transition-colors cursor-pointer"
                        id="duplicate-mobile-recover-btn"
                      >
                        <span>{ui.duplicateMobileCta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Standard Error Alert */}
                  {applyError && !isDuplicateMobileError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm font-bold text-rose-800 flex items-start gap-2.5"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{applyError}</span>
                    </div>
                  )}

                  {/* Submit & Clear Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={applyLoading}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 text-white font-extrabold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed"
                      id="submit-pledge-card-btn"
                    >
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      <span>{ui.submitBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetApplicationForm}
                      disabled={applyLoading}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{ui.resetFormBtn}</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: CARD VERIFICATION & RE-DOWNLOAD ("verifyById" / "Details") */}
        {/* ================================================================= */}
        {activeTab === 'verify' && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="space-y-1.5 max-w-3xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                {ui.verifySectionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {ui.verifySectionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* METHOD A — VERIFY USING CITIZEN ID */}
              <form
                onSubmit={handleVerifyByIdSubmit}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-5"
                noValidate
                id="pledge-method-a-verify"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1F3A] bg-amber-100 px-2.5 py-1 rounded-md">
                    Method A
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950 pt-1">
                    {ui.methodATitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ui.methodASubtitle}</p>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="verify-citizen-id-input"
                    className="block text-xs font-bold text-slate-800"
                  >
                    {ui.citizenIdLabel}
                  </label>
                  <input
                    id="verify-citizen-id-input"
                    type="text"
                    required
                    maxLength={16}
                    value={verifyCitizenIdInput}
                    onChange={(e) => setVerifyCitizenIdInput(e.target.value.toUpperCase())}
                    placeholder={ui.citizenIdPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]"
                  />
                </div>

                {/* Mandatory "I'm not a robot" CAPTCHA for Method A Verification */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-bold text-slate-800">
                    {ui.captcha.securityHeading}
                  </span>
                  <NotARobotCaptchaBox
                    idPrefix="verify-id"
                    state={verifyIdCaptcha}
                    onChange={setVerifyIdCaptcha}
                    onRefresh={() => loadFreshCaptchaChallenge(setVerifyIdCaptcha, true)}
                    captchaUi={ui.captcha}
                    disabled={verifyIdLoading}
                  />
                </div>

                {verifyIdError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{verifyIdError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={verifyIdLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  id="verify-by-id-submit-btn"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>{verifyIdLoading ? ui.verifyingIdBtn : ui.verifyIdBtn}</span>
                </button>
              </form>

              {/* METHOD B — RECOVER USING REGISTERED DETAILS */}
              <form
                onSubmit={handleRecoverByDetailsSubmit}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4"
                noValidate
                id="pledge-method-b-recovery"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 bg-emerald-100 px-2.5 py-1 rounded-md">
                    Method B
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950 pt-1">
                    {ui.methodBTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ui.methodBSubtitle}</p>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="recover-mobile-input"
                    className="block text-xs font-bold text-slate-800"
                  >
                    {ui.fields.mobileLabel}
                  </label>
                  <input
                    id="recover-mobile-input"
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    value={recoverMobileInput}
                    onChange={(e) =>
                      setRecoverMobileInput(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder={ui.fields.mobilePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="recover-state-input"
                      className="block text-xs font-bold text-slate-800"
                    >
                      {ui.fields.stateLabel}
                    </label>
                    <select
                      id="recover-state-input"
                      required
                      value={recoverStateInput}
                      onChange={(e) => setRecoverStateInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#138808]"
                    >
                      <option value="">{ui.fields.statePlaceholder}</option>
                      {INDIAN_STATES_AND_UTS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="recover-district-input"
                      className="block text-xs font-bold text-slate-800"
                    >
                      {ui.fields.districtLabel}
                    </label>
                    <input
                      id="recover-district-input"
                      type="text"
                      required
                      maxLength={60}
                      value={recoverDistrictInput}
                      onChange={(e) => setRecoverDistrictInput(e.target.value)}
                      placeholder={ui.fields.districtPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#138808]"
                    />
                  </div>
                </div>

                {/* Mandatory "I'm not a robot" CAPTCHA for Method B Recovery */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-bold text-slate-800">
                    {ui.captcha.securityHeading}
                  </span>
                  <NotARobotCaptchaBox
                    idPrefix="verify-details"
                    state={recoverCaptcha}
                    onChange={setRecoverCaptcha}
                    onRefresh={() => loadFreshCaptchaChallenge(setRecoverCaptcha, true)}
                    captchaUi={ui.captcha}
                    disabled={recoverLoading}
                  />
                </div>

                {recoverError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{recoverError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={recoverLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#138808] hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  id="verify-by-details-submit-btn"
                >
                  <Search className="w-4 h-4" />
                  <span>{recoverLoading ? ui.recoveringBtn : ui.recoverBtn}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* PREMIUM CITIZEN PLEDGE CARD DISPLAY & HIGH-QUALITY PDF DOWNLOAD     */}
      {/* (Shown ONLY when verified backend data with CITIZEN-XXXXXXXX exists)*/}
      {/* =================================================================== */}
      {verifiedCard && (
        <div
          id="verified-pledge-card-display"
          className="bg-white rounded-3xl border-2 border-[#0B1F3A] p-6 sm:p-10 space-y-6 shadow-lg animate-fade-in"
        >
          {/* Confirmation Header & Download PDF Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 text-[#138808] shrink-0" />
                <span>
                  {cardSourceMode === 'issued'
                    ? ui.cardDisplay.successBannerTitle
                    : ui.cardDisplay.verifiedBannerTitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {cardSourceMode === 'issued'
                  ? ui.cardDisplay.successBannerSubtitle
                  : ui.cardDisplay.verifiedBannerSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={pdfGenerating}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer shrink-0 disabled:opacity-60"
              id="download-pledge-card-pdf-btn"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>
                {pdfGenerating ? ui.cardDisplay.downloadingPdfBtn : ui.cardDisplay.downloadPdfBtn}
              </span>
            </button>
          </div>

          {/* =============================================================== */}
          {/* COMMEMORATIVE INDIAN CIVIC PLEDGE CARD PREVIEW                  */}
          {/* =============================================================== */}
          <div
            className="max-w-4xl mx-auto rounded-2xl border-2 border-[#0B1F3A] bg-white shadow-md overflow-hidden relative"
            id="citizen-pledge-card-visual"
          >
            {/* Top Indian Tricolour Band */}
            <div className="h-2 w-full flex">
              <div className="bg-[#FF9933] w-1/3 h-full" />
              <div className="bg-white w-1/3 h-full" />
              <div className="bg-[#138808] w-1/3 h-full" />
            </div>

            {/* Deep Navy Blue Commemorative Header */}
            <div className="bg-[#0B1F3A] text-white px-6 py-5 sm:px-8 sm:py-6 border-b-4 border-[#D4AF37] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 border-2 border-[#D4AF37] shrink-0">
                  <img
                    src={officialLogoSrc}
                    alt="Citizen India Official Logo"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    Citizen India · This Project Is Under Citizen India
                  </p>
                  <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                    স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह
                  </h3>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                    CITIZEN PLEDGE CARD
                  </p>
                </div>
              </div>

              {/* Subtle 24-Spoke Ashoka Chakra-Inspired Emblem */}
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-amber-400/40 bg-white/5 shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-8 h-8 text-amber-300/80"
                  aria-hidden="true"
                >
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="4" />
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const angle = (idx * 15 * Math.PI) / 180;
                    const x1 = 50 + Math.cos(angle) * 8;
                    const y1 = 50 + Math.sin(angle) * 8;
                    const x2 = 50 + Math.cos(angle) * 44;
                    const y2 = 50 + Math.sin(angle) * 44;
                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 space-y-6 relative">
              {/* Unique Citizen ID & Status Row */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.citizenId}
                  </span>
                  <div className="flex items-center gap-2.5 mt-0.5" translate="no">
                    <span
                      className="text-lg sm:text-2xl font-black text-[#0B1F3A] font-mono tracking-wider notranslate"
                      id="card-unique-citizen-id"
                    >
                      {verifiedCard.uniqueCitizenId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCitizenId}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 cursor-pointer"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-700" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#138808]" />
                  <span>
                    {ui.cardDisplay.cardLabels.status}: <span className="notranslate" translate="no">{verifiedCard.status}</span>
                  </span>
                </div>
              </div>

              {/* Cardholder Details Grid (Strictly No Guardian Name, No DOB, Only Last 4 Digits of Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.fullName}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-950 notranslate" translate="no">
                    {verifiedCard.fullName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.gender}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-950">
                    {verifiedCard.gender}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.mobileLast4}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-950 font-mono notranslate" translate="no">
                    {verifiedCard.mobileLast4}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.state}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-950">
                    {verifiedCard.state}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    {ui.cardDisplay.cardLabels.district}
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-950">
                    {verifiedCard.district}
                  </p>
                </div>
              </div>

              {/* Short Pledge Statement */}
              <div className="bg-emerald-50/80 border-l-4 border-[#138808] rounded-r-xl p-4 sm:p-5 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 block">
                  {ui.cardDisplay.cardLabels.pledgeHeading}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 italic leading-relaxed">
                  {ui.cardDisplay.cardLabels.pledgeQuote}
                </p>
              </div>
            </div>

            {/* Card Disclaimer Footer */}
            <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 text-[11px] font-semibold text-slate-600 leading-relaxed">
              {ui.cardDisplay.cardLabels.disclaimer}
            </div>

            {/* Bottom Indian Tricolour Band */}
            <div className="h-1.5 w-full flex">
              <div className="bg-[#FF9933] w-1/3 h-full" />
              <div className="bg-white w-1/3 h-full" />
              <div className="bg-[#138808] w-1/3 h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
