import React, { useState } from 'react';
import {
  CheckCircle,
  ExternalLink,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Phone,
  Share2,
  ArrowUp,
  Heart,
  MapPin,
  BookOpen,
  Compass,
  Award,
  Search
} from 'lucide-react';
import { swachhtarPotheTranslations, SwachhtaLang } from '../data/swachhtarPotheTranslations';
import CitizenPledgeCardSystem from './CitizenPledgeCardSystem';

// Exact Existing Official Citizen Services Point Logo Asset
// @ts-ignore
import officialLogoImg from '../assets/images/regenerated_image_1786982538117.webp';

// 9 Photographic Assets (Image 2 is the authentic Wikimedia Commons photograph of Howrah Bridge)
// @ts-ignore
import heroBoulevardImg from '../assets/images/swachhta_hero_boulevard_1793186619453.jpg';
// @ts-ignore
import howrahBridgeAuthenticImg from '../assets/images/howrah_bridge_authentic_wikimedia.jpg';
// @ts-ignore
import publicLitterImg from '../assets/images/public_litter_consequence_1793186622893.jpg';
// @ts-ignore
import responsibleBinImg from '../assets/images/responsible_bin_disposal_1793186624147.jpg';
// @ts-ignore
import cleanRailwayImg from '../assets/images/clean_railway_platform_1793186625501.jpg';
// @ts-ignore
import cleanGangaGhatImg from '../assets/images/clean_ganga_ghat_1793186626544.jpg';
// @ts-ignore
import streetAnimalCareImg from '../assets/images/street_animal_humane_care_1793186627234.jpg';
// @ts-ignore
import youthHealthyImg from '../assets/images/youth_healthy_future_1793186629501.jpg';
// @ts-ignore
import communityAwarenessImg from '../assets/images/community_cyber_awareness_1793186629467.jpg';

interface SwachhtarPothePageProps {
  currentLang: SwachhtaLang;
}

interface ResilientFigureProps {
  src: string;
  alt: string;
  caption: string;
  aspectClass?: string;
  priority?: boolean;
  figIndex?: string;
}

function ResilientFigure({
  src,
  alt,
  caption,
  aspectClass = 'aspect-video',
  priority = false,
  figIndex
}: ResilientFigureProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-shadow duration-300 hover:shadow-md">
      <div
        className={`w-full ${aspectClass} bg-slate-100 relative overflow-hidden flex items-center justify-center`}
      >
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-emerald-50/60 p-6 flex flex-col items-center justify-center text-center">
            <Compass className="w-8 h-8 text-emerald-700 mb-2 opacity-80" />
            <span className="text-xs font-semibold text-slate-700 max-w-sm leading-relaxed">
              {alt}
            </span>
          </div>
        )}
      </div>
      <figcaption className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50/80 border-t border-slate-200/80 text-xs text-slate-600 leading-relaxed">
        {figIndex ? <span className="font-semibold text-slate-800 mr-1.5">{figIndex} ·</span> : null}
        {caption}
      </figcaption>
    </figure>
  );
}

export default function SwachhtarPothePage({ currentLang }: SwachhtarPothePageProps) {
  const c = swachhtarPotheTranslations[currentLang] || swachhtarPotheTranslations.en;

  // Share State
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'copied'>('idle');

  // Active tab in Citizen Pledge Card System (the ONLY interactive feature on this page)
  const [pledgeSystemTab, setPledgeSystemTab] = useState<'apply' | 'verify'>('apply');

  // Hero Image Error State
  const [heroImgError, setHeroImgError] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const resolvedId =
      sectionId === 'section-report-builder' ? 'section-reporting-guide' : sectionId;
    if (resolvedId === 'section-pledge') {
      setPledgeSystemTab('apply');
    } else if (resolvedId === 'section-pledge-verify') {
      setPledgeSystemTab('verify');
    }
    const el = document.getElementById(resolvedId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareInitiative = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${c.branding.titleBn} | ${c.branding.titleEn} | ${c.branding.titleHi}`;
    const shareText = `${c.sectionA_hero.activeHeadline} — ${c.branding.descriptor} (${c.branding.attribution})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        setShareStatus('shared');
        window.setTimeout(() => setShareStatus('idle'), 3000);
        return;
      } catch {
        // Fallback to clipboard copy if user cancels or share fails
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      window.setTimeout(() => setShareStatus('idle'), 3000);
    } catch {
      setShareStatus('idle');
    }
  };

  // Filter out the removed local report builder item from Quick Navigation
  const quickNavItems = c.quickNav.items.filter((item) => item.id !== 'section-report-builder');

  return (
    <div className="animate-fade-in pb-16" id="swachhtar-pothe-page">
      {/* ===================================================================== */}
      {/* SECTION A — HERO & MANDATORY BRAND IDENTITY HIERARCHY                 */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6" id="section-hero">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Indian Tricolour Top Accent Bar */}
          <div className="h-2 w-full flex">
            <div className="bg-[#FF9933] w-1/3 h-full" />
            <div className="bg-white w-1/3 h-full" />
            <div className="bg-[#138808] w-1/3 h-full" />
          </div>

          {/* Mandatory Top Brand Hierarchy & Independent Disclaimer */}
          <div className="px-6 py-5 sm:px-10 sm:py-6 border-b border-[#D4AF37]/40 bg-[#0B1F3A] text-white flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-white p-1 shrink-0 shadow-xs">
                <img
                  src={officialLogoImg}
                  alt="Citizen Services Point Official Logo"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                    {c.branding.titleBn}
                  </span>
                  <span className="text-amber-400/60 font-normal">|</span>
                  <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                    {c.branding.titleEn}
                  </span>
                  <span className="text-amber-400/60 font-normal">|</span>
                  <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                    {c.branding.titleHi}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-amber-300">{c.branding.descriptor}</span>
                  <span aria-hidden="true" className="text-slate-400">
                    ·
                  </span>
                  <span className="font-extrabold text-emerald-300">{c.branding.attribution}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                  {c.branding.independentDisclaimer}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={handleShareInitiative}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-400/40 bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                id="swachhta-share-btn"
              >
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>
                  {shareStatus === 'copied'
                    ? c.quickNav.shareCopied
                    : shareStatus === 'shared'
                    ? c.quickNav.shareSuccess
                    : c.quickNav.shareInitiative}
                </span>
              </button>
            </div>
          </div>

          {/* Image 1 — Full-Width 16:9 Hero Photography with Clear Title Overlay */}
          <div className="relative w-full aspect-16/9 min-h-[320px] max-h-[500px] bg-slate-900 overflow-hidden">
            {!heroImgError ? (
              <img
                src={heroBoulevardImg}
                alt={c.sectionA_hero.heroImageAlt}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/65 to-slate-950/25 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <div className="max-w-4xl space-y-3 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  {c.branding.descriptor} · {c.branding.attribution}
                </p>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                  {c.sectionA_hero.activeHeadline}
                </h2>
                <div className="space-y-1 text-xs sm:text-sm text-slate-200 pt-1">
                  <p>{c.sectionA_hero.primaryMessage.bn}</p>
                  <p>{c.sectionA_hero.primaryMessage.en}</p>
                  <p>{c.sectionA_hero.primaryMessage.hi}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Explanation & Hero Action Buttons */}
          <div className="p-6 sm:p-8 lg:px-10 bg-white space-y-5">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              {c.sectionA_hero.supportingExplanation}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('section-pledge')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                id="hero-cta-pledge"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>{c.sectionA_hero.ctaPledge}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('section-pledge-verify')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#138808] hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                id="hero-cta-verify"
              >
                <Search className="w-4 h-4" />
                <span>{c.sectionA_hero.ctaVerify}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('section-why')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                id="hero-cta-learn"
              >
                <BookOpen className="w-4 h-4 text-[#0B1F3A]" />
                <span>{c.sectionA_hero.ctaLearn}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('section-reporting-guide')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                id="hero-cta-report"
              >
                <MapPin className="w-4 h-4 text-[#FF9933]" />
                <span>{c.sectionF_reportingGuide.title}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* QUICK PAGE NAVIGATION                                                 */}
      {/* ===================================================================== */}
      <nav
        aria-label={c.quickNav.heading}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6"
        id="swachhta-quick-nav"
      >
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0B1F3A] mb-3">
            {c.quickNav.heading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {quickNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0B1F3A] hover:bg-amber-50/60 border border-slate-100 hover:border-amber-300/80 transition-colors cursor-pointer truncate"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ===================================================================== */}
      {/* SINGLE INTERACTIVE FEATURE — CITIZEN PLEDGE CARD SYSTEM               */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-pledge">
        <CitizenPledgeCardSystem
          ui={c.pledgeCardSystem}
          officialLogoSrc={officialLogoImg}
          externalActiveTab={pledgeSystemTab}
          onTabChange={setPledgeSystemTab}
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION B — WHY THIS INITIATIVE MATTERS                               */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-why">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5 shadow-2xs">
          <div className="space-y-1.5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
              {c.sectionB_why.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {c.sectionB_why.title}
            </h2>
          </div>

          <ul className="space-y-3 max-w-3xl text-sm sm:text-base text-slate-700 leading-relaxed">
            {c.sectionB_why.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#138808] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION C — PROTECT HOWRAH BRIDGE AND PUBLIC HERITAGE                 */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-landmarks">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
                  {c.sectionC_landmarks.sectionLabel} · {c.branding.titleEn}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  {c.sectionC_landmarks.title}
                </h2>
              </div>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {c.sectionC_landmarks.explanationParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-extrabold text-[#0B1F3A]">
                  {c.sectionC_landmarks.actionBoxTitle}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {c.sectionC_landmarks.actions.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#138808] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ResilientFigure
                src={howrahBridgeAuthenticImg}
                alt={c.sectionC_landmarks.imageAlt}
                caption={c.sectionC_landmarks.imageCaption}
                aspectClass="aspect-4/3"
                figIndex="Image 2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION D — KEEP ROADS, RAILWAY STATIONS AND PUBLIC PLACES CLEAN      */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-public-places">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-2xs">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
              {c.sectionD_publicPlaces.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {c.sectionD_publicPlaces.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
              {c.sectionD_publicPlaces.intro}
            </p>
          </div>

          {/* Image 3 (Public Littering) & Image 4 (Responsible Waste Disposal) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResilientFigure
              src={publicLitterImg}
              alt={c.sectionD_publicPlaces.litterImageAlt}
              caption={c.sectionD_publicPlaces.litterImageCaption}
              aspectClass="aspect-4/3"
              figIndex="Image 3"
            />
            <ResilientFigure
              src={responsibleBinImg}
              alt={c.sectionD_publicPlaces.binImageAlt}
              caption={c.sectionD_publicPlaces.binImageCaption}
              aspectClass="aspect-4/3"
              figIndex="Image 4"
            />
          </div>

          {/* 5 Required Points + Image 5 (Railway and Public Transport) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <ul className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {c.sectionD_publicPlaces.points.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#138808] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-4 leading-relaxed">
                {c.sectionD_publicPlaces.binSystemNote}
              </p>
            </div>

            <div className="lg:col-span-6">
              <ResilientFigure
                src={cleanRailwayImg}
                alt={c.sectionD_publicPlaces.railwayImageAlt}
                caption={c.sectionD_publicPlaces.railwayImageCaption}
                aspectClass="aspect-16/9"
                figIndex="Image 5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION E — PROTECT THE GANGA, RIVERS AND GHATS                       */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-water">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ResilientFigure
                src={cleanGangaGhatImg}
                alt={c.sectionE_waterBodies.imageAlt}
                caption={c.sectionE_waterBodies.imageCaption}
                aspectClass="aspect-4/3"
                figIndex="Image 6"
              />
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
                  {c.sectionE_waterBodies.sectionLabel} · {c.branding.titleEn}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  {c.sectionE_waterBodies.title}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {c.sectionE_waterBodies.intro}
              </p>

              <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-2xl border border-slate-200 p-5">
                {c.sectionE_waterBodies.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#138808] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION G — HUMANE TREATMENT OF STREET ANIMALS                        */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-animals">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
                  {c.sectionG_animals.sectionLabel} · {c.branding.titleEn}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  {c.sectionG_animals.title}
                </h2>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-2xl border border-slate-200 p-5">
                {c.sectionG_animals.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-[#138808] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                  {c.sectionG_animals.childWildlifeWarning}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ResilientFigure
                src={streetAnimalCareImg}
                alt={c.sectionG_animals.imageAlt}
                caption={c.sectionG_animals.imageCaption}
                aspectClass="aspect-4/3"
                figIndex="Image 7"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION H — PROTECT CHILDREN AND YOUNG PEOPLE                         */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-children">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ResilientFigure
                src={youthHealthyImg}
                alt={c.sectionH_children.imageAlt}
                caption={c.sectionH_children.imageCaption}
                aspectClass="aspect-4/3"
                figIndex="Image 8"
              />
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
                  {c.sectionH_children.sectionLabel} · {c.branding.titleEn}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  {c.sectionH_children.title}
                </h2>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-2xl border border-slate-200 p-5">
                {c.sectionH_children.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#138808] shrink-0 mt-1" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs sm:text-sm text-emerald-950 bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 leading-relaxed">
                {c.sectionH_children.supportiveNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION I — CIVIC RESPONSIBILITY BEYOND CLEANLINESS                   */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-beyond">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-2xs">
          <div className="space-y-1.5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
              {c.sectionI_beyondCleanliness.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {c.sectionI_beyondCleanliness.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.sectionI_beyondCleanliness.themes.map((theme, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-start gap-3"
              >
                <CheckCircle className="w-4 h-4 text-[#138808] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  {theme}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION F — HOW TO REPORT CIVIC PROBLEMS (STATIC INFORMATIONAL GUIDE) */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-reporting-guide">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-2xs">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
              {c.sectionF_reportingGuide.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {c.sectionF_reportingGuide.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {c.sectionF_reportingGuide.intro}
            </p>
          </div>

          {/* Clean 7-Step Static Guide */}
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.sectionF_reportingGuide.steps.map((st, idx) => (
              <li
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-1.5"
              >
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#138808] block">
                  {st.stepNumber}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  {st.text}
                </p>
              </li>
            ))}
          </ol>

          {/* Static Reference of Common Civic Cleanliness Issue Categories */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider">
              {c.sectionL_reportBuilder.categoryLabel.replace(/\s*\*\s*$/, '')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {c.sectionL_reportBuilder.categories.map((cat) => (
                <div
                  key={cat.value}
                  className="bg-white rounded-xl border border-slate-200 px-3.5 py-2.5 flex items-center gap-2.5 text-xs font-bold text-slate-800"
                >
                  <span className="w-2 h-2 rounded-full bg-[#138808] shrink-0" />
                  <span>{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 bg-amber-50/70 border border-amber-200 rounded-xl p-4 font-medium">
            {c.sectionF_reportingGuide.guidanceDisclaimer}
          </p>

          {/* Verified Official Channels */}
          <div className="space-y-3 pt-1">
            <h3 className="text-sm font-extrabold text-[#0B1F3A]">
              {c.sectionF_reportingGuide.verifiedChannelsHeading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.sectionF_reportingGuide.verifiedChannels.map((ch, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-950">{ch.name}</h4>
                    <p className="text-xs text-slate-600">{ch.scope}</p>
                  </div>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{ch.linkLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION M — PERSONAL CIVIC RESPONSIBILITIES (STATIC INFORMATIONAL)    */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-checklist">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-2xs">
          <div className="space-y-1.5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#138808]">
              {c.sectionM_checklist.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              {c.sectionM_checklist.title}
            </h2>
          </div>

          {/* 7 Personal Civic Responsibility Points as Clean Static Awareness Content */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {c.sectionM_checklist.items.map((item, idx) => (
              <li
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-start gap-3.5"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION J — EMERGENCY AND CYBER-SAFETY INFORMATION                    */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="section-emergency">
        <div className="bg-[#0B1F3A] text-white rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 shadow-md">
          <div className="space-y-1.5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {c.sectionJ_emergencyCyber.sectionLabel} · {c.branding.titleEn}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {c.sectionJ_emergencyCyber.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 112 Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tabular-nums">
                      {c.sectionJ_emergencyCyber.card112.number}
                    </span>
                    <ShieldAlert className="w-7 h-7 text-amber-400 shrink-0" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    {c.sectionJ_emergencyCyber.card112.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {c.sectionJ_emergencyCyber.card112.description}
                  </p>
                </div>
                <div>
                  <a
                    href="tel:112"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors whitespace-nowrap"
                    id="swachhta-call-112"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{c.sectionJ_emergencyCyber.card112.callLabel}</span>
                  </a>
                </div>
              </div>

              {/* 1930 Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tabular-nums">
                      {c.sectionJ_emergencyCyber.card1930.number}
                    </span>
                    <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    {c.sectionJ_emergencyCyber.card1930.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {c.sectionJ_emergencyCyber.card1930.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href="tel:1930"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors whitespace-nowrap"
                    id="swachhta-call-1930"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{c.sectionJ_emergencyCyber.card1930.callLabel}</span>
                  </a>
                  <a
                    href={c.sectionJ_emergencyCyber.card1930.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-colors whitespace-nowrap"
                  >
                    <span>{c.sectionJ_emergencyCyber.card1930.portalLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Image 9 — Cyber Safety and Emergency Awareness */}
            <div className="lg:col-span-5">
              <ResilientFigure
                src={communityAwarenessImg}
                alt={c.sectionJ_emergencyCyber.imageAlt}
                caption={c.sectionJ_emergencyCyber.imageCaption}
                aspectClass="aspect-4/3"
                figIndex="Image 9"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {c.sectionJ_emergencyCyber.noGuaranteeNote}
          </p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION N — CLOSING REFLECTION AND FINAL SLOGAN                       */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" id="section-closing">
        <div className="bg-[#0B1F3A] text-white rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-md">
          {/* Top Tricolour Band */}
          <div className="h-1.5 w-full flex">
            <div className="bg-[#FF9933] w-1/3 h-full" />
            <div className="bg-white w-1/3 h-full" />
            <div className="bg-[#138808] w-1/3 h-full" />
          </div>

          <div className="p-8 sm:p-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {c.sectionN_closing.sectionLabel} · {c.branding.titleEn}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {c.sectionN_closing.title}
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-slate-200 leading-relaxed">
                {c.sectionN_closing.reflectionParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Exact Closing Slogan: “Jai Hind. Jai Bharat.” */}
            <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-6 space-y-1.5">
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {c.sectionN_closing.brandSloganEn}
              </p>
              {currentLang !== 'en' && (
                <p className="text-base sm:text-lg font-bold text-amber-300">
                  {c.sectionN_closing.translatedSlogan}
                </p>
              )}
            </div>

            {/* Mandatory Final Attribution */}
            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#D4AF37] shrink-0">
                  <img
                    src={officialLogoImg}
                    alt="Citizen Services Point Official Logo"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white">
                    {c.sectionN_closing.attributionPrimary}
                  </p>
                  <p className="text-xs font-bold text-amber-300">
                    {c.sectionN_closing.attributionSecondary}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowUp className="w-4 h-4" />
                <span>{c.quickNav.backToTop}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
