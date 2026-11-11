import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translations } from './src/data/translations.js';
import { schemesData } from './src/data/schemes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read and convert images to Base64
const headerLogoPath = path.join(__dirname, 'src/assets/images/regenerated_image_1783171804813.png');
const footerLogoPath = path.join(__dirname, 'src/assets/images/regenerated_image_1783171813280.png');
const projectHeadPath = path.join(__dirname, 'src/assets/images/regenerated_image_1783171808919.png');
const redFortPath = path.join(__dirname, 'src/assets/images/red_fort_banner_1783169469576.jpg');

const headerLogoBase64 = `data:image/png;base64,${fs.readFileSync(headerLogoPath).toString('base64')}`;
const footerLogoBase64 = `data:image/png;base64,${fs.readFileSync(footerLogoPath).toString('base64')}`;
const projectHeadBase64 = `data:image/png;base64,${fs.readFileSync(projectHeadPath).toString('base64')}`;
const redFortBase64 = `data:image/jpeg;base64,${fs.readFileSync(redFortPath).toString('base64')}`;

// Template the HTML file
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Citizen Services Point - Public Schemes & Offline Applications Portal</title>
  
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Tailwind Configuration for custom utilities -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

  <style>
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 35s linear infinite;
    }
    .animate-spin-slow {
      animation: spin 15s linear infinite;
    }
    .scroll-smooth {
      scroll-behavior: smooth;
    }
  </style>
</head>
<body class="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white scroll-smooth">

  <!-- Dynamic Cyber Alerts Ticker -->
  <div class="bg-amber-500 text-amber-950 font-medium py-2.5 px-4 overflow-hidden border-b border-amber-600 relative z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
      <div class="flex items-center gap-2 font-bold shrink-0">
        <!-- SVG ShieldAlert -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-950 animate-pulse shrink-0"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m12 8-3.5 3.5m0-3.5L12 11.5M12 16h.01"/></svg>
        <span class="bg-amber-900 text-amber-50 px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">CYBER ALERT</span>
      </div>
      <div class="w-full mx-4 overflow-hidden relative h-5 flex items-center">
        <div class="animate-marquee whitespace-nowrap flex items-center gap-12 font-semibold text-xs sm:text-sm">
          <span data-i18n="cyberAlertText"></span>
          <span>•</span>
          <span data-i18n="digitalIndiaText"></span>
          <span>•</span>
          <span data-i18n="cyberAlertText"></span>
          <span>•</span>
          <span data-i18n="digitalIndiaText"></span>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-3 shrink-0">
        <span class="text-xs bg-amber-600/20 px-2 py-0.5 rounded border border-amber-950/20 font-bold">HELPLINE: 1930</span>
      </div>
    </div>
  </div>

  <!-- Top Navigation Bar -->
  <header class="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
          <img src="${headerLogoBase64}" alt="Citizen Services Point Logo" class="w-full h-full object-cover" />
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h1 class="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none" data-i18n="headerTitle"></h1>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <p class="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-1" data-i18n="tagline"></p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Language Selector -->
        <div class="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
          <button onclick="setLang('en')" id="btn-lang-en" class="px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 bg-white text-blue-800 shadow-xs">
            EN
          </button>
          <button onclick="setLang('bn')" id="btn-lang-bn" class="px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 text-slate-600 hover:text-slate-900">
            বাংলা
          </button>
          <button onclick="setLang('hi')" id="btn-lang-hi" class="px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 text-slate-600 hover:text-slate-900">
            हिन्दी
          </button>
        </div>

        <a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" class="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 transition-all duration-300 shadow-sm hover:shadow">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          WhatsApp Support
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="pb-20">

    <!-- Hero Banner Section -->
    <section class="relative min-h-[400px] sm:min-h-[460px] bg-slate-950 flex items-center justify-center text-white overflow-hidden">
      <!-- Background image with tint -->
      <div class="absolute inset-0 z-0">
        <img src="${redFortBase64}" alt="Red Fort New Delhi" class="w-full h-full object-cover object-center opacity-30 scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-950/70"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-semibold text-orange-300 tracking-wider uppercase shadow-lg">
            <!-- Sparkles SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 animate-spin-slow"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
            <span>Authorized Digital Service Desk</span>
          </div>

          <div class="space-y-3">
            <h2 class="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-orange-400 via-white to-emerald-400 bg-clip-text text-transparent pb-1 drop-shadow-sm" data-i18n="headerTitle"></h2>
            <p class="text-lg sm:text-xl font-bold text-slate-300 italic tracking-wide">
              "<span data-i18n="tagline"></span>"
            </p>
          </div>

          <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Committed to delivering transparent, secure, and fully verified public utility services and digital registrations directly to our esteemed citizens.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#schemes-explorer" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95">
              <!-- FileText SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              <span>Browse Public Schemes</span>
            </a>
            <a href="#support-hub" class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/20 backdrop-blur-sm active:scale-95">
              <!-- Building SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/></svg>
              <span>Visit Support Desk</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Saffron, White, Green bottom decorative bar -->
      <div class="absolute bottom-0 left-0 right-0 h-1.5 flex">
        <div class="bg-orange-500 w-1/3 h-full"></div>
        <div class="bg-white w-1/3 h-full"></div>
        <div class="bg-emerald-500 w-1/3 h-full"></div>
      </div>
    </section>

    <!-- Contact Info Overview Card -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30">
      <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div class="space-y-4 max-w-xl">
            <div class="inline-block bg-orange-100 text-orange-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Contact Support
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Connect With Our Live Support Desk
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed font-normal" data-i18n="contactSubtitle"></p>
          </div>

          <!-- Contact Channels Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto grow">
            
            <!-- WhatsApp Support -->
            <a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" class="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5">
              <div class="bg-emerald-500 text-white p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                <!-- MessageSquare SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider" data-i18n="whatsappTitle"></h4>
                <p class="text-emerald-700 font-extrabold text-sm mt-1">+91 9836634843</p>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-tight">Instant chat & guidance</p>
              </div>
            </a>

            <!-- Helpline Call -->
            <a href="tel:+913335715979" class="bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5">
              <div class="bg-blue-600 text-white p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                <!-- Phone SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider" data-i18n="helplineTitle"></h4>
                <p class="text-blue-700 font-extrabold text-sm mt-1">+91 3335715979</p>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-tight">Call standard voice desk</p>
              </div>
            </a>

            <!-- Support Email -->
            <a href="mailto:help.citizenservicespoint@outlook.in" class="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5">
              <div class="bg-slate-700 text-white p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                <!-- Mail SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div class="overflow-hidden w-full">
                <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider" data-i18n="emailTitle"></h4>
                <p class="text-slate-700 font-extrabold text-xs truncate mt-1">help.citizenservicespoint@outlook.in</p>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-tight">Official security network</p>
              </div>
            </a>

          </div>
        </div>

        <!-- Support Note -->
        <div class="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span class="flex items-center gap-1.5 font-medium">
            <!-- Clock SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span data-i18n="emailNote"></span>
          </span>
          <span class="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-[10px] tracking-wide uppercase shrink-0">
            Authorized Public Companion
          </span>
        </div>
      </div>
    </section>

    <!-- Support Information Hub -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" id="support-hub">
      <div class="bg-white rounded-2xl shadow-md border border-slate-150 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12">
          
          <!-- Left Column: Help Desk Details -->
          <div class="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div class="flex items-center gap-3">
              <div class="bg-orange-600 text-white p-2.5 rounded-lg shadow-md">
                <!-- ShieldCheck SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-slate-950">
                  National Online Assistance Desk & Helpline Hub
                </h3>
                <p class="text-xs text-slate-500 mt-0.5 font-medium">
                  Providing professional public assistance and secure digital document processing.
                </p>
              </div>
            </div>

            <p class="text-slate-600 text-sm leading-relaxed">
              For your maximum privacy, safety, and document integrity, Citizen Services Point operates under secure digital protocols. To prevent cyber threats or identity theft, <strong>we do not require you to travel or search for branch addresses</strong>. Simply connect with our verified government-trained officers via our special helpline for secure counseling and real-time document checking.
            </p>

            <!-- Info Blocks Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div class="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-wider">
                  <!-- Calendar SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>Operational Days</span>
                </div>
                <p class="font-extrabold text-sm text-slate-900">Monday — Saturday</p>
                <p class="text-[11px] text-slate-500">Helplines active daily. Closed on Sundays and National Holidays.</p>
              </div>

              <div class="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div class="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <!-- Clock SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>Support Hours</span>
                </div>
                <p class="font-extrabold text-sm text-slate-900">10:00 AM — 06:00 PM</p>
                <p class="text-[11px] text-slate-500">Live agents available for direct helpline calls and WhatsApp assistance.</p>
              </div>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-950">
              <!-- ShieldAlert SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 shrink-0 mt-0.5"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m12 8-3.5 3.5m0-3.5L12 11.5M12 16h.01"/></svg>
              <div>
                <strong class="font-extrabold uppercase block tracking-wider">Secure Document Verification Mandate</strong>
                <p class="mt-0.5 font-medium">
                  All citizen records are vetted directly through authorized encrypted digital workspaces to prevent cybercrime and ensure that your applications conform strictly to official requirements before portal submissions.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Secure Online Process Guide -->
          <div class="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="bg-orange-500 text-white p-2.5 rounded-lg shadow-md shadow-orange-500/20">
                  <!-- ShieldCheck SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-white text-base">Secure Process Guide</h4>
                  <p class="text-xs text-slate-400 mt-0.5">Four Simple Steps to Apply Online Safely</p>
                </div>
              </div>

              <!-- Vertical Process Steps -->
              <div class="space-y-5 relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                
                <div class="relative">
                  <div class="absolute -left-[26px] top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
                    1
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-200 uppercase tracking-wider" data-i18n="step1Title"></h5>
                    <p class="text-[11px] text-slate-400 leading-normal mt-0.5" data-i18n="step1Desc"></p>
                  </div>
                </div>

                <div class="relative">
                  <div class="absolute -left-[26px] top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
                    2
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-200 uppercase tracking-wider" data-i18n="step2Title"></h5>
                    <p class="text-[11px] text-slate-400 leading-normal mt-0.5" data-i18n="step2Desc"></p>
                  </div>
                </div>

                <div class="relative">
                  <div class="absolute -left-[26px] top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
                    3
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-200 uppercase tracking-wider" data-i18n="step3Title"></h5>
                    <p class="text-[11px] text-slate-400 leading-normal mt-0.5" data-i18n="step3Desc"></p>
                  </div>
                </div>

                <div class="relative">
                  <div class="absolute -left-[26px] top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300">
                    4
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-200 uppercase tracking-wider" data-i18n="step4Title"></h5>
                    <p class="text-[11px] text-slate-400 leading-normal mt-0.5" data-i18n="step4Desc"></p>
                  </div>
                </div>

              </div>
            </div>

            <div class="pt-6 border-t border-slate-900 text-[10px] text-slate-500 flex items-center gap-2">
              <!-- Lock SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Secured in Compliance with Digital India Guidelines</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Interactive Schemes Explorer -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-20" id="schemes-explorer">
      <div class="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        
        <!-- Header -->
        <div class="bg-slate-950 p-6 sm:p-8 text-white relative">
          <div class="absolute right-0 top-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute left-1/3 bottom-0 w-64 h-32 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 space-y-3">
            <div class="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
              <!-- Building SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/></svg>
              <span>Public Program Catalog</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-black tracking-tight" data-i18n="schemesTitle"></h3>
            <p class="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed" data-i18n="schemesSubtitle"></p>
          </div>
        </div>

        <!-- Offline Form Download Option -->
        <div class="bg-gradient-to-r from-orange-50 via-white to-blue-50/40 border-b border-slate-200 p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div class="absolute right-0 top-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex items-start gap-4 z-10">
            <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3.5 rounded-xl shadow-md shrink-0">
              <!-- FileText SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            </div>
            <div class="space-y-1.5 text-left">
              <div class="flex items-center gap-2">
                <span class="bg-orange-100 text-orange-800 text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-orange-200">
                  OFFLINE FORM DOWNLOAD
                </span>
                <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
              </div>
              <h4 class="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug" data-i18n="downloadFormTitle"></h4>
              <p class="text-[11px] sm:text-xs text-slate-500 font-medium max-w-2xl" data-i18n="downloadFormSubtitle"></p>
            </div>
          </div>

          <div class="w-full md:w-auto shrink-0 z-10">
            <a href="https://drive.google.com/file/d/1cbnyp06YMqV1JxzyNj_nsYYN4zVlVjW_/view?usp=drivesdk" target="_blank" rel="noreferrer" class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest px-7 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <span data-i18n="checkHereLabel"></span>
              <!-- ExternalLink SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
          </div>
        </div>

        <!-- Filter and Search Bar -->
        <div class="p-4 sm:p-6 bg-slate-50 border-b border-slate-200/60 flex flex-col md:flex-row gap-4 justify-between items-center">
          <!-- Category Tabs -->
          <div class="flex items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl w-full md:w-auto overflow-x-auto shrink-0">
            <button onclick="setCategory('all')" id="tab-all" class="px-4 py-2 text-xs font-bold rounded-lg transition-all bg-white text-slate-900 shadow-sm shrink-0">
              <span data-i18n="allSchemes"></span>
            </button>
            <button onclick="setCategory('state')" id="tab-state" class="px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 shrink-0">
              <span data-i18n="westBengalGov"></span>
            </button>
            <button onclick="setCategory('central')" id="tab-central" class="px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 shrink-0">
              <span data-i18n="centralGov"></span>
            </button>
            <button onclick="setCategory('scholarship')" id="tab-scholarship" class="px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 shrink-0">
              <span>Scholarships</span>
            </button>
          </div>

          <!-- Search Box -->
          <div class="relative w-full md:w-80">
            <!-- Search SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" id="scheme-search-input" oninput="handleSearch(this.value)" class="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
          </div>
        </div>

        <!-- Schemes List Container -->
        <div class="p-6 divide-y divide-slate-100" id="schemes-list-container">
          <!-- Dynamic rendering inside javascript -->
        </div>

        <!-- Offline services warning/disclaimer -->
        <div class="bg-orange-50 border-t border-orange-100 p-6 sm:p-8">
          <div class="flex gap-3">
            <!-- AlertTriangle SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-600 shrink-0 mt-0.5 animate-pulse"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
            <div class="space-y-2">
              <h4 class="font-extrabold text-orange-950 text-sm tracking-wide uppercase">
                IMPORTANT REGULATORY NOTICE
              </h4>
              <p class="text-orange-900 text-xs leading-relaxed font-semibold" data-i18n="schemesNote">
              </p>
              <p class="text-slate-500 text-[10px] leading-relaxed">
                * Only official printed forms verified under governmental seals are approved for submissions. Please connect with Mr. Avi Mondal or our live desks to collect valid application codes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- About Us, Mission, Transparency & Commitments Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="about-us">
      <div class="text-center space-y-3 mb-10">
        <div class="inline-block bg-slate-100 text-slate-800 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider" data-i18n="aboutUsTitle"></div>
        <h3 class="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight" data-i18n="aboutUsSubtitle"></h3>
        <p class="text-sm text-slate-500 max-w-2xl mx-auto font-normal">
          Bridging technology and public administration to serve citizens directly.
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Mission Statement Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-orange-200 transition-colors duration-300">
          <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-base">M</div>
          <h4 class="text-lg font-bold text-slate-900 uppercase tracking-wide" data-i18n="missionTitle"></h4>
          <p class="text-slate-600 text-xs leading-relaxed font-normal" data-i18n="missionContent"></p>
        </div>

        <!-- Transparency Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-blue-200 transition-colors duration-300">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">T</div>
          <h4 class="text-lg font-bold text-slate-900 uppercase tracking-wide" data-i18n="transparencyTitle"></h4>
          <p class="text-slate-600 text-xs leading-relaxed font-normal" data-i18n="transparencyContent"></p>
        </div>

        <!-- Commitment and Security Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-7 space-y-4 hover:border-emerald-200 transition-colors duration-300 md:col-span-2 lg:col-span-1">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">S</div>
          <h4 class="text-lg font-bold text-slate-900 uppercase tracking-wide" data-i18n="commitmentTitle"></h4>
          <p class="text-slate-600 text-xs leading-relaxed font-normal" data-i18n="commitmentContent"></p>
        </div>

      </div>

      <!-- Project Leadership Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 mt-8 hover:border-slate-300 transition-all duration-300">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <!-- Image Column -->
          <div class="md:col-span-4 flex flex-col items-center">
            <div class="relative w-48 h-64 rounded-xl overflow-hidden shadow-md border-4 border-slate-50 group">
              <img src="${projectHeadBase64}" alt="Mr. Avi Mondal - Project Head" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute bottom-0 inset-x-0 bg-slate-900/85 backdrop-blur-sm p-3 text-center border-t border-white/15">
                <h5 class="font-extrabold text-sm text-white tracking-wide">MR. AVI MONDAL</h5>
                <p class="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest mt-0.5" data-i18n="projectHead"></p>
              </div>
            </div>
          </div>

          <!-- Text Column -->
          <div class="md:col-span-8 space-y-5">
            <div class="inline-block bg-orange-50 text-orange-700 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              PROJECT LEADERSHIP & VISION
            </div>
            <h4 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Under the Leadership of Mr. Avi Mondal
            </h4>
            <p class="text-slate-600 text-sm leading-relaxed font-normal italic">
              "<span data-i18n="leadershipContent"></span>"
            </p>

            <div class="border-l-4 border-orange-500 pl-4 py-1.5 bg-orange-50/50 rounded-r-xl">
              <p class="text-orange-950 font-extrabold text-xs sm:text-sm tracking-wide" data-i18n="leadershipQuote">
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-6 pt-2 text-xs">
              <div class="flex items-center gap-2 text-slate-700 font-bold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>Verified Citizen Companion Platform</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- National Trust and Sovereignty Showcase section featuring Red Fort -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div class="bg-slate-950 text-white rounded-3xl overflow-hidden relative shadow-xl border border-slate-800">
        <div class="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <!-- Top tri-color border decoration -->
        <div class="h-1 flex w-full">
          <div class="bg-[#FF9933] w-1/3 h-full"></div>
          <div class="bg-[#FFFFFF] w-1/3 h-full"></div>
          <div class="bg-[#138808] w-1/3 h-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12">
          
          <!-- Text Column -->
          <div class="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <div class="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full w-fit">
              <!-- Award SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              <span>Sovereign Public Trust Initiative</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight" data-i18n="physicalBranchTitle">
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed font-normal" data-i18n="physicalBranchSubtitle">
            </p>

            <!-- National Features List -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div class="space-y-1">
                <h4 class="font-extrabold text-sm text-orange-400" data-i18n="feature1Title"></h4>
                <p class="text-slate-400 text-[11px] leading-normal" data-i18n="feature1Desc"></p>
              </div>
              <div class="space-y-1">
                <h4 class="font-extrabold text-sm text-white" data-i18n="feature2Title"></h4>
                <p class="text-slate-400 text-[11px] leading-normal" data-i18n="feature2Desc"></p>
              </div>
              <div class="space-y-1">
                <h4 class="font-extrabold text-sm text-emerald-400" data-i18n="feature3Title"></h4>
                <p class="text-slate-400 text-[11px] leading-normal" data-i18n="feature3Desc"></p>
              </div>
            </div>

            <p class="text-xs text-slate-500 pt-2 italic">
              "We serve with dedication, loyalty, and supreme integrity for the welfare of all people."
            </p>
          </div>

          <!-- Image Column: Red Fort -->
          <div class="lg:col-span-5 relative min-h-[300px]">
            <img src="${redFortBase64}" alt="Historic Red Fort of India - Sovereign Trust and National Identity" class="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent hidden lg:block"></div>
            <div class="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-[10px] text-orange-300 font-extrabold px-3 py-1.5 rounded-lg border border-orange-500/30 uppercase tracking-widest">
              India's Proud Red Fort
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Interactive Cyber Safety Center -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="cyber-safety">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left: Cyber Tips -->
        <div class="lg:col-span-6 bg-amber-50 rounded-2xl shadow-sm border border-amber-200/60 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-amber-500 text-amber-950 p-2.5 rounded-lg shadow">
                <!-- ShieldAlert SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-950"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/><path d="m12 8-3.5 3.5m0-3.5L12 11.5M12 16h.01"/></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-amber-950">
                  CYBER SAFETY — QUICK TIPS
                </h3>
                <p class="text-xs text-amber-900 mt-0.5 font-semibold">
                  Protect your identity and financial security
                </p>
              </div>
            </div>

            <ul class="space-y-3.5" id="cyber-tips-list">
              <!-- Dynamic rendering inside javascript -->
            </ul>
          </div>

          <div class="mt-8 pt-5 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span class="text-amber-950 font-black tracking-wide bg-amber-200 px-3 py-1 rounded-md">
              CYBER ALERTS HELPLINE: Dial 1930
            </span>
            <span class="text-slate-500 text-[10px] italic" data-i18n="cyberSafetyFooter">
            </span>
          </div>
        </div>

        <!-- Right: Interactive Cyber Safety Quiz -->
        <div class="lg:col-span-6 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-blue-600 text-white p-2.5 rounded-lg shadow-md shadow-blue-500/10">
                <!-- HelpCircle SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">
                  Cyber Safety Training Quiz
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  Test your knowledge and earn your "Cyber Safe Citizen" Badge
                </p>
              </div>
            </div>

            <!-- Quiz Screen Content -->
            <div id="quiz-screen-container">
              <!-- Rendered via JS based on state -->
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-800 flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
            <!-- Lock SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Authorized Security training module</span>
          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800 relative z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
        
        <!-- Column 1: Info and Brand -->
        <div class="md:col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img src="${footerLogoBase64}" alt="Citizen Services Point Logo" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-extrabold text-base tracking-tight" data-i18n="headerTitle"></h4>
              <p class="text-[10px] text-slate-400 mt-0.5 tracking-wide" data-i18n="tagline"></p>
            </div>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed font-normal" data-i18n="aboutUsContent">
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="md:col-span-3 space-y-4">
          <h5 class="font-bold text-xs uppercase tracking-widest text-orange-400">Quick Portal Links</h5>
          <ul class="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#about-us" class="hover:text-white transition-colors flex items-center gap-1.5">
                <!-- ChevronRight SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                <span>About Our Platform</span>
              </a>
            </li>
            <li>
              <a href="#schemes-explorer" class="hover:text-white transition-colors flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                <span>Government Schemes Finder</span>
              </a>
            </li>
            <li>
              <a href="#support-hub" class="hover:text-white transition-colors flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                <span>Physical Support Hub</span>
              </a>
            </li>
            <li>
              <a href="#cyber-safety" class="hover:text-white transition-colors flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>
                <span>Cyber Security Center</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Contact Details -->
        <div class="md:col-span-4 space-y-4">
          <h5 class="font-bold text-xs uppercase tracking-widest text-emerald-400">Help Desk Contacts</h5>
          <ul class="space-y-3 text-xs text-slate-400">
            <li class="flex items-start gap-2.5">
              <!-- Phone SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <span class="block font-medium text-slate-300">Helpline Calls:</span>
                <a href="tel:+913335715979" class="hover:text-white transition-colors font-mono font-bold">+91 3335715979</a>
              </div>
            </li>
            <li class="flex items-start gap-2.5">
              <!-- MessageSquare SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 shrink-0 mt-0.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <div>
                <span class="block font-medium text-slate-300">WhatsApp Support:</span>
                <a href="https://wa.me/919836634843" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors font-mono font-bold">+91 9836634843</a>
              </div>
            </li>
            <li class="flex items-start gap-2.5">
              <!-- Mail SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0 mt-0.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div>
                <span class="block font-medium text-slate-300">Support Email:</span>
                <a href="mailto:help.citizenservicespoint@outlook.in" class="hover:text-white transition-all font-semibold font-mono">help.citizenservicespoint@outlook.in</a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <!-- Slogans and Pledges bar -->
      <div class="py-8 space-y-4 text-center">
        
        <!-- National Building Slogan -->
        <div class="space-y-1">
          <p class="text-xs sm:text-sm font-extrabold text-slate-200 italic">
            "Dedicated to Nation Building through Service, Your Trust is Our Strength — Bharat Mata Ki Jai."
          </p>
        </div>

        <!-- Warning Boxes & official Links -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left pt-2 text-[11px] text-slate-400">
          
          <!-- Alert Box -->
          <div class="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl space-y-2">
            <span class="font-extrabold text-orange-400 block uppercase tracking-wider">🔒 Cyber Security & Safety Alert</span>
            <p class="leading-relaxed">
              Never share your OTP or PIN. Citizen Services Point representatives or government authorized agents will never ask for sensitive credentials. Report fraud immediately at 1930.
            </p>
          </div>

          <!-- Digital India box -->
          <div class="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
            <span class="font-extrabold text-emerald-400 block uppercase tracking-wider">🌐 Official Digital India Services</span>
            <p class="leading-relaxed">
              For detailed information on official government services and programs, please visit the authorized portal directly at <a href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer" class="underline text-emerald-400 font-bold hover:text-emerald-300 inline-flex items-center gap-0.5">digitalindia.gov.in</a>
            </p>
          </div>

        </div>

        <!-- Copyright and signature -->
        <div class="pt-6 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 max-w-4xl mx-auto">
          <span data-i18n="rightsReserved"></span>
          <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span class="text-slate-400">Powered by Citizen Services Point</span>
          </div>
        </div>

      </div>

    </div>
  </footer>

  <!-- Application State & Interactive Logic -->
  <script>
    // Embedded Data
    const TRANSLATIONS = ${JSON.stringify(translations)};
    const SCHEMES = ${JSON.stringify(schemesData)};

    // App Interactive State
    const state = {
      lang: 'en',
      category: 'all',
      searchTerm: '',
      expandedSchemeId: null,
      quizStarted: false,
      quizCurrentIndex: 0,
      quizSelectedAnswer: null,
      quizScore: 0,
      quizFinished: false
    };

    // Quiz Questions (English Only)
    const QUIZ_QUESTIONS = [
      {
        question: "If someone calls claiming to be from Citizen Services Point and asks for your OTP to verify your application, what should you do?",
        options: [
          "Share it immediately to complete verification.",
          "Politely refuse and never share it. Government officials never ask for OTPs.",
          "Give it only if they sound very professional.",
          "Tell them to call back later."
        ],
        correctIndex: 1,
        explanation: "Never share OTPs, PINs, or passwords with anyone. Government authorized agents or portals will never ask for sensitive credentials."
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

    // Language switcher
    function setLang(lang) {
      state.lang = lang;
      
      // Update Language Switcher Buttons Style
      ['en', 'bn', 'hi'].forEach(l => {
        const btn = document.getElementById('btn-lang-' + l);
        if (btn) {
          if (l === lang) {
            btn.className = "px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 bg-white text-blue-800 shadow-xs";
          } else {
            btn.className = "px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 text-slate-600 hover:text-slate-900";
          }
        }
      });

      render();
    }

    // Category Selector
    function setCategory(cat) {
      state.category = cat;
      state.expandedSchemeId = null;

      // Update Tabs active styles
      ['all', 'state', 'central', 'scholarship'].forEach(c => {
        const tab = document.getElementById('tab-' + c);
        if (tab) {
          if (c === cat) {
            tab.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all bg-white text-slate-900 shadow-sm shrink-0";
          } else {
            tab.className = "px-4 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 hover:text-slate-900 shrink-0";
          }
        }
      });

      renderSchemes();
    }

    // Search Handler
    function handleSearch(term) {
      state.searchTerm = term.toLowerCase().trim();
      renderSchemes();
    }

    // Toggle Expand/Collapse Scheme Details
    function toggleScheme(id) {
      if (state.expandedSchemeId === id) {
        state.expandedSchemeId = null;
      } else {
        state.expandedSchemeId = id;
      }
      renderSchemes();
    }

    // Interactive Quiz Actions
    function startQuiz() {
      state.quizStarted = true;
      state.quizCurrentIndex = 0;
      state.quizSelectedAnswer = null;
      state.quizScore = 0;
      state.quizFinished = false;
      renderQuiz();
    }

    function handleQuizAnswer(idx) {
      if (state.quizSelectedAnswer !== null) return;
      state.quizSelectedAnswer = idx;
      
      const isCorrect = idx === QUIZ_QUESTIONS[state.quizCurrentIndex].correctIndex;
      if (isCorrect) {
        state.quizScore += 1;
      }
      renderQuiz();
    }

    function nextQuizQuestion() {
      if (state.quizCurrentIndex < QUIZ_QUESTIONS.length - 1) {
        state.quizCurrentIndex += 1;
        state.quizSelectedAnswer = null;
      } else {
        state.quizFinished = true;
      }
      renderQuiz();
    }

    function exitQuiz() {
      state.quizStarted = false;
      state.quizCurrentIndex = 0;
      state.quizSelectedAnswer = null;
      state.quizScore = 0;
      state.quizFinished = false;
      renderQuiz();
    }

    // Renders the safety quiz panel dynamically
    function renderQuiz() {
      const container = document.getElementById('quiz-screen-container');
      if (!container) return;

      if (!state.quizStarted) {
        container.innerHTML = \`
          <div class="text-center py-12 space-y-4">
            <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <div class="space-y-1.5">
              <h4 class="font-bold text-sm text-slate-200">Ready to test your safety IQ?</h4>
              <p class="text-xs text-slate-400 max-w-sm mx-auto">Take our quick 3-question quiz to ensure you are safe from financial and identity frauds.</p>
            </div>
            <button onclick="startQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all uppercase tracking-wider">
              Start Quiz
            </button>
          </div>
        \`;
        return;
      }

      if (state.quizFinished) {
        container.innerHTML = \`
          <div class="text-center py-10 space-y-5">
            <div class="w-20 h-20 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>
            <div class="space-y-1.5">
              <h4 class="font-extrabold text-lg text-emerald-400">Congratulations!</h4>
              <p class="text-xs text-slate-300">
                You scored \${state.quizScore} out of \${QUIZ_QUESTIONS.length}.
              </p>
              \${state.quizScore === QUIZ_QUESTIONS.length ? \`
                <span class="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mt-2">
                  🏆 Certified Cyber-Safe Citizen
                </span>
              \` : \`
                <span class="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mt-2">
                  Keep Learning! Safety First
                </span>
              \`}
            </div>

            <div class="flex justify-center gap-3">
              <button onclick="startQuiz()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-lg text-xs border border-slate-700 transition-colors">
                Try Again
              </button>
              <button onclick="exitQuiz()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors">
                Exit
              </button>
            </div>
          </div>
        \`;
        return;
      }

      const q = QUIZ_QUESTIONS[state.quizCurrentIndex];
      let optionsHtml = '';

      q.options.forEach((opt, idx) => {
        const isCorrect = idx === q.correctIndex;
        const isSelected = state.quizSelectedAnswer === idx;
        let btnStyle = "bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700";
        
        if (state.quizSelectedAnswer !== null) {
          if (isCorrect) {
            btnStyle = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
          } else if (isSelected) {
            btnStyle = "bg-rose-500/20 text-rose-400 border-rose-500/40";
          } else {
            btnStyle = "bg-slate-800/40 text-slate-500 border-slate-800/80 pointer-events-none";
          }
        }

        optionsHtml += \`
          <button 
            onclick="handleQuizAnswer(\${idx})"
            \${state.quizSelectedAnswer !== null ? 'disabled' : ''}
            class="w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all \${btnStyle}"
          >
            <div class="flex items-start gap-2">
              <span class="font-mono text-[10px] text-slate-400 mt-0.5 shrink-0 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                \${String.fromCharCode(65 + idx)}
              </span>
              <span class="leading-relaxed">\${opt}</span>
            </div>
          </button>
        \`;
      });

      let explanationHtml = '';
      if (state.quizSelectedAnswer !== null) {
        const answerLabel = state.quizSelectedAnswer === q.correctIndex 
          ? '<span class="text-emerald-400">✓ Correct Answer</span>' 
          : '<span class="text-rose-400">✗ Incorrect Answer</span>';

        explanationHtml = \`
          <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1 mt-4">
            <p class="font-extrabold text-white flex items-center gap-1">
              \${answerLabel}
            </p>
            <p class="leading-relaxed font-normal">
              \${q.explanation}
            </p>
            <div class="pt-2 text-right">
              <button 
                onclick="nextQuizQuestion()"
                class="bg-slate-700 hover:bg-slate-650 text-white font-bold py-1.5 px-3 rounded text-[10px] transition-colors"
              >
                \${state.quizCurrentIndex === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        \`;
      }

      container.innerHTML = \`
        <div class="space-y-4">
          <div class="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Question \${state.quizCurrentIndex + 1} of \${QUIZ_QUESTIONS.length}</span>
            <span>Score: \${state.quizScore}</span>
          </div>

          <h4 class="font-bold text-sm text-slate-100 leading-relaxed">
            \${q.question}
          </h4>

          <div class="space-y-2">
            \${optionsHtml}
          </div>

          \${explanationHtml}
        </div>
      \`;
    }

    // Render public schemes explorer list
    function renderSchemes() {
      const container = document.getElementById('schemes-list-container');
      if (!container) return;

      const t = TRANSLATIONS[state.lang];
      const filtered = SCHEMES.filter(s => {
        const matchesCat = state.category === 'all' || s.category === state.category;
        const matchesSearch = s.nameEn.toLowerCase().includes(state.searchTerm) || 
                              s.descriptionEn.toLowerCase().includes(state.searchTerm);
        return matchesCat && matchesSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = \`
          <div class="text-center py-12 text-slate-500 font-medium text-xs sm:text-sm">
            No schemes found matching your search. Try adjusting the filter or query.
          </div>
        \`;
        return;
      }

      let schemesHtml = '';
      filtered.forEach(s => {
        const isExpanded = state.expandedSchemeId === s.id;
        const catBadgeLabel = s.category === 'state' ? 'West Bengal' : (s.category === 'central' ? 'Central' : 'Scholarship');
        const catBadgeClass = s.category === 'state' 
          ? 'bg-orange-100 text-orange-800 border border-orange-200/50' 
          : (s.category === 'central' ? 'bg-blue-100 text-blue-800 border border-blue-200/50' : 'bg-emerald-100 text-emerald-800 border border-emerald-200/50');

        let detailsHtml = '';
        if (isExpanded) {
          // Render lists
          let eligibilityList = '';
          s.eligibilityEn.forEach(item => {
            eligibilityList += \`
              <li class="flex items-start gap-2 leading-relaxed">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>\${item}</span>
              </li>
            \`;
          });

          let benefitsList = '';
          s.benefitsEn.forEach(item => {
            benefitsList += \`
              <li class="flex items-start gap-2 leading-relaxed">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>\${item}</span>
              </li>
            \`;
          });

          let documentsList = '';
          s.documentsEn.forEach(item => {
            documentsList += \`
              <li class="flex items-start gap-2 leading-relaxed">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 shrink-0 mt-0.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                <span>\${item}</span>
              </li>
            \`;
          });

          detailsHtml = \`
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 pt-5 border-t border-slate-100 text-xs transition-all duration-300">
              <!-- Eligibility -->
              <div class="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <h5 class="font-extrabold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  \${t.eligibility}
                </h5>
                <ul class="space-y-2 text-slate-600 list-none">
                  \${eligibilityList}
                </ul>
              </div>

              <!-- Benefits -->
              <div class="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <h5 class="font-extrabold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  \${t.benefits}
                </h5>
                <ul class="space-y-2 text-slate-600 list-none">
                  \${benefitsList}
                </ul>
              </div>

              <!-- Documents -->
              <div class="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                <h5 class="font-extrabold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  \${t.documentsRequired}
                </h5>
                <ul class="space-y-2 text-slate-600 list-none">
                  \${documentsList}
                </ul>
              </div>
            </div>
          \`;
        }

        schemesHtml += \`
          <div class="py-5 first:pt-0 last:pb-0 transition-colors">
            <div onclick="toggleScheme('\${s.id}')" class="flex items-start justify-between gap-4 cursor-pointer group">
              <div class="space-y-1.5 text-left">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-extrabold text-base sm:text-lg text-slate-950 group-hover:text-blue-600 transition-colors">
                    \${s.nameEn}
                  </h4>
                  <span class="text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider \${catBadgeClass}">
                    \${catBadgeLabel}
                  </span>
                </div>
                <p class="text-xs text-slate-600 max-w-3xl leading-relaxed">
                  \${s.descriptionEn}
                </p>
              </div>
              <button class="bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg text-slate-500 group-hover:text-slate-800 transition-all shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 \${isExpanded ? 'rotate-180 text-blue-600' : ''}"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
            \${detailsHtml}
          </div>
        \`;
      });

      container.innerHTML = schemesHtml;
    }

    // Dynamic UI Translation renderer
    function render() {
      const langSet = TRANSLATIONS[state.lang];
      if (!langSet) return;

      // Localize static text elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langSet[key]) {
          el.textContent = langSet[key];
        }
      });

      // Update Search Input placeholder
      const searchInput = document.getElementById('scheme-search-input');
      if (searchInput) {
        searchInput.placeholder = langSet.searchPlaceholder;
      }

      // Render Dynamic sections
      renderSchemes();
      renderQuiz();

      // Render Cyber Safety Tips list
      const tipsList = document.getElementById('cyber-tips-list');
      if (tipsList) {
        let tipsHtml = '';
        langSet.cyberSafetyTips.forEach((tip, idx) => {
          tipsHtml += \`
            <li class="flex items-start gap-3.5 text-xs text-amber-950 font-medium text-left">
              <span class="w-5 h-5 rounded bg-amber-200/80 border border-amber-300 text-amber-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                \${String(idx + 1).padStart(2, '0')}
              </span>
              <p class="leading-relaxed">\${tip}</p>
            </li>
          \`;
        });
        tipsList.innerHTML = tipsHtml;
      }
    }

    // Initialize Page
    window.addEventListener('DOMContentLoaded', () => {
      render();
    });
  </script>
</body>
</html>`;

// Write the compiled single page html
fs.writeFileSync(path.join(publicDir, 'index_single_file.html'), htmlContent);
fs.writeFileSync(path.join(__dirname, 'index_single_file.html'), htmlContent);

console.log('Successfully generated the standalone single-file HTML version in /public/index_single_file.html and /index_single_file.html!');
