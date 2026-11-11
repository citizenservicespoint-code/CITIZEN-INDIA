export type SwachhtaLang = 'en' | 'bn' | 'hi';

export interface PledgeCardUITranslations {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  voluntaryNotice: string;
  counterLabel: string;
  counterSubtext: string;
  counterLoading: string;
  counterUnavailable: string;
  counterRefreshBtn: string;
  tabApply: string;
  tabVerify: string;
  pledgeHeading: string;
  pledgeStatement: string;
  formTitle: string;
  formSubtitle: string;
  fields: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    guardianNameLabel: string;
    guardianNamePlaceholder: string;
    genderLabel: string;
    genderPlaceholder: string;
    genderMale: string;
    genderFemale: string;
    genderOther: string;
    dobLabel: string;
    stateLabel: string;
    statePlaceholder: string;
    districtLabel: string;
    districtPlaceholder: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    mobileHelper: string;
    declarationLabel: string;
  };
  submitBtn: string;
  submittingBtn: string;
  resetFormBtn: string;
  validation: {
    fullNameRequired: string;
    guardianNameRequired: string;
    genderRequired: string;
    dobRequired: string;
    dobFutureError: string;
    stateRequired: string;
    districtRequired: string;
    mobileInvalid: string;
    declarationRequired: string;
  };
  duplicateMobileTitle: string;
  duplicateMobileMessage: string;
  duplicateMobileCta: string;
  verifySectionTitle: string;
  verifySectionSubtitle: string;
  methodATitle: string;
  methodASubtitle: string;
  citizenIdLabel: string;
  citizenIdPlaceholder: string;
  verifyIdBtn: string;
  verifyingIdBtn: string;
  methodBTitle: string;
  methodBSubtitle: string;
  recoverBtn: string;
  recoveringBtn: string;
  verifyValidation: {
    invalidCitizenId: string;
    invalidRecoveryDetails: string;
  };
  captcha: {
    notARobotLabel: string;
    securityHeading: string;
    promptText: string;
    inputPlaceholder: string;
    verifyCodeBtn: string;
    verifiedBadge: string;
    refreshBtn: string;
    loadingText: string;
    requiredError: string;
    invalidError: string;
    expiredError: string;
    privacyTerms: string;
  };
  cardDisplay: {
    successBannerTitle: string;
    successBannerSubtitle: string;
    verifiedBannerTitle: string;
    verifiedBannerSubtitle: string;
    downloadPdfBtn: string;
    downloadingPdfBtn: string;
    cardLabels: {
      citizenId: string;
      fullName: string;
      gender: string;
      mobileLast4: string;
      state: string;
      district: string;
      status: string;
      statusActive: string;
      pledgeHeading: string;
      pledgeQuote: string;
      disclaimer: string;
    };
  };
}

export interface SwachhtarPotheContent {
  meta: {
    pageTitle: string;
    breadcrumbLabel: string;
    navButtonLabel: string;
    drawerTitle: string;
    drawerSubtitle: string;
    homeBannerKicker: string;
    homeBannerTitle: string;
    homeBannerDesc: string;
    homeBannerCta: string;
    footerLinkLabel: string;
  };
  branding: {
    titleBn: string;
    titleEn: string;
    titleHi: string;
    descriptor: string;
    attribution: string;
    independentDisclaimer: string;
  };
  quickNav: {
    heading: string;
    items: Array<{ id: string; label: string }>;
    backToTop: string;
    shareInitiative: string;
    shareCopied: string;
    shareSuccess: string;
  };
  sectionA_hero: {
    primaryMessage: {
      bn: string;
      en: string;
      hi: string;
    };
    activeHeadline: string;
    supportingExplanation: string;
    ctaLearn: string;
    ctaPledge: string;
    ctaVerify: string;
    ctaReport: string;
    heroImageAlt: string;
    heroImageCaption: string;
  };
  sectionB_why: {
    sectionLabel: string;
    title: string;
    points: string[];
  };
  sectionC_landmarks: {
    sectionLabel: string;
    title: string;
    explanationParagraphs: string[];
    actionBoxTitle: string;
    actions: string[];
    imageAlt: string;
    imageCaption: string;
  };
  sectionD_publicPlaces: {
    sectionLabel: string;
    title: string;
    intro: string;
    points: string[];
    binSystemNote: string;
    litterImageAlt: string;
    litterImageCaption: string;
    binImageAlt: string;
    binImageCaption: string;
    railwayImageAlt: string;
    railwayImageCaption: string;
  };
  sectionE_waterBodies: {
    sectionLabel: string;
    title: string;
    intro: string;
    points: string[];
    imageAlt: string;
    imageCaption: string;
  };
  sectionF_reportingGuide: {
    sectionLabel: string;
    title: string;
    intro: string;
    steps: Array<{
      stepNumber: string;
      text: string;
    }>;
    guidanceDisclaimer: string;
    verifiedChannelsHeading: string;
    verifiedChannels: Array<{
      name: string;
      scope: string;
      url: string;
      linkLabel: string;
    }>;
  };
  sectionG_animals: {
    sectionLabel: string;
    title: string;
    points: string[];
    childWildlifeWarning: string;
    imageAlt: string;
    imageCaption: string;
  };
  sectionH_children: {
    sectionLabel: string;
    title: string;
    points: string[];
    supportiveNote: string;
    imageAlt: string;
    imageCaption: string;
  };
  sectionI_beyondCleanliness: {
    sectionLabel: string;
    title: string;
    themes: string[];
  };
  sectionJ_emergencyCyber: {
    sectionLabel: string;
    title: string;
    card112: {
      number: string;
      heading: string;
      description: string;
      callLabel: string;
    };
    card1930: {
      number: string;
      heading: string;
      description: string;
      callLabel: string;
      portalUrl: string;
      portalLabel: string;
    };
    noGuaranteeNote: string;
    imageAlt: string;
    imageCaption: string;
  };
  pledgeCardSystem: PledgeCardUITranslations;
  sectionL_reportBuilder: {
    sectionLabel: string;
    title: string;
    localToolNotice: string;
    locationLabel: string;
    locationPlaceholder: string;
    locationHelper: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    categories: Array<{ value: string; label: string }>;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionHelper: string;
    photoLabel: string;
    photoHelper: string;
    photoSelectBtn: string;
    photoRemoveBtn: string;
    generateBtn: string;
    clearBtn: string;
    validationErrors: {
      locationLength: string;
      categoryRequired: string;
      descriptionLength: string;
      invalidFileType: string;
      fileTooLarge: string;
    };
    summaryCard: {
      heading: string;
      localStatusNote: string;
      locationTitle: string;
      categoryTitle: string;
      descriptionTitle: string;
      photoTitle: string;
      photoIncluded: string;
      photoNotIncluded: string;
      dateTitle: string;
      copyBtn: string;
      copiedText: string;
      printBtn: string;
      officialChannelsTitle: string;
    };
  };
  sectionM_checklist: {
    sectionLabel: string;
    title: string;
    progressLabel: string;
    resetBtn: string;
    printBtn: string;
    printHeader: string;
    items: Array<{
      id: string;
      text: string;
    }>;
  };
  sectionN_closing: {
    sectionLabel: string;
    title: string;
    reflectionParagraphs: string[];
    brandSloganEn: string;
    translatedSlogan: string;
    attributionPrimary: string;
    attributionSecondary: string;
  };
}

export const INDIAN_STATES_AND_UTS: string[] = [
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
  'Puducherry'
];

export const swachhtarPotheTranslations: Record<SwachhtaLang, SwachhtarPotheContent> = {
  en: {
    meta: {
      pageTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह — Citizen Services Point',
      breadcrumbLabel: 'Swachhtar Pothe',
      navButtonLabel: 'SWACHHTAR POTHE',
      drawerTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE',
      drawerSubtitle: 'A Citizen India Initiative',
      homeBannerKicker: 'A Citizen India Initiative · This Project Is Under Citizen India',
      homeBannerTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह',
      homeBannerDesc: '“Building a cleaner, safer and more responsible India begins with us.” Explore heritage protection, public cleanliness, river care, animal welfare, youth safety, and apply for your voluntary Citizen Pledge Card.',
      homeBannerCta: 'Explore Swachhtar Pothe',
      footerLinkLabel: 'Swachhtar Pothe (A Citizen India Initiative)'
    },
    branding: {
      titleBn: 'স্বচ্ছতার পথে',
      titleEn: 'SWACHHTAR POTHE',
      titleHi: 'स्वच्छता की राह',
      descriptor: 'A Citizen India Initiative',
      attribution: 'This Project Is Under Citizen India',
      independentDisclaimer: '“This is an independent civic-awareness initiative. It is not a government department or official government portal.”'
    },
    quickNav: {
      heading: 'Quick Page Navigation',
      items: [
        { id: 'section-pledge', label: '1. Citizen Pledge Card' },
        { id: 'section-pledge-verify', label: '2. Verify / Download Card' },
        { id: 'section-landmarks', label: '3. Heritage & Howrah Bridge' },
        { id: 'section-public-places', label: '4. Roads & Railway Stations' },
        { id: 'section-water', label: '5. Rivers & Ghats' },
        { id: 'section-animals', label: '6. Animal Welfare' },
        { id: 'section-children', label: '7. Youth Protection' },
        { id: 'section-reporting-guide', label: '8. Civic Reporting Guide' },
        { id: 'section-report-builder', label: '9. Civic Issue Builder' },
        { id: 'section-checklist', label: '10. Responsibility Checklist' },
        { id: 'section-emergency', label: '11. Emergency (112) & Cyber (1930)' }
      ],
      backToTop: 'Back to Top',
      shareInitiative: 'Share Initiative Link',
      shareCopied: 'Link Copied',
      shareSuccess: 'Shared'
    },
    sectionA_hero: {
      primaryMessage: {
        bn: '“একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল ভারত গড়ার শুরু আমাদের নিজেদের থেকেই।”',
        en: '“Building a cleaner, safer and more responsible India begins with us.”',
        hi: '“एक स्वच्छ, सुरक्षित और जिम्मेदार भारत के निर्माण की शुरुआत हम स्वयं से करते हैं।”'
      },
      activeHeadline: '“Building a cleaner, safer and more responsible India begins with us.”',
      supportingExplanation:
        'Cleanliness, public safety, environmental care, heritage protection, animal welfare, and responsible citizenship are deeply connected. Lasting change requires both responsible public administration and responsible daily action by citizens.',
      ctaLearn: 'Learn Your Responsibility',
      ctaPledge: 'Get Citizen Pledge Card',
      ctaVerify: 'Verify / Download Card',
      ctaReport: 'Prepare a Civic Issue Note',
      heroImageAlt: 'Clean sunlit Indian avenue with green trees, pedestrian walkway, and orderly public infrastructure',
      heroImageCaption: 'Illustrative civic photograph: Clean roads, shaded walkways, and orderly shared spaces reflect everyday civic responsibility.'
    },
    sectionB_why: {
      sectionLabel: 'Civic Foundation',
      title: 'Why This Initiative Matters',
      points: [
        'Public cleanliness is not the responsibility of authorities alone.',
        'Citizens must not litter, spit in public places, damage public property, or pollute water bodies.',
        'Real improvement happens when citizens change everyday habits and also report genuine civic issues through proper channels.'
      ]
    },
    sectionC_landmarks: {
      sectionLabel: 'Heritage Protection',
      title: 'Protect Howrah Bridge and Public Heritage',
      explanationParagraphs: [
        'Howrah Bridge (Rabindra Setu) in Kolkata, West Bengal, is one of India’s most recognisable engineering landmarks and a vital daily river crossing.',
        'Paan and gutkha spitting, littering, and careless behaviour make public spaces unpleasant and can contribute to staining and maintenance problems on bridges, walls, stations, and public structures.'
      ],
      actionBoxTitle: 'How Citizens Must Protect Landmarks and Bridges',
      actions: [
        'Avoid spitting on bridges, walls and public structures.',
        'Never throw rubbish into rivers or from bridges.',
        'Respect public property and historical landmarks.',
        'Encourage others politely to behave responsibly.'
      ],
      imageAlt: 'Authentic photograph of Howrah Bridge (Rabindra Setu) over the Hooghly River seen from Mullick Ghat, Kolkata',
      imageCaption: 'Authentic photograph of Howrah Bridge (Rabindra Setu), Kolkata, West Bengal (Photo: Bernard Gagnon, Wikimedia Commons, CC BY-SA 3.0).'
    },
    sectionD_publicPlaces: {
      sectionLabel: 'Public Cleanliness',
      title: 'Keep Roads, Railway Stations and Public Places Clean',
      intro: 'Everyday discipline on streets, footpaths, railway platforms, and public transport keeps shared spaces clean and safe for everyone:',
      points: [
        'Using designated bins.',
        'Not throwing wrappers, plastic, bottles or food waste onto roads.',
        'Keeping railway platforms and public transport areas clean.',
        'Avoiding spitting on public walls and structures.',
        'Not damaging benches, signs or other public property.'
      ],
      binSystemNote: 'Note: Waste-bin colour systems vary across different municipalities and transit authorities; always follow the labels displayed on local public bins.',
      litterImageAlt: 'Plastic bottles and food wrappers discarded beside a roadside drain grate',
      litterImageCaption: 'Public Littering: Discarded wrappers and plastic bottles block roadside drains and make footpaths unsanitary.',
      binImageAlt: 'Citizen placing waste responsibly into a designated public waste bin',
      binImageCaption: 'Responsible Waste Disposal: Using designated public waste bins keeps streets clean (bin colour codes vary by municipality).',
      railwayImageAlt: 'Clean Indian railway platform with clear passenger walkways and waste bins',
      railwayImageCaption: 'Railway and Public Transport: Keeping railway platforms and transit spaces clean benefits every passenger.'
    },
    sectionE_waterBodies: {
      sectionLabel: 'River & Water Care',
      title: 'Protect the Ganga, Rivers and Ghats',
      intro: 'Rivers, ghats, and water bodies sustain life, culture, and communities. Every visitor and resident should follow these practices:',
      points: [
        'Keep riverbanks and ghats free of litter.',
        'Use designated collection points.',
        'Avoid disposing of plastic and other waste in water.',
        'Follow local rules for ceremonial and other waste.'
      ],
      imageAlt: 'Clean riverfront ghat steps along the Ganga with bank-side waste collection bins',
      imageCaption: 'Ganga and River Ghats: Keeping ghat steps and river waters free of plastic and litter.'
    },
    sectionF_reportingGuide: {
      sectionLabel: 'Official Grievance Guide',
      title: 'How to Report Civic Problems',
      intro: 'Follow this 7-step guide when reporting civic or sanitation problems to the responsible local authority:',
      steps: [
        { stepNumber: 'Step 1', text: 'Identify the exact public location.' },
        { stepNumber: 'Step 2', text: 'Describe the problem factually.' },
        { stepNumber: 'Step 3', text: 'Record the date or relevant details if useful.' },
        { stepNumber: 'Step 4', text: 'Take a photograph only when safe and lawful.' },
        { stepNumber: 'Step 5', text: 'Identify the responsible local authority.' },
        { stepNumber: 'Step 6', text: 'Submit the complaint through a verified official channel.' },
        { stepNumber: 'Step 7', text: 'Keep any acknowledgement or reference number supplied by that authority.' }
      ],
      guidanceDisclaimer: 'Citizen Services Point provides guidance only and does not submit complaints to government authorities on the user’s behalf.',
      verifiedChannelsHeading: 'Verified Official Reporting Channels',
      verifiedChannels: [
        {
          name: 'Kolkata Municipal Corporation (KMC)',
          scope: 'Official municipal portal for civic services within KMC jurisdiction',
          url: 'https://www.kmcgov.in/',
          linkLabel: 'https://www.kmcgov.in/'
        },
        {
          name: 'Swachh Bharat Mission — Urban (MoHUA, Government of India)',
          scope: 'Official Ministry of Housing and Urban Affairs urban sanitation portal',
          url: 'https://sbmurban.org/',
          linkLabel: 'https://sbmurban.org/'
        }
      ]
    },
    sectionG_animals: {
      sectionLabel: 'Compassionate Citizenship',
      title: 'Humane Treatment of Street Animals',
      points: [
        'Do not hit, injure, poison or harass street animals.',
        'Provide clean water or suitable food only where safe and hygienic.',
        'Keep feeding areas clean and avoid blocking public paths.',
        'Do not touch injured, sick or aggressive animals without trained assistance.',
        'Contact a veterinarian, local municipal service or animal-welfare group when needed.',
        'Balance compassion for animals with public hygiene and human safety.'
      ],
      childWildlifeWarning: 'Important Safety Warning: Children should not approach unknown animals or handle injured wildlife.',
      imageAlt: 'Community dog drinking clean water from a bowl placed in a shaded, clean corner',
      imageCaption: 'Street Animal Welfare: Providing clean water safely in a quiet corner without blocking pedestrian paths.'
    },
    sectionH_children: {
      sectionLabel: 'Youth Wellbeing',
      title: 'Protect Children and Young People from Addictive Substances',
      points: [
        'Educate young people about the harms of tobacco, gutkha, alcohol and other addictive substances.',
        'Set a responsible example at home and in public.',
        'Encourage healthy activities, education and open conversation.',
        'Seek qualified medical or counselling support where needed.'
      ],
      supportiveNote: 'Supportive guidance, open family communication, and professional counselling help young people make healthy, addiction-free choices.',
      imageAlt: 'Schoolchildren in uniform with books and sports equipment in a clean school courtyard',
      imageCaption: 'Children and Youth: Encouraging education, sports, and healthy environments free from addictive substances.'
    },
    sectionI_beyondCleanliness: {
      sectionLabel: 'Responsible Behaviour',
      title: 'Civic Responsibility Beyond Cleanliness',
      themes: [
        'Follow traffic rules and respect pedestrians.',
        'Avoid unnecessary honking and reckless public behaviour.',
        'Respect public property and shared spaces.',
        'Do not spread rumours or unverified information.',
        'Help vulnerable people safely and respectfully.',
        'Encourage positive change without harassment or confrontation.'
      ]
    },
    sectionJ_emergencyCyber: {
      sectionLabel: 'Public Safety & Cyber Helpline',
      title: 'Emergency and Cyber-Safety Information',
      card112: {
        number: '112',
        heading: '112 — Emergency assistance',
        description: '112 is India’s emergency response number for urgent police, fire, medical, or immediate safety assistance.',
        callLabel: 'Dial 112'
      },
      card1930: {
        number: '1930',
        heading: '1930 — Cyber financial fraud helpline',
        description: '1930 and https://cybercrime.gov.in/ are official channels for reporting cybercrime and online financial fraud.',
        callLabel: 'Dial 1930',
        portalUrl: 'https://cybercrime.gov.in/',
        portalLabel: 'https://cybercrime.gov.in/'
      },
      noGuaranteeNote: 'Note: Emergency numbers 112 and 1930 and cybercrime.gov.in are operated by official government authorities. Citizen Services Point shares this public-interest information for awareness and does not operate these services or guarantee response times or outcomes.',
      imageAlt: 'Community members participating in responsible digital and civic safety awareness',
      imageCaption: 'Cyber Safety and Emergency Awareness: Staying informed about official emergency number 112 and cyber helpline 1930.'
    },
    pledgeCardSystem: {
      sectionBadge: 'Swachhtar Pothe · Citizen India',
      sectionTitle: 'Citizen Pledge Card — Application & Verification',
      sectionSubtitle: 'Read the civic pledge, accept the declaration, submit your details to receive your unique Citizen ID, or verify and re-download an existing card.',
      voluntaryNotice: 'Important Notice: This is a voluntary civic-awareness pledge card issued under Citizen India. It is NOT a government-issued document, identity proof, citizenship certificate, or official government card.',
      counterLabel: 'Total Citizens Who Have Taken the Pledge',
      counterSubtext: 'Live count retrieved directly from the official Citizen India Pledge database',
      counterLoading: 'Loading live count...',
      counterUnavailable: 'Database count temporarily unavailable',
      counterRefreshBtn: 'Refresh Count',
      tabApply: 'Apply for Citizen Pledge Card',
      tabVerify: 'Verify & Re-Download Card',
      pledgeHeading: 'The Swachhtar Pothe Civic Pledge',
      pledgeStatement: '“I pledge to keep my surroundings clean, protect public property, respect India\'s heritage, care for the environment, treat animals humanely and encourage responsible behaviour through my own actions.”',
      formTitle: 'Citizen Pledge Card Application Form',
      formSubtitle: 'Complete all required fields below. Only one Citizen Pledge Card is issued per registered mobile number.',
      fields: {
        fullNameLabel: '1. Full Name *',
        fullNamePlaceholder: 'Enter your full name (e.g., Subhajit Chatterjee)',
        guardianNameLabel: '2. Guardian Name *',
        guardianNamePlaceholder: 'Enter father / mother / guardian name',
        genderLabel: '3. Gender *',
        genderPlaceholder: 'Select Gender...',
        genderMale: 'Male',
        genderFemale: 'Female',
        genderOther: 'Other',
        dobLabel: '4. Date of Birth *',
        stateLabel: '5. State / Union Territory *',
        statePlaceholder: 'Select State / UT...',
        districtLabel: '6. District *',
        districtPlaceholder: 'Enter your district name (e.g., Kolkata)',
        mobileLabel: '7. Mobile Number (10-digit Indian Mobile) *',
        mobilePlaceholder: 'Enter 10-digit mobile number',
        mobileHelper: 'Used to prevent duplicate cards and enable card recovery. Only the last 4 digits will appear on your card.',
        declarationLabel: 'I hereby declare that I have read and understood the above information and voluntarily accept this declaration. I confirm that all the information provided by me in this application is true, correct and accurate to the best of my knowledge and belief. I have not knowingly provided any false or misleading information. I accept full responsibility for the accuracy of the information submitted by me. *'
      },
      submitBtn: 'Submit & Generate Citizen Pledge Card',
      submittingBtn: 'Submitting to Database...',
      resetFormBtn: 'Clear Form',
      validation: {
        fullNameRequired: 'Please enter your full name (at least 2 characters).',
        guardianNameRequired: 'Please enter your guardian’s name (at least 2 characters).',
        genderRequired: 'Please select your gender.',
        dobRequired: 'Please select your date of birth.',
        dobFutureError: 'Date of birth must be a valid past date.',
        stateRequired: 'Please select your State or Union Territory.',
        districtRequired: 'Please enter your district name (at least 2 characters).',
        mobileInvalid: 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).',
        declarationRequired: 'You must accept the mandatory civic pledge declaration before submitting.'
      },
      duplicateMobileTitle: 'Citizen Pledge Card Already Exists for This Mobile Number',
      duplicateMobileMessage: 'Only one Citizen Pledge Card can be issued per registered mobile number. You can immediately verify and re-download your existing card using your registered details.',
      duplicateMobileCta: 'Go to Card Verification & Re-Download',
      verifySectionTitle: 'Verify & Re-Download Your Citizen Pledge Card',
      verifySectionSubtitle: 'Retrieve your existing Citizen Pledge Card using either your Unique Citizen ID (Method A) or your Registered Mobile Number, State, and District (Method B).',
      methodATitle: 'Method A — Verify Using Citizen ID',
      methodASubtitle: 'Enter your 8-digit Citizen ID (format: CITIZEN-12345678)',
      citizenIdLabel: 'Unique Citizen ID *',
      citizenIdPlaceholder: 'CITIZEN-12345678',
      verifyIdBtn: 'Verify by Citizen ID',
      verifyingIdBtn: 'Verifying ID...',
      methodBTitle: 'Method B — Recover Using Registered Details',
      methodBSubtitle: 'Lost your Citizen ID? Enter your registered mobile number, state, and district to retrieve your card.',
      recoverBtn: 'Recover & View Card',
      recoveringBtn: 'Searching Records...',
      verifyValidation: {
        invalidCitizenId: 'Please enter a valid Citizen ID in the format CITIZEN-12345678.',
        invalidRecoveryDetails: 'Please provide a valid 10-digit mobile number, state, and district.'
      },
      captcha: {
        notARobotLabel: "I'm not a robot",
        securityHeading: 'Security Verification (CAPTCHA) *',
        promptText: 'Check the box and enter the 6-character security code shown below:',
        inputPlaceholder: 'ENTER 6-CHAR CODE',
        verifyCodeBtn: 'Verify',
        verifiedBadge: 'Verified — Ready to submit',
        refreshBtn: 'New Code',
        loadingText: 'Loading security challenge...',
        requiredError: 'Please complete the "I\'m not a robot" CAPTCHA security verification before proceeding.',
        invalidError: 'Incorrect CAPTCHA code. Please try again with the new security code.',
        expiredError: 'Security verification expired. Please complete the new CAPTCHA challenge.',
        privacyTerms: 'Protected Security Verification'
      },
      cardDisplay: {
        successBannerTitle: 'Citizen Pledge Card Issued Successfully!',
        successBannerSubtitle: 'Your pledge has been recorded in the Citizen India database. Save your Unique Citizen ID and download your commemorative PDF card below.',
        verifiedBannerTitle: 'Citizen Pledge Card Verified & Retrieved!',
        verifiedBannerSubtitle: 'Your verified Citizen Pledge Card record is displayed below. Click Download Card (PDF) to save or print a high-resolution copy.',
        downloadPdfBtn: 'Download Card (PDF)',
        downloadingPdfBtn: 'Generating High-Resolution PDF...',
        cardLabels: {
          citizenId: 'UNIQUE CITIZEN ID',
          fullName: 'FULL NAME',
          gender: 'GENDER',
          mobileLast4: 'REGISTERED MOBILE',
          state: 'STATE',
          district: 'DISTRICT',
          status: 'STATUS',
          statusActive: 'ACTIVE',
          pledgeHeading: 'CIVIC PLEDGE STATEMENT',
          pledgeQuote: '“I pledge to keep my surroundings clean, protect public spaces, respect the environment, and encourage responsible civic behaviour.”',
          disclaimer: 'This is a voluntary civic pledge card issued under Citizen India. It is not a government-issued identity document or proof of citizenship.'
        }
      }
    },
    sectionL_reportBuilder: {
      sectionLabel: 'Civic Observation Tool',
      title: 'Local Civic Issue Observation Builder',
      localToolNotice: 'This is a local browser tool that helps you prepare a structured note for your own use. It does not submit complaints to any government authority or store data on any server.',
      locationLabel: 'Public Location (3–120 characters) *',
      locationPlaceholder: 'e.g., Near Howrah Station Subway Gate 2',
      locationHelper: 'Enter between 3 and 120 characters.',
      categoryLabel: 'Issue Category *',
      categoryPlaceholder: 'Select an issue category...',
      categories: [
        { value: 'uncollected_rubbish', label: 'Uncollected rubbish' },
        { value: 'overflowing_bin', label: 'Overflowing bin' },
        { value: 'blocked_drain', label: 'Blocked drain' },
        { value: 'road_station_litter', label: 'Road or station litter' },
        { value: 'water_pollution', label: 'Water-body pollution' },
        { value: 'other_cleanliness', label: 'Other relevant civic cleanliness issue' }
      ],
      descriptionLabel: 'Factual Description (10–500 characters) *',
      descriptionPlaceholder: 'Describe the issue factually (10–500 characters)...',
      descriptionHelper: 'Enter between 10 and 500 characters.',
      photoLabel: 'Optional Photo (JPEG, PNG or WebP, max 5 MB — Local Browser Preview Only)',
      photoHelper: 'Processed locally in your browser memory; never uploaded to a server.',
      photoSelectBtn: 'Select Photo',
      photoRemoveBtn: 'Remove Photo',
      generateBtn: 'Generate Summary',
      clearBtn: 'Clear / Reset Form',
      validationErrors: {
        locationLength: 'Location must be between 3 and 120 characters.',
        categoryRequired: 'Please select one of the 6 issue categories.',
        descriptionLength: 'Description must be between 10 and 500 characters.',
        invalidFileType: 'Please select a valid JPEG, PNG, or WebP image.',
        fileTooLarge: 'Photo size must not exceed 5 MB.'
      },
      summaryCard: {
        heading: 'Civic Issue Observation Summary (Local Note)',
        localStatusNote: 'Prepared locally in your browser. Copy or print this summary to submit through the verified official authority channel.',
        locationTitle: 'Location',
        categoryTitle: 'Category',
        descriptionTitle: 'Description',
        photoTitle: 'Photo Preview',
        photoIncluded: 'Attached for local printout',
        photoNotIncluded: 'None',
        dateTitle: 'Date Prepared',
        copyBtn: 'Copy Summary',
        copiedText: 'Summary Copied',
        printBtn: 'Print Summary',
        officialChannelsTitle: 'Verified Official Reporting Channels'
      }
    },
    sectionM_checklist: {
      sectionLabel: 'Self-Assessment',
      title: 'Personal Responsibility Checklist',
      progressLabel: 'Completed',
      resetBtn: 'Reset Checklist',
      printBtn: 'Print Checklist',
      printHeader: 'PERSONAL RESPONSIBILITY CHECKLIST — SWACHHTAR POTHE',
      items: [
        { id: 'item-1', text: 'I will put my waste in an appropriate bin.' },
        { id: 'item-2', text: 'I will not spit on public property.' },
        { id: 'item-3', text: 'I will help keep roads, stations and shared spaces clean.' },
        { id: 'item-4', text: 'I will avoid littering rivers and ghats.' },
        { id: 'item-5', text: 'I will treat street animals humanely.' },
        { id: 'item-6', text: 'I will encourage children and young people to stay away from addictive substances.' },
        { id: 'item-7', text: 'I will respect public property and encourage responsible civic behaviour.' }
      ]
    },
    sectionN_closing: {
      sectionLabel: 'Closing Reflection',
      title: 'Closing Reflection',
      reflectionParagraphs: [
        'Protecting India’s environment, historical heritage, rivers, street animals, public spaces, and young people begins with the choices we make every day.',
        'When each of us takes personal responsibility for our surroundings and acts with respect and care, we help build a cleaner, safer, and more responsible nation.'
      ],
      brandSloganEn: '“Jai Hind. Jai Bharat.”',
      translatedSlogan: '“Jai Hind. Jai Bharat.”',
      attributionPrimary: 'Citizen Services Point',
      attributionSecondary: 'This Project Is Under Citizen India'
    }
  },

  bn: {
    meta: {
      pageTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह — Citizen Services Point',
      breadcrumbLabel: 'স্বচ্ছতার পথে',
      navButtonLabel: 'স্বচ্ছতার পথে',
      drawerTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE',
      drawerSubtitle: 'A Citizen India Initiative',
      homeBannerKicker: 'A Citizen India Initiative · This Project Is Under Citizen India',
      homeBannerTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह',
      homeBannerDesc: '“একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল ভারত গড়ার শুরু আমাদের নিজেদের থেকেই।” ঐতিহ্য রক্ষা, জনস্বচ্ছতা, নদী ও ঘাট সংরক্ষণ, পথপ্রাণী কল্যাণ এবং আপনার নাগরিক অঙ্গীকার কার্ড (Citizen Pledge Card) সংগ্রহ করুন।',
      homeBannerCta: 'স্বচ্ছতার পথে উদ্যোগটি দেখুন',
      footerLinkLabel: 'স্বচ্ছতার পথে (Swachhtar Pothe)'
    },
    branding: {
      titleBn: 'স্বচ্ছতার পথে',
      titleEn: 'SWACHHTAR POTHE',
      titleHi: 'स्वच्छता की राह',
      descriptor: 'A Citizen India Initiative',
      attribution: 'This Project Is Under Citizen India',
      independentDisclaimer: '“এটি একটি স্বতন্ত্র নাগরিক সচেতনতামূলক উদ্যোগ। এটি কোনো সরকারি দপ্তর বা সরকারি পোর্টাল নয়।”'
    },
    quickNav: {
      heading: 'দ্রুত নেভিগেশন (Quick Navigation)',
      items: [
        { id: 'section-pledge', label: '১. সিটিজেন প্লেজ কার্ড আবেদন' },
        { id: 'section-pledge-verify', label: '২. কার্ড যাচাই ও ডাউনলোড' },
        { id: 'section-landmarks', label: '৩. ঐতিহ্য ও হাওড়া ব্রিজ' },
        { id: 'section-public-places', label: '৪. রাস্তা ও রেলস্টেশন' },
        { id: 'section-water', label: '৫. নদী ও ঘাট' },
        { id: 'section-animals', label: '৬. পথপ্রাণী কল্যাণ' },
        { id: 'section-children', label: '৭. শিশু ও যুব সুরক্ষা' },
        { id: 'section-reporting-guide', label: '৮. নাগরিক সমস্যা জানানোর নিয়ম' },
        { id: 'section-report-builder', label: '৯. নাগরিক সমস্যা নোট তৈরি' },
        { id: 'section-checklist', label: '১০. দায়িত্বের তালিকা' },
        { id: 'section-emergency', label: '১১. জরুরি (112) ও সাইবার (1930)' }
      ],
      backToTop: 'উপরে ফিরে যান',
      shareInitiative: 'উদ্যোগের লিঙ্ক শেয়ার করুন',
      shareCopied: 'লিঙ্ক কপি হয়েছে',
      shareSuccess: 'শেয়ার সম্পন্ন'
    },
    sectionA_hero: {
      primaryMessage: {
        bn: '“একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল ভারত গড়ার শুরু আমাদের নিজেদের থেকেই।”',
        en: '“Building a cleaner, safer and more responsible India begins with us.”',
        hi: '“एक स्वच्छ, सुरक्षित और जिम्मेदार भारत के निर्माण की शुरुआत हम स्वयं से करते हैं।”'
      },
      activeHeadline: '“একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল ভারত গড়ার শুরু আমাদের নিজেদের থেকেই।”',
      supportingExplanation:
        'পরিচ্ছন্নতা, জননিরাপত্তা, পরিবেশ রক্ষা, ঐতিহ্য সংরক্ষণ, প্রাণীদের প্রতি মানবিকতা এবং দায়িত্বশীল নাগরিকত্ব একে অপরের সাথে গভীরভাবে যুক্ত। স্থায়ী পরিবর্তনের জন্য দায়িত্বশীল জন-প্রশাসনের পাশাপাশি নাগরিকদের দৈনন্দিন দায়িত্বশীল আচরণও অপরিহার্য।',
      ctaLearn: 'আপনার দায়িত্ব জানুন',
      ctaPledge: 'সিটিজেন প্লেজ কার্ড আবেদন',
      ctaVerify: 'কার্ড যাচাই ও ডাউনলোড',
      ctaReport: 'নাগরিক সমস্যার নোট তৈরি করুন',
      heroImageAlt: 'সবুজ গাছপালা ও পরিষ্কার হাঁটার পথসহ একটি পরিচ্ছন্ন ভারতীয় শহরের রাস্তা',
      heroImageCaption: 'প্রতীকী নাগরিক আলোকচিত্র: পরিচ্ছন্ন রাস্তা ও সুশৃঙ্খল জনস্থান আমাদের দৈনন্দিন নাগরিক সচেতনতারই প্রতিফলন।'
    },
    sectionB_why: {
      sectionLabel: 'নাগরিক ভিত্তি',
      title: 'কেন এই উদ্যোগটি গুরুত্বপূর্ণ',
      points: [
        'জনস্থানের পরিচ্ছন্নতা কেবলমাত্র প্রশাসনের একার দায়িত্ব নয়।',
        'নাগরিকদের প্রকাশ্য স্থানে আবর্জনা ফেলা, থুতু বা পানের পিক ফেলা, সরকারি সম্পত্তির ক্ষতি করা বা জলাশয় দূষিত করা উচিত নয়।',
        'প্রকৃত উন্নতি তখনই ঘটে যখন নাগরিকরা নিজেদের দৈনন্দিন অভ্যাস পরিবর্তন করেন এবং প্রকৃত নাগরিক সমস্যাগুলো সঠিক মাধ্যমে জানান।'
      ]
    },
    sectionC_landmarks: {
      sectionLabel: 'ঐতিহ্য সংরক্ষণ',
      title: 'হাওড়া ব্রিজ ও দেশের ঐতিহ্য রক্ষা করুন',
      explanationParagraphs: [
        'পশ্চিমবঙ্গের কলকাতার হাওড়া ব্রিজ (রবীন্দ্র সেতু) ভারতের অন্যতম প্রধান প্রকৌশল ঐতিহ্য এবং প্রতিদিনের যাতায়াতের একটি অত্যন্ত গুরুত্বপূর্ণ মাধ্যম।',
        'পান ও গুটখার পিক ফেলা, আবর্জনা ছড়ানো এবং অসচেতন আচরণ প্রকাশ্য স্থানকে অপরিচ্ছন্ন করে তোলে এবং সেতু, দেওয়াল, স্টেশন ও সরকারি স্থাপনায় দাগ ও রক্ষণাবেক্ষণজনিত সমস্যার সৃষ্টি করে।'
      ],
      actionBoxTitle: 'সেতু ও ঐতিহ্য রক্ষায় করণীয়',
      actions: [
        'সেতু, দেওয়াল এবং সরকারি স্থাপনায় থুতু বা পিক ফেলা থেকে বিরত থাকুন।',
        'কখনোই নদীতে বা সেতুর ওপর থেকে আবর্জনা ফেলবেন না।',
        'সরকারি সম্পত্তি এবং ঐতিহাসিক নিদর্শনগুলোর প্রতি শ্রদ্ধাশীল হোন।',
        'অন্যদেরও নম্রভাবে দায়িত্বশীল আচরণ করতে উৎসাহিত করুন।'
      ],
      imageAlt: 'কলকাতার মল্লিক ঘাট থেকে তোলা হুগলি নদীর ওপর হাওড়া ব্রিজের (রবীন্দ্র সেতু) বাস্তব আলোকচিত্র',
      imageCaption: 'কলকাতার হাওড়া ব্রিজের (রবীন্দ্র সেতু) বাস্তব আলোকচিত্র (আলোকচিত্রী: Bernard Gagnon, Wikimedia Commons, CC BY-SA 3.0)।'
    },
    sectionD_publicPlaces: {
      sectionLabel: 'জনস্বচ্ছতা',
      title: 'রাস্তা, রেলস্টেশন ও জনস্থান পরিষ্কার রাখুন',
      intro: 'রাস্তাঘাট, ফুটপাত, রেল প্ল্যাটফর্ম ও গণপরিবহনে আমাদের প্রতিদিনের সচেতন আচরণ জনস্থানকে সবার জন্য পরিচ্ছন্ন ও নিরাপদ রাখে:',
      points: [
        'নির্দিষ্ট ডাস্টবিন ব্যবহার করা।',
        'রাস্তায় খাবারের মোড়ক, প্লাস্টিক, বোতল বা খাবারের বর্জ্য না ফেলা।',
        'রেল প্ল্যাটফর্ম এবং গণপরিবহন এলাকা পরিষ্কার রাখা।',
        'দেওয়াল ও সরকারি স্থাপনায় থুতু বা পানের পিক না ফেলা।',
        'বেঞ্চ, সাইনবোর্ড বা অন্যান্য সরকারি সম্পত্তির ক্ষতি না করা।'
      ],
      binSystemNote: 'দ্রষ্টব্য: সব পৌরসভা বা সংস্থায় ডাস্টবিনের রঙের নিয়ম এক নাও হতে পারে; তাই স্থানীয় ডাস্টবিনে লেখা নির্দেশাবলী অনুসরণ করুন।',
      litterImageAlt: 'রাস্তার নালার পাশে পড়ে থাকা প্লাস্টিকের বোতল ও খাবারের মোড়ক',
      litterImageCaption: 'প্রকাশ্য স্থানে আবর্জনা ফেলা: রাস্তায় ফেলা প্লাস্টিক ও মোড়ক নিকাশি নালা আটকে দেয় এবং পরিবেশ নোংরা করে।',
      binImageAlt: 'নির্দিষ্ট ডাস্টবিনে দায়িত্বশীলভাবে আবর্জনা ফেলার দৃশ্য',
      binImageCaption: 'দায়িত্বশীল বর্জ্য নিষ্কাশন: নির্দিষ্ট ডাস্টবিন ব্যবহার করলে রাস্তাঘাট পরিষ্কার থাকে (ডাস্টবিনের রঙের নিয়ম স্থানভেদে ভিন্ন হতে পারে)।',
      railwayImageAlt: 'পরিষ্কার ভারতীয় রেলস্টেশন প্ল্যাটফর্ম ও ডাস্টবিন',
      railwayImageCaption: 'রেল ও গণপরিবহন: প্ল্যাটফর্ম ও স্টেশন পরিষ্কার রাখা প্রতিটি যাত্রীর যৌথ দায়িত্ব।'
    },
    sectionE_waterBodies: {
      sectionLabel: 'নদী ও জলাশয় সুরক্ষা',
      title: 'গঙ্গা, নদী ও ঘাট রক্ষা করুন',
      intro: 'নদী, ঘাট এবং জলাশয় আমাদের জীবন, সংস্কৃতি ও পরিবেশের অবিচ্ছেদ্য অংশ। এগুলো রক্ষায় নিম্নলিখিত নিয়মগুলো মেনে চলুন:',
      points: [
        'নদীর তীর এবং ঘাট আবর্জনামুক্ত রাখুন।',
        'বর্জ্য ফেলার জন্য নির্দিষ্ট সংগ্রহস্থল বা ডাস্টবিন ব্যবহার করুন।',
        'জলে প্লাস্টিক ও অন্যান্য আবর্জনা ফেলা থেকে বিরত থাকুন।',
        'পূজা বা আচার-অনুষ্ঠানের উপকরণ নিষ্কাশনের ক্ষেত্রে স্থানীয় নিয়ম মেনে চলুন।'
      ],
      imageAlt: 'গঙ্গার তীরে পরিষ্কার পাথরের ঘাট ও নির্দিষ্ট ডাস্টবিন',
      imageCaption: 'গঙ্গা ও নদীর ঘাট: ঘাটের সিঁড়ি ও নদীর জল প্লাস্টিক ও আবর্জনামুক্ত রাখা আমাদের কর্তব্য।'
    },
    sectionF_reportingGuide: {
      sectionLabel: 'অভিযোগ জানানোর নির্দেশিকা',
      title: 'নাগরিক সমস্যা কীভাবে জানাবেন',
      intro: 'সংশ্লিষ্ট কর্তৃপক্ষের কাছে নাগরিক বা পরিচ্ছন্নতা সংক্রান্ত সমস্যা জানানোর জন্য এই ৭টি ধাপ অনুসরণ করুন:',
      steps: [
        { stepNumber: 'ধাপ ১', text: 'সঠিক প্রকাশ্য স্থানটি (Location) চিহ্নিত করুন।' },
        { stepNumber: 'ধাপ ২', text: 'সমস্যাটি তথ্যনিষ্ঠভাবে বর্ণনা করুন।' },
        { stepNumber: 'ধাপ ৩', text: 'প্রয়োজনে তারিখ বা প্রাসঙ্গিক বিবরণ লিখে রাখুন।' },
        { stepNumber: 'ধাপ ৪', text: 'কেবলমাত্র নিরাপদ ও আইনসম্মত হলে তবেই ছবি তুলুন।' },
        { stepNumber: 'ধাপ ৫', text: 'দায়িত্বপ্রাপ্ত স্থানীয় কর্তৃপক্ষকে চিহ্নিত করুন।' },
        { stepNumber: 'ধাপ ৬', text: 'যাচাইকৃত সরকারি মাধ্যমের (Official Channel) সাহায্যে অভিযোগ জমা দিন।' },
        { stepNumber: 'ধাপ ৭', text: 'কর্তৃপক্ষের দেওয়া প্রাপ্তিস্বীকার বা রেফারেন্স নম্বর সংরক্ষণ করুন।' }
      ],
      guidanceDisclaimer: 'Citizen Services Point কেবলমাত্র পথনির্দেশ প্রদান করে এবং ব্যবহারকারীর হয়ে কোনো সরকারি কর্তৃপক্ষের কাছে অভিযোগ জমা দেয় না।',
      verifiedChannelsHeading: 'যাচাইকৃত সরকারি পোর্টালসমূহ',
      verifiedChannels: [
        {
          name: 'কলকাতা পৌরসংস্থা (KMC)',
          scope: 'কলকাতা পৌরসংস্থা এলাকার নাগরিক পরিষেবার সরকারি পোর্টাল',
          url: 'https://www.kmcgov.in/',
          linkLabel: 'https://www.kmcgov.in/'
        },
        {
          name: 'স্বচ্ছ ভারত মিশন — আরবান (MoHUA, ভারত সরকার)',
          scope: 'আবাসন ও নগর বিষয়ক মন্ত্রকের সরকারি নগর স্বচ্ছতা পোর্টাল',
          url: 'https://sbmurban.org/',
          linkLabel: 'https://sbmurban.org/'
        }
      ]
    },
    sectionG_animals: {
      sectionLabel: 'মানবিক নাগরিকত্ব',
      title: 'পথপ্রাণীদের প্রতি মানবিক আচরণ',
      points: [
        'পথপ্রাণীদের আঘাত করবেন না, জখম করবেন না, বিষ দেবেন না বা বিরক্ত করবেন না।',
        'কেবলমাত্র নিরাপদ ও স্বাস্থ্যকর স্থানে পরিষ্কার জল বা উপযুক্ত খাবার দিন।',
        'খাবার দেওয়ার স্থান পরিষ্কার রাখুন এবং সাধারণের চলাচলের পথ আটকাবেন না।',
        'প্রশিক্ষিত সহায়তা ছাড়া আহত, অসুস্থ বা আক্রমণাত্মক প্রাণীদের স্পর্শ করবেন না।',
        'প্রয়োজনে পশুচিকিৎসক, স্থানীয় পৌর পরিষেবা বা প্রাণী-কল্যাণ সংস্থার সাথে যোগাযোগ করুন।',
        'প্রাণীদের প্রতি সহানুভূতির পাশাপাশি জনস্বাস্থ্য ও মানুষের নিরাপত্তার ভারসাম্য বজায় রাখুন।'
      ],
      childWildlifeWarning: 'গুরুত্বপূর্ণ সতর্কতা: শিশুদের অপরিচিত প্রাণীর কাছে যাওয়া বা আহত বন্যপ্রাণী স্পর্শ করা উচিত নয়।',
      imageAlt: 'একটি পরিষ্কার ও ছায়াঘেরা কোণে মাটির পাত্রে জল পানরত পথকুকুর',
      imageCaption: 'পথপ্রাণী কল্যাণ: পথচারীদের চলাচলে বাধা না দিয়ে একটি পরিষ্কার কোণে পথপ্রাণীদের জন্য পরিষ্কার জলের ব্যবস্থা।'
    },
    sectionH_children: {
      sectionLabel: 'যুব কল্যাণ',
      title: 'শিশু ও তরুণদের নেশাজাতীয় দ্রব্য থেকে দূরে রাখুন',
      points: [
        'তামাক, গুটখা, মদ এবং অন্যান্য নেশাজাতীয় দ্রব্যের ক্ষতি সম্পর্কে তরুণদের সচেতন করুন।',
        'বাড়িতে এবং জনসমক্ষে দায়িত্বশীল দৃষ্টান্ত স্থাপন করুন।',
        'সুস্থ খেলাধুলা, শিক্ষা এবং খোলামেলা আলোচনার পরিবেশকে উৎসাহিত করুন।',
        'প্রয়োজনে যোগ্য চিকিৎসক বা কাউন্সেলিং বিশেষজ্ঞের সহায়তা নিন।'
      ],
      supportiveNote: 'সহানুভূতিশীল দিকনির্দেশনা, পারিবারিক সচেতনতা এবং বিশেষজ্ঞের পরামর্শ তরুণদের নেশামুক্ত ও সুস্থ জীবন গড়তে সাহায্য করে।',
      imageAlt: 'স্কুল প্রাঙ্গণে বই ও ফুটবল হাতে হাসিমুখে স্কুলের শিক্ষার্থীরা',
      imageCaption: 'শিশু ও যুবসমাজ: শিক্ষা, খেলাধুলা ও সুস্থ পরিবেশ শিশুদের নেশাজাতীয় দ্রব্য থেকে দূরে রাখে।'
    },
    sectionI_beyondCleanliness: {
      sectionLabel: 'দায়িত্বশীল আচরণ',
      title: 'পরিচ্ছন্নতার বাইরেও নাগরিক দায়িত্ব',
      themes: [
        'ট্রাফিক নিয়ম মেনে চলুন এবং পথচারীদের সম্মান করুন।',
        'অকারণে হর্ন বাজানো এবং বেপরোয়া আচরণ এড়িয়ে চলুন।',
        'সরকারি সম্পত্তি এবং যৌথ ব্যবহারের স্থানগুলোর প্রতি যত্নশীল হোন।',
        'গুজব বা যাচাই না করা তথ্য ছড়াবেন না।',
        'অসহায় মানুষদের নিরাপদে এবং সম্মানের সাথে সাহায্য করুন।',
        'হয়রানি বা বিবাদ ছাড়াই ইতিবাচক পরিবর্তনে উৎসাহ দিন।'
      ]
    },
    sectionJ_emergencyCyber: {
      sectionLabel: 'জরুরি ও সাইবার সুরক্ষা',
      title: 'জরুরি সহায়তা ও সাইবার সুরক্ষা তথ্য',
      card112: {
        number: '112',
        heading: '112 — জরুরি সহায়তা (Emergency assistance)',
        description: 'পুলিশ, দমকল, চিকিৎসা বা তাৎক্ষণিক নিরাপত্তা সহায়তার জন্য ভারতের সরকারি জরুরি পরিষেবা নম্বর হলো 112।',
        callLabel: '112 ডায়াল করুন'
      },
      card1930: {
        number: '1930',
        heading: '1930 — সাইবার আর্থিক প্রতারণা হেল্পলাইন',
        description: 'সাইবার অপরাধ এবং অনলাইন আর্থিক প্রতারণা রিপোর্ট করার সরকারি মাধ্যম হলো 1930 এবং https://cybercrime.gov.in/।',
        callLabel: '1930 ডায়াল করুন',
        portalUrl: 'https://cybercrime.gov.in/',
        portalLabel: 'https://cybercrime.gov.in/'
      },
      noGuaranteeNote: 'দ্রষ্টব্য: 112, 1930 এবং cybercrime.gov.in সরকারি কর্তৃপক্ষের দ্বারা পরিচালিত। Citizen Services Point কেবল জনসচেতনতার জন্য এই তথ্য প্রদর্শন করে এবং কোনো নির্দিষ্ট সময়সীমা বা ফলাফলের নিশ্চয়তা দেয় না।',
      imageAlt: 'সাইবার সুরক্ষা ও নাগরিক সচেতনতায় অংশগ্রহণকারী নাগরিকবৃন্দ',
      imageCaption: 'সাইবার সুরক্ষা ও জরুরি সচেতনতা: সরকারি জরুরি নম্বর 112 এবং সাইবার হেল্পলাইন 1930 সম্পর্কে সচেতন থাকুন।'
    },
    pledgeCardSystem: {
      sectionBadge: 'স্বচ্ছতার পথে · Citizen India',
      sectionTitle: 'সিটিজেন প্লেজ কার্ড (Citizen Pledge Card) — আবেদন ও যাচাইকরণ',
      sectionSubtitle: 'নাগরিক অঙ্গীকারটি পড়ুন, ঘোষণাপত্র গ্রহণ করে আপনার তথ্য জমা দিন এবং আপনার ইউনিক Citizen ID ও প্রিন্টযোগ্য কার্ড ডাউনলোড করুন।',
      voluntaryNotice: 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: এটি Citizen India-এর অধীনে প্রদত্ত একটি স্বেচ্ছামূলক নাগরিক সচেতনতা অঙ্গীকার কার্ড। এটি কোনো সরকারি নথি, পরিচয়পত্র, নাগরিকত্বের প্রমাণ বা সরকারি কার্ড নয়।',
      counterLabel: 'এখন পর্যন্ত মোট অঙ্গীকারবদ্ধ নাগরিকের সংখ্যা',
      counterSubtext: 'সরাসরি Citizen India Pledge ডাটাবেস থেকে প্রাপ্ত লাইভ সংখ্যা',
      counterLoading: 'লাইভ সংখ্যা লোড হচ্ছে...',
      counterUnavailable: 'ডাটাবেস সংখ্যা এই মুহূর্তে পাওয়া যাচ্ছে না',
      counterRefreshBtn: 'রিফ্রেশ করুন',
      tabApply: 'নতুন কার্ডের জন্য আবেদন করুন',
      tabVerify: 'কার্ড যাচাই ও পুনরায় ডাউনলোড',
      pledgeHeading: 'স্বচ্ছতার পথে নাগরিক অঙ্গীকার',
      pledgeStatement: '“আমি অঙ্গীকার করছি যে আমি আমার চারপাশ পরিষ্কার রাখব, সরকারি সম্পত্তি রক্ষা করব, ভারতের ঐতিহ্যকে সম্মান করব, পরিবেশের যত্ন নেব, প্রাণীদের প্রতি মানবিক আচরণ করব এবং আমার নিজের কাজের মাধ্যমে দায়িত্বশীল আচরণকে উৎসাহিত করব।”',
      formTitle: 'সিটিজেন প্লেজ কার্ড আবেদন ফর্ম',
      formSubtitle: 'নিচের সমস্ত আবশ্যক তথ্য পূরণ করুন। একটি নিবন্ধিত মোবাইল নম্বরে কেবলমাত্র একটিই সিটিজেন প্লেজ কার্ড ইস্যু করা হয়।',
      fields: {
        fullNameLabel: '১. সম্পূর্ণ নাম (Full Name) *',
        fullNamePlaceholder: 'আপনার সম্পূর্ণ নাম লিখুন',
        guardianNameLabel: '২. অভিভাবকের নাম (Guardian Name) *',
        guardianNamePlaceholder: 'পিতা / মাতা / অভিভাবকের নাম লিখুন',
        genderLabel: '৩. লিঙ্গ (Gender) *',
        genderPlaceholder: 'লিঙ্গ নির্বাচন করুন...',
        genderMale: 'পুরুষ (Male)',
        genderFemale: 'মহিলা (Female)',
        genderOther: 'অন্যান্য (Other)',
        dobLabel: '৪. জন্ম তারিখ (Date of Birth) *',
        stateLabel: '৫. রাজ্য / কেন্দ্রশাসিত অঞ্চল (State) *',
        statePlaceholder: 'রাজ্য নির্বাচন করুন...',
        districtLabel: '৬. জেলা (District) *',
        districtPlaceholder: 'আপনার জেলার নাম লিখুন (যেমন: Kolkata)',
        mobileLabel: '৭. মোবাইল নম্বর (১০ সংখ্যার ভারতীয় নম্বর) *',
        mobilePlaceholder: '১০ সংখ্যার মোবাইল নম্বর লিখুন',
        mobileHelper: 'ডুপ্লিকেট কার্ড রোধ ও কার্ড পুনরুদ্ধারের জন্য ব্যবহৃত হয়। কার্ডে কেবল শেষ ৪টি সংখ্যা প্রদর্শিত হবে।',
        declarationLabel: 'আমি এতদ্বারা ঘোষণা করছি যে আমি উপরের তথ্যগুলি পড়েছি ও বুঝেছি এবং স্বেচ্ছায় এই ঘোষণাপত্রটি গ্রহণ করছি। আমি নিশ্চিত করছি যে এই আবেদনে আমার দ্বারা প্রদত্ত সমস্ত তথ্য আমার সর্বোচ্চ জ্ঞান ও বিশ্বাস অনুসারে সত্য, সঠিক এবং নির্ভুল। আমি জেনেবুঝে কোনো মিথ্যা বা বিভ্রান্তিকর তথ্য প্রদান করিনি। আমার জমা দেওয়া তথ্যের সঠিকতার সম্পূর্ণ দায়িত্ব আমি গ্রহণ করছি। *'
      },
      submitBtn: 'আবেদন জমা দিন ও কার্ড তৈরি করুন',
      submittingBtn: 'ডাটাবেসে জমা হচ্ছে...',
      resetFormBtn: 'ফর্ম মুছুন',
      validation: {
        fullNameRequired: 'অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)।',
        guardianNameRequired: 'অনুগ্রহ করে অভিভাবকের নাম লিখুন (কমপক্ষে ২ অক্ষর)।',
        genderRequired: 'অনুগ্রহ করে লিঙ্গ নির্বাচন করুন।',
        dobRequired: 'অনুগ্রহ করে জন্ম তারিখ নির্বাচন করুন।',
        dobFutureError: 'জন্ম তারিখ অবশ্যই অতীতের একটি সঠিক তারিখ হতে হবে।',
        stateRequired: 'অনুগ্রহ করে আপনার রাজ্য নির্বাচন করুন।',
        districtRequired: 'অনুগ্রহ করে আপনার জেলার নাম লিখুন (কমপক্ষে ২ অক্ষর)।',
        mobileInvalid: 'অনুগ্রহ করে একটি সঠিক ১০ সংখ্যার ভারতীয় মোবাইল নম্বর দিন (6, 7, 8 বা 9 দিয়ে শুরু)।',
        declarationRequired: 'আবেদন জমা দেওয়ার আগে বাধ্যতামূলক অঙ্গীকার ঘোষণাপত্রটিতে টিক (✓) দিতে হবে।'
      },
      duplicateMobileTitle: 'এই মোবাইল নম্বরে ইতিমধ্যেই একটি সিটিজেন প্লেজ কার্ড রয়েছে',
      duplicateMobileMessage: 'একটি মোবাইল নম্বরে কেবলমাত্র একটিই কার্ড ইস্যু করা হয়। আপনি কার্ড যাচাই ও পুনরুদ্ধার বিভাগ থেকে আপনার কার্ডটি পুনরায় ডাউনলোড করতে পারবেন।',
      duplicateMobileCta: 'কার্ড যাচাই ও ডাউনলোড বিভাগে যান',
      verifySectionTitle: 'আপনার সিটিজেন প্লেজ কার্ড যাচাই ও পুনরায় ডাউনলোড করুন',
      verifySectionSubtitle: 'আপনার ইউনিক Citizen ID (পদ্ধতি A) অথবা নিবন্ধিত মোবাইল নম্বর, রাজ্য ও জেলা (পদ্ধতি B) ব্যবহার করে আপনার কার্ডটি পুনরুদ্ধার করুন।',
      methodATitle: 'পদ্ধতি A — Citizen ID দিয়ে যাচাই করুন',
      methodASubtitle: 'আপনার Citizen ID লিখুন (উদাহরণ: CITIZEN-12345678)',
      citizenIdLabel: 'ইউনিক Citizen ID *',
      citizenIdPlaceholder: 'CITIZEN-12345678',
      verifyIdBtn: 'Citizen ID যাচাই করুন',
      verifyingIdBtn: 'যাচাই করা হচ্ছে...',
      methodBTitle: 'পদ্ধতি B — নিবন্ধিত তথ্যের সাহায্যে পুনরুদ্ধার করুন',
      methodBSubtitle: 'Citizen ID হারিয়ে গেছে? আপনার নিবন্ধিত মোবাইল নম্বর, রাজ্য ও জেলা দিয়ে কার্ডটি খুঁজে নিন।',
      recoverBtn: 'কার্ড খুঁজুন ও দেখুন',
      recoveringBtn: 'তথ্য খোঁজা হচ্ছে...',
      verifyValidation: {
        invalidCitizenId: 'অনুগ্রহ করে CITIZEN-12345678 ফরম্যাটে সঠিক Citizen ID লিখুন।',
        invalidRecoveryDetails: 'অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর, রাজ্য ও জেলা প্রদান করুন।'
      },
      captcha: {
        notARobotLabel: "আমি রোবট নই (I'm not a robot)",
        securityHeading: 'নিরাপত্তা যাচাইকরণ (CAPTCHA) *',
        promptText: 'বক্সটিতে টিক দিন এবং নিচে দেখানো ৬-অক্ষরের নিরাপত্তা কোডটি লিখুন:',
        inputPlaceholder: '৬-অক্ষরের কোড লিখুন',
        verifyCodeBtn: 'যাচাই করুন',
        verifiedBadge: 'যাচাই সম্পন্ন — জমা দেওয়ার জন্য প্রস্তুত',
        refreshBtn: 'নতুন কোড',
        loadingText: 'নিরাপত্তা কোড লোড হচ্ছে...',
        requiredError: 'অনুগ্রহ করে এগিয়ে যাওয়ার আগে "আমি রোবট নই (I\'m not a robot)" CAPTCHA যাচাইকরণ সম্পন্ন করুন।',
        invalidError: 'ভুল CAPTCHA কোড। অনুগ্রহ করে নতুন নিরাপত্তা কোড দিয়ে আবার চেষ্টা করুন।',
        expiredError: 'নিরাপত্তা যাচাইয়ের সময় শেষ হয়েছে। অনুগ্রহ করে নতুন CAPTCHA কোডটি পূরণ করুন।',
        privacyTerms: 'সুরক্ষিত নিরাপত্তা যাচাইকরণ'
      },
      cardDisplay: {
        successBannerTitle: 'সিটিজেন প্লেজ কার্ড সফলভাবে তৈরি হয়েছে!',
        successBannerSubtitle: 'আপনার অঙ্গীকার ডাটাবেসে সংরক্ষিত হয়েছে। নিচে আপনার ইউনিক Citizen ID দেখুন এবং প্রিন্টযোগ্য PDF কার্ডটি ডাউনলোড করুন।',
        verifiedBannerTitle: 'সিটিজেন প্লেজ কার্ড সফলভাবে যাচাইকৃত ও পুনরুদ্ধার হয়েছে!',
        verifiedBannerSubtitle: 'নিচে আপনার যাচাইকৃত সিটিজেন প্লেজ কার্ডটি প্রদর্শিত হচ্ছে। হাই-কোয়ালিটি PDF ডাউনলোড করতে নিচের বোতামে ক্লিক করুন।',
        downloadPdfBtn: 'কার্ড ডাউনলোড করুন (PDF)',
        downloadingPdfBtn: 'হাই-কোয়ালিটি PDF তৈরি হচ্ছে...',
        cardLabels: {
          citizenId: 'UNIQUE CITIZEN ID',
          fullName: 'FULL NAME',
          gender: 'GENDER',
          mobileLast4: 'REGISTERED MOBILE',
          state: 'STATE',
          district: 'DISTRICT',
          status: 'STATUS',
          statusActive: 'ACTIVE',
          pledgeHeading: 'CIVIC PLEDGE STATEMENT',
          pledgeQuote: '“I pledge to keep my surroundings clean, protect public spaces, respect the environment, and encourage responsible civic behaviour.”',
          disclaimer: 'This is a voluntary civic pledge card issued under Citizen India. It is not a government-issued identity document or proof of citizenship.'
        }
      }
    },
    sectionL_reportBuilder: {
      sectionLabel: 'নাগরিক সমস্যা নোট',
      title: 'স্থানীয় নাগরিক সমস্যা নোট প্রস্তুতকারক',
      localToolNotice: 'এটি একটি লোকাল ব্রাউজার টুল যা আপনাকে নিজের ব্যবহারের জন্য একটি সুশৃঙ্খল নোট তৈরি করতে সাহায্য করে। এটি কোনো সরকারি কর্তৃপক্ষের কাছে অভিযোগ জমা দেয় না বা সার্ভারে তথ্য সংরক্ষণ করে না।',
      locationLabel: 'প্রকাশ্য স্থান / লোকেশন (৩–১২০ অক্ষর) *',
      locationPlaceholder: 'যেমন: হাওড়া স্টেশন সাবওয়ে গেট ২-এর কাছে',
      locationHelper: '৩ থেকে ১২০ অক্ষরের মধ্যে লিখুন।',
      categoryLabel: 'সমস্যার ধরন *',
      categoryPlaceholder: 'সমস্যার ধরন নির্বাচন করুন...',
      categories: [
        { value: 'uncollected_rubbish', label: 'জমে থাকা অসংগৃহীত আবর্জনা (Uncollected rubbish)' },
        { value: 'overflowing_bin', label: 'উপচে পড়া ডাস্টবিন (Overflowing bin)' },
        { value: 'blocked_drain', label: 'আটকে যাওয়া নিকাশি নালা (Blocked drain)' },
        { value: 'road_station_litter', label: 'রাস্তা বা স্টেশনের আবর্জনা (Road or station litter)' },
        { value: 'water_pollution', label: 'জলাশয় দূষণ (Water-body pollution)' },
        { value: 'other_cleanliness', label: 'অন্যান্য প্রাসঙ্গিক নাগরিক পরিচ্ছন্নতা সমস্যা' }
      ],
      descriptionLabel: 'তথ্যনিষ্ঠ বিবরণ (১০–৫০০ অক্ষর) *',
      descriptionPlaceholder: 'সমস্যাটি তথ্যনিষ্ঠভাবে বর্ণনা করুন (১০–৫০০ অক্ষর)...',
      descriptionHelper: '১০ থেকে ৫০০ অক্ষরের মধ্যে লিখুন।',
      photoLabel: 'ঐচ্ছিক ছবি (JPEG, PNG বা WebP, সর্বোচ্চ 5 MB — কেবল লোকাল ব্রাউজার প্রিভিউ)',
      photoHelper: 'ছবিটি কেবল আপনার ব্রাউজারেই প্রসেস হয়; কখনোই কোনো সার্ভারে আপলোড হয় না।',
      photoSelectBtn: 'ছবি নির্বাচন করুন',
      photoRemoveBtn: 'ছবি সরান',
      generateBtn: 'সারাংশ তৈরি করুন',
      clearBtn: 'ফর্ম মুছুন / রিসেট',
      validationErrors: {
        locationLength: 'স্থান বা লোকেশন ৩ থেকে ১২০ অক্ষরের মধ্যে হতে হবে।',
        categoryRequired: 'অনুগ্রহ করে ৬টি বিভাগের মধ্যে একটি নির্বাচন করুন।',
        descriptionLength: 'বিবরণ ১০ থেকে ৫০০ অক্ষরের মধ্যে হতে হবে।',
        invalidFileType: 'কেবলমাত্র JPEG, PNG বা WebP ফরম্যাটের ছবি গ্রহণযোগ্য।',
        fileTooLarge: 'ছবির আকার ৫ MB-এর বেশি হতে পারবে না।'
      },
      summaryCard: {
        heading: 'নাগরিক সমস্যার সংক্ষিপ্ত নোট (লোকাল কপি)',
        localStatusNote: 'আপনার ব্রাউজারে প্রস্তুত করা হয়েছে। সরকারি পোর্টালে জমা দেওয়ার জন্য এটি কপি বা প্রিন্ট করুন।',
        locationTitle: 'স্থান',
        categoryTitle: 'বিভাগ',
        descriptionTitle: 'বিবরণ',
        photoTitle: 'ছবির প্রিভিউ',
        photoIncluded: 'লোকাল প্রিন্টের জন্য যুক্ত',
        photoNotIncluded: 'নেই',
        dateTitle: 'প্রস্তুতির তারিখ',
        copyBtn: 'সারাংশ কপি করুন',
        copiedText: 'কপি হয়েছে',
        printBtn: 'সারাংশ প্রিন্ট করুন',
        officialChannelsTitle: 'যাচাইকৃত সরকারি পোর্টালসমূহ'
      }
    },
    sectionM_checklist: {
      sectionLabel: 'আত্মমূল্যায়ন',
      title: 'ব্যক্তিগত দায়িত্বের তালিকা (Responsibility Checklist)',
      progressLabel: 'সম্পন্ন',
      resetBtn: 'তালিকা রিসেট করুন',
      printBtn: 'তালিকা প্রিন্ট করুন',
      printHeader: 'ব্যক্তিগত নাগরিক দায়িত্বের তালিকা — স্বচ্ছতার পথে',
      items: [
        { id: 'item-1', text: 'আমি আমার আবর্জনা নির্দিষ্ট ডাস্টবিনে ফেলব।' },
        { id: 'item-2', text: 'আমি সরকারি সম্পত্তিতে থুতু বা পানের পিক ফেলব না।' },
        { id: 'item-3', text: 'আমি রাস্তা, স্টেশন এবং যৌথ স্থান পরিষ্কার রাখতে সাহায্য করব।' },
        { id: 'item-4', text: 'আমি নদী ও ঘাটে আবর্জনা ফেলা থেকে বিরত থাকব।' },
        { id: 'item-5', text: 'আমি পথপ্রাণীদের প্রতি মানবিক আচরণ করব।' },
        { id: 'item-6', text: 'আমি শিশু ও তরুণদের নেশাজাতীয় দ্রব্য থেকে দূরে থাকতে উৎসাহিত করব।' },
        { id: 'item-7', text: 'আমি সরকারি সম্পত্তির সম্মান করব এবং দায়িত্বশীল নাগরিক আচরণকে উৎসাহিত করব।' }
      ]
    },
    sectionN_closing: {
      sectionLabel: 'সমাপ্তি বার্তা',
      title: 'শেষ কথা ও আত্মসমীক্ষা',
      reflectionParagraphs: [
        'ভারতের পরিবেশ, ঐতিহাসিক ঐতিহ্য, নদী, পথপ্রাণী, জনস্থান এবং তরুণ প্রজন্মকে রক্ষা করার কাজটি শুরু হয় আমাদের প্রতিদিনের আচরণের মাধ্যমেই।',
        'আমরা প্রত্যেকে যখন নিজেদের চারপাশের প্রতি দায়িত্বশীল হব এবং শ্রদ্ধা ও যত্নের সাথে কাজ করব, তখনই একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল দেশ গড়ে উঠবে।'
      ],
      brandSloganEn: '“Jai Hind. Jai Bharat.”',
      translatedSlogan: '“জয় হিন্দ। জয় ভারত।”',
      attributionPrimary: 'Citizen Services Point',
      attributionSecondary: 'This Project Is Under Citizen India'
    }
  },

  hi: {
    meta: {
      pageTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह — Citizen Services Point',
      breadcrumbLabel: 'स्वच्छता की राह',
      navButtonLabel: 'स्वच्छता की राह',
      drawerTitle: 'স্বচ্ছতার পথে | स्वच्छता की राह',
      drawerSubtitle: 'A Citizen India Initiative',
      homeBannerKicker: 'A Citizen India Initiative · This Project Is Under Citizen India',
      homeBannerTitle: 'স্বচ্ছতার পথে | SWACHHTAR POTHE | स्वच्छता की राह',
      homeBannerDesc: '“एक स्वच्छ, सुरक्षित और जिम्मेदार भारत के निर्माण की शुरुआत हम स्वयं से करते हैं।” धरोहर संरक्षण, जन-स्वच्छता, नदी देखभाल, पशु कल्याण और अपना नागरिक प्रतिज्ञा कार्ड (Citizen Pledge Card) प्राप्त करें।',
      homeBannerCta: 'स्वच्छता की राह पहल देखें',
      footerLinkLabel: 'स्वच्छता की राह (Swachhtar Pothe)'
    },
    branding: {
      titleBn: 'স্বচ্ছতার পথে',
      titleEn: 'SWACHHTAR POTHE',
      titleHi: 'स्वच्छता की राह',
      descriptor: 'A Citizen India Initiative',
      attribution: 'This Project Is Under Citizen India',
      independentDisclaimer: '“यह एक स्वतंत्र नागरिक-जागरूकता पहल है। यह कोई सरकारी विभाग या आधिकारिक सरकारी पोर्टल नहीं है।”'
    },
    quickNav: {
      heading: 'त्वरित नेविगेशन (Quick Navigation)',
      items: [
        { id: 'section-pledge', label: '1. नागरिक प्रतिज्ञा कार्ड आवेदन' },
        { id: 'section-pledge-verify', label: '2. कार्ड सत्यापन व डाउनलोड' },
        { id: 'section-landmarks', label: '3. धरोहर और हावड़ा ब्रिज' },
        { id: 'section-public-places', label: '4. सड़कें और रेलवे स्टेशन' },
        { id: 'section-water', label: '5. नदियाँ और घाट' },
        { id: 'section-animals', label: '6. पशु कल्याण' },
        { id: 'section-children', label: '7. युवा संरक्षण' },
        { id: 'section-reporting-guide', label: '8. नागरिक समस्या रिपोर्टिंग' },
        { id: 'section-report-builder', label: '9. नागरिक समस्या नोट बिल्डर' },
        { id: 'section-checklist', label: '10. जिम्मेदारी जांच-सूची' },
        { id: 'section-emergency', label: '11. आपातकालीन (112) व साइबर (1930)' }
      ],
      backToTop: 'शीर्ष पर लौटें',
      shareInitiative: 'पहल का लिंक साझा करें',
      shareCopied: 'लिंक कॉपी हो गया',
      shareSuccess: 'साझा किया गया'
    },
    sectionA_hero: {
      primaryMessage: {
        bn: '“একটি পরিচ্ছন্ন, নিরাপদ ও দায়িত্বশীল ভারত গড়ার শুরু আমাদের নিজেদের থেকেই।”',
        en: '“Building a cleaner, safer and more responsible India begins with us.”',
        hi: '“एक स्वच्छ, सुरक्षित और जिम्मेदार भारत के निर्माण की शुरुआत हम स्वयं से करते हैं।”'
      },
      activeHeadline: '“एक स्वच्छ, सुरक्षित और जिम्मेदार भारत के निर्माण की शुरुआत हम स्वयं से करते हैं।”',
      supportingExplanation:
        'स्वच्छता, जन-सुरक्षा, पर्यावरण की देखभाल, धरोहर संरक्षण, पशु कल्याण और जिम्मेदार नागरिकता आपस में गहराई से जुड़े हैं। स्थायी बदलाव के लिए जिम्मेदार प्रशासन के साथ-साथ नागरिकों के दैनिक जिम्मेदार आचरण की भी आवश्यकता होती है।',
      ctaLearn: 'अपनी जिम्मेदारी जानें',
      ctaPledge: 'नागरिक प्रतिज्ञा कार्ड प्राप्त करें',
      ctaVerify: 'कार्ड सत्यापित / डाउनलोड करें',
      ctaReport: 'नागरिक समस्या नोट तैयार करें',
      heroImageAlt: 'हरे-भरे पेड़ों और साफ पैदल पथ के साथ एक स्वच्छ भारतीय सड़क',
      heroImageCaption: 'प्रतीकात्मक नागरिक छायाचित्र: स्वच्छ सड़कें और सुव्यवस्थित सार्वजनिक स्थान दैनिक नागरिक जिम्मेदारी को दर्शाते हैं।'
    },
    sectionB_why: {
      sectionLabel: 'नागरिक आधार',
      title: 'यह पहल क्यों महत्वपूर्ण है',
      points: [
        'सार्वजनिक स्वच्छता केवल प्रशासन की अकेली जिम्मेदारी नहीं है।',
        'नागरिकों को सार्वजनिक स्थानों पर कचरा नहीं फैलाना चाहिए, थूकना नहीं चाहिए, सार्वजनिक संपत्ति को नुकसान नहीं पहुँचाना चाहिए और जल स्रोतों को प्रदूषित नहीं करना चाहिए।',
        'वास्तविक सुधार तब होता है जब नागरिक अपनी रोजमर्रा की आदतें बदलते हैं और वास्तविक नागरिक समस्याओं की जानकारी उचित माध्यमों से देते हैं।'
      ]
    },
    sectionC_landmarks: {
      sectionLabel: 'धरोहर संरक्षण',
      title: 'हावड़ा ब्रिज और सार्वजनिक धरोहर की रक्षा करें',
      explanationParagraphs: [
        'कोलकाता, पश्चिम बंगाल में स्थित हावड़ा ब्रिज (रबींद्र सेतु) भारत की सबसे प्रमुख इंजीनियरिंग धरोहरों में से एक है और दैनिक आवागमन का एक अत्यंत महत्वपूर्ण माध्यम है।',
        'पान और गुटखा थूकना, कचरा फैलाना और लापरवाह व्यवहार सार्वजनिक स्थानों को गंदा बनाते हैं और पुलों, दीवारों, स्टेशनों तथा सार्वजनिक संरचनाओं पर दाग-धब्बों एवं रखरखाव की समस्याओं का कारण बनते हैं।'
      ],
      actionBoxTitle: 'धरोहर और पुलों की रक्षा के लिए नागरिक कर्तव्य',
      actions: [
        'पुलों, दीवारों और सार्वजनिक संरचनाओं पर थूकने से बचें।',
        'नदियों में या पुलों के ऊपर से कभी भी कचरा न फेंकें।',
        'सार्वजनिक संपत्ति और ऐतिहासिक धरोहरों का सम्मान करें।',
        'दूसरों को भी विनम्रतापूर्वक जिम्मेदार व्यवहार करने के लिए प्रेरित करें।'
      ],
      imageAlt: 'मल्लिक घाट, कोलकाता से हुगली नदी पर स्थित हावड़ा ब्रिज (रबींद्र सेतु) का वास्तविक छायाचित्र',
      imageCaption: 'हावड़ा ब्रिज (रबींद्र सेतु), कोलकाता, पश्चिम बंगाल का वास्तविक छायाचित्र (छायाचित्रकार: Bernard Gagnon, Wikimedia Commons, CC BY-SA 3.0)।'
    },
    sectionD_publicPlaces: {
      sectionLabel: 'जन-स्वच्छता',
      title: 'सड़कों, रेलवे स्टेशनों और सार्वजनिक स्थानों को स्वच्छ रखें',
      intro: 'सड़कों, फुटपाथों, रेलवे प्लेटफार्मों और सार्वजनिक परिवहन में हमारा दैनिक अनुशासन साझा स्थानों को सभी के लिए स्वच्छ और सुरक्षित रखता है:',
      points: [
        'निर्धारित कूड़ेदानों (डस्टबिन) का उपयोग करना।',
        'सड़कों पर रैपर, प्लास्टिक, बोतलें या भोजन का कचरा न फेंकना।',
        'रेलवे प्लेटफार्मों और सार्वजनिक परिवहन क्षेत्रों को साफ रखना।',
        'सार्वजनिक दीवारों और संरचनाओं पर थूकने से बचना।',
        'बेंच, साइनबोर्ड या अन्य सार्वजनिक संपत्ति को नुकसान न पहुँचाना।'
      ],
      binSystemNote: 'नोट: सभी नगर निकायों में कूड़ेदान के रंगों की प्रणाली एक जैसी नहीं होती; कृपया स्थानीय कूड़ेदानों पर लिखे निर्देशों का पालन करें।',
      litterImageAlt: 'सड़क किनारे नाली के पास फेंकी गई प्लास्टिक की बोतलें और रैपर',
      litterImageCaption: 'सार्वजनिक कचरा: सड़क पर फेंके गए रैपर और प्लास्टिक की बोतलें नालियों को जाम करती हैं।',
      binImageAlt: 'निर्धारित सार्वजनिक कूड़ेदान में कचरा डालता हुआ नागरिक',
      binImageCaption: 'जिम्मेदार कचरा निपटान: निर्धारित कूड़ेदान का उपयोग सड़कों को साफ रखता है (कूड़ेदान के रंग स्थानीय निकाय के अनुसार भिन्न हो सकते हैं)।',
      railwayImageAlt: 'स्वच्छ भारतीय रेलवे प्लेटफॉर्म और कूड़ेदान',
      railwayImageCaption: 'रेलवे और सार्वजनिक परिवहन: रेलवे प्लेटफार्मों और परिवहन स्थलों को स्वच्छ रखना हर यात्री का कर्तव्य है।'
    },
    sectionE_waterBodies: {
      sectionLabel: 'नदी व जल संरक्षण',
      title: 'गंगा, नदियों और घाटों की रक्षा करें',
      intro: 'नदियाँ, घाट और जल स्रोत हमारे जीवन, संस्कृति और पर्यावरण के आधार हैं। इनकी रक्षा के लिए इन बातों का पालन करें:',
      points: [
        'नदी के किनारों और घाटों को कचरा-मुक्त रखें।',
        'कचरे के लिए निर्धारित संग्रह केंद्रों या कूड़ेदानों का उपयोग करें।',
        'पानी में प्लास्टिक और अन्य कचरा डालने से बचें।',
        'पूजन सामग्री और अन्य अपशिष्ट के निपटान के लिए स्थानीय नियमों का पालन करें।'
      ],
      imageAlt: 'गंगा नदी के किनारे स्वच्छ घाट की सीढ़ियाँ और कूड़ेदान',
      imageCaption: 'गंगा और नदी घाट: घाटों और नदी के जल को प्लास्टिक व कचरे से मुक्त रखना।'
    },
    sectionF_reportingGuide: {
      sectionLabel: 'शिकायत मार्गदर्शन',
      title: 'नागरिक समस्याओं की रिपोर्ट कैसे करें',
      intro: 'संबंधित स्थानीय प्राधिकरण को नागरिक या स्वच्छता संबंधी समस्या की जानकारी देने के लिए इन 7 चरणों का पालन करें:',
      steps: [
        { stepNumber: 'चरण 1', text: 'सटीक सार्वजनिक स्थान (Location) की पहचान करें।' },
        { stepNumber: 'चरण 2', text: 'समस्या का तथ्यात्मक विवरण लिखें।' },
        { stepNumber: 'चरण 3', text: 'यदि उपयोगी हो, तो तिथि या प्रासंगिक विवरण दर्ज करें।' },
        { stepNumber: 'चरण 4', text: 'केवल तभी फोटो लें जब ऐसा करना सुरक्षित और कानूनन उचित हो।' },
        { stepNumber: 'चरण 5', text: 'जिम्मेदार स्थानीय प्राधिकरण की पहचान करें।' },
        { stepNumber: 'चरण 6', text: 'सत्यापित आधिकारिक माध्यम (Official Channel) से शिकायत दर्ज करें।' },
        { stepNumber: 'चरण 7', text: 'प्राधिकरण द्वारा दिए गए पावती या संदर्भ संख्या (Reference Number) को सुरक्षित रखें।' }
      ],
      guidanceDisclaimer: 'Citizen Services Point केवल मार्गदर्शन प्रदान करता है और उपयोगकर्ता की ओर से सरकारी प्राधिकरणों को शिकायतें जमा नहीं करता है।',
      verifiedChannelsHeading: 'सत्यापित आधिकारिक रिपोर्टिंग पोर्टल',
      verifiedChannels: [
        {
          name: 'कोलकाता नगर निगम (KMC)',
          scope: 'KMC क्षेत्र के अंतर्गत नागरिक सेवाओं का आधिकारिक पोर्टल',
          url: 'https://www.kmcgov.in/',
          linkLabel: 'https://www.kmcgov.in/'
        },
        {
          name: 'स्वच्छ भारत मिशन — शहरी (MoHUA, भारत सरकार)',
          scope: 'आवासन और शहरी कार्य मंत्रालय का आधिकारिक शहरी स्वच्छता पोर्टल',
          url: 'https://sbmurban.org/',
          linkLabel: 'https://sbmurban.org/'
        }
      ]
    },
    sectionG_animals: {
      sectionLabel: 'संवेदनशील नागरिकता',
      title: 'सड़क के पशुओं के साथ मानवीय व्यवहार',
      points: [
        'सड़क के पशुओं को मारें नहीं, घायल न करें, जहर न दें और परेशान न करें।',
        'केवल सुरक्षित और स्वच्छ स्थान पर ही साफ पानी या उपयुक्त भोजन दें।',
        'भोजन देने के स्थानों को साफ रखें और सार्वजनिक रास्तों को बाधित न करें।',
        'प्रशिक्षित सहायता के बिना घायल, बीमार या आक्रामक पशुओं को न छुएं।',
        'आवश्यकता पड़ने पर पशु चिकित्सक, स्थानीय नगर सेवा या पशु-कल्याण समूह से संपर्क करें।',
        'पशुओं के प्रति करुणा के साथ-साथ सार्वजनिक स्वच्छता और मानव सुरक्षा का संतुलन बनाए रखें।'
      ],
      childWildlifeWarning: 'महत्वपूर्ण सुरक्षा चेतावनी: बच्चों को अनजान पशुओं के पास नहीं जाना चाहिए और न ही घायल वन्यजीवों को छूना चाहिए।',
      imageAlt: 'छायादार और साफ कोने में रखे मिट्टी के बर्तन से साफ पानी पीता हुआ स्ट्रीट डॉग',
      imageCaption: 'पशु कल्याण: पैदल रास्ते को बाधित किए बिना शांत कोने में पशुओं के लिए साफ पानी रखना।'
    },
    sectionH_children: {
      sectionLabel: 'युवा कल्याण',
      title: 'बच्चों और युवाओं को नशीले पदार्थों से दूर रखें',
      points: [
        'युवाओं को तंबाकू, गुटखा, शराब और अन्य नशीले पदार्थों के नुकसान के बारे में जागरूक करें।',
        'घर और सार्वजनिक स्थानों पर एक जिम्मेदार उदाहरण प्रस्तुत करें।',
        'स्वस्थ गतिविधियों, शिक्षा और खुले संवाद को प्रोत्साहित करें।',
        'जहाँ आवश्यक हो, योग्य चिकित्सा या परामर्श (काउंसलिंग) सहायता लें।'
      ],
      supportiveNote: 'सकारात्मक मार्गदर्शन, परिवार का सहयोग और विशेषज्ञ परामर्श युवाओं को नशा-मुक्त और स्वस्थ भविष्य चुनने में मदद करते हैं।',
      imageAlt: 'स्कूल के मैदान में किताबों और फुटबॉल के साथ मुस्कुराते हुए स्कूली बच्चे',
      imageCaption: 'बच्चे और युवा: शिक्षा, खेल और स्वस्थ वातावरण युवाओं को नशीले पदार्थों से दूर रखते हैं।'
    },
    sectionI_beyondCleanliness: {
      sectionLabel: 'जिम्मेदार व्यवहार',
      title: 'स्वच्छता से आगे नागरिक जिम्मेदारी',
      themes: [
        'यातायात नियमों का पालन करें और पैदल यात्रियों का सम्मान करें।',
        'अनावश्यक हॉर्न बजाने और लापरवाह सार्वजनिक व्यवहार से बचें।',
        'सार्वजनिक संपत्ति और साझा स्थानों का सम्मान करें।',
        'अफवाहें या असत्यापित जानकारी न फैलाएं।',
        'जरूरतमंद और कमजोर लोगों की सुरक्षित और सम्मानपूर्वक मदद करें।',
        'बिना किसी उत्पीड़न या टकराव के सकारात्मक बदलाव को प्रोत्साहित करें।'
      ]
    },
    sectionJ_emergencyCyber: {
      sectionLabel: 'आपातकालीन व साइबर सुरक्षा',
      title: 'आपातकालीन और साइबर-सुरक्षा जानकारी',
      card112: {
        number: '112',
        heading: '112 — आपातकालीन सहायता (Emergency assistance)',
        description: 'तत्काल पुलिस, अग्निशमन, चिकित्सा या सुरक्षा सहायता के लिए भारत का आपातकालीन प्रतिक्रिया नंबर 112 है।',
        callLabel: '112 डायल करें'
      },
      card1930: {
        number: '1930',
        heading: '1930 — साइबर वित्तीय धोखाधड़ी हेल्पलाइन',
        description: 'साइबर अपराध और ऑनलाइन वित्तीय धोखाधड़ी की रिपोर्ट करने के लिए 1930 और https://cybercrime.gov.in/ आधिकारिक माध्यम हैं।',
        callLabel: '1930 डायल करें',
        portalUrl: 'https://cybercrime.gov.in/',
        portalLabel: 'https://cybercrime.gov.in/'
      },
      noGuaranteeNote: 'नोट: आपातकालीन नंबर 112 एवं 1930 और cybercrime.gov.in आधिकारिक सरकारी एजेंसियों द्वारा संचालित हैं। Citizen Services Point केवल जन-जागरूकता के लिए यह जानकारी साझा करता है और किसी प्रतिक्रिया समय या परिणाम की गारंटी नहीं देता है।',
      imageAlt: 'डिजिटल और नागरिक सुरक्षा जागरूकता में भाग लेते हुए नागरिक',
      imageCaption: 'साइबर सुरक्षा और आपातकालीन जागरूकता: आधिकारिक आपातकालीन नंबर 112 और साइबर हेल्पलाइन 1930 की जानकारी रखें।'
    },
    pledgeCardSystem: {
      sectionBadge: 'स्वच्छता की राह · Citizen India',
      sectionTitle: 'नागरिक प्रतिज्ञा कार्ड (Citizen Pledge Card) — आवेदन और सत्यापन',
      sectionSubtitle: 'नागरिक प्रतिज्ञा पढ़ें, घोषणा स्वीकार करें, अपना विवरण जमा करके यूनिक Citizen ID प्राप्त करें, या पहले से बने कार्ड को सत्यापित और डाउनलोड करें।',
      voluntaryNotice: 'महत्वपूर्ण सूचना: यह Citizen India के अंतर्गत जारी एक स्वैच्छिक नागरिक-जागरूकता प्रतिज्ञा कार्ड है। यह कोई सरकारी दस्तावेज, पहचान प्रमाण, नागरिकता प्रमाण-पत्र या आधिकारिक सरकारी कार्ड नहीं है।',
      counterLabel: 'प्रतिज्ञा लेने वाले कुल नागरिकों की संख्या',
      counterSubtext: 'आधिकारिक Citizen India Pledge डेटाबेस से प्राप्त लाइव संख्या',
      counterLoading: 'लाइव संख्या लोड हो रही है...',
      counterUnavailable: 'डेटाबेस संख्या अस्थायी रूप से अनुपलब्ध है',
      counterRefreshBtn: 'रीफ्रेश करें',
      tabApply: 'नागरिक प्रतिज्ञा कार्ड के लिए आवेदन करें',
      tabVerify: 'कार्ड सत्यापित और पुनः डाउनलोड करें',
      pledgeHeading: 'स्वच्छता की राह नागरिक प्रतिज्ञा',
      pledgeStatement: '“मैं प्रतिज्ञा करता/करती हूँ कि मैं अपने आसपास को स्वच्छ रखूँगा/रखूँगी, सार्वजनिक संपत्ति की रक्षा करूँगा/करूँगी, भारत की धरोहर का सम्मान करूँगा/करूँगी, पर्यावरण की देखभाल करूँगा/करूँगी, पशुओं के साथ मानवीय व्यवहार करूँगा/करूँगी और अपने कार्यों से जिम्मेदार व्यवहार को प्रोत्साहित करूँगा/करूँगी।”',
      formTitle: 'नागरिक प्रतिज्ञा कार्ड आवेदन फॉर्म',
      formSubtitle: 'नीचे दिए गए सभी आवश्यक विवरण भरें। प्रति पंजीकृत मोबाइल नंबर केवल एक ही नागरिक प्रतिज्ञा कार्ड जारी किया जाता है।',
      fields: {
        fullNameLabel: '1. पूरा नाम (Full Name) *',
        fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
        guardianNameLabel: '2. अभिभावक का नाम (Guardian Name) *',
        guardianNamePlaceholder: 'पिता / माता / अभिभावक का नाम दर्ज करें',
        genderLabel: '3. लिंग (Gender) *',
        genderPlaceholder: 'लिंग चुनें...',
        genderMale: 'पुरुष (Male)',
        genderFemale: 'महिला (Female)',
        genderOther: 'अन्य (Other)',
        dobLabel: '4. जन्म तिथि (Date of Birth) *',
        stateLabel: '5. राज्य / केंद्र शासित प्रदेश (State) *',
        statePlaceholder: 'राज्य चुनें...',
        districtLabel: '6. जिला (District) *',
        districtPlaceholder: 'अपने जिले का नाम दर्ज करें (जैसे: Kolkata)',
        mobileLabel: '7. मोबाइल नंबर (10 अंकों का भारतीय नंबर) *',
        mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
        mobileHelper: 'डुप्लिकेट कार्ड रोकने और कार्ड रिकवरी के लिए उपयोग किया जाता है। कार्ड पर केवल अंतिम 4 अंक दिखेंगे।',
        declarationLabel: 'मैं एतद्द्वारा घोषणा करता/करती हूँ कि मैंने उपरोक्त जानकारी को पढ़ और समझ लिया है तथा स्वेच्छा से इस घोषणा को स्वीकार करता/करती हूँ। मैं पुष्टि करता/करती हूँ कि इस आवेदन में मेरे द्वारा दी गई सभी जानकारी मेरी सर्वोत्तम जानकारी और विश्वास के अनुसार सत्य, सही और सटीक है। मैंने जानबूझकर कोई गलत या भ्रामक जानकारी नहीं दी है। मेरे द्वारा प्रस्तुत जानकारी की सटीकता की पूरी जिम्मेदारी मैं स्वीकार करता/करती हूँ। *'
      },
      submitBtn: 'आवेदन जमा करें और कार्ड बनाएं',
      submittingBtn: 'डेटाबेस में जमा हो रहा है...',
      resetFormBtn: 'फॉर्म साफ करें',
      validation: {
        fullNameRequired: 'कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।',
        guardianNameRequired: 'कृपया अभिभावक का नाम दर्ज करें (कम से कम 2 अक्षर)।',
        genderRequired: 'कृपया अपना लिंग चुनें।',
        dobRequired: 'कृपया अपनी जन्म तिथि चुनें।',
        dobFutureError: 'जन्म तिथि अतीत की एक मान्य तिथि होनी चाहिए।',
        stateRequired: 'कृपया अपना राज्य या केंद्र शासित प्रदेश चुनें।',
        districtRequired: 'कृपया अपने जिले का नाम दर्ज करें (कम से कम 2 अक्षर)।',
        mobileInvalid: 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)।',
        declarationRequired: 'फॉर्म जमा करने से पहले अनिवार्य प्रतिज्ञा घोषणा को स्वीकार करना आवश्यक है।'
      },
      duplicateMobileTitle: 'इस मोबाइल नंबर के लिए नागरिक प्रतिज्ञा कार्ड पहले से मौजूद है',
      duplicateMobileMessage: 'प्रति पंजीकृत मोबाइल नंबर केवल एक ही नागरिक प्रतिज्ञा कार्ड जारी किया जा सकता है। आप अपने पंजीकृत विवरण का उपयोग करके अपना कार्ड तुरंत सत्यापित और पुनः डाउनलोड कर सकते हैं।',
      duplicateMobileCta: 'कार्ड सत्यापन और डाउनलोड अनुभाग पर जाएं',
      verifySectionTitle: 'अपना नागरिक प्रतिज्ञा कार्ड सत्यापित और पुनः डाउनलोड करें',
      verifySectionSubtitle: 'अपनी यूनिक Citizen ID (विधि A) या अपने पंजीकृत मोबाइल नंबर, राज्य और जिले (विधि B) का उपयोग करके अपना कार्ड प्राप्त करें।',
      methodATitle: 'विधि A — Citizen ID द्वारा सत्यापित करें',
      methodASubtitle: 'अपनी Citizen ID दर्ज करें (उदाहरण: CITIZEN-12345678)',
      citizenIdLabel: 'यूनिक Citizen ID *',
      citizenIdPlaceholder: 'CITIZEN-12345678',
      verifyIdBtn: 'Citizen ID सत्यापित करें',
      verifyingIdBtn: 'सत्यापन हो रहा है...',
      methodBTitle: 'विधि B — पंजीकृत विवरण से पुनः प्राप्त करें',
      methodBSubtitle: 'Citizen ID खो गई है? अपना पंजीकृत मोबाइल नंबर, राज्य और जिला दर्ज करके कार्ड प्राप्त करें।',
      recoverBtn: 'कार्ड खोजें और देखें',
      recoveringBtn: 'रिकॉर्ड खोजा जा रहा है...',
      verifyValidation: {
        invalidCitizenId: 'कृपया CITIZEN-12345678 प्रारूप में मान्य Citizen ID दर्ज करें।',
        invalidRecoveryDetails: 'कृपया 10 अंकों का मान्य मोबाइल नंबर, राज्य और जिला प्रदान करें।'
      },
      captcha: {
        notARobotLabel: "मैं रोबोट नहीं हूँ (I'm not a robot)",
        securityHeading: 'सुरक्षा सत्यापन (CAPTCHA) *',
        promptText: 'बॉक्स पर टिक करें और नीचे दिखाया गया 6-अक्षरों का सुरक्षा कोड दर्ज करें:',
        inputPlaceholder: '6-अक्षर का कोड दर्ज करें',
        verifyCodeBtn: 'सत्यापित करें',
        verifiedBadge: 'सत्यापित — जमा करने के लिए तैयार',
        refreshBtn: 'नया कोड',
        loadingText: 'सुरक्षा कोड लोड हो रहा है...',
        requiredError: 'कृपया आगे बढ़ने से पहले "मैं रोबोट नहीं हूँ (I\'m not a robot)" CAPTCHA सुरक्षा सत्यापन पूरा करें।',
        invalidError: 'गलत CAPTCHA कोड। कृपया नए सुरक्षा कोड के साथ पुनः प्रयास करें।',
        expiredError: 'सुरक्षा सत्यापन की समय-सीमा समाप्त हो गई है। कृपया नया CAPTCHA कोड दर्ज करें।',
        privacyTerms: 'सुरक्षित सत्यापन प्रणाली'
      },
      cardDisplay: {
        successBannerTitle: 'नागरिक प्रतिज्ञा कार्ड सफलतापूर्वक जारी किया गया!',
        successBannerSubtitle: 'आपकी प्रतिज्ञा Citizen India डेटाबेस में दर्ज हो गई है। अपनी यूनिक Citizen ID सहेजें और नीचे अपना PDF कार्ड डाउनलोड करें।',
        verifiedBannerTitle: 'नागरिक प्रतिज्ञा कार्ड सत्यापित और प्राप्त किया गया!',
        verifiedBannerSubtitle: 'आपका सत्यापित नागरिक प्रतिज्ञा कार्ड नीचे प्रदर्शित है। हाई-क्वालिटी PDF डाउनलोड करने के लिए नीचे दिए गए बटन पर क्लिक करें।',
        downloadPdfBtn: 'कार्ड डाउनलोड करें (PDF)',
        downloadingPdfBtn: 'हाई-क्वालिटी PDF तैयार हो रहा है...',
        cardLabels: {
          citizenId: 'UNIQUE CITIZEN ID',
          fullName: 'FULL NAME',
          gender: 'GENDER',
          mobileLast4: 'REGISTERED MOBILE',
          state: 'STATE',
          district: 'DISTRICT',
          status: 'STATUS',
          statusActive: 'ACTIVE',
          pledgeHeading: 'CIVIC PLEDGE STATEMENT',
          pledgeQuote: '“I pledge to keep my surroundings clean, protect public spaces, respect the environment, and encourage responsible civic behaviour.”',
          disclaimer: 'This is a voluntary civic pledge card issued under Citizen India. It is not a government-issued identity document or proof of citizenship.'
        }
      }
    },
    sectionL_reportBuilder: {
      sectionLabel: 'नागरिक समस्या नोट',
      title: 'स्थानीय नागरिक समस्या अवलोकन बिल्डर',
      localToolNotice: 'यह एक स्थानीय ब्राउज़र टूल है जो आपको अपने उपयोग के लिए एक व्यवस्थित नोट तैयार करने में मदद करता है। यह किसी सरकारी प्राधिकरण को शिकायत जमा नहीं करता है और न ही किसी सर्वर पर डेटा सहेजता है।',
      locationLabel: 'सार्वजनिक स्थान / लोकेशन (3–120 अक्षर) *',
      locationPlaceholder: 'उदाहरण: हावड़ा स्टेशन सबवे गेट 2 के पास',
      locationHelper: '3 से 120 अक्षरों के बीच लिखें।',
      categoryLabel: 'समस्या की श्रेणी *',
      categoryPlaceholder: 'समस्या की श्रेणी चुनें...',
      categories: [
        { value: 'uncollected_rubbish', label: 'जमा हुआ कचरा (Uncollected rubbish)' },
        { value: 'overflowing_bin', label: 'भरा हुआ या ओवरफ्लो कूड़ेदान (Overflowing bin)' },
        { value: 'blocked_drain', label: 'जाम नाली (Blocked drain)' },
        { value: 'road_station_litter', label: 'सड़क या स्टेशन पर कचरा (Road or station litter)' },
        { value: 'water_pollution', label: 'जल-स्रोत प्रदूषण (Water-body pollution)' },
        { value: 'other_cleanliness', label: 'अन्य प्रासंगिक नागरिक स्वच्छता समस्या' }
      ],
      descriptionLabel: 'तथ्यात्मक विवरण (10–500 अक्षर) *',
      descriptionPlaceholder: 'समस्या का तथ्यात्मक विवरण लिखें (10–500 अक्षर)...',
      descriptionHelper: '10 से 500 अक्षरों के बीच लिखें।',
      photoLabel: 'वैकल्पिक फोटो (JPEG, PNG या WebP, अधिकतम 5 MB — केवल स्थानीय ब्राउज़र प्रीव्यू)',
      photoHelper: 'फोटो केवल आपके ब्राउज़र में प्रोसेस होती है और किसी सर्वर पर अपलोड नहीं की जाती।',
      photoSelectBtn: 'फोटो चुनें',
      photoRemoveBtn: 'फोटो हटाएँ',
      generateBtn: 'सारांश तैयार करें',
      clearBtn: 'फॉर्म साफ / रीसेट करें',
      validationErrors: {
        locationLength: 'स्थान 3 से 120 अक्षरों के बीच होना चाहिए।',
        categoryRequired: 'कृपया 6 श्रेणियों में से एक का चयन करें।',
        descriptionLength: 'विवरण 10 से 500 अक्षरों के बीच होना चाहिए।',
        invalidFileType: 'कृपया केवल JPEG, PNG या WebP फोटो चुनें।',
        fileTooLarge: 'फोटो का आकार 5 MB से अधिक नहीं होना चाहिए।'
      },
      summaryCard: {
        heading: 'नागरिक समस्या अवलोकन सारांश (स्थानीय नोट)',
        localStatusNote: 'आपके ब्राउज़र में तैयार किया गया। आधिकारिक पोर्टल पर शिकायत दर्ज करने के लिए इसे कॉपी या प्रिंट करें।',
        locationTitle: 'स्थान',
        categoryTitle: 'श्रेणी',
        descriptionTitle: 'विवरण',
        photoTitle: 'फोटो प्रीव्यू',
        photoIncluded: 'स्थानीय प्रिंट के लिए संलग्न',
        photoNotIncluded: 'कोई नहीं',
        dateTitle: 'तैयार करने की तिथि',
        copyBtn: 'सारांश कॉपी करें',
        copiedText: 'कॉपी हो गया',
        printBtn: 'सारांश प्रिंट करें',
        officialChannelsTitle: 'सत्यापित आधिकारिक रिपोर्टिंग चैनल'
      }
    },
    sectionM_checklist: {
      sectionLabel: 'आत्म-मूल्यांकन',
      title: 'व्यक्तिगत जिम्मेदारी जांच-सूची (Responsibility Checklist)',
      progressLabel: 'पूर्ण',
      resetBtn: 'जांच-सूची रीसेट करें',
      printBtn: 'जांच-सूची प्रिंट करें',
      printHeader: 'व्यक्तिगत जिम्मेदारी जांच-सूची — स्वच्छता की राह',
      items: [
        { id: 'item-1', text: 'मैं अपना कचरा उचित कूड़ेदान में डालूँगा/डालूँगी।' },
        { id: 'item-2', text: 'मैं सार्वजनिक संपत्ति पर नहीं थूकूँगा/थूकूँगी।' },
        { id: 'item-3', text: 'मैं सड़कों, स्टेशनों और साझा स्थानों को साफ रखने में मदद करूँगा/करूँगी।' },
        { id: 'item-4', text: 'मैं नदियों और घाटों में कचरा फैलाने से बचूँगा/बचूँगी।' },
        { id: 'item-5', text: 'मैं सड़क के पशुओं के साथ मानवीय व्यवहार करूँगा/करूँगी।' },
        { id: 'item-6', text: 'मैं बच्चों और युवाओं को नशीले पदार्थों से दूर रहने के लिए प्रोत्साहित करूँगा/करूँगी।' },
        { id: 'item-7', text: 'मैं सार्वजनिक संपत्ति का सम्मान करूँगा/करूँगी और जिम्मेदार नागरिक व्यवहार को बढ़ावा दूँगा/दूँगी।' }
      ]
    },
    sectionN_closing: {
      sectionLabel: 'समापन विचार',
      title: 'समापन विचार',
      reflectionParagraphs: [
        'भारत के पर्यावरण, ऐतिहासिक धरोहर, नदियों, पशुओं, सार्वजनिक स्थानों और युवाओं की रक्षा हमारे रोजमर्रा के जिम्मेदार फैसलों से शुरू होती है।',
        'जब हम में से प्रत्येक व्यक्ति अपने आसपास के प्रति जिम्मेदारी निभाता है और सम्मान व संवेदनशीलता के साथ कार्य करता है, तो हम एक स्वच्छ, सुरक्षित और जिम्मेदार राष्ट्र का निर्माण करते हैं।'
      ],
      brandSloganEn: '“Jai Hind. Jai Bharat.”',
      translatedSlogan: '“जय हिंद। जय भारत।”',
      attributionPrimary: 'Citizen Services Point',
      attributionSecondary: 'This Project Is Under Citizen India'
    }
  }
};
