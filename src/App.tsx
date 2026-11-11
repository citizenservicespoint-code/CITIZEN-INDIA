import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Search, 
  ShieldAlert, 
  FileText, 
  ExternalLink, 
  Lock, 
  MapPin, 
  Globe, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Building,
  Calendar,
  ShieldCheck,
  Database,
  RefreshCw,
  Sliders,
  Menu,
  X,
  Home,
  Layers,
  Download,
  Heart,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data Imports
import { translations } from './data/translations';
import { schemesData } from './data/schemes';
import { swachhtarPotheTranslations } from './data/swachhtarPotheTranslations';
import CustomerServiceRequestForm from './components/CustomerServiceRequestForm';
import SwachhtarPothePage from './components/SwachhtarPothePage';
import { ensureRecaptchaV3Loaded, executeRecaptchaV3 } from './utils/recaptchaV3';

// Image Assets
// @ts-ignore
import headerLogoImg from './assets/images/regenerated_image_1786982538117.webp';
// @ts-ignore
import footerLogoImg from './assets/images/regenerated_image_1786982821862.webp';
// @ts-ignore
import redFortImg from './assets/images/regenerated_image_1786983288395.webp';
// @ts-ignore
import projectHeadImg from './assets/images/regenerated_image_1786983089949.webp';
// @ts-ignore
import signatureImg from './assets/images/regenerated_image_1783230812027.png';
// @ts-ignore
import tigerImg from './assets/images/royal_bengal_tiger_1785243007324.jpg';
// @ts-ignore
import netajiImg from './assets/images/netaji_subhas_bose_1785243024500_jpg_1785243854463.jpg';

// Reusable Indian national Ashoka Chakra vector with 24 precise spokes for background video effect
function AshokaChakra({ className = "text-blue-900/10", size = "w-64 h-64", speed = "120s" }: { className?: string, size?: string, speed?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${size} ${className} pointer-events-none select-none`} 
      style={{ animation: `spin ${speed} linear infinite` }}
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="50" cy="50" r="1.8" fill="currentColor" />
      <defs>
        <g id="chakra-spoke">
          <line x1="50" y1="50" x2="50" y2="7.5" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="50" cy="7.5" r="0.8" fill="currentColor" />
        </g>
      </defs>
      <use href="#chakra-spoke" transform="rotate(0 50 50)" />
      <use href="#chakra-spoke" transform="rotate(15 50 50)" />
      <use href="#chakra-spoke" transform="rotate(30 50 50)" />
      <use href="#chakra-spoke" transform="rotate(45 50 50)" />
      <use href="#chakra-spoke" transform="rotate(60 50 50)" />
      <use href="#chakra-spoke" transform="rotate(75 50 50)" />
      <use href="#chakra-spoke" transform="rotate(90 50 50)" />
      <use href="#chakra-spoke" transform="rotate(105 50 50)" />
      <use href="#chakra-spoke" transform="rotate(120 50 50)" />
      <use href="#chakra-spoke" transform="rotate(135 50 50)" />
      <use href="#chakra-spoke" transform="rotate(150 50 50)" />
      <use href="#chakra-spoke" transform="rotate(165 50 50)" />
      <use href="#chakra-spoke" transform="rotate(180 50 50)" />
      <use href="#chakra-spoke" transform="rotate(195 50 50)" />
      <use href="#chakra-spoke" transform="rotate(210 50 50)" />
      <use href="#chakra-spoke" transform="rotate(225 50 50)" />
      <use href="#chakra-spoke" transform="rotate(240 50 50)" />
      <use href="#chakra-spoke" transform="rotate(255 50 50)" />
      <use href="#chakra-spoke" transform="rotate(270 50 50)" />
      <use href="#chakra-spoke" transform="rotate(285 50 50)" />
      <use href="#chakra-spoke" transform="rotate(300 50 50)" />
      <use href="#chakra-spoke" transform="rotate(315 50 50)" />
      <use href="#chakra-spoke" transform="rotate(330 50 50)" />
      <use href="#chakra-spoke" transform="rotate(345 50 50)" />
    </svg>
  );
}

// Reusable official Indian National Flag (3:2 ratio, equal Saffron, White, Green bands, centered Navy Blue 24-spoke Ashoka Chakra)
function IndianNationalFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 90 60" 
      className={`shrink-0 select-none overflow-hidden rounded-[2px] ${className}`}
      aria-label="National Flag of India"
      role="img"
    >
      {/* Top Saffron Band */}
      <rect x="0" y="0" width="90" height="20" fill="#FF9933" />
      {/* Middle White Band */}
      <rect x="0" y="20" width="90" height="20" fill="#FFFFFF" />
      {/* Bottom India Green Band */}
      <rect x="0" y="40" width="90" height="20" fill="#138808" />
      {/* Centered Navy Blue 24-Spoke Ashoka Chakra */}
      <g transform="translate(45, 30)">
        <circle cx="0" cy="0" r="8.5" fill="none" stroke="#000080" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="1.8" fill="#000080" />
        <circle cx="0" cy="0" r="0.7" fill="#FFFFFF" />
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
          <line 
            key={deg} 
            x1="0" 
            y1="0" 
            x2="0" 
            y2="-8.3" 
            stroke="#000080" 
            strokeWidth="0.75" 
            strokeLinecap="round"
            transform={`rotate(${deg})`} 
          />
        ))}
      </g>
    </svg>
  );
}

export default function App() {
  const [currentLang, setCurrentLangState] = useState<'en' | 'bn' | 'hi'>(() => {
    try {
      const saved = window.localStorage.getItem('citizen_portal_lang');
      if (saved === 'en' || saved === 'bn' || saved === 'hi') return saved;
    } catch {
      // ignore localStorage read errors
    }
    return 'en';
  });

  const setCurrentLang = (lang: 'en' | 'bn' | 'hi') => {
    setCurrentLangState(lang);
    try {
      window.localStorage.setItem('citizen_portal_lang', lang);
    } catch {
      // ignore localStorage write errors
    }
  };

  const tr = (en: string, bn: string, hi: string) =>
    currentLang === 'bn' ? bn : currentLang === 'hi' ? hi : en;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'central' | 'state' | 'scholarship'>('all');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Active Page State for Multi-Page Architecture
  type PageId = 'home' | 'tracker' | 'form' | 'schemes' | 'swachhta' | 'contact' | 'cyber' | 'about' | 'privacy';

  const pageToPath: Record<PageId, string> = {
    home: '/',
    tracker: '/tracker',
    form: '/service-request',
    schemes: '/schemes',
    swachhta: '/swachhtar-pothe',
    contact: '/contact',
    cyber: '/cyber-safety',
    about: '/about',
    privacy: '/privacy-policy'
  };

  const getActivePageFromPath = (pathname: string): PageId => {
    if (pathname === '/tracker' || pathname === '/application-status') return 'tracker';
    if (pathname === '/form' || pathname === '/service-request') return 'form';
    if (pathname === '/schemes' || pathname === '/government-schemes' || pathname === '/services') return 'schemes';
    if (pathname === '/swachhtar-pothe' || pathname === '/swachhta') return 'swachhta';
    if (pathname === '/contact' || pathname === '/contact-us') return 'contact';
    if (pathname === '/cyber' || pathname === '/cyber-safety') return 'cyber';
    if (pathname === '/about' || pathname === '/about-us') return 'about';
    if (pathname === '/privacy' || pathname === '/privacy-policy' || pathname === '/terms') return 'privacy';
    return 'home';
  };

  const activePage = getActivePageFromPath(location.pathname);

  // Top 3-Line Official Navigation Menu Drawer State
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  // Multi-Page Navigation Helper Function
  const navigateToPage = (pageId: PageId) => {
    navigate(pageToPath[pageId]);
    setIsNavMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Page Title, Canonical and Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // SEO Dynamic Page Title and Canonical Link Management
    const pageTitles: Record<PageId, string> = {
      home: 'Citizen Services Point | This Project Under Citizen India',
      tracker: 'Application Status Tracker | Citizen Services Point - Citizen India',
      form: 'Customer Service Request Form | Citizen Services Point - Citizen India',
      schemes: 'Government Schemes & Offline Forms | Citizen Services Point - Citizen India',
      swachhta: swachhtarPotheTranslations[currentLang]?.meta.pageTitle || 'Swachhtar Pothe (স্বচ্ছতার পথে) | A Citizen India Initiative',
      about: 'About Portal & Leadership | Citizen Services Point - Citizen India',
      cyber: 'Cyber Safety & Security Hub | Citizen Services Point - Citizen India',
      contact: 'Helplines & Contact Support Hub | Citizen Services Point - Citizen India',
      privacy: 'Privacy Policy & Terms | Citizen Services Point - Citizen India'
    };

    document.title = pageTitles[activePage] || pageTitles.home;
    document.documentElement.lang = currentLang;

    const canonicalHref = `https://citizenservicespoint.co.in${pageToPath[activePage] === '/' ? '/' : pageToPath[activePage]}`;
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalHref);
    }
  }, [location.pathname, activePage, currentLang]);

  // Citizen Application Status Tracker State with Server-Side CAPTCHA Verification
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<any | null>(null);
  const [trackError, setTrackError] = useState<'invalid' | 'not_found' | 'mobile_ambiguous' | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [sheetFetchError, setSheetFetchError] = useState<string | null>(null);

  // Server-Side CAPTCHA Challenge State
  const [captchaChallenge, setCaptchaChallenge] = useState<{
    challengeId: string;
    captchaToken: string;
    imageDataUrl: string;
    expiresAt: number;
  } | null>(null);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaHighContrast, setCaptchaHighContrast] = useState(false);
  const [captchaExpired, setCaptchaExpired] = useState(false);

  const fetchCaptchaChallenge = async () => {
    setCaptchaLoading(true);
    setCaptchaExpired(false);
    try {
      const res = await fetch('/api/captcha-challenge', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!res.ok) {
        throw new Error('Unable to load security verification challenge.');
      }
      const data = await res.json();
      setCaptchaChallenge({
        challengeId: data.challengeId,
        captchaToken: data.captchaToken,
        imageDataUrl: data.imageDataUrl,
        expiresAt: data.expiresAt
      });
      setCaptchaInput('');
    } catch {
      setCaptchaChallenge(null);
      setCaptchaError('Unable to load CAPTCHA challenge. Please refresh and try again.');
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    ensureRecaptchaV3Loaded();
  }, []);

  useEffect(() => {
    if (activePage === 'tracker') {
      fetchCaptchaChallenge();
    }
  }, [activePage]);

  useEffect(() => {
    if (!captchaChallenge) return;
    const remainingMs = captchaChallenge.expiresAt - Date.now();
    if (remainingMs <= 0) {
      setCaptchaExpired(true);
      return;
    }
    const timer = window.setTimeout(() => {
      setCaptchaExpired(true);
    }, remainingMs);
    return () => window.clearTimeout(timer);
  }, [captchaChallenge]);

  const validateQueryFormat = (raw: string): { valid: boolean; type?: 'application_number' | 'mobile_number'; normalized?: string } => {
    const trimmed = raw.trim().toUpperCase();
    if (trimmed.length < 4 || trimmed.length > 32) return { valid: false };

    const digitsOnly = trimmed.replace(/[\s\-+()]/g, '');
    if (/^(?:91|0)?[6-9]\d{9}$/.test(digitsOnly) && /^[\d\s\-+()]+$/.test(trimmed)) {
      return { valid: true, type: 'mobile_number', normalized: digitsOnly.slice(-10) };
    }

    if (!/^[A-Z0-9][A-Z0-9\-_/]{3,31}$/.test(trimmed) || !/\d/.test(trimmed) || /^\d+$/.test(trimmed)) {
      return { valid: false };
    }

    return { valid: true, type: 'application_number', normalized: trimmed };
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackResult(null);
    setTrackError(null);
    setSheetFetchError(null);
    setCaptchaError(null);
    
    const formattedInput = trackInput.trim().toUpperCase();
    if (!formattedInput) {
      setTrackError('invalid');
      return;
    }

    const queryCheck = validateQueryFormat(formattedInput);
    if (!queryCheck.valid || !queryCheck.normalized) {
      setTrackError('invalid');
      return;
    }

    if (!captchaChallenge || captchaExpired || Date.now() >= captchaChallenge.expiresAt) {
      setCaptchaError(
        currentLang === 'bn'
          ? 'ক্যাপচা কোডের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে নতুন ক্যাপচা কোডটি লিখুন।'
          : currentLang === 'hi'
          ? 'कैप्चा कोड समाप्त हो गया है। कृपया नया कैप्चा कोड दर्ज करें।'
          : 'CAPTCHA code has expired. Please enter the new security code shown.'
      );
      await fetchCaptchaChallenge();
      return;
    }

    const cleanCaptcha = captchaInput.trim().toUpperCase();
    if (!cleanCaptcha || cleanCaptcha.length !== 6) {
      setCaptchaError(
        currentLang === 'bn'
          ? 'অনুগ্রহ করে প্রদর্শিত ৬-অক্ষরের ক্যাপচা নিরাপত্তা কোডটি সঠিকভাবে লিখুন।'
          : currentLang === 'hi'
          ? 'कृपया बॉक्स में दिखाया गया 6-अक्षरों का कैप्चा सुरक्षा कोड दर्ज करें।'
          : 'Please enter the 6-character CAPTCHA security code shown in the box.'
      );
      return;
    }

    setIsTracking(true);

    try {
      const recaptchaToken = await executeRecaptchaV3('status_check');
      const response = await fetch('/api/status-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          query: formattedInput,
          challengeId: captchaChallenge.challengeId,
          captchaToken: captchaChallenge.captchaToken,
          captchaAnswer: cleanCaptcha,
          recaptchaToken,
          recaptchaAction: 'status_check'
        })
      });

      const data = await response.json().catch(() => ({}));

      // Single-use token protocol: always issue a fresh CAPTCHA challenge after every verification attempt
      await fetchCaptchaChallenge();

      if (!response.ok || !data.captchaVerified) {
        if (
          data.errorCode === 'captcha_missing' ||
          data.errorCode === 'captcha_invalid' ||
          data.errorCode === 'captcha_expired' ||
          data.errorCode === 'captcha_service_error' ||
          response.status === 403
        ) {
          setCaptchaError(
            data.message ||
              (currentLang === 'bn'
                ? 'ক্যাপচা যাচাইকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে নতুন কোড দিয়ে আবার চেষ্টা করুন।'
                : currentLang === 'hi'
                ? 'कैप्चा सत्यापन विफल रहा। कृपया नए कोड के साथ पुनः प्रयास करें।'
                : 'CAPTCHA verification failed. Please try again with the new security code.')
          );
          return;
        }

        if (data.errorCode === 'invalid_input' || data.errorCode === 'invalid_query_format') {
          setTrackError('invalid');
          return;
        }

        throw new Error(data.message || 'Unable to process status request at this time. Please try again shortly.');
      }

      if (data.errorCode === 'mobile_ambiguous') {
        setTrackError('mobile_ambiguous');
        return;
      }

      if (data.success && data.record) {
        setTrackResult(data.record);
        return;
      }

      // Only after server-side CAPTCHA verification succeeds (data.captchaVerified === true),
      // check same-device submitted requests using strict exact matching
      if (data.notFound) {
        const normalizeStr = (str: string) => str.trim().toUpperCase().replace(/[\s\-_/.]/g, '');
        const normalizeMob = (str: string) => str.replace(/\D/g, '').slice(-10);

        let localMatchedRecord: any = null;
        let isLocalAmbiguous = false;
        try {
          const localRequests = JSON.parse(localStorage.getItem('citizen_submitted_requests') || '[]');
          if (Array.isArray(localRequests)) {
            if (data.lookupType === 'application_number') {
              const targetNorm = normalizeStr(data.normalizedQuery || formattedInput);
              const exactMatches = localRequests.filter((r: any) => {
                const num = normalizeStr(r?.applicationNumber || '');
                return num !== '' && num === targetNorm;
              });
              if (exactMatches.length === 1) {
                localMatchedRecord = exactMatches[0];
              }
            } else if (data.lookupType === 'mobile_number') {
              const targetMob = normalizeMob(data.normalizedQuery || formattedInput);
              const exactMobileMatches = localRequests.filter((r: any) => {
                const mob = normalizeMob(r?.applicantDetails?.mobile || '');
                return mob !== '' && mob === targetMob;
              });
              if (exactMobileMatches.length > 1) {
                isLocalAmbiguous = true;
              } else if (exactMobileMatches.length === 1) {
                localMatchedRecord = exactMobileMatches[0];
              }
            }
          }
        } catch {
          localMatchedRecord = null;
        }

        if (isLocalAmbiguous) {
          setTrackError('mobile_ambiguous');
          return;
        }

        if (localMatchedRecord) {
          const isMobileLookup = data.lookupType === 'mobile_number';
          const rawMob = String(localMatchedRecord.applicantDetails?.mobile || '').replace(/\D/g, '').slice(-10);
          const maskedMob =
            rawMob.length >= 4
              ? `${'*'.repeat(Math.max(0, rawMob.length - 4))}${rawMob.slice(-4)}`
              : 'N/A';

          const rawName = String(localMatchedRecord.applicantDetails?.fullName || 'APPLICANT').trim();
          const maskedName = isMobileLookup
            ? rawName
                .split(/\s+/)
                .map((p: string) => (p.length <= 1 ? '*' : p[0] + '*'.repeat(Math.min(4, p.length - 1))))
                .join(' ')
            : rawName;

          const rawAppId = String(localMatchedRecord.applicationNumber || '');
          const appParts = rawAppId.split('-');
          const maskedAppId =
            isMobileLookup && appParts.length === 3
              ? `${appParts[0]}-****-${appParts[2]}`
              : rawAppId;

          const fullAddr = `${localMatchedRecord.addressDetails?.street || ''}, ${localMatchedRecord.addressDetails?.villageCity || ''}, ${localMatchedRecord.addressDetails?.district || ''}, ${localMatchedRecord.addressDetails?.state || 'West Bengal'} - ${localMatchedRecord.addressDetails?.pinCode || ''}`
            .trim()
            .replace(/^,\s*|,\s*$/g, '');

          setTrackResult({
            applicationId: maskedAppId,
            govtRefNo: isMobileLookup
              ? 'Protected (Enter Official Application Number to view)'
              : `REF-${rawAppId.replace('CITIZEN-', '')}`,
            applicantName: maskedName,
            mobileNo: maskedMob,
            fullAddress: isMobileLookup
              ? 'Protected (Enter Official Application Number to view full address)'
              : fullAddr || 'N/A',
            schemeName: localMatchedRecord.requestedService || 'Government Service',
            applicationDate: localMatchedRecord.applicationDate || new Date().toISOString().split('T')[0],
            applicationStatus: 'Submitted / Under Document Verification',
            remarks: 'Application successfully logged and forwarded to verification team. Official verification in progress.',
            statusCode: 'approved'
          });
          return;
        }

        setTrackError('not_found');
      }
    } catch (err: any) {
      setSheetFetchError(err.message || 'Error connecting to the status verification service.');
    } finally {
      setIsTracking(false);
    }
  };

  // Cyber Safety Quiz State (English Only)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Short alias for translations based on selected language
  const t = translations[currentLang];

  // Cyber Safety Quiz Questions Data (Multilingual)
  const quizQuestions = useMemo(() => {
    if (currentLang === 'bn') {
      return [
        {
          question: "কেউ যদি সিটিজেন সার্ভিসেস পয়েন্ট থেকে কল করার দাবি করে আপনার অ্যাপ্লিকেশন যাচাই করার জন্য OTP চায়, তবে আপনার কী করা উচিত?",
          options: [
            "যাচাইকরণ সম্পন্ন করতে অবিলম্বে OTP শেয়ার করা।",
            "বিনীতভাবে প্রত্যাখ্যান করা এবং কখনোই শেয়ার না করা। সরকারি আধিকারিক বা সহায়তা ডেস্ক কখনও OTP চান না।",
            "তাদের কথা খুব পেশাদার মনে হলে তবেই দেওয়া।",
            "তাদের পরে কল করতে বলা।"
          ],
          correctIndex: 1,
          explanation: "কখনও কারও সাথে OTP, PIN বা পাসওয়ার্ড শেয়ার করবেন না। সরকারি আধিকারিক বা অনুমোদিত সহায়তা ডেস্ক কখনও গোপনীয় তথ্য চান না।"
        },
        {
          question: "আপনি একটি SMS পেলেন যাতে দাবি করা হয়েছে যে আপনি একটি সরকারি প্রকল্প থেকে নগদ সুবিধা জিতেছেন এবং দাবি করার জন্য একটি লিঙ্ক দেওয়া হয়েছে। সবচেয়ে নিরাপদ পদক্ষেপ কী?",
          options: [
            "মেয়াদ শেষ হওয়ার আগে অবিলম্বে লিঙ্কে ক্লিক করা।",
            "বিস্তারিত জানতে SMS-এর উত্তর দেওয়া।",
            "লিঙ্কে ক্লিক না করা। সরাসরি digitalindia.gov.in বা অফিসিয়াল সরকারি ওয়েবসাইট যাচাই করা।",
            "সব বন্ধুদের কাছে মেসেজটি ফরোয়ার্ড করা।"
          ],
          correctIndex: 2,
          explanation: "ফিশিং লিঙ্কগুলি ব্যক্তিগত তথ্য চুরি বা ম্যালওয়্যার ইনস্টল করার জন্য তৈরি করা হয়। সর্বদা সরাসরি অফিসিয়াল সরকারি ওয়েবসাইট থেকে তথ্য যাচাই করুন।"
        },
        {
          question: "সিটিজেন সার্ভিসেস পয়েন্টের পরিষেবা চার্জ বা ফি কীরূপ?",
          options: [
            "কাজের জরুরি অবস্থার ওপর নির্ভর করে উচ্চ চার্জ।",
            "বাধ্যতামূলক সরকারি ফি এবং ন্যূনতম নথিভুক্ত পরিষেবা চার্জ।",
            "কোনও রসিদ ছাড়াই সবকিছু সম্পূর্ণ বিনামূল্যে।",
            "কোনও কাগজপত্র ছাড়াই ফোনে কথা বলে নির্ধারণ করা হয়।"
          ],
          correctIndex: 1,
          explanation: "সিটিজেন সার্ভিসেস পয়েন্ট সম্পূর্ণ স্বচ্ছতা বজায় রাখে। শুধুমাত্র নির্ধারিত সরকারি ফি এবং ন্যূনতম নথিভুক্ত পরিষেবা চার্জ গ্রহণ করা হয়।"
        }
      ];
    }
    if (currentLang === 'hi') {
      return [
        {
          question: "यदि कोई सिटीजन सर्विसेज पॉइंट से होने का दावा करते हुए आपके आवेदन को सत्यापित करने के लिए OTP मांगता है, तो आपको क्या करना चाहिए?",
          options: [
            "सत्यापन पूरा करने के लिए तुरंत साझा करें।",
            "विनम्रतापूर्वक मना करें और कभी साझा न करें। सरकारी अधिकारी या सहायता डेस्क कभी OTP नहीं मांगते।",
            "केवल तभी दें जब वे बहुत पेशेवर लगें।",
            "उन्हें बाद में कॉल करने के लिए कहें।"
          ],
          correctIndex: 1,
          explanation: "अपना OTP, PIN या पासवर्ड किसी के साथ साझा न करें। सरकारी अधिकारी, अधिकृत पोर्टल या हेल्पलाइन डेस्क कभी भी गोपनीय जानकारी नहीं मांगते।"
        },
        {
          question: "आपको एक SMS मिलता है जिसमें दावा किया गया है कि आपने सरकारी योजना से नकद लाभ जीता है और दावा करने के लिए एक लिंक दिया गया है। सबसे सुरक्षित कदम क्या है?",
          options: [
            "लिंक समाप्त होने से पहले तुरंत क्लिक करें।",
            "विवरण पूछने के लिए SMS का उत्तर दें।",
            "क्लिक न करें। सीधे digitalindia.gov.in जैसी आधिकारिक सरकारी वेबसाइटों की जांच करें।",
            "संदेश को सभी दोस्तों को फॉरवर्ड करें।"
          ],
          correctIndex: 2,
          explanation: "फ़िशिंग लिंक व्यक्तिगत विवरण चुराने या मैलवेयर इंस्टॉल करने के लिए बनाए जाते हैं। हमेशा सीधे आधिकारिक सरकारी वेबसाइटों से जानकारी सत्यापित करें।"
        },
        {
          question: "सिटीजन सर्विसेज पॉइंट के सेवा शुल्क क्या हैं?",
          options: [
            "काम की तात्कालिकता के आधार पर उच्च शुल्क।",
            "अनिवार्य आधिकारिक सरकारी शुल्क और न्यूनतम प्रलेखित सेवा शुल्क।",
            "बिना किसी रसीद के सब कुछ मुफ्त।",
            "बिना कागजी कार्रवाई के कॉल पर तय किया जाता है।"
          ],
          correctIndex: 1,
          explanation: "सिटीजन सर्विसेज पॉइंट पूर्ण पारदर्शिता बनाए रखता है। शुल्क में आधिकारिक सरकारी शुल्क और न्यूनतम प्रलेखित सेवा शुल्क शामिल हैं।"
        }
      ];
    }
    return [
      {
        question: "If someone calls claiming to be from Citizen Services Point and asks for your OTP to verify your application, what should you do?",
        options: [
          "Share it immediately to complete verification.",
          "Politely refuse and never share it. Government officials never ask for OTPs.",
          "Give it only if they sound very professional.",
          "Tell them to call back later."
        ],
        correctIndex: 1,
        explanation: "Never share OTPs, PINs, or passwords with anyone. Government officials, authorized portals or helpline desks will never ask for sensitive credentials."
      },
      {
        question: "You receive an SMS claiming you have won a cash benefit from a government scheme with a link to claim. What is the safest action?",
        options: [
          "Click the link immediately before it expires.",
          "Reply to the SMS asking for details.",
          "Do not click. Check official government websites like digitalindia.gov.in directly.",
          "Forward the message to all friends."
        ],
        correctIndex: 2,
        explanation: "Phishing links are designed to steal personal details or install malware. Always verify information directly from official government sites."
      },
      {
        question: "What are the service charges of Citizen Services Point?",
        options: [
          "High charges depending on the urgency of work.",
          "Mandatory official government fees plus a minimal documented service fee.",
          "Free for everything without any receipts.",
          "It is completely decided dynamically on call without paperwork."
        ],
        correctIndex: 1,
        explanation: "Citizen Services Point maintains absolute transparency. Charges consist of official government fees and a minimal documented service charge."
      }
    ];
  }, [currentLang]);

  // Filter and search schemes
  const filteredSchemes = useMemo(() => {
    return schemesData.filter(scheme => {
      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        scheme.nameEn.toLowerCase().includes(searchLower) ||
        scheme.descriptionEn.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQuestion].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden" id="citizen-app-root">
      
      {/* Background Watermark Elements for Indian National Pride (Ashoka Chakra Rotating Video Effect) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
        {/* Top-left subtle rotating chakra */}
        <div className="absolute top-24 -left-20 md:top-40 md:-left-32 opacity-[0.035] text-blue-900">
          <AshokaChakra size="w-[300px] h-[300px] md:w-[600px] md:h-[600px]" speed="180s" />
        </div>
        {/* Mid-right subtle rotating chakra */}
        <div className="absolute top-[45%] -right-24 md:-right-48 opacity-[0.03] text-blue-900">
          <AshokaChakra size="w-[350px] h-[350px] md:w-[700px] md:h-[700px]" speed="240s" />
        </div>
        {/* Bottom-left subtle rotating chakra */}
        <div className="absolute bottom-20 -left-24 md:-left-40 opacity-[0.035] text-blue-900">
          <AshokaChakra size="w-[320px] h-[320px] md:w-[650px] md:h-[650px]" speed="160s" />
        </div>
      </div>

      {/* Indian National Tricolor Top Stripe */}
      <div className="h-1.5 flex w-full relative z-50">
        <div className="bg-[#FF9933] w-1/3 h-full"></div>
        <div className="bg-white w-1/3 h-full"></div>
        <div className="bg-[#138808] w-1/3 h-full"></div>
      </div>

      {/* Dynamic Cyber Alerts Ticker */}
      <div className="bg-amber-500 text-amber-950 font-medium py-2.5 px-4 overflow-hidden border-b border-amber-600 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-950 animate-pulse" />
            <span className="bg-amber-900 text-amber-50 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">CYBER ALERT</span>
          </div>
          <div className="w-full mx-4 overflow-hidden relative h-5">
            <div className="absolute inset-0 whitespace-nowrap animate-marquee flex items-center gap-12 font-semibold">
              <span>{t.cyberAlertText}</span>
              <span>•</span>
              <span>{t.digitalIndiaText}</span>
              <span>•</span>
              <span>{t.cyberAlertText}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span className="text-xs bg-amber-600/20 px-2 py-0.5 rounded border border-amber-950/20 font-bold">HELPLINE: 1930</span>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div 
            onClick={() => navigateToPage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src={headerLogoImg} 
                alt="Citizen Services Point Logo" 
                className="w-full h-full object-cover"
                id="header-logo"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-orange-600 transition-colors" id="brand-title">
                  {t.headerTitle}
                </h1>
                
                {/* Short Name Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-black bg-orange-50 border border-orange-200 text-orange-900 uppercase tracking-wider select-none shadow-3xs shrink-0">
                  <IndianNationalFlag className="w-3.5 h-2.5 border border-slate-300" />
                  <span>CITIZEN INDIA</span>
                </span>


              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-1">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Government-style Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 ${
                  currentLang === 'en'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="btn-lang-en"
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 ${
                  currentLang === 'bn'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="btn-lang-bn"
              >
                বাংলা
              </button>
              <button
                onClick={() => setCurrentLang('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 ${
                  currentLang === 'hi'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="btn-lang-hi"
              >
                हिन्दी
              </button>
            </div>

            <a 
              href="https://wa.me/919836634843" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 transition-all duration-300 shadow-sm hover:shadow"
              id="nav-whatsapp-badge"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {tr('WhatsApp Online Support', 'হোয়াটসঅ্যাপ অনলাইন সাপোর্ট', 'व्हाट्सएप ऑनलाइन सहायता')}
            </a>

            {/* Top 3-Line Official Navigation Menu Button */}
            <button
              onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shadow-md border border-slate-700 transition-all duration-200 active:scale-95 shrink-0 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              id="top-3line-menu-btn"
              aria-label="Toggle Navigation Menu"
            >
              <div className="flex flex-col gap-[3px] w-4 shrink-0">
                <span className={`h-[2.5px] w-full bg-[#FF9933] rounded-full transition-all duration-300 ${isNavMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`}></span>
                <span className={`h-[2.5px] w-full bg-white rounded-full transition-all duration-300 ${isNavMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-[2.5px] w-full bg-[#138808] rounded-full transition-all duration-300 ${isNavMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}></span>
              </div>
              <span className="tracking-wider font-black uppercase text-[11px] sm:text-xs">
                {currentLang === 'bn' ? 'মেনু' : currentLang === 'hi' ? 'मेन्यू' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Official Page Navigation Bar */}
      <nav className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md sticky top-[68px] z-30 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-1.5 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => navigateToPage('home')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'home'
                ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-home"
          >
            <Home className="w-4 h-4" />
            <span>{currentLang === 'bn' ? 'প্রচ্ছদ (HOME)' : currentLang === 'hi' ? 'मुख्य पृष्ठ (HOME)' : 'HOME'}</span>
          </button>

          <button
            onClick={() => navigateToPage('swachhta')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer border ${
              activePage === 'swachhta'
                ? 'bg-emerald-700 text-white font-extrabold border-emerald-400 shadow-sm'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-700/70 hover:bg-emerald-800 hover:text-white'
            }`}
            id="nav-tab-swachhta"
          >
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>{swachhtarPotheTranslations[currentLang]?.meta.navButtonLabel || 'স্বচ্ছতার পথে | SWACHHTAR POTHE'}</span>
            <span className="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
              {currentLang === 'bn' ? 'নতুন' : currentLang === 'hi' ? 'नया' : 'NEW'}
            </span>
          </button>

          <button
            onClick={() => navigateToPage('tracker')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'tracker'
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-tracker"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>{currentLang === 'bn' ? 'আবেদন ট্র্যাকিং' : currentLang === 'hi' ? 'आवेदन ट्रैकिंग' : 'APPLICATION TRACKER'}</span>
          </button>

          <button
            onClick={() => navigateToPage('form')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'form'
                ? 'bg-amber-500 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-form"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{currentLang === 'bn' ? 'সার্ভিস রিকোয়েস্ট ফর্ম' : currentLang === 'hi' ? 'सर्विस रिक्वेस्ट फॉर्म' : 'SERVICE REQUEST FORM'}</span>
          </button>

          <button
            onClick={() => navigateToPage('schemes')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'schemes'
                ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-schemes"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>{currentLang === 'bn' ? 'সরকারি স্কিম ও ফর্ম' : currentLang === 'hi' ? 'सरकारी योजनाएं' : 'SCHEMES & FORMS'}</span>
          </button>

          <button
            onClick={() => navigateToPage('contact')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'contact'
                ? 'bg-purple-600 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-contact"
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>{currentLang === 'bn' ? 'হেল্পলাইন ও সাপোর্ট' : currentLang === 'hi' ? 'हेल्पलाइन सहायता' : 'HELPLINE & SUPPORT'}</span>
          </button>

          <button
            onClick={() => navigateToPage('cyber')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'cyber'
                ? 'bg-rose-600 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-cyber"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{currentLang === 'bn' ? 'সাইবার নিরাপত্তা' : currentLang === 'hi' ? 'साइबर सुरक्षा' : 'CYBER SAFETY'}</span>
          </button>

          <button
            onClick={() => navigateToPage('about')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'about'
                ? 'bg-slate-700 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-about"
          >
            <Building className="w-4 h-4 text-slate-300" />
            <span>{currentLang === 'bn' ? 'পোর্টাল পরিচিতি' : currentLang === 'hi' ? 'हमारे बारे में' : 'ABOUT PORTAL'}</span>
          </button>

          <button
            onClick={() => navigateToPage('privacy')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
              activePage === 'privacy'
                ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            id="nav-tab-privacy"
          >
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>{currentLang === 'bn' ? 'গোপনীয়তা নীতি' : currentLang === 'hi' ? 'गोपनीयता नीति' : 'PRIVACY POLICY'}</span>
          </button>
        </div>
      </nav>

      {/* Page Breadcrumb Trail when not on Home */}
      {activePage !== 'home' && (
        <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={() => navigateToPage('home')}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{currentLang === 'bn' ? 'প্রচ্ছদ' : currentLang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-orange-600 font-extrabold uppercase tracking-wider">
                {activePage === 'tracker' && tr('Application Status Tracker', 'আবেদন ট্র্যাকিং সিস্টেম', 'आवेदन स्थिति ट्रैकर')}
                {activePage === 'form' && tr('Customer Service Request Form', 'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম', 'ग्राहक सेवा अनुरोध फॉर्म')}
                {activePage === 'schemes' && tr('Government Schemes & Forms', 'সরকারি স্কিম ও ফরমসমূহ', 'सरकारी योजनाएं एवं फॉर्म')}
                {activePage === 'swachhta' && (swachhtarPotheTranslations[currentLang]?.meta.breadcrumbLabel || 'Swachhtar Pothe — Civic Initiative')}
                {activePage === 'contact' && tr('Emergency Helpline & Support Hub', 'জরুরি হেল্পলাইন ও সাপোর্ট হাব', 'आपातकालीन हेल्पलाइन एवं सहायता केंद्र')}
                {activePage === 'cyber' && tr('Cyber Safety & Security Hub', 'সাইবার নিরাপত্তা ও নোটিশ', 'साइबर सुरक्षा एवं जागरूकता केंद्र')}
                {activePage === 'about' && tr('About Portal & Leadership', 'পোর্টাল পরিচিতি ও নেতৃত্ব', 'पोर्टल परिचय एवं नेतृत्व')}
                {activePage === 'privacy' && tr('Privacy Policy & Terms', 'গোপনীয়তা নীতি ও শর্তাবলি', 'गोपनीयता नीति एवं शर्तें')}
              </span>
            </div>
            <button
              onClick={() => navigateToPage('home')}
              className="flex items-center gap-1.5 text-[11px] font-black uppercase text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-3xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{tr('Back to Home', 'মূল প্রচ্ছদে যান', 'मुख्य पृष्ठ पर लौटें')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Official 3-Line Navigation Slide-Over Drawer */}
      <AnimatePresence>
        {isNavMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="navigation-drawer-modal">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle Animated Indian National Ashoka Chakra Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0 select-none">
                  {/* Subtle national saffron & green ambient glow */}
                  <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#FF9933]/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#138808]/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* Subtle Navy Blue 24-Spoke Rotating Ashoka Chakra */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
                    className="opacity-[0.07] text-[#000080]"
                  >
                    <AshokaChakra size="w-80 h-80 sm:w-96 sm:h-96" className="text-[#000080]" />
                  </motion.div>
                </div>

                {/* Drawer Header */}
                <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-white p-0.5 shrink-0">
                      <img src={headerLogoImg} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                        {currentLang === 'bn' ? 'অফিসিয়াল নেভিগেশন মডিউল' : currentLang === 'hi' ? 'नेविगेशन मेन्यू' : 'OFFICIAL NAVIGATION MENU'}
                      </h2>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">
                        CITIZEN SERVICE POINT
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsNavMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
                    aria-label="Close Menu"
                    id="close-drawer-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Section Navigation Links */}
                <div className="p-6 overflow-y-auto space-y-2.5 flex-1 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 block mb-2">
                    {currentLang === 'bn' ? 'পোর্টাল সেকশনসমূহ (ALL SECTIONS)' : currentLang === 'hi' ? 'पोर्टल अनुभाग (ALL SECTIONS)' : 'PORTAL SECTIONS'}
                  </span>

                  {[
                    {
                      pageId: 'home' as PageId,
                      icon: Home,
                      titleBn: 'প্রচ্ছদ (Home Page Overview)',
                      titleHi: 'मुख्य पृष्ठ (Home Page Overview)',
                      titleEn: 'Home Page & Overview',
                      badge: 'HOME',
                      color: 'text-blue-600 bg-blue-50 border-blue-200'
                    },
                    {
                      pageId: 'swachhta' as PageId,
                      icon: Heart,
                      titleBn: 'স্বচ্ছতার পথে (নাগরিক সচেতনতা উদ্যোগ)',
                      titleHi: 'स्वच्छता की राह (नागरिक जागरूकता पहल)',
                      titleEn: 'Swachhtar Pothe (Civic Initiative)',
                      badge: 'NEW INITIATIVE',
                      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    },
                    {
                      pageId: 'tracker' as PageId,
                      icon: Search,
                      titleBn: 'আবেদন ট্র্যাকিং পেজ (Live API)',
                      titleHi: 'आवेदन स्थिति ट्रैकर (Live API)',
                      titleEn: 'Application Status Tracker Page',
                      badge: 'LIVE API',
                      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
                    },
                    {
                      pageId: 'form' as PageId,
                      icon: ShieldCheck,
                      titleBn: 'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম',
                      titleHi: 'ग्राहक सेवा अनुरोध फॉर्म',
                      titleEn: 'Customer Service Request Form',
                      badge: 'NEW FORM',
                      color: 'text-amber-600 bg-amber-50 border-amber-200'
                    },
                    {
                      pageId: 'schemes' as PageId,
                      icon: FileText,
                      titleBn: 'সরকারি স্কিম ও সার্ভিস পেজ (Forms)',
                      titleHi: 'सरकारी योजनाएं एवं फॉर्म (Forms)',
                      titleEn: 'Government Schemes & Forms Page',
                      badge: 'FORMS',
                      color: 'text-orange-600 bg-orange-50 border-orange-200'
                    },
                    {
                      pageId: 'contact' as PageId,
                      icon: Phone,
                      titleBn: 'জরুরি হেল্পলাইন ও সাপোর্ট পেজ',
                      titleHi: 'हेल्पलाइन एवं सहायता केंद्र',
                      titleEn: 'Helpline & Support Page',
                      badge: '24/7',
                      color: 'text-purple-600 bg-purple-50 border-purple-200'
                    },
                    {
                      pageId: 'cyber' as PageId,
                      icon: ShieldAlert,
                      titleBn: 'সাইবার নিরাপত্তা ও অ্যালার্ট পেজ',
                      titleHi: 'साइबर सुरक्षा एवं जागरूकता पेज',
                      titleEn: 'Cyber Safety & Security Page',
                      badge: 'ALERT',
                      color: 'text-rose-600 bg-rose-50 border-rose-200'
                    },
                    {
                      pageId: 'about' as PageId,
                      icon: Building,
                      titleBn: 'আমাদের কথা ও পরিচিতি পেজ',
                      titleHi: 'हमारे बारे में एवं नेतृत्व पेज',
                      titleEn: 'About Portal & Leadership Page',
                      badge: 'INFO',
                      color: 'text-slate-600 bg-slate-100 border-slate-200'
                    },
                    {
                      pageId: 'privacy' as PageId,
                      icon: Lock,
                      titleBn: 'গোপনীয়তা ও পোটাল নীতি পেজ',
                      titleHi: 'गोपनीयता नीति एवं शर्तें पेज',
                      titleEn: 'Privacy Policy & Terms Page',
                      badge: 'TERMS',
                      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
                    }
                  ].map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activePage === item.pageId;
                    return (
                      <button
                        key={item.pageId}
                        onClick={() => navigateToPage(item.pageId)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left group cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20 shadow-xs' 
                            : 'border-slate-100 hover:border-slate-300 bg-slate-50/60 hover:bg-blue-50/50'
                        }`}
                        id={`drawer-link-${item.pageId}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl border ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                              {currentLang === 'bn' ? item.titleBn : currentLang === 'hi' ? item.titleHi : item.titleEn}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {item.titleEn}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.color}`}>
                            {item.badge}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 bg-slate-50/95 backdrop-blur-xs border-t border-slate-200 space-y-3 relative z-10">
                  <a
                    href="https://wa.me/919836634843"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all border border-emerald-500"
                    id="drawer-whatsapp-btn"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {tr('Direct WhatsApp Help', 'সরাসরি হোয়াটসঅ্যাপ সাহায্য (WhatsApp Help)', 'सीधी व्हाट्सएप सहायता (WhatsApp Help)')}
                    </span>
                  </a>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight font-medium">{tr('National Cyber Crime Helpline', 'জাতীয় সাইবার ক্রাইম হেল্পলাইন', 'राष्ट्रीय साइबर अपराध हेल्पलाइन')}</span>
                      <span className="text-xs font-black text-slate-900 tracking-wider">1930</span>
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      भारत • INDIA
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>



      {/* Official Transparency & Disclaimer Banner (Important Note) */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-2.5 px-4 sm:px-6 lg:px-8 relative z-30" id="official-disclaimer-top-bar">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start md:items-center gap-2.5">
            <span className="bg-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0 flex items-center gap-1 mt-0.5 md:mt-0">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.importantNoteTitle}</span>
            </span>
            <p className="text-slate-300 font-medium leading-relaxed text-[11px] sm:text-xs">
              {t.importantNote}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 self-end md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{currentLang === 'bn' ? 'স্বতন্ত্র নাগরিক সহায়তা কেন্দ্র' : currentLang === 'hi' ? 'स्वतंत्र नागरिक सेवा' : 'Independent Service Desk'}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="pb-20">
        <Routes>

          {/* ============================================================ */}
          {/* PAGE 1: HOME PAGE                                            */}
          {/* ============================================================ */}
          <Route path="/" element={
            <div className="space-y-12 animate-fade-in">
            {/* Hero Banner Section */}
            <section className="relative min-h-[400px] sm:min-h-[460px] bg-slate-950 flex items-center justify-center text-white overflow-hidden" id="hero-banner-section">
              {/* Background image with tint */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={redFortImg} 
                  alt="Red Fort New Delhi" 
                  className="w-full h-full object-cover object-center opacity-30 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-950/70"></div>
                
                {/* Stunning large rotating Ashoka Chakra */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
                  <AshokaChakra size="w-[380px] h-[380px] sm:w-[650px] sm:h-[650px]" className="text-blue-400" speed="100s" />
                </div>
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* National Emblem stylized badge */}
                  <div className="inline-flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg text-slate-100 select-none">
                    <IndianNationalFlag className="w-5 h-3.5 border border-white/20" />
                    <span className="text-orange-400 font-extrabold">{currentLang === 'bn' ? 'স্বাধীন নাগরিক সহায়তা কেন্দ্র' : currentLang === 'hi' ? 'स्वतंत्र नागरिक सेवा डेस्क' : 'Independent Citizen Service Desk of India'}</span>
                  </div>

                  {/* Tagline Heading */}
                  <div className="space-y-3">
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent pb-1 drop-shadow-sm" id="hero-heading">
                      {t.headerTitle}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-400 flex items-center justify-center gap-2 select-none" id="hero-project-subtitle">
                      <span className="w-4 sm:w-6 h-[1px] bg-orange-400/50"></span>
                      <span>This Project Under Citizen India</span>
                      <span className="w-4 sm:w-6 h-[1px] bg-orange-400/50"></span>
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-slate-300 italic tracking-wide">
                      "{t.homeSlogan}"
                    </p>
                  </div>

                  <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {tr(
                      'Committed to delivering transparent, secure, and fully verified public utility services and digital registrations directly to our esteemed citizens.',
                      'স্বচ্ছ, নিরাপদ এবং সম্পূর্ণ যাচাইকৃত জনপরিষেবা ও ডিজিটাল রেজিস্ট্রেশন সরাসরি নাগরিকদের কাছে পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ।',
                      'हमारे सम्मानित नागरिकों को पारदर्शी, सुरक्षित और पूर्णतः सत्यापित जन-उपयोगी सेवाएं एवं डिजिटल पंजीकरण सीधे प्रदान करने के लिए प्रतिबद्ध।'
                    )}
                  </p>

                  {/* CTA Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button 
                      onClick={() => navigateToPage('swachhta')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-700/30 border border-emerald-400/40 active:scale-95 cursor-pointer"
                      id="hero-cta-swachhta"
                    >
                      <Heart className="w-5 h-5 text-emerald-300" />
                      <span>
                        {tr(
                          'Swachhtar Pothe — Civic Initiative',
                          'স্বচ্ছতার পথে — নাগরিক উদ্যোগ দেখুন',
                          'स्वच्छता की राह — नागरिक पहल देखें'
                        )}
                      </span>
                    </button>
                    <button 
                      onClick={() => navigateToPage('schemes')}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
                      id="hero-cta-schemes"
                    >
                      <FileText className="w-5 h-5" />
                      <span>{tr('Browse Public Schemes', 'সরকারি স্কিম ও ফর্ম দেখুন', 'सरकारी योजनाएं एवं फॉर्म देखें')}</span>
                    </button>
                    <button 
                      onClick={() => navigateToPage('tracker')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
                      id="hero-cta-tracker"
                    >
                      <Search className="w-5 h-5" />
                      <span>{tr('Check Application Status', 'আবেদন স্ট্যাটাস ট্র্যাক করুন', 'आवेदन की स्थिति जांचें')}</span>
                    </button>
                    <button 
                      onClick={() => navigateToPage('contact')}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/20 backdrop-blur-sm active:scale-95 cursor-pointer"
                      id="hero-cta-contact"
                    >
                      <Building className="w-5 h-5" />
                      <span>{tr('Visit Support Desk', 'হেল্পলাইন ও সাপোর্ট হাব', 'हेल्पलाइन एवं सहायता केंद्र')}</span>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Saffron, White, Green bottom decorative bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
                <div className="bg-orange-500 w-1/3 h-full"></div>
                <div className="bg-white w-1/3 h-full"></div>
                <div className="bg-emerald-500 w-1/3 h-full"></div>
              </div>
            </section>

            {/* Contact Info Overview Card */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30" id="contact-cards-section">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-4 max-w-xl">
                    <div className="inline-block bg-orange-100 text-orange-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      {tr('Contact Support', 'যোগাযোগ ও সহায়তা', 'संपर्क एवं सहायता')}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                      {tr('Connect With Our Official Support Desk', 'আমাদের অফিসিয়াল সাপোর্ট ডেস্কের সাথে যোগাযোগ করুন', 'हमारे आधिकारिक सहायता डेस्क से जुड़ें')}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {t.contactSubtitle}
                    </p>
                  </div>

                  {/* Contact Channels Grid — Primary Email First, Secondary WhatsApp Second */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto grow">
                    {/* Primary Contact Method: Official Email Support */}
                    <a 
                      href={`mailto:${t.emailDesc}`} 
                      className="bg-blue-50/70 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5 shadow-sm"
                      id="contact-email-link"
                    >
                      <div className="bg-blue-700 text-white p-2.5 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{tr('Official Email Support', 'অফিসিয়াল ইমেল সাপোর্ট', 'आधिकारिक ईमेल सहायता')}</h4>
                          <span className="bg-blue-700 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">{tr('Primary & Recommended', 'প্রাথমিক ও প্রস্তাবিত', 'प्राथमिक एवं अनुशंसित')}</span>
                        </div>
                        <p className="text-blue-900 font-extrabold text-xs sm:text-sm truncate mt-1">{t.emailDesc}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">{tr('Recommended for all service, application & website queries', 'সমস্ত পরিষেবা, আবেদন ও ওয়েবসাইট সংক্রান্ত প্রশ্নের জন্য প্রস্তাবিত', 'सभी सेवा, आवेदन और वेबसाइट संबंधी प्रश्नों के लिए अनुशंसित')}</p>
                      </div>
                    </a>

                    {/* Secondary Contact Method: Official WhatsApp Support */}
                    <a 
                      href="https://wa.me/919836634843" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5"
                      id="contact-whatsapp-link"
                    >
                      <div className="bg-emerald-600 text-white p-2.5 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{tr('Official WhatsApp Support', 'অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট', 'आधिकारिक व्हाट्सएप सहायता')}</h4>
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">{tr('Alternative Channel', 'বিকল্প মাধ্যম', 'वैकल्पिक माध्यम')}</span>
                        </div>
                        <p className="text-emerald-700 font-extrabold text-sm mt-1">+91 9836634843</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{tr('For general questions & initial assistance', 'সাধারণ জিজ্ঞাসা ও প্রাথমিক সহায়তার জন্য', 'सामान्य प्रश्नों एवं प्रारंभिक सहायता के लिए')}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Prominent Important Update Notice on Homepage */}
                <div className="bg-slate-50/90 border border-slate-200/90 border-l-4 border-l-blue-800 rounded-xl p-4 sm:p-5 text-left" id="home-temporary-contact-notice">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded">
                        <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                        {tr('TEMPORARY UPDATE', 'সাময়িক আপডেট', 'अस्थायी अपडेट')}
                      </span>
                      <span className="inline-flex items-center bg-blue-950 text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded">
                        {tr('SERVICE NOTICE', 'পরিষেবা বিজ্ঞপ্তি', 'सेवा सूचना')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToPage('contact')}
                      className="text-[11px] font-bold text-blue-800 hover:text-blue-950 underline underline-offset-2 cursor-pointer"
                    >
                      {tr('Read Full Contact Notice →', 'সম্পূর্ণ যোগাযোগ বিজ্ঞপ্তি পড়ুন →', 'पूरी संपर्क सूचना पढ़ें →')}
                    </button>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight uppercase mb-1.5">
                    {tr(
                      'IMPORTANT UPDATE — TEMPORARY CONTACT ARRANGEMENT',
                      'গুরুত্বপূর্ণ আপডেট — সাময়িক যোগাযোগ ব্যবস্থা',
                      'महत्वपूर्ण अपडेट — अस्थायी संपर्क व्यवस्था'
                    )}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentLang === 'bn' ? (
                      <>
                        অনুগ্রহ করে লক্ষ্য করুন যে সিস্টেম ও যোগাযোগ ব্যবস্থার রক্ষণাবেক্ষণের কারণে আমাদের টেলিফোন হেল্পলাইন সাময়িকভাবে বন্ধ রয়েছে। এই সাময়িক ব্যবস্থায় যেকোনো সমস্যা, পরিষেবা সংক্রান্ত প্রশ্ন, আবেদন সংক্রান্ত সহায়তা, ওয়েবসাইট সহায়তা বা অভিযোগের জন্য <strong>অফিসিয়াল ইমেল সাপোর্ট (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> আমাদের <strong>প্রাথমিক এবং প্রস্তাবিত যোগাযোগ মাধ্যম</strong>। সাধারণ জিজ্ঞাসা ও প্রাথমিক সহায়তার জন্য বিকল্প মাধ্যম হিসেবে আমাদের <strong>অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">9836634843</a>)</strong> ব্যবহার করতে পারেন।
                      </>
                    ) : currentLang === 'hi' ? (
                      <>
                        कृपया ध्यान दें कि सिस्टम और संचार रखरखाव के कारण हमारी टेलीफोन हेल्पलाइन अस्थायी रूप से अनुपलब्ध है। इस अस्थायी व्यवस्था के दौरान, किसी भी समस्या, सेवा संबंधी प्रश्न, आवेदन समस्या, वेबसाइट सहायता या शिकायत के लिए <strong>आधिकारिक ईमेल सहायता (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> हमारा <strong>प्राथमिक और अनुशंसित संपर्क माध्यम</strong> है। सामान्य प्रश्नों और प्रारंभिक सहायता के लिए आप वैकल्पिक माध्यम के रूप में <strong>आधिकारिक व्हाट्सएप सहायता (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">9836634843</a>)</strong> पर भी संपर्क कर सकते हैं।
                      </>
                    ) : (
                      <>
                        Please note that our telephone helpline is temporarily unavailable due to ongoing system and communication maintenance. During this temporary arrangement, <strong>Official Email Support (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> is our <strong>primary and recommended contact method</strong> for any issue, service-related question, application-related problem, website-related assistance, complaint, or support request. You may also reach our <strong>Official WhatsApp Support (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">9836634843</a>)</strong> as an alternative channel for general questions and initial assistance.
                      </>
                    )}
                  </p>
                </div>

                {/* Support Note */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    {t.emailNote}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-[10px] tracking-wide uppercase shrink-0">
                    {currentLang === 'bn' ? 'স্বাধীন নাগরিক সহায়তা কেন্দ্র' : currentLang === 'hi' ? 'स्वतंत्र नागरिक सहायता' : 'Independent Citizen Facilitator'}
                  </span>
                </div>
              </div>
            </section>

            {/* Swachhtar Pothe Public-Awareness Initiative Banner on Home (Placed Above Tracker for Immediate Visibility) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-swachhtar-pothe-banner">
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-2xl shadow-xl border-2 border-emerald-600/60 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                    <span className="bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 rounded text-emerald-200">
                      {swachhtarPotheTranslations[currentLang]?.meta.homeBannerKicker}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-orange-300">This Project Is Under Citizen India</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {swachhtarPotheTranslations[currentLang]?.meta.homeBannerTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {swachhtarPotheTranslations[currentLang]?.meta.homeBannerDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToPage('swachhta')}
                  className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl transition-colors shadow-lg flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
                  id="home-open-swachhta-btn"
                >
                  <Heart className="w-4 h-4 text-emerald-950" />
                  <span>{swachhtarPotheTranslations[currentLang]?.meta.homeBannerCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Application Status Quick Lookup Box on Home */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded-2xl shadow-xl border border-emerald-800/40 p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
                      {tr('Real-Time Application Status', 'রিয়েল-টাইম আবেদন স্ট্যাটাস', 'वास्तविक समय आवेदन स्थिति')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      {tr('Track Application Verification Details', 'আবেদনের বর্তমান অবস্থা যাচাই করুন', 'आवेदन सत्यापन विवरण ट्रैक करें')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                      {tr(
                        'Access independent citizen application verification system to check real-time approvals, tracking history and official remarks.',
                        'আমাদের অনলাইন ভেরিফাইড ক্লাউড ট্র্যাকার সিস্টেম দিয়ে সরাসরি স্ট্যাটাস রিপোর্ট ও রিমার্কস জানুন।',
                        'वास्तविक समय अनुमोदन, ट्रैकिंग इतिहास और आधिकारिक टिप्पणियों की जांच करने के लिए स्वतंत्र नागरिक आवेदन सत्यापन प्रणाली का उपयोग करें।'
                      )}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateToPage('tracker')}
                    className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>{tr('Open Status Tracker Page', 'স্ট্যাটাস ট্র্যাকিং পেজে যান', 'स्टेटस ट्रैकर पेज खोलें')}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Cyber Security Quick Banner on Home */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 text-amber-950 rounded-xl font-black shrink-0">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {tr('Cyber Security Advisory & Hotline 1930', 'সাইবার নিরাপত্তা ও হেল্পলাইন ১৯৩০', 'साइबर सुरक्षा परामर्श एवं हेल्पलाइन 1930')}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {tr(
                        'Learn essential digital safety protocols and test your security awareness with our quiz.',
                        'অনলাইন ফ্রড বা জালিয়াতি থেকে কীভাবে নিজেকে রক্ষা করবেন জানতে আমাদের কুইজ দিন।',
                        'आवश्यक डिजिटल सुरक्षा प्रोटोकॉल जानें और हमारी प्रश्नोत्तरी के साथ अपनी सुरक्षा जागरूकता का परीक्षण करें।'
                      )}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigateToPage('cyber')}
                  className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shrink-0 cursor-pointer"
                >
                  {tr('Open Cyber Portal & Quiz', 'সাইবার পোর্টাল ও কুইজ খুলুন', 'साइबर पोर्टल और क्विज़ खोलें')}
                </button>
              </div>
            </section>

            {/* Portal Profile Preview on Home */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                    <img src={projectHeadImg} alt="Mr. Avi Mondal" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="bg-orange-100 text-orange-800 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">{tr('Project Leadership', 'প্রকল্প নেতৃত্ব', 'परियोजना नेतृत्व')}</span>
                    <h4 className="font-extrabold text-slate-900 text-base mt-1">{tr('Mr. Avi Mondal — Project Head', 'শ্রী অভি মন্ডল — প্রজেক্ট হেড', 'श्री अवि मंडल — प्रोजेक्ट हेड')}</h4>
                    <p className="text-xs text-slate-500">{currentLang === 'bn' ? 'স্বাধীন নাগরিক সহায়তা কেন্দ্র (Citizen Services Point)' : currentLang === 'hi' ? 'स्वतंत्र नागरिक सेवा केंद्र (Citizen Services Point)' : 'Independent Citizen Service Desk of India (Citizen Services Point)'}.</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigateToPage('about')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shrink-0 cursor-pointer"
                >
                  {tr('Read Portal Profile', 'পোর্টাল পরিচিতি পড়ুন', 'पोर्टल परिचय पढ़ें')}
                </button>
              </div>
            </section>
          </div>
        } />

        {/* ============================================================ */}
        {/* PAGE 2: APPLICATION STATUS TRACKER                           */}
        {/* ============================================================ */}
        <Route path="/tracker" element={
          <div className="animate-fade-in">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 scroll-mt-20" id="application-tracker-section">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
            {/* Rotating subtle Ashoka Chakra backdrop inside the tracker card for a video background watermark effect */}
            <div className="absolute -right-24 -bottom-24 pointer-events-none select-none opacity-[0.035] text-blue-900 overflow-hidden">
              <AshokaChakra size="w-[300px] h-[300px] md:w-[420px] md:h-[420px]" speed="90s" />
            </div>
            
            {/* Main Tracker Container with Clean Minimalist Header */}
            <div className="p-6 sm:p-8 lg:p-10 bg-slate-50/50 relative z-10">
              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Modern header based on selected language */}
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                    <span>
                      {currentLang === 'bn' ? 'রিয়েল-টাইম নাগরিক অনুসন্ধান ডেস্ক' : currentLang === 'hi' ? 'वास्तविक समय नागरिक पूछताछ डेस्क' : 'Real-Time Public Query Desk'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight" id="tracker-section-title">
                    {currentLang === 'bn' ? 'আবেদন স্ট্যাটাস অনুসন্ধান ব্যবস্থা' : currentLang === 'hi' ? 'आवेदन स्थिति जांच प्रणाली' : 'Application Status Checking System'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                    {currentLang === 'bn' 
                      ? 'আপনার রিয়েল-টাইম যাচাইকরণ স্ট্যাটাস ট্র্যাক করতে নিচে আপনার অফিসিয়াল আবেদন নম্বর দিন।' 
                      : currentLang === 'hi' 
                      ? 'अपनी वास्तविक समय सत्यापन स्थिति को ट्रैक करने के लिए नीचे अपनी आधिकारिक आवेदन संख्या दर्ज करें।' 
                      : 'Enter your official application number below to track your verification status in real-time.'}
                  </p>
                </div>

                {sheetFetchError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-900 text-xs font-medium flex gap-2.5">
                    <AlertTriangle className="w-4.5 h-4.5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-extrabold uppercase tracking-wider block text-[10px]">Service Connection Error</strong>
                      <p className="mt-0.5">{sheetFetchError}</p>
                    </div>
                  </div>
                )}
                
                {/* Search Form */}
                <form onSubmit={handleCheckStatus} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <label
                      htmlFor="status-track-input"
                      className="block text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide"
                      id="status-track-input-label"
                    >
                      {tr(
                        'Enter Official Application Number or Registered Mobile Number',
                        'অফিসিয়াল আবেদন নম্বর অথবা রেজিস্টার্ড মোবাইল নম্বর লিখুন',
                        'आधिकारिक आवेदन संख्या या पंजीकृत मोबाइल नंबर दर्ज करें'
                      )}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3.5">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="status-track-input"
                          type="text"
                          value={trackInput}
                          onChange={(e) => setTrackInput(e.target.value)}
                          placeholder={
                            currentLang === 'bn' ? 'আবেদন নম্বর বা রেজিস্টার্ড মোবাইল নম্বর লিখুন (যেমন: CITIZEN-0426-9495)...' : 
                            currentLang === 'hi' ? 'आवेदन संख्या या पंजीकृत मोबाइल नंबर दर्ज करें (जैसे: CITIZEN-0426-9495)...' : 
                            'ENTER OFFICIAL APPLICATION NUMBER OR REGISTERED MOBILE NUMBER...'
                          }
                          className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner uppercase tracking-wider"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isTracking || captchaLoading}
                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                      >
                        {isTracking ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Searching...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span>
                              {currentLang === 'bn' ? 'স্ট্যাটাস দেখুন' : currentLang === 'hi' ? 'स्थिति जांचें' : 'Check Status'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Server-Side CAPTCHA Security Verification Component */}
                  <div
                    className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
                    role="region"
                    aria-label="CAPTCHA Security Verification"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label
                        htmlFor="status-captcha-input"
                        className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 uppercase tracking-wider"
                      >
                        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          {currentLang === 'bn'
                            ? 'নিরাপত্তা যাচাইকরণ (Security CAPTCHA Verification) *'
                            : currentLang === 'hi'
                            ? 'सुरक्षा सत्यापन (Security CAPTCHA Verification) *'
                            : 'Security CAPTCHA Verification *'}
                        </span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCaptchaHighContrast(prev => !prev)}
                          className="text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                          aria-pressed={captchaHighContrast}
                          title="Toggle larger high-contrast security image for accessibility"
                        >
                          {captchaHighContrast ? 'Standard View' : 'Larger / High Contrast'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCaptchaError(null);
                            fetchCaptchaChallenge();
                          }}
                          disabled={captchaLoading || isTracking}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors disabled:opacity-50 cursor-pointer"
                          aria-label="Refresh CAPTCHA security code"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${captchaLoading ? 'animate-spin' : ''}`} />
                          <span>{currentLang === 'bn' ? 'নতুন কোড' : currentLang === 'hi' ? 'नया कोड' : 'New Code'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                      <div
                        className={`relative flex items-center justify-center rounded-xl border border-slate-300 bg-slate-100 overflow-hidden select-none shrink-0 ${
                          captchaHighContrast ? 'sm:w-64 h-20 contrast-150 brightness-95' : 'sm:w-56 h-16'
                        }`}
                      >
                        {captchaLoading ? (
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-4">
                            <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                            <span>Loading CAPTCHA...</span>
                          </div>
                        ) : captchaChallenge?.imageDataUrl && !captchaExpired ? (
                          <img
                            src={captchaChallenge.imageDataUrl}
                            alt="6-character security verification code"
                            className="w-full h-full object-contain pointer-events-none select-none"
                            draggable={false}
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={fetchCaptchaChallenge}
                            className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200 cursor-pointer"
                          >
                            Code Expired — Click to Load New CAPTCHA
                          </button>
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <input
                          id="status-captcha-input"
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="characters"
                          spellCheck={false}
                          maxLength={6}
                          value={captchaInput}
                          onChange={(e) => {
                            setCaptchaInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
                            if (captchaError) setCaptchaError(null);
                          }}
                          placeholder={
                            currentLang === 'bn'
                              ? '৬-অক্ষরের নিরাপত্তা কোডটি লিখুন...'
                              : currentLang === 'hi'
                              ? '6-अक्षरों का सुरक्षा कोड दर्ज करें...'
                              : 'ENTER 6-CHARACTER SECURITY CODE...'
                          }
                          aria-invalid={Boolean(captchaError)}
                          aria-describedby="captcha-helper-text"
                          className="block w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 font-mono font-extrabold text-sm tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                        <p id="captcha-helper-text" className="text-[11px] text-slate-500 font-medium" aria-live="polite">
                          {captchaExpired
                            ? 'Security code expired. Click "New Code" to generate a fresh code.'
                            : currentLang === 'bn'
                            ? 'বক্সে দেখানো ৬-অক্ষরের কোডটি হুবহু লিখুন (বড় বা ছোট হাতের অক্ষর যেকোনোটি হতে পারে)।'
                            : currentLang === 'hi'
                            ? 'बॉक्स में दिखाया गया 6-अक्षरों का सुरक्षा कोड दर्ज करें।'
                            : 'Type the 6 characters shown in the image to verify your status inquiry.'}
                        </p>
                      </div>
                    </div>

                    {captchaError && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-bold flex items-start gap-2"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{captchaError}</span>
                      </div>
                    )}
                  </div>
                </form>

                {/* Error Banner States */}
                <AnimatePresence mode="wait">
                  {trackError === 'invalid' && (
                    <motion.div
                      key="invalid"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 bg-red-50 border border-red-200 rounded-2xl flex gap-3.5 text-red-950 shadow-3xs"
                    >
                      <AlertTriangle className="w-5.5 h-5.5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold uppercase text-xs tracking-wider block">Format Error</strong>
                        <p className="text-xs font-semibold text-red-900 mt-1">
                          {currentLang === 'bn' ? 'অনুগ্রহ করে একটি সঠিক অফিসিয়াল আবেদন নম্বর অথবা ১০-সংখ্যার রেজিস্টার্ড মোবাইল নম্বর দিন।' : 
                           currentLang === 'hi' ? 'कृपया एक वैध आधिकारिक आवेदन संख्या या 10-अंकीय पंजीकृत मोबाइल नंबर दर्ज करें।' : 
                           'Please enter a valid Official Application Number (e.g. CITIZEN-0426-9495) or 10-digit Registered Mobile Number.'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {trackError === 'not_found' && (
                    <motion.div
                      key="not_found"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3.5 text-amber-950 shadow-3xs"
                    >
                      <ShieldAlert className="w-5.5 h-5.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold uppercase text-xs tracking-wider block text-amber-800">
                          {currentLang === 'bn' ? 'কোন তথ্য পাওয়া যায়নি' : currentLang === 'hi' ? 'कोई जानकारी नहीं मिली' : 'No Information Found'}
                        </strong>
                        <p className="text-xs font-semibold text-amber-900 mt-1 leading-relaxed">
                          {currentLang === 'bn' 
                            ? 'কোন তথ্য পাওয়া যায়নি। আপনি যদি ইতিমধ্যেই আবেদন করে থাকেন, অনুগ্রহ করে ২৪-৪৮ ঘণ্টা অপেক্ষা করুন, অন্যথায় শাখা বা হেল্পলাইনে যোগাযোগ করুন।' 
                            : currentLang === 'hi' 
                            ? 'कोई जानकारी नहीं मिली। यदि आपने पहले ही आवेदन कर दिया है, तो कृपया 24-48 घंटे प्रतीक्षा करें, अन्यथा शाखा या हेल्पलाइन से संपर्क करें।' 
                            : 'No information found. If you have already applied, please wait 24-48 hours, otherwise contact the branch or helpline.'}
                        </p>
                        <p className="text-[10px] text-amber-500/80 mt-1 font-medium font-mono">Code 404: Record not found in decentralized system.</p>
                      </div>
                    </motion.div>
                  )}

                  {trackError === 'mobile_ambiguous' && (
                    <motion.div
                      key="mobile_ambiguous"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 bg-amber-50 border border-amber-300 rounded-2xl flex gap-3.5 text-amber-950 shadow-3xs"
                    >
                      <Lock className="w-5.5 h-5.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold uppercase text-xs tracking-wider block text-amber-900">
                          {currentLang === 'bn'
                            ? 'একাধিক আবেদন পাওয়া গেছে — অ্যাপ্লিকেশন নম্বর প্রয়োজন'
                            : currentLang === 'hi'
                            ? 'एक से अधिक आवेदन मिले — आधिकारिक आवेदन संख्या आवश्यक है'
                            : 'Multiple Applications Found — Official Application Number Required'}
                        </strong>
                        <p className="text-xs font-semibold text-amber-900 mt-1 leading-relaxed">
                          {currentLang === 'bn'
                            ? 'নাগরিক তথ্যের গোপনীয়তা রক্ষার্থে, একই মোবাইল নম্বরে একাধিক আবেদন থাকলে মোবাইল নম্বর দিয়ে বিস্তারিত দেখানো হয় না। অনুগ্রহ করে আপনার নির্দিষ্ট অফিসিয়াল অ্যাপ্লিকেশন নম্বর (যেমন CITIZEN-XXXX-XXXX) দিয়ে স্ট্যাটাস চেক করুন।'
                            : currentLang === 'hi'
                            ? 'नागरिक डेटा गोपनीयता की सुरक्षा के लिए, एक ही मोबाइल नंबर से जुड़े कई आवेदन होने पर विवरण प्रदर्शित नहीं किया जाता है। कृपया अपनी विशिष्ट आधिकारिक आवेदन संख्या (जैसे CITIZEN-XXXX-XXXX) दर्ज करें।'
                            : 'Multiple applications are registered with this mobile number. To protect citizen privacy, please check status using your specific Official Application Number (e.g. CITIZEN-XXXX-XXXX).'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tracking Results Card */}
                <AnimatePresence>
                  {trackResult && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
                    >
                      {/* Sub-Header / Status Badge Banner */}
                      <div className="bg-slate-900 text-white px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">
                            {currentLang === 'bn' ? 'আবেদন আইডি (APPLICATION ID)' : currentLang === 'hi' ? 'आवेदन आईडी' : 'APPLICATION ID'}
                          </span>
                          <span className="font-mono font-black text-sm text-orange-400 tracking-wider">
                            {trackResult.applicationId || trackResult.applicationNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest hidden sm:inline-block">
                            {currentLang === 'bn' ? 'স্ট্যাটাস:' : currentLang === 'hi' ? 'स्थिति:' : 'STATUS:'}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border ${
                            trackResult.statusCode === 'approved' 
                              ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400' 
                              : trackResult.statusCode === 'processing'
                              ? 'bg-blue-500/10 border-blue-500/35 text-blue-400'
                              : trackResult.statusCode === 'rejected'
                              ? 'bg-rose-500/10 border-rose-500/35 text-rose-400'
                              : 'bg-amber-500/10 border-amber-500/35 text-amber-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              trackResult.statusCode === 'approved' 
                                ? 'bg-emerald-400' 
                                : trackResult.statusCode === 'processing'
                                ? 'bg-blue-400'
                                : trackResult.statusCode === 'rejected'
                                ? 'bg-rose-400'
                                : 'bg-amber-400'
                            } animate-pulse`}></span>
                            {trackResult.applicationStatus || trackResult.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Details Grid displaying all 8 columns */}
                      <div className="p-6 sm:p-8 space-y-6">
                        
                        {/* 8 Field Summary Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* 1. Application ID */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '১. অ্যাপ্লিকেশন নম্বর (Application ID)' : currentLang === 'hi' ? '1. आवेदन आईडी (Application ID)' : '1. Application ID'}
                            </span>
                            <span className="text-sm font-extrabold font-mono text-slate-900">
                              {trackResult.applicationId || trackResult.applicationNo}
                            </span>
                          </div>

                          {/* 2. Govt. Reference No. */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '২. সরকারি রেফারেন্স নম্বর (Govt. Ref. No.)' : currentLang === 'hi' ? '2. सरकारी संदर्भ संख्या (Govt. Ref. No.)' : '2. Govt. Reference No.'}
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {trackResult.govtRefNo || 'N/A'}
                            </span>
                          </div>

                          {/* 3. Applicant Name */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৩. আবেদনকারীর নাম (Applicant Name)' : currentLang === 'hi' ? '3. आवेदक का नाम (Applicant Name)' : '3. Applicant Name'}
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {trackResult.applicantName || 'N/A'}
                            </span>
                          </div>

                          {/* 4. Mobile No. */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৪. মোবাইল নম্বর (Mobile No.)' : currentLang === 'hi' ? '4. मोबाइल नंबर (Mobile No.)' : '4. Mobile No.'}
                            </span>
                            <span className="text-sm font-extrabold font-mono text-slate-900">
                              {trackResult.mobileNo || 'N/A'}
                            </span>
                          </div>

                          {/* 5. Full Address */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1 md:col-span-2">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৫. সম্পূর্ণ ঠিকানা (Full Address)' : currentLang === 'hi' ? '5. पूरा पता (Full Address)' : '5. Full Address'}
                            </span>
                            <span className="text-sm font-bold text-slate-800 leading-relaxed block">
                              {trackResult.fullAddress || 'N/A'}
                            </span>
                          </div>

                          {/* 6. Scheme / Service Name */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৬. স্কিম / সেবার নাম (Scheme / Service Name)' : currentLang === 'hi' ? '6. योजना / सेवा का नाम (Scheme / Service Name)' : '6. Scheme / Service Name'}
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {trackResult.schemeName || 'N/A'}
                            </span>
                          </div>

                          {/* 7. Application Date */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৭. আবেদনের তারিখ (Application Date)' : currentLang === 'hi' ? '7. आवेदन तिथि (Application Date)' : '7. Application Date'}
                            </span>
                            <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                              {trackResult.applicationDate || 'N/A'}
                            </span>
                          </div>

                          {/* 8. Application Status */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1 md:col-span-2">
                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">
                              {currentLang === 'bn' ? '৮. আবেদনের বর্তমান অবস্থা (Application Status)' : currentLang === 'hi' ? '8. आवेदन स्थिति (Application Status)' : '8. Application Status'}
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              {trackResult.applicationStatus || trackResult.status || 'N/A'}
                            </span>
                          </div>

                        </div>

                        {/* Custom Sheet Remarks - only rendered if present and not empty */}
                        {trackResult.remarks && (
                          <div className="p-4 rounded-xl bg-orange-50/40 border border-orange-100 flex gap-3 text-xs text-orange-950">
                            <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <strong className="font-extrabold uppercase block tracking-wider">
                                {currentLang === 'bn' ? 'অফিস মন্তব্য / রিমার্কস' : currentLang === 'hi' ? 'कार्यालय टिप्पणी / रिमार्क्स' : 'Office Remarks'}
                              </strong>
                              <p className="mt-0.5 font-medium leading-relaxed">
                                {trackResult.remarks}
                              </p>
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Saffron, White, Green bottom decorative bar */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-500" />
                <span>SSL Encrypted Connection Secured.</span>
              </span>
              <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
                National Portal Reference Code: CITIZEN-INDIA-TRACK-V1
              </span>
            </div>
          </div>
        </section>
      </div>
    } />
    <Route path="/application-status" element={<Navigate to="/tracker" replace />} />

        {/* ============================================================ */}
        {/* PAGE 3: CUSTOMER SERVICE REQUEST FORM                        */}
        {/* ============================================================ */}
        <Route path="/service-request" element={
          <div className="animate-fade-in">
            <CustomerServiceRequestForm 
              logoImg={headerLogoImg}
              currentLang={currentLang}
              onNavigateToTracker={(appNum) => {
                setTrackInput(appNum);
                navigateToPage('tracker');
              }}
            />
          </div>
        } />
        <Route path="/form" element={<Navigate to="/service-request" replace />} />

        {/* ============================================================ */}
        {/* PAGE 3: GOVERNMENT SCHEMES & FORMS                           */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* PAGE 3: OFFLINE FORMS & GOVERNMENT SERVICES                  */}
        {/* ============================================================ */}
        <Route path="/schemes" element={
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8 pb-12" id="offline-forms-section">
            
            {/* Header Banner */}
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute left-1/3 bottom-0 w-80 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold text-[10px] sm:text-xs tracking-widest uppercase px-3 py-1 rounded-full shadow-2xs">
                  <FileText className="w-3.5 h-3.5" />
                  <span>OFFICIAL DOWNLOAD CENTRE</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight" id="schemes-section-title">
                  {currentLang === 'bn' 
                    ? 'অফলাইন ফর্ম এবং সরকারি পরিষেবা (OFFLINE FORMS & GOVERNMENT SERVICES)' 
                    : currentLang === 'hi' 
                    ? 'ऑफलाइन फॉर्म एवं सरकारी सेवाएं (OFFLINE FORMS & GOVERNMENT SERVICES)' 
                    : 'OFFLINE FORMS & GOVERNMENT SERVICES'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {currentLang === 'bn'
                    ? 'সরকারি প্রকল্প, পারিবারিক নাগরিক তথ্য সংগ্রহ এবং সেবা অনুরোধের জন্য অফিসিয়াল অফলাইন ফর্ম ও ডিরেক্টরি পিডিএফ সংকলন।'
                    : currentLang === 'hi'
                    ? 'सरकारी योजनाओं, पारिवारिक नागरिक डेटा संग्रह और सेवा अनुरोधों के लिए आधिकारिक ऑफलाइन फॉर्म एवं निर्देशिका पीडीएफ।'
                    : 'Download official application forms, scholarship directories, and customer service request templates directly from our verified cloud portal.'}
                </p>
              </div>
            </div>

            {/* Offline Forms Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Form 1: COMPREHENSIVE FAMILY DATA & GOVERNMENT SCHEMES APPLICATION FORM */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                      FORM 01 • COMBINED
                    </span>
                    <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded uppercase font-mono">PDF DOCUMENT</span>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-black group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug pt-1">
                      {tr(
                        'COMPREHENSIVE FAMILY DATA & GOVERNMENT SCHEMES APPLICATION FORM',
                        'পারিবারিক তথ্য ও সরকারি প্রকল্পের সমন্বিত আবেদনপত্র',
                        'व्यापक पारिवारिक डेटा एवं सरकारी योजना आवेदन पत्र'
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {currentLang === 'bn'
                        ? 'পারিবারিক তথ্য সংগ্রহ, নতুন সরকারি স্কিম রেজিস্ট্রেশন এবং ভেরিফিকেশনের জন্য সমন্বিত অফলাইন আবেদনপত্র।'
                        : currentLang === 'hi'
                        ? 'पारिवारिक डेटा एकत्र करने, नई सरकारी योजनाओं के पंजीकरण और सत्यापन के लिए संयुक्त आवेदन पत्र।'
                        : 'Comprehensive multi-purpose verification template for state & central government scheme registrations.'}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('State & Central Schemes Coverage', 'রাজ্য ও কেন্দ্রীয় প্রকল্পের জন্য প্রযোজ্য', 'राज्य एवं केंद्रीय योजनाओं के लिए लागू')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('Print-Ready HD Format', 'প্রিন্টযোগ্য হাই-কোয়ালিটি পিডিএফ', 'प्रिंट-योग्य उच्च-गुणवत्ता पीडीएफ')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                  <a 
                    href="https://drive.google.com/file/d/1cbnyp06YMqV1JxzyNj_nsYYN4zVlVjW_/view?usp=drivesdk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{tr('Download / View PDF', 'পিডিএফ ডাউনলোড / দেখুন', 'पीडीएफ डाउनलोड / देखें')}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Form 2: GOVERNMENT SCHEMES & SCHOLARSHIPS DIRECTORY */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      FORM 02 • DIRECTORY
                    </span>
                    <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded uppercase font-mono">PDF DOCUMENT</span>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Building className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug pt-1">
                      {tr(
                        'GOVERNMENT SCHEMES & SCHOLARSHIPS DIRECTORY',
                        'সরকারি প্রকল্প ও স্কলারশিপ নির্দেশিকা ডিরেক্টরি',
                        'सरकारी योजनाएं एवं छात्रवृत्ति निर्देशिका'
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {currentLang === 'bn'
                        ? 'পশ্চিমবঙ্গ রাজ্য ও কেন্দ্রীয় সরকারের সমস্ত সক্রিয় প্রকল্প, স্কলারশিপ ও যোগ্যতার পূর্ণাঙ্গ নির্দেশিকা বই।'
                        : currentLang === 'hi'
                        ? 'पश्चिम बंगाल और केंद्र सरकार की सभी सक्रिय योजनाओं, छात्रवृत्तियों और पात्रता की निर्देशिका पुस्तिका।'
                        : 'Official comprehensive reference guide containing eligibility criteria, benefits, and guidelines for all schemes.'}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('Scholarships & Grants Catalogue', 'স্কলারশিপ ও অনুদানের সম্পূর্ণ তালিকা', 'छात्रवृत्ति एवं अनुदान सूची')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('Official Eligibility Criteria Guidelines', 'অফিসিয়াল যোগ্যতার ধাপসমূহ সহ', 'आधिकारिक पात्रता मानदंड दिशा-निर्देश')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                  <a 
                    href="https://drive.google.com/file/d/1zvkSJo4Y_QT9T0oTrURb--4MUACkcysQ/view?usp=drivesdk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{tr('Download / View PDF', 'পিডিএফ ডাউনলোড / দেখুন', 'पीडीएफ डाउनलोड / देखें')}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Form 3: CUSTOMER SERVICE REQUEST FORM */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      FORM 03 • SERVICE REQUEST
                    </span>
                    <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2 py-0.5 rounded uppercase font-mono">PDF DOCUMENT</span>
                  </div>

                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug pt-1">
                      {tr(
                        'CUSTOMER SERVICE REQUEST FORM',
                        'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম (অফলাইন পিডিএফ)',
                        'ग्राहक सेवा अनुरोध फॉर्म (ऑफलाइन पीडीएफ)'
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {currentLang === 'bn'
                        ? 'নতুন পরিষেবা অনুরোধ, নথি সংশোধনী, আবেদন স্টেটাস রিকুয়েস্ট এবং সাপোর্ট ডেস্ক ফর্ম।'
                        : currentLang === 'hi'
                        ? 'नई सेवा अनुरोध, डेटा संशोधन, आवेदन स्थिति अनुरोध और सहायता डेस्क फॉर्म।'
                        : 'Official offline customer helpdesk form for new service requests, document corrections, and support inquiries.'}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('Document Correction & Modifications', 'নথি সংশোধন ও রিকুয়েস্ট সাপোর্ট', 'दस्तावेज़ सुधार एवं संशोधन सहायता')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{tr('Direct Helpline Processing', 'দ্রুত হেল্পডেস্ক সাবমিশন', 'त्वरित हेल्पडेस्क प्रसंस्करण')}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                  <a 
                    href="https://drive.google.com/file/d/1Ov5Mx8kCwPoAWgLTcDSJGMhNg52QcahN/view?usp=drivesdk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{tr('Download / View PDF', 'পিডিএফ ডাউনলোড / দেখুন', 'पीडीएफ डाउनलोड / देखें')}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

            </div>

            {/* Official Support Notice Box */}
            <div className="bg-gradient-to-r from-orange-50 via-white to-blue-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white p-3.5 rounded-xl shadow-sm shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">
                    {tr(
                      'Need Assistance Filling Out These Offline Forms?',
                      'আবেদনপত্র জমা ও সহায়তার জন্য নিবেদিত ডেস্কে যোগাযোগ করুন',
                      'इन ऑफलाइन फॉर्मों को भरने या जमा करने में सहायता चाहिए?'
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium max-w-2xl leading-relaxed">
                    {t.schemesNote}
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <a 
                  href={`mailto:${t.emailDesc}`} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>{tr('Email Support (Primary)', 'ইমেল সাপোর্ট (প্রাথমিক)', 'ईमेल सहायता (प्राथमिक)')}</span>
                </a>
                <a 
                  href="https://wa.me/919836634843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{tr('WhatsApp: 9836634843', 'হোয়াটসঅ্যাপ: 9836634843', 'व्हाट्सएप: 9836634843')}</span>
                </a>
              </div>
            </div>

          </div>
        } />
        <Route path="/government-schemes" element={<Navigate to="/schemes" replace />} />
        <Route path="/services" element={<Navigate to="/schemes" replace />} />
        <Route path="/offline-forms" element={<Navigate to="/schemes" replace />} />

        {/* ============================================================ */}
        {/* PAGE 4: ABOUT PORTAL & LEADERSHIP                            */}
        {/* ============================================================ */}
        <Route path="/about" element={
          <div className="animate-fade-in space-y-12">
            {/* About Us, Mission, Transparency & Commitments Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" id="about-us-section">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-block bg-slate-100 text-slate-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {t.aboutUsTitle}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {t.aboutUsSubtitle}
            </h3>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              {t.aboutUsContent}
            </p>
          </div>

          {/* Prominent Important Note & Official Disclaimer Box */}
          <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-8 text-slate-900 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-3 bg-amber-500 text-amber-950 rounded-xl font-black shrink-0 mt-0.5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="bg-amber-900 text-amber-50 font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">
                    {t.importantNoteTitle}
                  </span>
                  <span className="text-amber-800 font-bold text-xs">
                    {currentLang === 'bn' ? 'স্বতন্ত্র ও অরাজনৈতিক নাগরিক সংস্থা' : currentLang === 'hi' ? 'स्वतंत्र एवं गैर-राजनीतिक संगठन' : 'Independent & Non-Political Organization'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {t.importantNote}
                </p>
              </div>
            </div>
          </div>

          {/* Core Philosophy & Non-Political Stance Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-orange-500/30">
                <Heart className="w-3.5 h-3.5 text-orange-400" />
                <span>{t.corePhilosophyTitle}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                "{t.tagline}"
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {t.corePhilosophyContent}
              </p>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Mission Statement Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-orange-200 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-base shadow-3xs">
                M
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                {t.missionTitle}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {t.missionContent}
              </p>
            </div>

            {/* Upcoming Initiative: Government School Financial Aid */}
            <div className="bg-gradient-to-br from-indigo-950/95 via-slate-900 to-indigo-900 text-white rounded-2xl shadow-md border border-indigo-500/30 p-6 sm:p-7 space-y-4 relative overflow-hidden group hover:border-indigo-400 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-base border border-indigo-400/30">
                  🏫
                </div>
                <span className="bg-indigo-500/20 text-indigo-200 font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-indigo-400/30">
                  {currentLang === 'bn' ? 'আসন্ন প্রকল্প' : currentLang === 'hi' ? 'आगामी परियोजना' : 'UPCOMING INITIATIVE'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-indigo-100 uppercase tracking-wide">
                {t.schoolAidTitle}
              </h4>
              <p className="text-indigo-200/80 text-xs sm:text-sm leading-relaxed font-normal">
                {t.schoolAidDesc}
              </p>
            </div>

            {/* Digital Inclusion & Cyber Safety */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-emerald-200 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base shadow-3xs">
                🛡️
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                {t.digitalInclusionTitle}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {t.digitalInclusionDesc}
              </p>
            </div>

            {/* Transparency Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-blue-200 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base shadow-3xs">
                T
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                {t.transparencyTitle}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {t.transparencyContent}
              </p>
            </div>

            {/* Commitment and Security Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-emerald-200 transition-colors duration-300 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base shadow-3xs">
                S
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                {t.commitmentTitle}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                {t.commitmentContent}
              </p>
            </div>

          </div>

          {/* Project Leadership Section with Avi Mondal Portrait */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 mt-8 hover:border-slate-300 transition-all duration-300" id="leadership-showcase">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Image Column */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-md border-4 border-slate-50 group">
                  <img 
                    src={projectHeadImg} 
                    alt="Mr. Avi Mondal - Project Head" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    id="avi-portrait-img"
                  />
                  {/* Watermark badge */}
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/85 backdrop-blur-sm p-3 text-center border-t border-white/15">
                    <h5 className="font-extrabold text-sm text-white tracking-wide">MR. AVI MONDAL</h5>
                    <p className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest mt-0.5">{t.projectHead}</p>
                  </div>
                </div>
              </div>

              {/* Text / Leadership Details Column */}
              <div className="md:col-span-8 space-y-5">
                <div className="inline-block bg-orange-50 text-orange-700 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                  {tr('PROJECT LEADERSHIP & VISION', 'প্রকল্প নেতৃত্ব ও দূরদর্শিতা', 'परियोजना नेतृत्व एवं दृष्टिकोण')}
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {tr('Under the Leadership of Mr. Avi Mondal', 'শ্রী অভি মন্ডলের নেতৃত্বে পরিচালিত', 'श्री अवि मंडल के नेतृत्व में संचालित')}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-normal italic">
                  "{t.leadershipContent}"
                </p>

                {/* Quote block */}
                <div className="border-l-4 border-orange-500 pl-4 py-1.5 bg-orange-50/50 rounded-r-xl">
                  <p className="text-orange-950 font-extrabold text-xs sm:text-sm tracking-wide">
                    {t.leadershipQuote}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-bold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span>{tr('Verified Citizen Companion Platform', 'যাচাইকৃত নাগরিক সহায়তা প্ল্যাটফর্ম', 'सत्यापित नागरिक सहायता मंच')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* National Symbols & Patriotic Freedom Hero Showcase */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" id="national-heritage-inspiration">
            
            {/* National Animal: Royal Bengal Tiger Card */}
            <div className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group hover:border-amber-400/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={tigerImg} 
                  alt="Royal Bengal Tiger - National Animal of India" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 bg-amber-500/90 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  INDIA
                </span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{tr('NATIONAL ANIMAL OF INDIA', 'ভারতের জাতীয় পশু', 'भारत का राष्ट्रीय पशु')}</span>
                </div>
                <h4 className="text-lg font-black text-amber-200 tracking-wide">
                  {tr('Royal Bengal Tiger', 'রয়্যাল বেঙ্গল টাইগার', 'रॉयल बंगाल टाइगर')}
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {tr(
                    "Symbolizing grace, courage, agility and power — representing India's rich natural heritage and national pride.",
                    'সৌন্দর্য, সাহস, ক্ষিপ্রতা ও শক্তির প্রতীক — ভারতের সমৃদ্ধ প্রাকৃতিক ঐতিহ্য ও জাতীয় গৌরবের প্রতিফলন।',
                    'गरिमा, साहस, फुर्ती और शक्ति का प्रतीक — भारत की समृद्ध प्राकृतिक विरासत और राष्ट्रीय गौरव का प्रतिनिधित्व।'
                  )}
                </p>
              </div>
            </div>

            {/* Freedom Icon: Netaji Subhas Chandra Bose Card */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-orange-500/30 shadow-lg flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group hover:border-orange-400/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-orange-400/60 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={netajiImg} 
                  alt="Netaji Subhas Chandra Bose" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 bg-orange-500/90 text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  JAI HIND
                </span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 font-extrabold text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  <Award className="w-3 h-3 text-orange-400" />
                  <span>{tr('PATRIOTIC FREEDOM HERO', 'দেশপ্রেমিক স্বাধীনতা সংগ্রামী', 'देशभक्त स्वतंत्रता सेनानी')}</span>
                </div>
                <h4 className="text-lg font-black text-white tracking-wide">
                  {tr('Netaji Subhas Chandra Bose', 'নেতাজি সুভাষচন্দ্র বসু', 'नेताजी सुभाष चंद्र बोस')}
                </h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {tr(
                    '"Give me blood, and I shall give you freedom!" — Immortal leader of the Azad Hind Fauj, inspiring patriotic public service.',
                    '"তোমরা আমাকে রক্ত দাও, আমি তোমাদের স্বাধীনতা দেব!" — আজাদ হিন্দ ফৌজের অমর সর্বাধিনায়ক এবং দেশপ্রেমিক জনসেবার অনুপ্রেরণা।',
                    '"तुम मुझे खून दो, मैं तुम्हें आज़ादी दूंगा!" — आज़ाद हिंद फौज के अमर नायक और देशभक्तिपूर्ण जनसेवा के प्रेरणास्रोत।'
                  )}
                </p>
              </div>
            </div>

          </div>
        </section>
          </div>
        } />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />

        {/* ============================================================ */}
        {/* PAGE 5: CYBER SAFETY & SECURITY HUB                          */}
        {/* ============================================================ */}
        <Route path="/cyber-safety" element={
          <div className="animate-fade-in space-y-12">
            {/* National Trust and Sovereignty Showcase section featuring Red Fort */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" id="national-trust-section">
          <div className="bg-slate-950 text-white rounded-3xl overflow-hidden relative shadow-xl border border-slate-800">
            <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Top tri-color border decoration */}
            <div className="h-1 flex w-full">
              <div className="bg-[#FF9933] w-1/3 h-full"></div>
              <div className="bg-[#FFFFFF] w-1/3 h-full"></div>
              <div className="bg-[#138808] w-1/3 h-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Text Column */}
              <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full w-fit">
                  <Award className="w-3.5 h-3.5 text-orange-400" />
                  <span>Sovereign Public Trust Initiative</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  {t.physicalBranchTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {t.physicalBranchSubtitle}
                </p>

                {/* National Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-orange-400">{t.feature1Title}</h4>
                    <p className="text-slate-400 text-[11px] leading-normal">{t.feature1Desc}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white">{t.feature2Title}</h4>
                    <p className="text-slate-400 text-[11px] leading-normal">{t.feature2Desc}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-emerald-400">{t.feature3Title}</h4>
                    <p className="text-slate-400 text-[11px] leading-normal">{t.feature3Desc}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 pt-2 italic">
                  "{t.physicalBranchFooter}"
                </p>
              </div>

              {/* Image Column: Red Fort */}
              <div className="lg:col-span-5 relative min-h-[300px] overflow-hidden group">
                <img 
                  src={redFortImg} 
                  alt="Historic Red Fort of India - Sovereign Trust and National Identity" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent hidden lg:block"></div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>
                
                {/* Indian Tricolor Pride Accent Stamp */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800/80">
                  <IndianNationalFlag className="w-3.5 h-2.5 border border-white/10" />
                  <span className="text-[8px] text-slate-300 font-extrabold tracking-widest uppercase">SOVEREIGN TRUST</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-[10px] text-orange-300 font-extrabold px-3 py-1.5 rounded-lg border border-orange-500/30 uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span>India's Proud Red Fort</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Cyber Safety Center (Quiz & Tips) (English Only) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="cyber-safety-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Cyber Tips */}
            <div className="lg:col-span-6 bg-amber-50 rounded-2xl shadow-sm border border-amber-200/60 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-500 text-amber-950 p-2.5 rounded-lg shadow">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-950">
                      {t.cyberSafetyTitle}
                    </h3>
                    <p className="text-xs text-amber-900 mt-0.5 font-semibold">
                      {t.cyberSafetySubtitle}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3.5" id="cyber-tips-list">
                  {t.cyberSafetyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs text-amber-950 font-medium">
                      <span className="w-5 h-5 rounded bg-amber-200/80 border border-amber-300 text-amber-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-amber-950 font-black tracking-wide bg-amber-200 px-3 py-1 rounded-md">
                  {tr('CYBER ALERTS HELPLINE: Dial 1930', 'সাইবার ক্রাইম হেল্পলাইন: ১৯৩০ ডায়াল করুন', 'साइबर अलर्ट हेल्पलाइन: 1930 डायल करें')}
                </span>
                <span className="text-slate-500 text-[10px] italic">
                  {t.cyberSafetyFooter}
                </span>
              </div>
            </div>

            {/* Right: Interactive Cyber Safety Quiz */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-800 p-6 sm:p-8 flex flex-col justify-between" id="cyber-safety-quiz-card">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-600 text-white p-2.5 rounded-lg shadow-md shadow-blue-500/10">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {tr('Cyber Safety Training Quiz', 'সাইবার নিরাপত্তা প্রশিক্ষণ কুইজ', 'साइबर सुरक्षा प्रशिक्षण क्विज़')}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {tr(
                        'Test your knowledge and earn your "Cyber Safe Citizen" Badge',
                        'আপনার সচেতনতা যাচাই করুন এবং "সাইবার সুরক্ষিত নাগরিক" ব্যাজ অর্জন করুন',
                        'अपने ज्ञान का परीक्षण करें और "साइबर सुरक्षित नागरिक" बैज प्राप्त करें'
                      )}
                    </p>
                  </div>
                </div>

                {!quizStarted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
                      <Award className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-sm text-slate-200">
                        {tr('Ready to test your safety IQ?', 'আপনার সাইবার নিরাপত্তা সচেতনতা যাচাই করতে প্রস্তুত?', 'क्या आप अपनी सुरक्षा जागरूकता परखने के लिए तैयार हैं?')}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        {tr(
                          'Take our quick 3-question quiz to ensure you are safe from financial and identity frauds.',
                          'আর্থিক ও পরিচয় জালিয়াতি থেকে নিজেকে সুরক্ষিত রাখতে আমাদের ৩টি প্রশ্নের সংক্ষিপ্ত কুইজে অংশ নিন।',
                          'वित्तीय और पहचान धोखाधड़ी से सुरक्षित रहने के लिए हमारे 3-प्रश्नों के त्वरित क्विज़ में भाग लें।'
                        )}
                      </p>
                    </div>
                    <button 
                      onClick={startQuiz}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all uppercase tracking-wider"
                    >
                      {tr('Start Quiz', 'কুইজ শুরু করুন', 'क्विज़ शुरू करें')}
                    </button>
                  </div>
                ) : quizFinished ? (
                  <div className="text-center py-10 space-y-5" id="quiz-result-container">
                    <div className="w-20 h-20 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                      <Award className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-extrabold text-lg text-emerald-400">
                        {tr('Congratulations!', 'অভিনন্দন!', 'बधाई हो!')}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {tr(
                          `You scored ${quizScore} out of ${quizQuestions.length}.`,
                          `আপনি ${quizQuestions.length}-এর মধ্যে ${quizScore} পেয়েছেন।`,
                          `आपने ${quizQuestions.length} में से ${quizScore} अंक प्राप्त किए।`
                        )}
                      </p>
                      {quizScore === quizQuestions.length ? (
                        <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mt-2">
                          {tr('🏆 Certified Cyber-Safe Citizen', '🏆 সার্টিফায়েড সাইবার-সুরক্ষিত নাগরিক', '🏆 प्रमाणित साइबर-सुरक्षित नागरिक')}
                        </span>
                      ) : (
                        <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mt-2">
                          {tr('Keep Learning! Safety First', 'সচেতন থাকুন! নিরাপত্তা সবার আগে', 'सीखते रहें! सुरक्षा सर्वोपरि')}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={startQuiz}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-lg text-xs border border-slate-700 transition-colors"
                      >
                        {tr('Try Again', 'আবার চেষ্টা করুন', 'पुनः प्रयास करें')}
                      </button>
                      <button 
                        onClick={() => setQuizStarted(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors"
                      >
                        {tr('Exit', 'প্রস্থান করুন', 'बाहर निकलें')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4" id="quiz-question-box">
                    {/* Progress */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{tr(`Question ${currentQuestion + 1} of ${quizQuestions.length}`, `প্রশ্ন ${currentQuestion + 1} / ${quizQuestions.length}`, `प्रश्न ${currentQuestion + 1} / ${quizQuestions.length}`)}</span>
                      <span>{tr(`Score: ${quizScore}`, `স্কোর: ${quizScore}`, `स्कोर: ${quizScore}`)}</span>
                    </div>

                    {/* Question text */}
                    <h4 className="font-bold text-sm text-slate-100 leading-relaxed">
                      {quizQuestions[currentQuestion].question}
                    </h4>

                    {/* Option buttons */}
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion].options.map((option, idx) => {
                        const isCorrect = idx === quizQuestions[currentQuestion].correctIndex;
                        const isSelected = selectedAnswer === idx;
                        let btnStyle = "bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700";
                        
                        if (selectedAnswer !== null) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-500/20 text-rose-400 border-rose-500/40";
                          } else {
                            btnStyle = "bg-slate-800/40 text-slate-500 border-slate-800/80 pointer-events-none";
                          }
                        }

                        return (
                          <button 
                            key={idx}
                            onClick={() => handleAnswerSelect(idx)}
                            disabled={selectedAnswer !== null}
                            className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all ${btnStyle}`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="font-mono text-[10px] text-slate-400 mt-0.5 shrink-0 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="leading-relaxed">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {selectedAnswer !== null && (
                      <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                        <p className="font-extrabold text-white flex items-center gap-1">
                          {selectedAnswer === quizQuestions[currentQuestion].correctIndex ? (
                            <span className="text-emerald-400">{tr('✓ Correct Answer', '✓ সঠিক উত্তর', '✓ सही उत्तर')}</span>
                          ) : (
                            <span className="text-rose-400">{tr('✗ Incorrect Answer', '✗ ভুল উত্তর', '✗ गलत उत्तर')}</span>
                          )}
                        </p>
                        <p className="leading-relaxed font-normal">
                          {quizQuestions[currentQuestion].explanation}
                        </p>
                        <div className="pt-2 text-right">
                          <button 
                            onClick={nextQuestion}
                            className="bg-slate-700 hover:bg-slate-650 text-white font-bold py-1.5 px-3 rounded text-[10px] transition-colors"
                          >
                            {currentQuestion === quizQuestions.length - 1
                              ? tr('Finish Quiz', 'কুইজ শেষ করুন', 'क्विज़ समाप्त करें')
                              : tr('Next Question', 'পরবর্তী প্রশ্ন', 'अगला प्रश्न')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quiz Security Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>{tr('Independent Citizen Security Awareness Module', 'স্বতন্ত্র নাগরিক সচেতনতা মডিউল', 'स्वतंत्र नागरिक सुरक्षा जागरूकता मॉड्यूल')}</span>
              </div>
            </div>

          </div>
        </section>
          </div>
        } />
        <Route path="/cyber" element={<Navigate to="/cyber-safety" replace />} />

        {/* ============================================================ */}
        {/* PAGE 6: CONTACT, HELPLINES & SERVICE JURISDICTION            */}
        {/* ============================================================ */}
        <Route path="/contact" element={
          <div className="animate-fade-in space-y-12">
            {/* Contact Info Overview Card & Prominent Important Update Notice */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8" id="contact-cards-section">
              {/* Dedicated Prominent "Important Update" Notice Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative" id="important-update-contact-arrangement">
                <div className="h-1.5 w-full flex">
                  <div className="bg-[#FF9933] w-1/3 h-full"></div>
                  <div className="bg-blue-900 w-1/3 h-full"></div>
                  <div className="bg-[#138808] w-1/3 h-full"></div>
                </div>
                <div className="p-6 sm:p-8 lg:p-10 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      {tr('TEMPORARY UPDATE', 'সাময়িক আপডেট', 'अस्थायी अपडेट')}
                    </span>
                    <span className="inline-flex items-center bg-blue-950 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-md">
                      {tr('SERVICE NOTICE', 'পরিষেবা বিজ্ঞপ্তি', 'सेवा सूचना')}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {tr(
                      'IMPORTANT UPDATE — TEMPORARY CONTACT ARRANGEMENT',
                      'গুরুত্বপূর্ণ আপডেট — সাময়িক যোগাযোগ ব্যবস্থা',
                      'महत्वपूर्ण अपडेट — अस्थायी संपर्क व्यवस्था'
                    )}
                  </h2>

                  <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal border-l-4 border-blue-900 pl-4 sm:pl-6 py-1 bg-slate-50/70 rounded-r-xl pr-4">
                    {currentLang === 'bn' ? (
                      <>
                        <p>
                          অনুগ্রহ করে অবগত থাকুন যে নির্ধারিত যোগাযোগ ব্যবস্থা রক্ষণাবেক্ষণ এবং প্রযুক্তিগত উন্নয়নের কারণে আমাদের টেলিফোন হেল্পলাইন পরিষেবা সাময়িকভাবে অনুপলব্ধ রয়েছে। আমাদের ফোন হেল্পলাইন শুধুমাত্র সাময়িকভাবে বন্ধ আছে, স্থায়ীভাবে বন্ধ করা হয়নি।
                        </p>
                        <p>
                          এই সাময়িক সময়ে, <strong>অফিসিয়াল ইমেল সাপোর্ট (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> আমাদের <strong>প্রাথমিক এবং প্রস্তাবিত যোগাযোগ মাধ্যম</strong> হিসেবে কাজ করছে। যেকোনো সমস্যা, পরিষেবা সংক্রান্ত প্রশ্ন, আবেদন সংক্রান্ত সমস্যা, নথি যাচাইকরণ জিজ্ঞাসা, ওয়েবসাইট সহায়তা বা অভিযোগের জন্য নাগরিকদের ইমেলে যোগাযোগ করার পরামর্শ দেওয়া হচ্ছে।
                        </p>
                        <p>
                          সাধারণ প্রশ্ন এবং প্রাথমিক সহায়তার জন্য আপনি আমাদের <strong>অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">+91 9836634843</a>)</strong>-এও যোগাযোগ করতে পারেন, যা বিকল্প সহায়তা চ্যানেল হিসেবে সক্রিয় রয়েছে।
                        </p>
                        <p>
                          আপনার সাইবার নিরাপত্তা এবং গোপনীয়তা সুরক্ষার জন্য শুধুমাত্র এই পেজে উল্লিখিত দুটি যাচাইকৃত অফিসিয়াল চ্যানেলের মাধ্যমে যোগাযোগ করুন। সিটিজেন সার্ভিসেস পয়েন্টের নাম করে কোনো অযাচাইকৃত ফোন নম্বরে বিশ্বাস করবেন না এবং কখনোই OTP, UPI PIN বা ব্যাঙ্কিং পাসওয়ার্ড শেয়ার করবেন না।
                        </p>
                        <p>
                          কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম, রিয়েল-টাইম অ্যাপ্লিকেশন স্ট্যাটাস ট্র্যাকার এবং সরকারি প্রকল্পের তথ্য ডেস্ক সহ সমস্ত অনলাইন পোর্টাল পরিষেবা সম্পূর্ণ সচল রয়েছে।
                        </p>
                      </>
                    ) : currentLang === 'hi' ? (
                      <>
                        <p>
                          कृपया सूचित रहें कि निर्धारित संचार प्रणाली रखरखाव और परिचालन उन्नयन के कारण हमारी टेलीफोन हेल्पलाइन सेवा अस्थायी रूप से अनुपलब्ध है। हमारी फोन हेल्पलाइन केवल अस्थायी रूप से बंद है, इसे स्थायी रूप से बंद नहीं किया गया है।
                        </p>
                        <p>
                          इस अस्थायी अवधि के दौरान, <strong>आधिकारिक ईमेल सहायता (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> हमारे <strong>प्राथमिक और अनुशंसित संपर्क माध्यम</strong> के रूप में कार्य करती है। नागरिकों से अनुरोध है कि किसी भी समस्या, सेवा संबंधी प्रश्न, आवेदन समस्या, दस्तावेज़ सत्यापन या शिकायत के लिए ईमेल द्वारा संपर्क करें।
                        </p>
                        <p>
                          सामान्य प्रश्नों और प्रारंभिक सहायता के लिए आप हमारे <strong>आधिकारिक व्हाट्सएप सहायता (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">+91 9836634843</a>)</strong> के माध्यम से भी संपर्क कर सकते हैं, जो एक वैकल्पिक सहायता चैनल के रूप में सक्रिय है।
                        </p>
                        <p>
                          अपनी साइबर सुरक्षा और गोपनीयता की रक्षा के लिए केवल इस पृष्ठ पर सूचीबद्ध दो सत्यापित आधिकारिक चैनलों के माध्यम से ही संवाद करें। किसी भी असत्यापित फोन नंबर पर भरोसा न करें और कभी भी OTP, UPI PIN या पासवर्ड साझा न करें।
                        </p>
                        <p>
                          ग्राहक सेवा अनुरोध फॉर्म, वास्तविक समय आवेदन स्थिति ट्रैकर और सरकारी योजना सूचना डेस्क सहित सभी ऑनलाइन पोर्टल सुविधाएं बिना किसी रुकावट के पूरी तरह चालू हैं।
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Please be informed that our telephone helpline service is temporarily unavailable due to scheduled communication system maintenance and operational upgrades. Our phone helpline is only temporarily unavailable and has not been permanently discontinued.
                        </p>
                        <p>
                          During this temporary period, <strong>Official Email Support (<a href={`mailto:${t.emailDesc}`} className="text-blue-800 underline font-bold">{t.emailDesc}</a>)</strong> serves as our <strong>primary and recommended contact method</strong>. Citizens and visitors are advised to contact our team by email for any issue, service-related question, application-related problem, document verification query, website-related assistance, complaint, or any other support request.
                        </p>
                        <p>
                          For general questions and initial assistance, you may also reach us through our <strong>Official WhatsApp Support (<a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">+91 9836634843</a>)</strong>, which remains active as an alternative support channel. For detailed case reviews, application status enquiries, or formal support requests, please always prefer Official Email Support so our team can assist you thoroughly.
                        </p>
                        <p>
                          For your cyber safety and privacy protection, please communicate exclusively through the two verified official channels listed on this page. Do not call or trust any unverified phone numbers claiming to represent Citizen Services Point, and never share sensitive personal credentials such as OTPs, UPI PINs, or banking passwords.
                        </p>
                        <p>
                          All online portal features—including the Customer Service Request Form, Real-Time Application Status Tracker, and Government Schemes Information Desk—remain fully operational without interruption. We sincerely appreciate your patience, understanding, and continued trust while we upgrade our voice support line.
                        </p>
                      </>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <a
                      href={`mailto:${t.emailDesc}`}
                      className="inline-flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
                    >
                      <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{tr('Email Support (Primary):', 'ইমেল সাপোর্ট (প্রাথমিক):', 'ईमेल सहायता (प्राथमिक):')} {t.emailDesc}</span>
                    </a>
                    <a
                      href="https://wa.me/919836634843"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{tr('WhatsApp Support (Secondary): 9836634843', 'হোয়াটসঅ্যাপ সাপোর্ট (বিকল্প): 9836634843', 'व्हाट्सएप सहायता (वैकल्पिक): 9836634843')}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-4 max-w-xl">
                    <div className="inline-block bg-orange-100 text-orange-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      {tr('Official Contact Channels', 'অফিসিয়াল যোগাযোগ মাধ্যম', 'आधिकारिक संपर्क माध्यम')}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                      {tr('Connect With Our Official Support Desk', 'আমাদের অফিসিয়াল সাপোর্ট ডেস্কের সাথে যোগাযোগ করুন', 'हमारे आधिकारिक सहायता डेस्क से जुड़ें')}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {t.contactSubtitle}
                    </p>
                  </div>

                  {/* Contact Channels Grid — Primary Email First, Secondary WhatsApp Second */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto grow">
                    {/* Primary Contact Method: Official Email Support */}
                    <a 
                      href={`mailto:${t.emailDesc}`} 
                      className="bg-blue-50/70 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-5 transition-all duration-300 group flex items-start gap-3.5 shadow-sm"
                      id="contact-page-email-link"
                    >
                      <div className="bg-blue-700 text-white p-3 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{tr('Official Email Support', 'অফিসিয়াল ইমেল সাপোর্ট', 'आधिकारिक ईमेल सहायता')}</h4>
                          <span className="bg-blue-700 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">{tr('Primary & Recommended', 'প্রাথমিক ও প্রস্তাবিত', 'प्राथमिक एवं अनुशंसित')}</span>
                        </div>
                        <p className="text-blue-900 font-extrabold text-sm truncate mt-1">{t.emailDesc}</p>
                        <p className="text-xs text-slate-600 mt-1 leading-snug">{tr('Primary contact for service questions, application issues, website help & complaints', 'পরিষেবা প্রশ্ন, আবেদন সমস্যা, ওয়েবসাইট সহায়তা ও অভিযোগের জন্য প্রাথমিক মাধ্যম', 'सेवा प्रश्नों, आवेदन समस्याओं, वेबसाइट सहायता और शिकायतों के लिए प्राथमिक संपर्क')}</p>
                      </div>
                    </a>

                    {/* Secondary Contact Method: Official WhatsApp Support */}
                    <a 
                      href="https://wa.me/919836634843" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 rounded-xl p-5 transition-all duration-300 group flex items-start gap-3.5"
                      id="contact-page-whatsapp-link"
                    >
                      <div className="bg-emerald-600 text-white p-3 rounded-lg group-hover:scale-110 transition-transform shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{tr('Official WhatsApp Support', 'অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট', 'आधिकारिक व्हाट्सएप सहायता')}</h4>
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">{tr('Alternative Channel', 'বিকল্প মাধ্যম', 'वैकल्पिक माध्यम')}</span>
                        </div>
                        <p className="text-emerald-700 font-extrabold text-sm mt-1">+91 9836634843</p>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{tr('Alternative channel for general questions & initial citizen assistance', 'সাধারণ জিজ্ঞাসা ও প্রাথমিক নাগরিক সহায়তার জন্য বিকল্প চ্যানেল', 'सामान्य प्रश्नों एवं प्रारंभिक नागरिक सहायता के लिए वैकल्पिक चैनल')}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Support Note */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    {t.emailNote}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-[10px] tracking-wide uppercase shrink-0">
                    {currentLang === 'bn' ? 'স্বাধীন নাগরিক সহায়তা কেন্দ্র' : currentLang === 'hi' ? 'स्वतंत्र नागरिक सहायता' : 'Independent Citizen Facilitator'}
                  </span>
                </div>
              </div>
            </section>

            {/* Service Jurisdiction & Operational Scope Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in" id="service-jurisdiction-section">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/5 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Area */}
            <div className="border-b border-slate-800 p-6 sm:p-8 lg:p-10 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Ashoka Chakra Emblem / Tricolor Badge */}
                    <IndianNationalFlag className="w-6 h-4 border border-white/20 shadow-sm" />
                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-extrabold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                      Official Operational Scope
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase" id="jurisdiction-title">
                    {t.jurisdictionTitle}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.jurisdictionSubtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono tracking-wider font-extrabold text-emerald-400 select-none shrink-0 self-start md:self-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>WEST BENGAL & CENTRAL LEVEL ONLY</span>
                </div>
              </div>
            </div>

            {/* Grid Area */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Card 1: Central Government of India */}
                <div className="bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full blur-xl pointer-events-none group-hover:bg-orange-500/10 transition-colors"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                        {t.jurisdictionCentralTitle}
                        <IndianNationalFlag className="w-4 h-2.5 border border-white/20" />
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {t.jurisdictionCentralContent}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>GOVERNMENT OF INDIA</span>
                    <span className="text-orange-400">CENTRAL SERVICES</span>
                  </div>
                </div>

                {/* Card 2: West Bengal State Government */}
                <div className="bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                        {t.jurisdictionWBTitle}
                        <IndianNationalFlag className="w-4 h-2.5 border border-white/20" />
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {t.jurisdictionWBContent}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>STATE JURISDICTION</span>
                    <span className="text-emerald-400">WEST BENGAL</span>
                  </div>
                </div>

                {/* Card 3: Other State Services (Suspended) */}
                <div className="bg-slate-950/30 border border-red-950/40 hover:border-red-900/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full blur-xl pointer-events-none group-hover:bg-red-500/10 transition-colors"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="bg-red-500/15 border border-red-500/20 text-red-400 font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                        Suspended
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-red-200 tracking-tight">
                        {t.jurisdictionOtherTitle}
                      </h4>
                      <p className="text-xs text-red-100/60 leading-relaxed font-medium">
                        {t.jurisdictionOtherContent}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                    <span>ALL OTHER REGIONS</span>
                    <span className="text-red-400/80 font-extrabold">OFFLINE</span>
                  </div>
                </div>

              </div>

              {/* Bottom Stamp / National Emblem banner */}
              <div className="mt-8 bg-slate-950 rounded-2xl p-4 border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Ashoka Chakra */}
                  <IndianNationalFlag className="w-6 h-4 border border-white/20 shadow-xs" />
                  <p className="text-xs text-slate-300 font-medium">
                    {t.jurisdictionMapInfo}
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800/60 select-none">
                  UNION JURISDICTION CODEX: WB-IN-01
                </div>
              </div>

            </div>
          </div>
        </section>
          </div>
        } />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />

        {/* ============================================================ */}
        {/* PAGE 7: PRIVACY & LEGAL POLICY DECLARATION                  */}
        {/* ============================================================ */}
        <Route path="/privacy-policy" element={
          <div className="animate-fade-in">
            {/* Privacy Policy & Legal Declaration Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" id="privacy-policy-section">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white relative">
              <div className="absolute top-0 right-0 h-full w-1/3 bg-radial from-white/5 to-transparent pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md mb-3">
                    🛡️ Official Mandate & Protection
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-slate-100 animate-pulse-slow" id="privacy-title">
                    {t.privacyTitle}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    {t.privacySubtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 text-[10px] font-mono tracking-wider font-extrabold text-slate-300 select-none">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SECURE GATEWAY</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Left side: Declaration and Legal Action */}
                <div className="space-y-6">
                  {/* Item 1: Authenticity Declaration */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-slate-200 transition-all shadow-3xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0 shadow-3xs mt-0.5">
                        01
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">
                          {t.privacyDeclTitle}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {t.privacyDeclContent}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Legal Action against Forgery */}
                  <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100/80 hover:border-red-200/80 transition-all shadow-3xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-sm shrink-0 shadow-3xs mt-0.5">
                        02
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-red-950 text-sm tracking-tight flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>{t.privacyLegalTitle}</span>
                        </h4>
                        <p className="text-xs text-red-900/95 leading-relaxed font-medium">
                          {t.privacyLegalContent}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Cybercrime protection and report info */}
                <div className="space-y-6">
                  {/* Item 3: Protection Against Fraud & Cybercrime */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 hover:border-slate-200 transition-all shadow-3xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm shrink-0 shadow-3xs mt-0.5">
                        03
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">
                          {t.privacyFraudTitle}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {t.privacyFraudContent}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reporting block */}
                  <div className="p-5 rounded-2xl bg-indigo-50/30 border border-indigo-100/60 hover:border-indigo-100 transition-all shadow-3xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm shrink-0 shadow-3xs mt-0.5">
                        04
                      </div>
                      <div className="space-y-2 w-full">
                        <h4 className="font-extrabold text-indigo-950 text-sm tracking-tight">
                          {t.privacyReportTitle}
                        </h4>
                        <p className="text-xs text-indigo-900/90 font-medium">
                          {t.privacyReportContent}
                        </p>
                        
                        <div className="space-y-2 pt-1 font-mono text-[11px] text-slate-800">
                          <a 
                            href={`mailto:${t.emailDesc}`} 
                            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200/80 hover:border-indigo-400 transition-colors w-full font-bold"
                          >
                            <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{t.emailDesc} (Primary)</span>
                          </a>
                          <a 
                            href="https://wa.me/919836634843"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 transition-colors w-full font-bold"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>WhatsApp Support: +91 9836634843</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Assurance statement */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-500 to-emerald-500"></div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-orange-400 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {t.privacyAssurance}
                  </p>
                </div>

                {/* Signature and Project Head Stamp */}
                <div className="flex flex-col items-center sm:items-end justify-center shrink-0 min-w-[140px] text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6">
                  {/* Hand-drawn signature placeholder */}
                  <div className="h-12 w-32 bg-white rounded-lg p-1.5 border border-slate-800 shadow-sm flex items-center justify-center overflow-hidden mb-1.5 relative group">
                    <img 
                      src={signatureImg} 
                      alt="Project Head Signature Stamp" 
                      className="h-full w-full object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-300" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] text-slate-200 font-black uppercase tracking-widest leading-none">
                    {currentLang === 'bn' ? 'অভি মন্ডল' : currentLang === 'hi' ? 'अवि मंडल' : 'Avi Mondal'}
                  </span>
                  <span className="text-[8px] text-orange-400 font-bold uppercase tracking-widest mt-1">
                    {t.projectHead}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>
          </div>
        } />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms-and-conditions" element={<Navigate to="/privacy-policy" replace />} />

        {/* PAGE 9: SWACHHTAR POTHE — CITIZEN INDIA CIVIC INITIATIVE */}
        <Route path="/swachhtar-pothe" element={<SwachhtarPothePage currentLang={currentLang} />} />
        <Route path="/swachhta" element={<Navigate to="/swachhtar-pothe" replace />} />

        {/* Catch-all wildcard redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      </main>

      {/* Footer (English Only) */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800 relative z-30 overflow-hidden" id="main-footer-section">
        {/* Tricolor Accent Border */}
        <div className="absolute top-0 inset-x-0 h-1 flex w-full">
          <div className="bg-[#FF9933] w-1/3 h-full"></div>
          <div className="bg-white w-1/3 h-full"></div>
          <div className="bg-[#138808] w-1/3 h-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
            
            {/* Column 1: Info and Brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img src={footerLogoImg} alt="Citizen Services Point Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base tracking-tight">{t.headerTitle}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">{t.tagline}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {t.aboutUsContent}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-widest text-orange-400">
                {tr('Quick Portal Links', 'দ্রুত পোর্টাল লিঙ্কসমূহ', 'त्वरित पोर्टल लिंक')}
              </h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => navigateToPage('home')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('Home Page', 'প্রচ্ছদ পেজ', 'मुख्य पृष्ठ')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('tracker')} className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-orange-400 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-orange-500" />
                    <span>{tr('Real-Time Application Status', 'রিয়েল-টাইম আবেদন স্ট্যাটাস', 'वास्तविक समय आवेदन स्थिति')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('form')} className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-amber-400 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>{tr('Customer Service Request Form', 'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম', 'ग्राहक सेवा अनुरोध फॉर्म')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('schemes')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('Government Schemes & Forms', 'সরকারি স্কিম ও ফর্ম', 'सरकारी योजनाएं एवं फॉर्म')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('swachhta')} className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-emerald-400 cursor-pointer text-left" id="footer-link-swachhta">
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                    <span>{tr('Swachhtar Pothe (Civic Initiative)', 'স্বচ্ছতার পথে (নাগরিক উদ্যোগ)', 'स्वच्छता की राह (नागरिक पहल)')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('Physical Support Hub & Helplines', 'সাপোর্ট হাব ও হেল্পলাইন', 'सहायता केंद्र एवं हेल्पलाइन')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('cyber')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('Cyber Security & Safety Hub', 'সাইবার নিরাপত্তা ও সচেতনতা', 'साइबर सुरक्षा एवं जागरूकता केंद्र')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('About Platform & Leadership', 'পোর্টাল পরিচিতি ও নেতৃত্ব', 'पोर्टल परिचय एवं नेतृत्व')}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('privacy')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{tr('Privacy & Legal Policy', 'গোপনীয়তা ও আইনি নীতি', 'गोपनीयता एवं कानूनी नीति')}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details & Social Media */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-widest text-emerald-400">
                {tr('Official Support Channels', 'অফিসিয়াল সাপোর্ট চ্যানেল', 'आधिकारिक सहायता चैनल')}
              </h5>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-slate-200">{tr('Official Email Support (Primary):', 'অফিসিয়াল ইমেল সাপোর্ট (প্রাথমিক):', 'आधिकारिक ईमेल सहायता (प्राथमिक):')}</span>
                    <a href={`mailto:${t.emailDesc}`} className="hover:text-white transition-all font-bold font-mono text-amber-300">{t.emailDesc}</a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-slate-300">{tr('Official WhatsApp Support (Secondary):', 'অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট (বিকল্প):', 'आधिकारिक व्हाट्सएप सहायता (वैकल्पिक):')}</span>
                    <a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono font-bold">+91 9836634843</a>
                  </div>
                </li>
                <li className="text-[11px] text-slate-400 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 leading-relaxed">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px] mb-0.5">
                    {tr('Temporary Service Notice', 'সাময়িক পরিষেবা বিজ্ঞপ্তি', 'अस्थायी सेवा सूचना')}
                  </span>
                  {tr(
                    'Phone helpline is temporarily unavailable. Please use Official Email Support (Primary) or WhatsApp Support.',
                    'ফোন হেল্পলাইন সাময়িকভাবে বন্ধ আছে। অনুগ্রহ করে অফিসিয়াল ইমেল সাপোর্ট (প্রাথমিক) অথবা হোয়াটসঅ্যাপ সাপোর্ট ব্যবহার করুন।',
                    'फोन हेल्पलाइन अस्थायी रूप से अनुपलब्ध है। कृपया आधिकारिक ईमेल सहायता (प्राथमिक) या व्हाट्सएप सहायता का उपयोग करें।'
                  )}
                </li>
              </ul>

              {/* Social Channels Quick Links */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="block font-bold text-[10px] uppercase tracking-wider text-slate-400">{t.socialMediaTitle}</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/citizenindiaofficial?igsh=OTNkNmlocXdtZWpk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/30 text-pink-400 flex items-center justify-center transition-all hover:scale-110"
                    title="Instagram: @citizenindiaofficial"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1DCWRAEoWM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 flex items-center justify-center transition-all hover:scale-110"
                    title="Facebook: Citizen India"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://x.com/CitizenIndiaHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-center transition-all hover:scale-110 font-black text-xs font-mono"
                    title="X (Twitter): @CitizenIndiaHQ"
                    aria-label="X"
                  >
                    𝕏
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Slogans and Pledges bar */}
          <div className="py-8 space-y-4 text-center">
            
            {/* National Building Slogan */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-extrabold text-slate-200 italic">
                "{t.sloganText}"
              </p>
            </div>

            {/* Warning Boxes & official Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left pt-2 text-[11px] text-slate-400">
              
              {/* Alert Box */}
              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl space-y-2">
                <span className="font-extrabold text-orange-400 block uppercase tracking-wider">
                  {tr('🔒 Cyber Security & Safety Alert', '🔒 সাইবার নিরাপত্তা ও সতর্কতা বার্তা', '🔒 साइबर सुरक्षा एवं सतर्कता सूचना')}
                </span>
                <p className="leading-relaxed">
                  {tr(
                    'Never share your OTP or PIN. Citizen Services Point representatives or government officials will never ask for sensitive credentials. Report fraud immediately at 1930.',
                    'কখনও আপনার OTP বা PIN শেয়ার করবেন না। সিটিজেন সার্ভিসেস পয়েন্টের প্রতিনিধি বা সরকারি আধিকারিকরা কখনও গোপনীয় তথ্য চান না। জালিয়াতির ক্ষেত্রে অবিলম্বে ১৯৩০ নম্বরে রিপোর্ট করুন।',
                    'अपना OTP या PIN कभी साझा न करें। सिटीजन सर्विसेज पॉइंट के प्रतिनिधि या सरकारी अधिकारी कभी भी संवेदनशील जानकारी नहीं मांगते। धोखाधड़ी की तुरंत 1930 पर रिपोर्ट करें।'
                  )}
                </p>
              </div>

              {/* Digital India & Official Government Links box */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                <span className="font-extrabold text-emerald-400 block uppercase tracking-wider">
                  {tr('🌐 Official Government Portals', '🌐 অফিসিয়াল সরকারি পোর্টালসমূহ', '🌐 आधिकारिक सरकारी पोर्टल')}
                </span>
                <p className="leading-relaxed space-y-1">
                  <span>{tr('For official government services & open data, visit:', 'অফিসিয়াল সরকারি পরিষেবা ও তথ্যের জন্য ভিজিট করুন:', 'आधिकारिक सरकारी सेवाओं और ओपन डेटा के लिए देखें:')}</span>
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-bold">
                    <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5">National Portal of India <ExternalLink className="w-3 h-3" /></a>
                    <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5">Open Government Data <ExternalLink className="w-3 h-3" /></a>
                    <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5">Digital India <ExternalLink className="w-3 h-3" /></a>
                  </span>
                </p>
              </div>

            </div>

            {/* Official Social Media Channels (Bottom Bar) */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl max-w-4xl mx-auto text-center space-y-3.5" id="official-social-media-footer">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-block bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    Verified Handles
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {t.socialMediaTitle}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                  {t.socialMediaSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/citizenindiaofficial?igsh=OTNkNmlocXdtZWpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-pink-500/30 hover:border-pink-500/60 text-slate-200 hover:text-white transition-all duration-300 group shadow-sm text-left"
                  id="footer-official-instagram"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden grow min-w-0">
                    <span className="block font-bold text-xs text-white">Instagram</span>
                    <span className="block text-[11px] text-pink-400 font-mono truncate">@citizenindiaofficial</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:text-pink-400 transition-colors" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1DCWRAEoWM/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-blue-500/30 hover:border-blue-500/60 text-slate-200 hover:text-white transition-all duration-300 group shadow-sm text-left"
                  id="footer-official-facebook"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden grow min-w-0">
                    <span className="block font-bold text-xs text-white">Facebook</span>
                    <span className="block text-[11px] text-blue-400 font-mono truncate">Citizen India</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* X */}
                <a
                  href="https://x.com/CitizenIndiaHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-300 group shadow-sm text-left"
                  id="footer-official-x"
                >
                  <div className="w-8 h-8 rounded-lg bg-black text-white border border-slate-700 flex items-center justify-center shrink-0 font-black text-sm group-hover:scale-110 transition-transform font-mono shadow-md">
                    𝕏
                  </div>
                  <div className="overflow-hidden grow min-w-0">
                    <span className="block font-bold text-xs text-white">X (Twitter)</span>
                    <span className="block text-[11px] text-slate-300 font-mono truncate">@CitizenIndiaHQ</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Copyright and signature */}
            <div className="pt-6 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 max-w-4xl mx-auto">
              <span>{t.rightsReserved}</span>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                <span className="text-slate-400">Powered by Citizen Services Point (CITIZEN INDIA)</span>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
