export interface Scheme {
  id: string;
  nameEn: string;
  category: 'state' | 'central' | 'scholarship';
  descriptionEn: string;
  eligibilityEn: string[];
  benefitsEn: string[];
  documentsEn: string[];
}

export const schemesData: Scheme[] = [
  // West Bengal Government Schemes
  {
    id: "annapurna-scheme",
    nameEn: "Annapurna Scheme",
    category: "state",
    descriptionEn: "A state initiative providing senior citizens who are eligible for but not receiving national old-age pensions with food grain benefits.",
    eligibilityEn: [
      "Must be a female or male resident of West Bengal aged 65 years or older",
      "Must be eligible for National Old Age Pension (IGNOAPS) but not receiving it",
      "Must have no other independent source of income or family support"
    ],
    benefitsEn: [
      "10 kg of food grains (rice or wheat) free of cost per month",
      "Direct distribution via authorized Fair Price Shops under public distribution system"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Ration Card (AAY or PHH category)",
      "Age Proof certificate (Birth certificate, School certificate, or EPIC)",
      "Income Certificate from Block Development Officer (BDO) or Municipality",
      "Passport size photograph"
    ]
  },
  {
    id: "old-age-pension",
    nameEn: "Old Age Pension (Baridhakya Bhata)",
    category: "state",
    descriptionEn: "Monthly financial support scheme for destitute elderly residents of West Bengal to ensure basic dignity and welfare.",
    eligibilityEn: [
      "Must be a senior citizen resident of West Bengal",
      "Minimum age of 60 years (55 years for physically challenged or special cases)",
      "Must be living below the poverty line with no active family support"
    ],
    benefitsEn: [
      "Monthly pension support transferred directly to the beneficiary's bank account",
      "Durable social security coverage under state social welfare departments"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Voter Identity Card (EPIC)",
      "Age Proof (Birth Certificate or Madhyamik Admit Card)",
      "Bank Passbook copy with clear IFSC and account number",
      "BPL Card or Income Certificate from local authorities",
      "Passport size photograph"
    ]
  },
  {
    id: "widow-pension",
    nameEn: "Widow Pension (Bidhoba Bhata)",
    category: "state",
    descriptionEn: "Social security financial assistance program targeted at providing livelihood support to widows in West Bengal.",
    eligibilityEn: [
      "Must be a widowed woman resident of West Bengal",
      "Must be destitute with no regular source of income or financial backing",
      "Not remarried or receiving benefits from other pension schemes"
    ],
    benefitsEn: [
      "Monthly pension support transferred directly to Aadhaar-linked bank accounts",
      "Continuous financial assistance to aid standard of living and health costs"
    ],
    documentsEn: [
      "Aadhaar Card of the applicant",
      "Voter Identity Card (EPIC)",
      "Death Certificate of the deceased husband",
      "Bank Passbook copy with IFSC",
      "Income Certificate issued by BDO/SDO or Gazetted officer",
      "Passport size photograph"
    ]
  },
  {
    id: "disability-pension",
    nameEn: "Disability Pension (Pratibandhi Bhata)",
    category: "state",
    descriptionEn: "Dedicated financial support scheme created to provide monthly livelihood pension to persons with physical or mental disabilities.",
    eligibilityEn: [
      "Must be a resident of West Bengal of any age",
      "Must possess a certified disability level of 40% or more",
      "Family income must be within specified low-income limits"
    ],
    benefitsEn: [
      "Monthly financial assistance credited directly to the beneficiary's bank account",
      "Comprehensive support to help offset medical, therapy, or assistive device costs"
    ],
    documentsEn: [
      "Aadhaar Card of the applicant",
      "Disability Certificate issued by a government medical board/authority",
      "Age Proof certificate",
      "Bank Account details (Passbook first page copy)",
      "Income Certificate from competent local authorities",
      "Passport size photograph"
    ]
  },
  {
    id: "rksy-1-ration",
    nameEn: "RKSY-I Ration Card",
    category: "state",
    descriptionEn: "Rajya Khadya Suraksha Yojana-I card designed to provide highly subsidized food grains to eligible poor families across West Bengal.",
    eligibilityEn: [
      "Must be a resident family of West Bengal",
      "Must belong to economically weak, rural, or low-income urban household structures",
      "Should not be holding an AAY or PHH priority digital ration card"
    ],
    benefitsEn: [
      "Subsidised food grains (rice, wheat) distributed monthly through fair price shops",
      "Direct entry into government state-subsidized food security system"
    ],
    documentsEn: [
      "Aadhaar Card copy of all family members",
      "Voter Identity Card (EPIC) of adult members",
      "Birth Certificate of child members (below 5 years)",
      "Existing manual paper ration card (if any)",
      "Income Certificate or declaration",
      "Active Mobile number linked to head of family"
    ]
  },
  {
    id: "rksy-2-ration",
    nameEn: "RKSY-II Ration Card",
    category: "state",
    descriptionEn: "Rajya Khadya Suraksha Yojana-II card providing subsidised food grains to moderate low-income families not covered under standard food security plans.",
    eligibilityEn: [
      "Must be a resident family of West Bengal",
      "Must belong to non-priority and middle-income families requiring subsidized food security support"
    ],
    benefitsEn: [
      "Subsidised food grains distributed at special state-determined concessional rates",
      "Enables authorized access to fair price shops for critical commodities"
    ],
    documentsEn: [
      "Aadhaar Card copy of all family members",
      "Voter ID card of family members",
      "Address proof or electricity bill",
      "Active Mobile number for OTP registration"
    ]
  },

  // Central Government Schemes
  {
    id: "pmay",
    nameEn: "Pradhan Mantri Awas Yojana (PMAY-G / PMAY-U)",
    category: "central",
    descriptionEn: "Credit-linked subsidy and housing program of the Government of India providing financial assistance to build permanent housing.",
    eligibilityEn: [
      "Must be an Indian citizen resident",
      "Families/households without any permanent, pacca house in India",
      "Categorized under EWS (Economically Weaker Sections) or LIG (Low Income Groups)"
    ],
    benefitsEn: [
      "Financial assistance up to ₹1.2 Lakh (plains) to ₹1.3 Lakh (hilly areas) for PMAY-G",
      "Interest subsidies on housing loans for urban beneficiaries under PMAY-U",
      "Direct integration with toilet construction funds under Swachh Bharat Mission"
    ],
    documentsEn: [
      "Aadhaar Card copy of all family members",
      "Voter Identity Card (EPIC)",
      "MGNREGA Job Card (if active)",
      "Bank Passbook copy with IFSC",
      "Sworn Affidavit stating no family member owns a pacca house",
      "Land Ownership document / land khatian copy"
    ]
  },
  {
    id: "ayushman-bharat",
    nameEn: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    category: "central",
    descriptionEn: "The world's largest government-funded health assurance scheme providing comprehensive cashless secondary and tertiary hospital care.",
    eligibilityEn: [
      "Indian citizens identified in the Socio-Economic Caste Census (SECC 2011) database",
      "Eligible poor, rural, and specific occupational urban worker families"
    ],
    benefitsEn: [
      "Cashless health treatment coverage up to ₹5 Lakh per family per year",
      "Covers all pre-existing conditions, diagnostics, medicines, and ICU costs",
      "Paperless service available at all empanelled public and private hospitals nationwide"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Ration Card (NFSA/Priority category)",
      "PM-JAY Letter / SECC household identification proof",
      "Active Mobile number linked to Aadhaar"
    ]
  },
  {
    id: "pm-kisan-central",
    nameEn: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    category: "central",
    descriptionEn: "Central scheme providing reliable direct income support of ₹6,000 per year to landholding farmer families across India.",
    eligibilityEn: [
      "Indian citizen farmer families",
      "Must own registered cultivable agricultural land in their name",
      "Not applicable to institutional landholders or high-salaried taxpayers"
    ],
    benefitsEn: [
      "₹6,000 per year paid in three equal installments of ₹2,000 directly to bank accounts",
      "Provides vital cash inflow to meet agricultural seeds, fertilizers, and initial input costs"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Agricultural Land Records (Khatian / Parcha copy)",
      "Bank Account Passbook showing IFSC and account details",
      "Voter Card",
      "Active Mobile number linked with Aadhaar (mandatory for e-KYC)"
    ]
  },
  {
    id: "pmfby",
    nameEn: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "central",
    descriptionEn: "Yield and weather-based crop insurance scheme protecting Indian farmers from unpredictable crop damage and loss.",
    eligibilityEn: [
      "All Indian farmers growing notified crops in notified areas during Kharif/Rabi seasons",
      "Includes tenant and sharecropper farmers with valid land documentation"
    ],
    benefitsEn: [
      "Comprehensive insurance cover against crop loss due to natural calamities, pests, and local storms",
      "Extremely low premiums: 1.5% for Rabi, 2% for Kharif, and 5% for horticultural crops"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Land Record documents (Khatian, Parcha, or tenancy contract)",
      "Sowing Certificate issued by local agricultural department / Gram Panchayat",
      "Bank Passbook copy showing IFSC",
      "Active Mobile Number linked to Aadhaar"
    ]
  },
  {
    id: "pmuy",
    nameEn: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    category: "central",
    descriptionEn: "Welfare scheme aimed at providing clean LPG cooking gas connections to women from below poverty line (BPL) households.",
    eligibilityEn: [
      "Applicant must be an adult female (aged 18 years or older)",
      "Must belong to an eligible BPL household, SC/ST, or forest dweller families",
      "No active LPG connection should exist in the same household"
    ],
    benefitsEn: [
      "Free LPG gas connection with a free cylinder, pressure regulator, and safety pipe",
      "Financial assistance of ₹1,600 per connection provided directly by the central government"
    ],
    documentsEn: [
      "Aadhaar Card of the applicant and all adult family members",
      "Ration Card issued by State government",
      "BPL Card / proof of inclusion in SECC list",
      "Bank Passbook copy with IFSC",
      "Active Mobile number",
      "Passport size photograph"
    ]
  },
  {
    id: "pmjdy",
    nameEn: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    category: "central",
    descriptionEn: "National mission on financial inclusion providing access to basic banking services with zero-balance account facilities.",
    eligibilityEn: [
      "All Indian citizens aged 10 years or older can open an account",
      "Unbanked individuals who do not possess any other active savings bank account"
    ],
    benefitsEn: [
      "Zero-balance savings account with no minimum balance requirements",
      "Free RuPay Debit Card with built-in ₹2 Lakh accidental insurance cover",
      "Overdraft facility of up to ₹10,000 for eligible account holders"
    ],
    documentsEn: [
      "Aadhaar Card (serves as identity and address proof)",
      "Voter Identity Card (if Aadhaar details need verification)",
      "Two passport-sized photographs",
      "Active Mobile number for SMS alerts"
    ]
  },
  {
    id: "pmjjby",
    nameEn: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    category: "central",
    descriptionEn: "Affordable one-year life insurance scheme renewable annually, offering life insurance coverage to bank account holders.",
    eligibilityEn: [
      "All Indian citizens aged between 18 and 50 years",
      "Must hold an active savings bank account with auto-debit consent active"
    ],
    benefitsEn: [
      "₹2 Lakh life insurance coverage in case of death of the insured due to any reason",
      "Highly affordable annual premium of ₹436 auto-debited from savings account"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Account Passbook (for auto-debit registration)",
      "Nominee Details (Aadhaar & relationship proof)",
      "Consent-cum-Declaration form signed by account holder"
    ]
  },
  {
    id: "pmsby",
    nameEn: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    category: "central",
    descriptionEn: "Highly affordable government-backed accidental insurance scheme offering risk coverage against accidental death and disability.",
    eligibilityEn: [
      "All Indian citizens aged between 18 and 70 years",
      "Must hold an active savings bank account with auto-debit authorization"
    ],
    benefitsEn: [
      "₹2 Lakh coverage for accidental death or total permanent disability",
      "₹1 Lakh coverage for partial permanent disability",
      "Ultra-low premium of ₹20 per year auto-debited from bank account"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Account Passbook copy",
      "Nominee details and contact information",
      "Signed auto-debit consent form"
    ]
  },
  {
    id: "apy",
    nameEn: "Atal Pension Yojana (APY)",
    category: "central",
    descriptionEn: "Pension scheme for citizens of India focused on workers in the unorganized sector to secure their old age.",
    eligibilityEn: [
      "All Indian citizens aged between 18 and 40 years",
      "Must have an active savings bank account",
      "Must not be an active taxpayer or member of statutory social security schemes"
    ],
    benefitsEn: [
      "Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 after reaching 60 years",
      "Covers spouse in case of death, and returns entire pension corpus to nominee"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Passbook copy showing account number and IFSC",
      "Mobile number linked with bank account",
      "Nominee information"
    ]
  },
  {
    id: "pm-vishwakarma",
    nameEn: "Pradhan Mantri Vishwakarma Yojana",
    category: "central",
    descriptionEn: "Comprehensive scheme supporting traditional artisans and craftspeople with skill training, toolkit incentives, and collateral-free loans.",
    eligibilityEn: [
      "An artisan or craftsperson working in one of 18 traditional trades (e.g., carpenter, blacksmith, potter, tailor)",
      "Minimum age of 18 years, and only one member per family is eligible",
      "Must not have availed similar credit schemes (PMEGP, PM SVANidhi) in the last 5 years"
    ],
    benefitsEn: [
      "Recognition as Vishwakarma through PM Vishwakarma Certificate and ID Card",
      "Skill upgrading training with standard ₹500/day stipend during training",
      "Toolkit incentive of ₹15,000 e-voucher, and collateral-free enterprise loans up to ₹3 Lakh at concessional interest rate of 5%"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Passbook copy with IFSC",
      "Voter Identity Card",
      "Certificate or declaration of trade practice/traditional craft",
      "Active Mobile number linked with Aadhaar"
    ]
  },
  {
    id: "pmmvy",
    nameEn: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "central",
    descriptionEn: "Maternity benefit program providing cash incentives directly to pregnant women and lactating mothers for health and nutrition.",
    eligibilityEn: [
      "Pregnant women and lactating mothers for the first child in the family",
      "Excludes regular government or public sector undertaking employees"
    ],
    benefitsEn: [
      "Cash incentive of ₹5,000 paid in installments directly to Aadhaar-linked bank accounts",
      "Promotes institutional delivery and regular vaccination of newborn infants"
    ],
    documentsEn: [
      "Aadhaar Card of the beneficiary and husband",
      "Bank Account Passbook (solely owned by the female beneficiary)",
      "Mother & Child Protection Card (MCP Card) showing ANC registrations",
      "Institutional Delivery certificate / child Birth Certificate",
      "Consent form signed by both husband and wife"
    ]
  },
  {
    id: "sukanya-samriddhi",
    nameEn: "Sukanya Samriddhi Yojana",
    category: "central",
    descriptionEn: "A small deposit savings scheme promoted under the 'Beti Bachao Beti Padhao' campaign, dedicated to securing the future of girl children.",
    eligibilityEn: [
      "Can be opened only by parents or legal guardians in the name of a girl child",
      "Girl child must be under 10 years of age at the time of account opening",
      "Maximum of two accounts per family (three under exceptional multiple births)"
    ],
    benefitsEn: [
      "Extremely high interest rate compared to other savings schemes (renewable quarterly)",
      "Triple tax exemptions (EEE status) on deposits, interest, and maturity amount",
      "Enables long-term savings for higher education and marriage of the girl child"
    ],
    documentsEn: [
      "Birth Certificate of the girl child",
      "Aadhaar Card of the parent/guardian (acting as KYC)",
      "Voter ID / PAN Card of the parent/guardian",
      "Passport size photographs of child and parent",
      "Address proof (Utility bill or passport)"
    ]
  },
  {
    id: "e-shram",
    nameEn: "e-Shram Card Scheme",
    category: "central",
    descriptionEn: "National database of unorganized workers designed to register and extend welfare and social security benefits directly to them.",
    eligibilityEn: [
      "Unorganized workers aged between 16 and 59 years (e.g., laborers, domestic helpers, street vendors)",
      "Must not be a member of EPFO, ESIC, or any active taxpayer schemes"
    ],
    benefitsEn: [
      "Issuance of e-Shram card containing a unique 12-digit Universal Account Number (UAN)",
      "Direct eligibility to receive upcoming social security pensions and financial aids",
      "Built-in free ₹2 Lakh accidental insurance coverage under PMSBY"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Account Passbook showing IFSC and Account details",
      "Active Mobile number linked with Aadhaar (mandatory for instant OTP registration)"
    ]
  },
  {
    id: "pm-shram-yogi",
    nameEn: "Pradhan Mantri Shram Yogi Maandhan Yojana",
    category: "central",
    descriptionEn: "Voluntary and co-contributory pension scheme for unorganized sector workers to secure a monthly livelihood pension after retirement.",
    eligibilityEn: [
      "Unorganized workers aged between 18 and 40 years",
      "Monthly income must be ₹15,000 or less",
      "Must not be covered under EPFO, ESIC, NPS, or be an active income taxpayer"
    ],
    benefitsEn: [
      "Assured minimum monthly pension of ₹3,000 after attaining the age of 60 years",
      "Co-contribution: Government matches equal monthly contributions made by the worker",
      "Family pension: 50% of pension payable to spouse upon death of beneficiary"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Savings Bank Passbook copy with IFSC",
      "Auto-debit mandate form signed for monthly bank deduction",
      "Mobile number linked to Aadhaar"
    ]
  },
  {
    id: "mgnrega",
    nameEn: "MGNREGA",
    category: "central",
    descriptionEn: "Mahatma Gandhi National Rural Employment Guarantee Act, providing guaranteed wage employment to rural households.",
    eligibilityEn: [
      "Adult members of rural households who are willing to do unskilled manual work",
      "Must be local residents of the respective Gram Panchayat area"
    ],
    benefitsEn: [
      "Guaranteed wage employment of at least 100 days in a financial year per household",
      "Wages paid directly into the bank accounts of registered laborers",
      "Unemployment allowance paid if work is not provided within 15 days of demand"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Age Proof certificate of adult members",
      "Bank Passbook copy showing account details and IFSC",
      "Voter Identity Card",
      "Passport-sized photograph of all applicants"
    ]
  },
  {
    id: "jal-jeevan",
    nameEn: "Jal Jeevan Mission",
    category: "central",
    descriptionEn: "National program aiming to provide functional household tap connections to every rural household in India.",
    eligibilityEn: [
      "All Indian rural households requiring tap drinking water connections",
      "Focuses on priority areas including schools, Anganwadis, and community buildings"
    ],
    benefitsEn: [
      "Ensured regular supply of 55 liters of safe drinking water per capita per day",
      "Direct functional tap connection established free of cost at the household level"
    ],
    documentsEn: [
      "Aadhaar Card of the head of the household",
      "Ration Card copy",
      "Address proof / Land document / Tax Receipt",
      "Active Mobile number"
    ]
  },
  {
    id: "swachh-bharat",
    nameEn: "Swachh Bharat Mission",
    category: "central",
    descriptionEn: "Welfare scheme promoting hygiene and sanitation by providing financial incentives to rural and urban families to construct individual household toilets.",
    eligibilityEn: [
      "Rural or urban households lacking proper sanitation / toilet facility",
      "Must be registered in the baseline survey of eligible beneficiaries"
    ],
    benefitsEn: [
      "Financial incentive of ₹12,000 provided directly to construct household latrines/toilets",
      "Promotes general health, hygiene, and safety for female members of the family"
    ],
    documentsEn: [
      "Aadhaar Card copy",
      "Bank Account Passbook (first page copy with IFSC for direct credit)",
      "Ration Card details",
      "Existing land ownership record or residential document",
      "Photograph of the toilet construction site / beneficiary"
    ]
  },

  // Scholarship Schemes
  {
    id: "nsp-pre-matric",
    nameEn: "NSP Pre-Matric Scholarship",
    category: "scholarship",
    descriptionEn: "Central and state-funded educational scholarship provided to meritorious students from minority or underprivileged communities studying in classes 1 to 10.",
    eligibilityEn: [
      "Students studying in classes 1 to 10 in recognized schools",
      "Must belong to specified minority communities or SC/ST/OBC categories",
      "Annual parental income must not exceed standard limits (e.g., ₹1 Lakh per year)"
    ],
    benefitsEn: [
      "Admission fee, tuition fee, and maintenance allowance paid directly into student's bank account",
      "Aids in reducing dropout rates of economically weak student populations"
    ],
    documentsEn: [
      "Aadhaar Card copy of the student / parent",
      "Student Bonafide Certificate issued by the Head of School",
      "Previous Class Marksheet with passing percentage",
      "Income Certificate of parents issued by BDO/SDO or designated authority",
      "Caste/Minority Certificate (self-declaration or official copy)",
      "Bank Account details (Passbook first page showing IFSC)"
    ]
  },
  {
    id: "nsp-post-matric",
    nameEn: "NSP Post-Matric Scholarship",
    category: "scholarship",
    descriptionEn: "Scholarship program supporting students from underprivileged and minority communities to pursue higher secondary, college, or university education.",
    eligibilityEn: [
      "Students studying in Class 11, Class 12, ITI, Polytechnic, UG, PG, or Ph.D. programs",
      "Belonging to minority, SC, ST, or OBC student populations",
      "Annual parental income must be within specified limits (e.g., ₹2 Lakh to ₹2.5 Lakh per year)"
    ],
    benefitsEn: [
      "Comprehensive scholarship support covering admission, tuition, course fee, and monthly hostel/maintenance allowances",
      "Direct Benefit Transfer directly to verified bank account of the student"
    ],
    documentsEn: [
      "Aadhaar Card copy of the student",
      "Bonafide Student Certificate issued by College / Institution Head",
      "Fee Receipt of the current academic year",
      "Income Certificate of parents (original copy)",
      "Caste / Minority Certificate issued by SDO / competent authority",
      "Previous Exam Marksheet (Madhyamik or HS or Graduation)",
      "Bank Account Passbook of the student showing IFSC"
    ]
  }
];
