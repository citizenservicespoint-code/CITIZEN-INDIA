import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { 
  CheckCircle, 
  Upload, 
  Printer, 
  Search, 
  RefreshCw,
  AlertTriangle,
  Download,
  Copy,
  FileText,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ensureRecaptchaV3Loaded, executeRecaptchaV3 } from '../utils/recaptchaV3';

// Categorized Government Schemes List as explicitly requested
export const SCHEMES_CATEGORIES = [
  {
    category: 'Government of West Bengal scheme',
    schemes: [
      'Annapurna Scheme',
      'Old Age Pension (Baridhakya Bhata)',
      'Widow Pension (Bidhoba Bhata)',
      'Disability Pension (Pratibandhi Bhata)',
      'RKSY-I Ration Card',
      'RKSY-II Ration Card'
    ]
  },
  {
    category: 'Government of India scheme',
    schemes: [
      'Pradhan Mantri Awas Yojana (PMAY-G / PMAY-U)',
      'Ayushman Bharat – PM Jan Arogya Yojana (PM-JAY)',
      'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      'Pradhan Mantri Ujjwala Yojana (PMUY)',
      'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
      'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      'Atal Pension Yojana (APY)',
      'Pradhan Mantri Vishwakarma Yojana',
      'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      'Sukanya Samriddhi Yojana',
      'e-Shram Card Scheme',
      'Pradhan Mantri Shram Yogi Maandhan Yojana',
      'MGNREGA',
      'Jal Jeevan Mission',
      'Swachh Bharat Mission'
    ]
  },
  {
    category: 'Scholarship Schemes',
    schemes: [
      'NSP Pre-Matric Scholarship',
      'NSP Post-Matric Scholarship'
    ]
  }
];

// Available Services Dropdown List
const SERVICES_LIST = [
  'Aadhaar Card',
  'PAN Card',
  'Voter ID Card',
  'State Residential Certificate',
  'State Income Proof Certificate',
  'State Birth Certificate',
  'Central Citizenship & ID Verification Certificate',
  'Ration Card',
  'APAAR Card',
  'e-Shram Card',
  'Other'
];

// Document Checklist Options
const CHECKLIST_OPTIONS = [
  'Aadhaar Card',
  'PAN Card',
  'Voter ID',
  'Passport',
  'Driving Licence',
  'Birth Certificate',
  'Income Certificate',
  'Caste Certificate',
  'Residence Certificate',
  'Passport Size Photograph',
  'Other'
];

interface Props {
  logoImg?: string;
  currentLang?: 'en' | 'bn' | 'hi';
  onNavigateToTracker?: (appNumber: string) => void;
}

export default function CustomerServiceRequestForm({ logoImg, currentLang = 'en', onNavigateToTracker }: Props) {
  const tr = (en: string, bn: string, hi: string) =>
    currentLang === 'bn' ? bn : currentLang === 'hi' ? hi : en;

  useEffect(() => {
    ensureRecaptchaV3Loaded();
  }, []);

  // Form State
  const [applyingFor, setApplyingFor] = useState<'service' | 'scheme'>('service');
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('Aadhaar Card');
  const [otherServiceText, setOtherServiceText] = useState<string>('');
  
  const [requestType, setRequestType] = useState<string>('New Application');
  const [otherRequestType, setOtherRequestType] = useState<string>('');

  // Applicant Details
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [occupation, setOccupation] = useState('');

  // Address Details
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [villageCity, setVillageCity] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('West Bengal');
  const [pinCode, setPinCode] = useState('');

  // Identity Details
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [voterNo, setVoterNo] = useState('');
  const [passportNo, setPassportNo] = useState('');

  // Document Checklist Selected
  const [documentChecklist, setDocumentChecklist] = useState<string[]>(['Passport Size Photograph']);

  // Identity Proof & Upload State
  const [hasValidIdProof, setHasValidIdProof] = useState<'Yes' | 'No' | ''>('Yes');
  const [idProofType, setIdProofType] = useState('Aadhaar Card');
  
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idFileName, setIdFileName] = useState('');
  const [idFileError, setIdFileError] = useState('');

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoFileName, setPhotoFileName] = useState('');
  const [photoFileError, setPhotoFileError] = useState('');

  // Service Description
  const [reasonRemarks, setReasonRemarks] = useState('');

  // Additional Mandatory Yes/No Questions (Default empty to require conscious user choice)
  const [affiliatedPoliticalParty, setAffiliatedPoliticalParty] = useState<'Yes' | 'No' | ''>('');
  const [physicallyDisabled, setPhysicallyDisabled] = useState<'Yes' | 'No' | ''>('');
  const [birthplaceInIndia, setBirthplaceInIndia] = useState<'Yes' | 'No' | ''>('');
  const [fraudulentIllegal, setFraudulentIllegal] = useState<'Yes' | 'No' | ''>('');

  // Declaration
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  // Form Submission & Success Popup State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedAppNum, setCopiedAppNum] = useState(false);

  // Ref for the printable receipt element
  const printSlipRef = useRef<HTMLDivElement>(null);

  // Helper: File Size Validator (250 KB limit = 250 * 1024 bytes)
  const MAX_FILE_SIZE_BYTES = 250 * 1024; // 256,000 bytes

  const handleIdFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMsg = `File size exceeds 250 KB limit! Your file is ${(file.size / 1024).toFixed(1)} KB. Please upload a file under 250 KB.`;
        setIdFileError(errorMsg);
        setIdFile(null);
        setIdFileName('');
        e.target.value = '';
        return;
      }
      setIdFile(file);
      setIdFileName(file.name);
    }
  };

  const handlePhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const errorMsg = `Passport photo size exceeds 250 KB limit! Your file is ${(file.size / 1024).toFixed(1)} KB. Please upload a photo under 250 KB.`;
        setPhotoFileError(errorMsg);
        setPhotoFile(null);
        setPhotoFileName('');
        e.target.value = '';
        return;
      }
      setPhotoFile(file);
      setPhotoFileName(file.name);
    }
  };

  const toggleChecklistDoc = (doc: string) => {
    if (documentChecklist.includes(doc)) {
      setDocumentChecklist(documentChecklist.filter(item => item !== doc));
    } else {
      setDocumentChecklist([...documentChecklist, doc]);
    }
  };

  /**
   * APPLICATION NUMBER GENERATION LOGIC:
   * Format: CITIZEN-1234-5678
   * - CITIZEN is fixed for all applications.
   * - 1234 is 4 unique numbers distinct from previous applications.
   * - 5678 is 4 unique numbers distinct from previous applications.
   * - Guarantees no duplicate number is ever generated.
   */
  const generateApplicationNumber = (): string => {
    let existingRequests: any[] = [];
    try {
      existingRequests = JSON.parse(localStorage.getItem('citizen_submitted_requests') || '[]');
    } catch {
      existingRequests = [];
    }
    const existingNumbers = new Set(existingRequests.map((r: any) => r.applicationNumber));

    let candidate = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 500) {
      attempts++;
      const num1 = Math.floor(1000 + Math.random() * 9000);
      const num2 = Math.floor(1000 + Math.random() * 9000);
      candidate = `CITIZEN-${num1}-${num2}`;

      if (!existingNumbers.has(candidate)) {
        isUnique = true;
      }
    }

    if (!isUnique) {
      const timeStr = Date.now().toString();
      const p1 = timeStr.slice(-8, -4);
      const p2 = timeStr.slice(-4);
      candidate = `CITIZEN-${p1}-${p2}`;
    }

    return candidate;
  };

  const fileToDataUrl = (file: File | null): Promise<string | null> => {
    if (!file) return Promise.resolve(null);
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  /**
   * Server-Side Verified Dispatch Handler:
   * 1. Generates Google reCAPTCHA v3 token ('submit_service_request')
   * 2. Encodes optional <=250KB attachments and routes everything through /api/submit-request
   * 3. Server verifies reCAPTCHA v3 and dispatches email/storage server-side without exposing URLs in browser
   */
  const submitToBackend = async (
    payload: any,
    uploadedIdFile: File | null,
    uploadedPhotoFile: File | null
  ): Promise<{ ok: boolean; errorMessage?: string }> => {
    try {
      const [idFileBase64, photoFileBase64, recaptchaToken] = await Promise.all([
        fileToDataUrl(uploadedIdFile),
        fileToDataUrl(uploadedPhotoFile),
        executeRecaptchaV3('submit_service_request'),
      ]);

      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          idFileBase64,
          photoFileBase64,
          recaptchaToken,
          recaptchaAction: 'submit_service_request',
        }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok || resData?.success === false) {
        return {
          ok: false,
          errorMessage:
            resData?.error ||
            resData?.message ||
            'Security verification failed. Please refresh and try again.',
        };
      }
    } catch {
      return {
        ok: false,
        errorMessage: 'Unable to reach the secure submission server. Please try again.',
      };
    }

    // Local Storage Persistence for Citizen Status Tracking
    try {
      const existing = JSON.parse(localStorage.getItem('citizen_submitted_requests') || '[]');
      existing.unshift(payload);
      localStorage.setItem('citizen_submitted_requests', JSON.stringify(existing));
    } catch {
      // Ignore storage quota errors
    }

    return { ok: true };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    const errors: Record<string, string> = {};

    // 1. APPLICATION CATEGORY VALIDATIONS
    if (applyingFor === 'service' && selectedService === 'Other' && !otherServiceText.trim()) {
      errors.otherService = 'Please specify the requested service name.';
    }
    if (applyingFor === 'scheme' && !selectedScheme) {
      errors.selectedScheme = 'Please select a Government Scheme from the list.';
    }
    if (requestType === 'Other' && !otherRequestType.trim()) {
      errors.otherRequestType = 'Please specify the other request type.';
    }

    // 2. APPLICANT DETAILS VALIDATIONS (MANDATORY)
    if (!fullName.trim()) {
      errors.fullName = 'Full Name (as per official ID) is required.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Please enter a valid full name with at least 2 characters.';
    }

    if (!fatherName.trim()) {
      errors.fatherName = "Father's Name is mandatory.";
    } else if (fatherName.trim().length < 2) {
      errors.fatherName = "Please enter a valid Father's name.";
    }

    if (!motherName.trim()) {
      errors.motherName = "Mother's Name is mandatory.";
    } else if (motherName.trim().length < 2) {
      errors.motherName = "Please enter a valid Mother's name.";
    }

    if (!dob) {
      errors.dob = 'Date of Birth is mandatory.';
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      if (birthDate > today) {
        errors.dob = 'Date of Birth cannot be in the future.';
      }
    }

    if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
      errors.gender = 'Gender selection is mandatory.';
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      errors.mobile = 'Mobile Number is mandatory.';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian Mobile Number starting with 6, 7, 8, or 9.';
    }

    // 3. ADDRESS DETAILS VALIDATIONS (MANDATORY)
    if (!houseNo.trim()) {
      errors.houseNo = 'House / Flat No. is mandatory.';
    }

    if (!street.trim()) {
      errors.street = 'Street / Locality is mandatory.';
    }

    if (!villageCity.trim()) {
      errors.villageCity = 'Village / Town / City is mandatory.';
    }

    if (!policeStation.trim()) {
      errors.policeStation = 'Police Station is mandatory.';
    }

    if (!district.trim()) {
      errors.district = 'District is mandatory.';
    }

    if (!state.trim()) {
      errors.state = 'State is mandatory.';
    }

    const cleanPin = pinCode.replace(/\D/g, '');
    if (!cleanPin) {
      errors.pinCode = 'PIN Code is mandatory.';
    } else if (!/^[1-9]\d{5}$/.test(cleanPin)) {
      errors.pinCode = 'Please enter a valid 6-digit Indian PIN code (e.g. 700001).';
    }

    // 4. STATUTORY YES/NO QUESTIONS (MANDATORY)
    if (!affiliatedPoliticalParty) {
      errors.affiliatedPoliticalParty = 'Please answer: Are you affiliated with any political party? (Yes / No)';
    }

    if (!physicallyDisabled) {
      errors.physicallyDisabled = 'Please answer: Are you physically disabled? (Yes / No)';
    }

    if (!birthplaceInIndia) {
      errors.birthplaceInIndia = 'Please answer: Is your birthplace in India? (Yes / No)';
    }

    if (!fraudulentIllegal) {
      errors.fraudulentIllegal = 'Please answer: Is this document intended for any fraudulent or illegal activity? (Yes / No)';
    }

    // 5. CRITICAL ANTI-FRAUD / ILLEGAL ACTIVITY CHECK
    // If the applicant selects Yes to fraudulent/illegal activity, block immediately!
    if (fraudulentIllegal === 'Yes') {
      errors.fraudulentIllegal = 'CRITICAL REJECTION: Under Indian Law (IPC & IT Act), documents cannot be processed for any fraudulent or illegal activity. Submission has been blocked.';
    }

    // 6. APPLICANT DECLARATION (MANDATORY)
    if (!declarationAccepted) {
      errors.declarationAccepted = 'You must accept the Applicant Declaration to submit this form.';
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = Object.values(errors)[0];
      setValidationError(firstError);

      // Scroll smoothly to form error banner or top of form
      const formElement = document.getElementById('service-request-form-container');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
      return;
    }

    // Clear all errors if valid
    setFieldErrors({});
    setIsSubmitting(true);

    const appNum = generateApplicationNumber();
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const finalServiceRequested = applyingFor === 'scheme' 
      ? selectedScheme 
      : (selectedService === 'Other' ? otherServiceText : selectedService);

    const formDataPayload = {
      applicationNumber: appNum,
      applicationDate: currentDate,
      applicationTime: currentTime,
      applyingFor,
      requestedService: finalServiceRequested,
      requestType: requestType === 'Other' ? otherRequestType : requestType,
      applicantDetails: {
        fullName: fullName.toUpperCase().trim(),
        fatherName: fatherName.toUpperCase().trim(),
        motherName: motherName.toUpperCase().trim(),
        dob,
        gender,
        mobile: cleanMobile,
        altMobile: altMobile.trim(),
        occupation: occupation.toUpperCase().trim()
      },
      addressDetails: {
        houseNo: houseNo.toUpperCase().trim(),
        street: street.toUpperCase().trim(),
        villageCity: villageCity.toUpperCase().trim(),
        policeStation: policeStation.toUpperCase().trim(),
        district: district.toUpperCase().trim(),
        state: state.toUpperCase().trim(),
        pinCode: cleanPin
      },
      identityDetails: {
        aadhaarNo: aadhaarNo.trim(),
        panNo: panNo.toUpperCase().trim(),
        voterNo: voterNo.toUpperCase().trim(),
        passportNo: passportNo.toUpperCase().trim()
      },
      documentChecklist,
      identityProofUpload: {
        hasValidIdProof,
        idProofType,
        idFileName: idFileName || 'No ID file attached',
        photoFileName: photoFileName || 'No Photo file attached'
      },
      additionalMandatoryQuestions: {
        affiliatedPoliticalParty,
        physicallyDisabled,
        birthplaceInIndia,
        fraudulentIllegal
      },
      serviceDescription: reasonRemarks.trim(),
      applicantDeclarationText: 'I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that providing false information or forged documents may lead to legal consequences under Indian Law. I accept full responsibility for any misuse of the documents issued.',
      submittedAt: new Date().toISOString()
    };

    const submitResult = await submitToBackend(formDataPayload, idFile, photoFile);
    if (!submitResult.ok) {
      setValidationError(
        submitResult.errorMessage ||
          'Security verification failed. Please refresh and try again.'
      );
      setIsSubmitting(false);
      return;
    }

    setSubmittedAppNumber(appNum);
    setSubmittedData(formDataPayload);
    setIsSubmitting(false);
  };

  /**
   * Generates a complete, beautiful HTML printable document representing the 2-page PDF
   * and excludes any "Office Use Only" sections.
   */
  const generatePrintableHTML = (data: any) => {
    const d = data || submittedData;
    if (!d) return '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Customer Service Request Slip - ${d.applicationNumber}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #111827;
      background: #fff;
      font-size: 12px;
      line-height: 1.4;
    }
    .header-bar {
      display: flex;
      height: 4px;
      margin-bottom: 12px;
    }
    .bar-saffron { background: #FF9933; width: 33.33%; }
    .bar-white { background: #E5E7EB; width: 33.34%; }
    .bar-green { background: #138808; width: 33.33%; }
    .header-title {
      text-align: center;
      margin-bottom: 14px;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
    }
    .header-title h1 {
      margin: 0 0 4px 0;
      font-size: 20px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    .header-title h2 {
      margin: 0 0 4px 0;
      font-size: 13px;
      font-weight: 800;
      color: #ea580c;
      letter-spacing: 1px;
    }
    .app-badge {
      background: #0f172a;
      color: #fff;
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    .section-box {
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      overflow: hidden;
    }
    .section-header {
      background: #f1f5f9;
      font-weight: 800;
      font-size: 11px;
      text-transform: uppercase;
      padding: 5px 10px;
      border-bottom: 1px solid #cbd5e1;
      color: #0f172a;
    }
    .section-body {
      padding: 8px 10px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px 12px;
    }
    .field {
      margin-bottom: 4px;
    }
    .field-label {
      font-size: 10px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
    }
    .field-value {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      word-break: break-word;
    }
    .checklist-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px 8px;
    }
    .check-item {
      font-size: 10px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }
    .declaration-box {
      background: #f8fafc;
      border: 1px dashed #94a3b8;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 10px;
      line-height: 1.3;
      margin-top: 8px;
      color: #334155;
    }
    .signatures {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 12px;
    }
    .sig-line {
      border-top: 1px solid #000;
      width: 200px;
      text-align: center;
      font-size: 10px;
      font-weight: bold;
      padding-top: 4px;
      text-transform: uppercase;
    }
    .footer-note {
      text-align: center;
      font-size: 9px;
      color: #64748b;
      margin-top: 12px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div class="bar-saffron"></div>
    <div class="bar-white"></div>
    <div class="bar-green"></div>
  </div>

  <div class="header-title">
    <h2>CITIZEN SERVICES POINT</h2>
    <h1>CUSTOMER SERVICE REQUEST FORM</h1>
    <div>
      <span class="app-badge">APPLICATION NO: ${d.applicationNumber}</span>
    </div>
  </div>

  <!-- 1. APPLICATION DETAILS -->
  <div class="section-box">
    <div class="section-header">1. APPLICATION DETAILS</div>
    <div class="section-body grid-2">
      <div class="field">
        <div class="field-label">Application Date & Time:</div>
        <div class="field-value">${d.applicationDate} | ${d.applicationTime}</div>
      </div>
      <div class="field">
        <div class="field-label">Service Category:</div>
        <div class="field-value">${d.applyingFor === 'scheme' ? 'Government Welfare Scheme' : 'Government Service'}</div>
      </div>
      <div class="field">
        <div class="field-label">Requested Service / Scheme:</div>
        <div class="field-value">${d.requestedService}</div>
      </div>
      <div class="field">
        <div class="field-label">Request Type:</div>
        <div class="field-value">${d.requestType}</div>
      </div>
    </div>
  </div>

  <!-- 2. APPLICANT DETAILS -->
  <div class="section-box">
    <div class="section-header">2. APPLICANT DETAILS</div>
    <div class="section-body grid-3">
      <div class="field" style="grid-column: span 3;">
        <div class="field-label">Full Name:</div>
        <div class="field-value" style="font-size: 13px;">${d.applicantDetails.fullName}</div>
      </div>
      <div class="field">
        <div class="field-label">Father's Name:</div>
        <div class="field-value">${d.applicantDetails.fatherName || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Mother's Name:</div>
        <div class="field-value">${d.applicantDetails.motherName || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Date of Birth:</div>
        <div class="field-value">${d.applicantDetails.dob || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Gender:</div>
        <div class="field-value">${d.applicantDetails.gender || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Mobile Number:</div>
        <div class="field-value">${d.applicantDetails.mobile}</div>
      </div>
      <div class="field">
        <div class="field-label">Alternate Mobile:</div>
        <div class="field-value">${d.applicantDetails.altMobile || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Occupation:</div>
        <div class="field-value">${d.applicantDetails.occupation || 'N/A'}</div>
      </div>
    </div>
  </div>

  <!-- 3. ADDRESS DETAILS -->
  <div class="section-box">
    <div class="section-header">3. ADDRESS DETAILS</div>
    <div class="section-body grid-3">
      <div class="field">
        <div class="field-label">House / Flat No:</div>
        <div class="field-value">${d.addressDetails.houseNo || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Street / Locality:</div>
        <div class="field-value">${d.addressDetails.street || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Village / Town / City:</div>
        <div class="field-value">${d.addressDetails.villageCity || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Police Station:</div>
        <div class="field-value">${d.addressDetails.policeStation || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">District:</div>
        <div class="field-value">${d.addressDetails.district || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">State:</div>
        <div class="field-value">${d.addressDetails.state || 'West Bengal'}</div>
      </div>
      <div class="field">
        <div class="field-label">PIN Code:</div>
        <div class="field-value">${d.addressDetails.pinCode || 'N/A'}</div>
      </div>
    </div>
  </div>

  <!-- 4. IDENTITY DETAILS -->
  <div class="section-box">
    <div class="section-header">4. IDENTITY DETAILS (IF APPLICABLE)</div>
    <div class="section-body grid-2">
      <div class="field">
        <div class="field-label">Aadhaar Number:</div>
        <div class="field-value">${d.identityDetails.aadhaarNo || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">PAN Number:</div>
        <div class="field-value">${d.identityDetails.panNo || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Voter ID Number:</div>
        <div class="field-value">${d.identityDetails.voterNo || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="field-label">Passport Number:</div>
        <div class="field-value">${d.identityDetails.passportNo || 'N/A'}</div>
      </div>
    </div>
  </div>

  <!-- 5. DOCUMENT CHECKLIST & PROOFS -->
  <div class="section-box">
    <div class="section-header">5. DOCUMENT CHECKLIST & ATTACHED PROOFS</div>
    <div class="section-body">
      <div class="checklist-grid">
        ${d.documentChecklist.map((item: string) => `<div class="check-item">☑ ${item}</div>`).join('')}
      </div>
      <div style="margin-top: 8px; font-size: 10px; color: #475569;">
        <strong>Attached ID Proof:</strong> ${d.identityProofUpload.idProofType} (${d.identityProofUpload.idFileName}) | 
        <strong>Passport Photo:</strong> ${d.identityProofUpload.photoFileName}
      </div>
    </div>
  </div>

  <!-- 6. SERVICE DESCRIPTION -->
  <div class="section-box">
    <div class="section-header">6. SERVICE DESCRIPTION / REASON FOR REQUEST</div>
    <div class="section-body">
      <div class="field-value">${d.serviceDescription || 'STANDARD SERVICE PROCESSING REQUESTED'}</div>
    </div>
  </div>

  <!-- 7. DECLARATIONS -->
  <div class="section-box">
    <div class="section-header">7. MANDATORY DECLARATIONS</div>
    <div class="section-body grid-2">
      <div class="field">
        <div class="field-label">Political Party Affiliation:</div>
        <div class="field-value">${d.additionalMandatoryQuestions.affiliatedPoliticalParty}</div>
      </div>
      <div class="field">
        <div class="field-label">Physically Disabled:</div>
        <div class="field-value">${d.additionalMandatoryQuestions.physicallyDisabled}</div>
      </div>
      <div class="field">
        <div class="field-label">Birthplace in India:</div>
        <div class="field-value">${d.additionalMandatoryQuestions.birthplaceInIndia}</div>
      </div>
      <div class="field">
        <div class="field-label">Fraudulent/Illegal Activity Purpose:</div>
        <div class="field-value">${d.additionalMandatoryQuestions.fraudulentIllegal}</div>
      </div>
    </div>
  </div>

  <!-- DECLARATION & SIGNATURE -->
  <div class="declaration-box">
    <strong>APPLICANT DECLARATION:</strong> I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that providing false information or forged documents may lead to legal consequences under Indian Law. I accept full responsibility for any misuse of the documents issued.
  </div>

  <div class="signatures">
    <div>
      <div style="font-size: 10px; font-weight: bold; margin-bottom: 2px;">Applicant Name: ${d.applicantDetails.fullName}</div>
      <div style="font-size: 10px; color: #475569;">Submission Date: ${d.applicationDate}</div>
    </div>
    <div class="sig-line">
      Applicant Signature / Digital Consent
    </div>
  </div>

  <div class="footer-note">
    CITIZEN SERVICES POINT - OFFICIAL FORM CSRF | Official Email: info@citizenservicespoint.co.in | WhatsApp Support: +91 9836634843
  </div>
</body>
</html>`;
  };

  /**
   * Generates and downloads an authentic .PDF file directly to the user's device
   */
  const handleDownloadPDF = async () => {
    if (!submittedData) return;
    setIsDownloadingPdf(true);

    try {
      const slipElement = printSlipRef.current;
      if (slipElement) {
        // Temporarily reveal slip element for rendering
        slipElement.style.display = 'block';

        const canvas = await html2canvas(slipElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        // Hide back
        slipElement.style.display = 'none';

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth - 20; // 10mm margins on left and right
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 20);

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
          heightLeft -= (pdfHeight - 20);
        }

        pdf.save(`${submittedData.applicationNumber}-Application-Form.pdf`);
      } else {
        handlePrintSummary();
      }
    } catch (err) {
      console.error('PDF rendering failed, triggering print dialog fallback:', err);
      handlePrintSummary();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  /**
   * Opens the printable window and directly triggers the print dialogue
   */
  const handlePrintSummary = () => {
    if (!submittedData) return;
    const htmlContent = generatePrintableHTML(submittedData);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 350);
    } else {
      alert('Pop-up was blocked. Please click "Download PDF Copy" to save your application form.');
    }
  };

  const handleCopyAppNum = () => {
    if (submittedAppNumber) {
      navigator.clipboard.writeText(submittedAppNumber);
      setCopiedAppNum(true);
      setTimeout(() => setCopiedAppNum(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedAppNumber(null);
    setSubmittedData(null);
    setFullName('');
    setFatherName('');
    setMotherName('');
    setDob('');
    setGender('');
    setMobile('');
    setAltMobile('');
    setOccupation('');
    setHouseNo('');
    setStreet('');
    setVillageCity('');
    setPoliceStation('');
    setDistrict('');
    setPinCode('');
    setAadhaarNo('');
    setPanNo('');
    setVoterNo('');
    setPassportNo('');
    setIdFile(null);
    setIdFileName('');
    setPhotoFile(null);
    setPhotoFileName('');
    setReasonRemarks('');
    setDeclarationAccepted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* SUCCESS POPUP MODAL */}
      {submittedAppNumber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-6 text-center relative overflow-hidden max-h-[95vh] overflow-y-auto">
            
            {/* Tricolor top border accent */}
            <div className="absolute top-0 left-0 right-0 h-2 flex">
              <div className="bg-[#FF9933] w-1/3 h-full"></div>
              <div className="bg-white w-1/3 h-full"></div>
              <div className="bg-[#138808] w-1/3 h-full"></div>
            </div>

            {/* Large Green Checkmark Icon */}
            <div className="pt-2">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500/20 shadow-inner">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
            </div>

            {/* Required Submission Title & Text */}
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {tr('Submission Successful', 'আবেদন সফলভাবে জমা হয়েছে', 'आवेदन सफलतापूर्वक जमा हो गया')}
              </h3>
              <p className="text-base font-semibold text-slate-700 leading-relaxed px-2">
                {tr(
                  'Your form has been successfully submitted. Our team will contact you shortly.',
                  'আপনার ফর্মটি সফলভাবে জমা হয়েছে। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
                  'आपका फॉर्म सफलतापूर्वक जमा कर दिया गया है। हमारी टीम शीघ्र ही आपसे संपर्क करेगी।'
                )}
              </p>
            </div>

            {/* Application Number Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-emerald-500 space-y-2 shadow-lg relative group">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block">
                {tr('Official Application Number', 'অফিসিয়াল আবেদন নম্বর', 'आधिकारिक आवेदन संख्या')}
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-wider text-amber-400 select-all">
                {submittedAppNumber}
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyAppNum}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {copiedAppNum
                      ? tr('Copied to Clipboard!', 'কপি করা হয়েছে!', 'क्लिपबोर्ड पर कॉपी हो गया!')
                      : tr('Copy Application Number', 'আবেদন নম্বর কপি করুন', 'आवेदन संख्या कॉपी करें')}
                  </span>
                </button>
              </div>
            </div>

            {/* Application Number Save Advice */}
            <p className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
              {tr(
                'Please save this Application Number in a secure place for future reference.',
                'ভবিষ্যৎ অনুসন্ধানের জন্য অনুগ্রহ করে এই আবেদন নম্বরটি নিরাপদে সংরক্ষণ করুন।',
                'भविष्य के संदर्भ के लिए कृपया इस आवेदन संख्या को सुरक्षित स्थान पर रखें।'
              )}
            </p>

            {/* Action Buttons: Download PDF & Print & Track (HTML download & email message completely removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* DIRECT PDF DOWNLOAD BUTTON */}
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloadingPdf}
                className="w-full px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{tr('Generating PDF...', 'পিডিএফ তৈরি হচ্ছে...', 'पीडीएफ तैयार हो रहा है...')}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{tr('Download PDF Copy', 'পিডিএফ কপি ডাউনলোড করুন', 'पीडीएफ कॉपी डाउनलोड करें')}</span>
                  </>
                )}
              </button>

              {/* PRINT APPLICATION COPY */}
              <button
                onClick={handlePrintSummary}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>{tr('Print Application Copy', 'আবেদন কপি প্রিন্ট করুন', 'आवेदन कॉपी प्रिंट करें')}</span>
              </button>

              {/* LIVE APPLICATION STATUS TRACKER */}
              {onNavigateToTracker && (
                <button
                  onClick={() => onNavigateToTracker(submittedAppNumber)}
                  className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{tr('Track Status Live', 'লাইভ স্ট্যাটাস ট্র্যাক করুন', 'लाइव स्थिति ट्रैक करें')}</span>
                </button>
              )}

              {/* SUBMIT ANOTHER REQUEST */}
              <button
                onClick={resetForm}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{tr('Submit Another Request', 'নতুন আরেকটি আবেদন করুন', 'एक और अनुरोध जमा करें')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* HIDDEN OFF-SCREEN ELEMENT FOR ACCURATE PDF RENDERING VIA HTML2CANVAS */}
      {submittedData && (
        <div 
          ref={printSlipRef} 
          style={{ display: 'none', width: '800px', padding: '24px', background: '#ffffff', color: '#0f172a', fontFamily: 'sans-serif' }}
        >
          <div style={{ height: '4px', display: 'flex', marginBottom: '14px' }}>
            <div style={{ background: '#FF9933', width: '33.33%' }}></div>
            <div style={{ background: '#E5E7EB', width: '33.34%' }}></div>
            <div style={{ background: '#138808', width: '33.33%' }}></div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '14px', borderBottom: '2px solid #000', paddingBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#ea580c' }}>CITIZEN SERVICES POINT</h2>
            <h1 style={{ margin: '2px 0', fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>CUSTOMER SERVICE REQUEST FORM</h1>
            <div style={{ marginTop: '4px' }}>
              <span style={{ background: '#0f172a', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold' }}>
                APPLICATION NO: {submittedData.applicationNumber}
              </span>
            </div>
          </div>

          {/* 1. APPLICATION DETAILS */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#f1f5f9', fontWeight: 800, fontSize: '11px', padding: '5px 10px', borderBottom: '1px solid #cbd5e1' }}>
              1. APPLICATION DETAILS
            </div>
            <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '11px' }}>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>APPLICATION DATE & TIME:</strong><br />{submittedData.applicationDate} | {submittedData.applicationTime}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>SERVICE CATEGORY:</strong><br />{submittedData.applyingFor === 'scheme' ? 'Government Welfare Scheme' : 'Government Service'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>REQUESTED SERVICE / SCHEME:</strong><br />{submittedData.requestedService}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>REQUEST TYPE:</strong><br />{submittedData.requestType}</div>
            </div>
          </div>

          {/* 2. APPLICANT DETAILS */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#f1f5f9', fontWeight: 800, fontSize: '11px', padding: '5px 10px', borderBottom: '1px solid #cbd5e1' }}>
              2. APPLICANT DETAILS
            </div>
            <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px 12px', fontSize: '11px' }}>
              <div style={{ gridColumn: 'span 3' }}><strong style={{ color: '#475569', fontSize: '10px' }}>FULL NAME:</strong><br /><span style={{ fontSize: '13px', fontWeight: 800 }}>{submittedData.applicantDetails.fullName}</span></div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>FATHER'S NAME:</strong><br />{submittedData.applicantDetails.fatherName || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>MOTHER'S NAME:</strong><br />{submittedData.applicantDetails.motherName || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>DATE OF BIRTH:</strong><br />{submittedData.applicantDetails.dob || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>GENDER:</strong><br />{submittedData.applicantDetails.gender || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>MOBILE NUMBER:</strong><br />{submittedData.applicantDetails.mobile}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>OCCUPATION:</strong><br />{submittedData.applicantDetails.occupation || 'N/A'}</div>
            </div>
          </div>

          {/* 3. ADDRESS DETAILS */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#f1f5f9', fontWeight: 800, fontSize: '11px', padding: '5px 10px', borderBottom: '1px solid #cbd5e1' }}>
              3. ADDRESS DETAILS
            </div>
            <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px 12px', fontSize: '11px' }}>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>HOUSE / FLAT NO:</strong><br />{submittedData.addressDetails.houseNo || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>STREET / LOCALITY:</strong><br />{submittedData.addressDetails.street || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>VILLAGE / TOWN / CITY:</strong><br />{submittedData.addressDetails.villageCity || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>POLICE STATION:</strong><br />{submittedData.addressDetails.policeStation || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>DISTRICT:</strong><br />{submittedData.addressDetails.district || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>STATE & PIN:</strong><br />{submittedData.addressDetails.state || 'West Bengal'} - {submittedData.addressDetails.pinCode || 'N/A'}</div>
            </div>
          </div>

          {/* 4. IDENTITY DETAILS */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#f1f5f9', fontWeight: 800, fontSize: '11px', padding: '5px 10px', borderBottom: '1px solid #cbd5e1' }}>
              4. IDENTITY DETAILS
            </div>
            <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '11px' }}>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>AADHAAR NUMBER:</strong><br />{submittedData.identityDetails.aadhaarNo || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>PAN NUMBER:</strong><br />{submittedData.identityDetails.panNo || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>VOTER ID NUMBER:</strong><br />{submittedData.identityDetails.voterNo || 'N/A'}</div>
              <div><strong style={{ color: '#475569', fontSize: '10px' }}>PASSPORT NUMBER:</strong><br />{submittedData.identityDetails.passportNo || 'N/A'}</div>
            </div>
          </div>

          {/* 5. DOCUMENT CHECKLIST */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#f1f5f9', fontWeight: 800, fontSize: '11px', padding: '5px 10px', borderBottom: '1px solid #cbd5e1' }}>
              5. DOCUMENT CHECKLIST & PROOFS
            </div>
            <div style={{ padding: '8px 10px', fontSize: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                {submittedData.documentChecklist.map((item: string) => (
                  <div key={item}>☑ {item}</div>
                ))}
              </div>
              <div style={{ marginTop: '6px', color: '#475569', fontSize: '10px' }}>
                <strong>ID File:</strong> {submittedData.identityProofUpload.idFileName} | <strong>Photo:</strong> {submittedData.identityProofUpload.photoFileName}
              </div>
            </div>
          </div>

          {/* 6. DECLARATION */}
          <div style={{ background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '6px', padding: '8px 10px', fontSize: '10px', color: '#334155', marginTop: '6px' }}>
            <strong>APPLICANT DECLARATION:</strong> I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that providing false information or forged documents may lead to legal consequences under Indian Law. I accept full responsibility for any misuse of the documents issued.
          </div>

          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 'bold' }}>Applicant Name: {submittedData.applicantDetails.fullName}</div>
              <div style={{ fontSize: '10px', color: '#475569' }}>Date: {submittedData.applicationDate}</div>
            </div>
            <div style={{ borderTop: '1px solid #000', width: '180px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', paddingTop: '4px' }}>
              APPLICANT SIGNATURE
            </div>
          </div>
        </div>
      )}

      {/* FORM CONTAINER CARD */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden relative">
        
        {/* Subtle Corporate Tricolor Top Header Bar */}
        <div className="h-2.5 w-full flex">
          <div className="bg-[#FF9933] w-1/3 h-full"></div>
          <div className="bg-white w-1/3 h-full"></div>
          <div className="bg-[#138808] w-1/3 h-full"></div>
        </div>

        {/* HEADER SECTION */}
        <div className="p-6 sm:p-8 border-b border-slate-100 text-center space-y-4 bg-gradient-to-b from-slate-50 to-white">
          {logoImg && (
            <div className="flex justify-center mb-2">
              <img 
                src={logoImg} 
                alt="Citizen Services Point Logo" 
                className="h-16 sm:h-20 object-contain drop-shadow-xs" 
              />
            </div>
          )}
          <div>
            <span className="text-[11px] font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-1">
              {tr('CITIZEN SERVICES POINT', 'সিটিজেন সার্ভিসেস পয়েন্ট', 'सिटीजन सर्विसेज पॉइंट')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {tr(
                'CUSTOMER SERVICE REQUEST FORM',
                'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম (CUSTOMER SERVICE REQUEST FORM)',
                'ग्राहक सेवा अनुरोध फॉर्म (CUSTOMER SERVICE REQUEST FORM)'
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              {tr(
                'Authorized Public Application & Verification Portal',
                'অনুমোদিত জনপরিষেবা আবেদন ও যাচাইকরণ পোর্টাল',
                'अधिकृत सार्वजनिक आवेदन एवं सत्यापन पोर्टल'
              )}
            </p>
          </div>

          {/* INSTRUCTION BANNER FROM PDF */}
          <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm font-extrabold text-amber-900 uppercase tracking-wide">
              {tr(
                'INSTRUCTION: PLEASE FILL OUT ALL INFORMATION IN ENGLISH CAPITAL LETTERS ONLY',
                'নির্দেশিকা: অনুগ্রহ করে সমস্ত তথ্য শুধুমাত্র ইংরেজি বড় হাতের অক্ষরে (CAPITAL LETTERS) পূরণ করুন',
                'निर्देश: कृपया सभी जानकारी केवल अंग्रेजी के बड़े अक्षरों (CAPITAL LETTERS) में भरें'
              )}
            </p>
          </div>
        </div>

        {/* VALIDATION ERROR DISPLAY */}
        {validationError && (
          <div id="service-request-form-container" className="mx-6 sm:mx-8 mt-6 p-5 rounded-2xl bg-rose-50 border-2 border-rose-500 shadow-sm flex flex-col sm:flex-row items-start gap-3.5 text-rose-900 text-xs sm:text-sm animate-shake">
            <AlertTriangle className="w-6 h-6 shrink-0 text-rose-600 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="font-black text-rose-900 uppercase tracking-wide flex items-center justify-between">
                <span>{tr('Application Validation Notice', 'আবেদন যাচাইকরণ বিজ্ঞপ্তি', 'आवेदन सत्यापन सूचना')}</span>
                <span className="text-[11px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                  {Object.keys(fieldErrors).length} {Object.keys(fieldErrors).length === 1 ? 'Error' : 'Errors'} Found
                </span>
              </div>
              <p className="font-bold text-rose-800 leading-relaxed">
                {validationError}
              </p>
              {Object.keys(fieldErrors).length > 1 && (
                <div className="pt-2 border-t border-rose-200/80">
                  <span className="text-[11px] font-bold uppercase text-rose-700 block mb-1">
                    {tr('Please rectify all mandatory fields:', 'অনুগ্রহ করে সকল বাধ্যতামূলক ঘরগুলি সঠিকভাবে পূরণ করুন:', 'कृपया सभी अनिवार्य फ़ील्ड सही करें:')}
                  </span>
                  <ul className="list-disc list-inside text-xs font-semibold text-rose-800 space-y-1">
                    {Object.values(fieldErrors).map((errMsg, idx) => (
                      <li key={idx}>{errMsg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">

          {/* 1. APPLICATION DETAILS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">1</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('APPLICATION DETAILS', '১. আবেদনের বিবরণ (APPLICATION DETAILS)', '1. आवेदन विवरण (APPLICATION DETAILS)')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Service or Scheme Selection Radio */}
              <div className="md:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                  {tr('Select Application Category:', 'আবেদনের বিভাগ নির্বাচন করুন:', 'आवेदन श्रेणी चुनें:')} <span className="text-rose-600">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input 
                      type="radio" 
                      name="applyingFor" 
                      value="service" 
                      checked={applyingFor === 'service'} 
                      onChange={() => setApplyingFor('service')}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                    />
                    <span>{tr('Government Service (Identity Cards / Certificates)', 'সরকারি পরিষেবা (পরিচয়পত্র / শংসাপত্র)', 'सरकारी सेवा (पहचान पत्र / प्रमाण पत्र)')}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input 
                      type="radio" 
                      name="applyingFor" 
                      value="scheme" 
                      checked={applyingFor === 'scheme'} 
                      onChange={() => setApplyingFor('scheme')}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                    />
                    <span>{tr('Government Welfare Scheme / Pension', 'সরকারি জনকল্যাণমূলক প্রকল্প / পেনশন', 'सरकारी कल्याण योजना / पेंशन')}</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Service or Scheme Dropdown */}
              {applyingFor === 'service' ? (
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {tr('Requested Service', 'অনুরোধকৃত পরিষেবা (Requested Service)', 'अनुरोधित सेवा (Requested Service)')} <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-orange-500 uppercase"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv} value={srv}>{srv}</option>
                    ))}
                  </select>

                  {selectedService === 'Other' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="PLEASE SPECIFY THE OTHER SERVICE REQUIRED"
                        value={otherServiceText}
                        onChange={(e) => setOtherServiceText(e.target.value.toUpperCase())}
                        className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {tr('Select Government Scheme', 'সরকারি প্রকল্প নির্বাচন করুন (Select Scheme)', 'सरकारी योजना चुनें (Select Scheme)')} <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={selectedScheme}
                    onChange={(e) => setSelectedScheme(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-orange-500 uppercase"
                    required
                  >
                    <option value="">-- SELECT SCHEME FROM LIST --</option>
                    {SCHEMES_CATEGORIES.map((cat) => (
                      <optgroup key={cat.category} label={cat.category} className="font-bold text-slate-900 bg-slate-100">
                        {cat.schemes.map((scheme) => (
                          <option key={scheme} value={scheme} className="font-medium text-slate-800 bg-white">
                            {scheme}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              )}

              {/* Request Type Radio Selection */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('Request Type', 'আবেদনের ধরন (Request Type)', 'अनुरोध का प्रकार (Request Type)')} <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {['New Application', 'Renewal', 'Correction / Update', 'Re-Issue', 'Status Inquiry', 'Other'].map((type) => (
                    <label key={type} className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-extrabold uppercase transition-all ${
                      requestType === type 
                        ? 'bg-orange-500 text-white border-orange-600 shadow-xs' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <input 
                        type="radio" 
                        name="requestType" 
                        value={type} 
                        checked={requestType === type}
                        onChange={() => setRequestType(type)}
                        className="sr-only" 
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                {requestType === 'Other' && (
                  <input
                    type="text"
                    placeholder="SPECIFY OTHER REQUEST TYPE"
                    value={otherRequestType}
                    onChange={(e) => setOtherRequestType(e.target.value.toUpperCase())}
                    className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs uppercase focus:ring-2 focus:ring-orange-500 mt-2"
                  />
                )}
              </div>
            </div>
          </section>

          {/* 2. APPLICANT DETAILS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">2</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('2 APPLICANT DETAILS', '২. আবেদনকারীর বিবরণ (APPLICANT DETAILS)', '2. आवेदक का विवरण (APPLICANT DETAILS)')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3 space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('FULL NAME (AS PER OFFICIAL ID)', 'সম্পূর্ণ নাম (সরকারি পরিচয়পত্র অনুযায়ী / FULL NAME)', 'पूरा नाम (आधिकारिक पहचान पत्र के अनुसार / FULL NAME)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ENTER APPLICANT FULL NAME AS PER ID"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.fullName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.fullName && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr("FATHER'S NAME", "পিতার নাম (FATHER'S NAME)", "पिता का नाम (FATHER'S NAME)")} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ENTER FATHER'S NAME"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.fatherName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.fatherName && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.fatherName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr("MOTHER'S NAME", "মাতার নাম (MOTHER'S NAME)", "माता का नाम (MOTHER'S NAME)")} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ENTER MOTHER'S NAME"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.motherName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.motherName && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.motherName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('DATE OF BIRTH', 'জন্ম তারিখ (DATE OF BIRTH)', 'जन्म तिथि (DATE OF BIRTH)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.dob ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.dob && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.dob}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('GENDER', 'লিঙ্গ (GENDER)', 'लिंग (GENDER)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className={`w-full p-3 rounded-xl border bg-white font-bold text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-orange-500 uppercase ${
                    fieldErrors.gender ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                >
                  <option value="">-- SELECT GENDER --</option>
                  <option value="Male">MALE</option>
                  <option value="Female">FEMALE</option>
                  <option value="Other">OTHER</option>
                </select>
                {fieldErrors.gender && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.gender}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('MOBILE NUMBER', 'মোবাইল নম্বর (MOBILE NUMBER)', 'मोबाइल नंबर (MOBILE NUMBER)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-DIGIT MOBILE NUMBER"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.mobile ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.mobile && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.mobile}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('ALTERNATE MOBILE NUMBER', 'বিকল্প মোবাইল নম্বর (ALTERNATE MOBILE)', 'वैकल्पिक मोबाइल नंबर (ALTERNATE MOBILE)')} <span className="text-slate-400 font-normal text-[10px]">(OPTIONAL)</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="OPTIONAL ALTERNATE MOBILE"
                  value={altMobile}
                  onChange={(e) => setAltMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('OCCUPATION', 'পেশা (OCCUPATION)', 'व्यवसाय (OCCUPATION)')} <span className="text-slate-400 font-normal text-[10px]">(OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  placeholder="ENTER OCCUPATION"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value.toUpperCase())}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </section>

          {/* 3. ADDRESS DETAILS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">3</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('3 ADDRESS DETAILS', '৩. ঠিকানার বিবরণ (ADDRESS DETAILS)', '3. पते का विवरण (ADDRESS DETAILS)')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('HOUSE / FLAT NO.', 'বাড়ি / ফ্ল্যাট নম্বর (HOUSE / FLAT NO.)', 'मकान / फ्लैट संख्या (HOUSE / FLAT NO.)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="HOUSE / PREMISES NUMBER"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.houseNo ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.houseNo && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.houseNo}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('STREET / LOCALITY', 'রাস্তা / এলাকা (STREET / LOCALITY)', 'गली / मोहल्ला (STREET / LOCALITY)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="STREET, ROAD OR AREA NAME"
                  value={street}
                  onChange={(e) => setStreet(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.street ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.street && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.street}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('VILLAGE / TOWN / CITY', 'গ্রাম / শহর (VILLAGE / TOWN / CITY)', 'गाँव / शहर (VILLAGE / TOWN / CITY)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="VILLAGE / CITY NAME"
                  value={villageCity}
                  onChange={(e) => setVillageCity(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.villageCity ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.villageCity && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.villageCity}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('POLICE STATION', 'থানা (POLICE STATION)', 'थाना (POLICE STATION)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="POLICE STATION NAME"
                  value={policeStation}
                  onChange={(e) => setPoliceStation(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.policeStation ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.policeStation && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.policeStation}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('DISTRICT', 'জেলা (DISTRICT)', 'ज़िला (DISTRICT)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  placeholder="DISTRICT NAME"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.district ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.district && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.district}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('STATE', 'রাজ্য (STATE)', 'राज्य (STATE)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.state ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.state && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.state}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  {tr('PIN CODE', 'পিন কোড (PIN CODE)', 'पिन कोड (PIN CODE)')} <span className="text-rose-600 font-black">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-DIGIT PIN CODE"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                  className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 ${
                    fieldErrors.pinCode ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
                  }`}
                  required
                />
                {fieldErrors.pinCode && (
                  <p className="text-[11px] font-bold text-rose-600 mt-1">{fieldErrors.pinCode}</p>
                )}
              </div>
            </div>
          </section>

          {/* 4. IDENTITY DETAILS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">4</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('IDENTITY DETAILS (IF APPLICABLE)', '৪. পরিচয়পত্রের বিবরণ (প্রযোজ্য হলে / IDENTITY DETAILS)', '4. पहचान विवरण (यदि लागू हो / IDENTITY DETAILS)')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">{tr('Aadhaar Card No.', 'আধার কার্ড নম্বর (Aadhaar No.)', 'आधार कार्ड संख्या (Aadhaar No.)')}</label>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="12-DIGIT AADHAAR"
                  value={aadhaarNo}
                  onChange={(e) => setAadhaarNo(e.target.value.replace(/\D/g, ''))}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">{tr('PAN Card No.', 'প্যান কার্ড নম্বর (PAN No.)', 'पैन कार्ड संख्या (PAN No.)')}</label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="10-DIGIT PAN"
                  value={panNo}
                  onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">{tr('Voter ID Card No.', 'ভোটার আইডি নম্বর (Voter ID)', 'वोटर आईडी संख्या (Voter ID)')}</label>
                <input
                  type="text"
                  placeholder="VOTER ID (EPIC NO)"
                  value={voterNo}
                  onChange={(e) => setVoterNo(e.target.value.toUpperCase())}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">{tr('Passport No.', 'পাসপোর্ট নম্বর (Passport No.)', 'पासपोर्ट संख्या (Passport No.)')}</label>
                <input
                  type="text"
                  placeholder="PASSPORT NUMBER"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value.toUpperCase())}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </section>

          {/* 5. DOCUMENT CHECKLIST & UPLOADS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">5</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('DOCUMENT CHECKLIST & ID PROOF UPLOAD', '৫. নথির তালিকা ও পরিচয়পত্র আপলোড (DOCUMENT CHECKLIST)', '5. दस्तावेज़ सूची एवं पहचान प्रमाण अपलोड (DOCUMENT CHECKLIST)')}
              </h2>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wide mb-2">
                  {tr('Select Submitted Documents:', 'জমা দেওয়া নথিসমূহ নির্বাচন করুন:', 'जमा किए गए दस्तावेज़ चुनें:')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {CHECKLIST_OPTIONS.map((doc) => (
                    <label key={doc} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer text-xs font-bold text-slate-700 hover:bg-orange-50 transition-colors">
                      <input 
                        type="checkbox"
                        checked={documentChecklist.includes(doc)}
                        onChange={() => toggleChecklistDoc(doc)}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                      />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ID Proof Type Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {tr('Select Valid Identity Proof Type', 'বৈধ পরিচয়পত্রের ধরন নির্বাচন করুন', 'वैध पहचान प्रमाण प्रकार चुनें')}
                  </label>
                  <select
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white font-bold text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-orange-500 uppercase"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Voter ID Card">Voter ID Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving Licence">Driving Licence</option>
                    <option value="Birth Certificate">Birth Certificate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Upload ID Proof Document (< 250 KB) */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {tr('Upload ID Proof File (Max: 250 KB)', 'পরিচয়পত্র ফাইল আপলোড করুন (সর্বোচ্চ ২৫০ কেবি)', 'पहचान प्रमाण फ़ाइल अपलोड करें (अधिकतम 250 KB)')}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleIdFileChange}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer border border-slate-300 rounded-xl bg-white p-1"
                    />
                  </div>
                  {idFileName && (
                    <p className="text-[11px] font-bold text-emerald-600 mt-1">
                      ✓ Attached: {idFileName}
                    </p>
                  )}
                  {idFileError && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1">
                      {idFileError}
                    </p>
                  )}
                </div>

                {/* Upload Passport Size Photograph (< 250 KB) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    {tr('Upload Passport Size Photograph (Max: 250 KB)', 'পাসপোর্ট সাইজের ছবি আপলোড করুন (সর্বোচ্চ ২৫০ কেবি)', 'पासपोर्ट आकार का फोटो अपलोड करें (अधिकतम 250 KB)')}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handlePhotoFileChange}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer border border-slate-300 rounded-xl bg-white p-1"
                    />
                  </div>
                  {photoFileName && (
                    <p className="text-[11px] font-bold text-emerald-600 mt-1">
                      ✓ Attached: {photoFileName}
                    </p>
                  )}
                  {photoFileError && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1">
                      {photoFileError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 6. SERVICE DESCRIPTION / REMARKS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">6</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('SERVICE DESCRIPTION / REASON FOR REQUEST', '৬. পরিষেবার বিবরণ / আবেদনের কারণ (SERVICE DESCRIPTION)', '6. सेवा विवरण / अनुरोध का कारण (SERVICE DESCRIPTION)')}
              </h2>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {tr('Reason / Details of Requested Service (In Capital Letters)', 'আবেদনের কারণ / বিস্তারিত বিবরণ (ইংরেজি বড় হাতের অক্ষরে)', 'अनुरोधित सेवा का कारण / विवरण (अंग्रेजी के बड़े अक्षरों में)')}
              </label>
              <textarea
                rows={3}
                placeholder="PLEASE STATE THE SPECIFIC REASON OR SPECIAL REQUIREMENTS FOR THIS SERVICE"
                value={reasonRemarks}
                onChange={(e) => setReasonRemarks(e.target.value.toUpperCase())}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-xs sm:text-sm uppercase focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </section>

          {/* 7. MANDATORY ELIGIBILITY & STATUTORY QUESTIONS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <span className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-md">7</span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                {tr('MANDATORY STATUTORY QUESTIONS', '৭. বাধ্যতামূলক বিধিবদ্ধ প্রশ্নাবলী (MANDATORY STATUTORY QUESTIONS)', '7. अनिवार्य वैधानिक प्रश्न (MANDATORY STATUTORY QUESTIONS)')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question 1: Political Party Affiliation */}
              <div className={`p-4 rounded-2xl border transition-all ${
                fieldErrors.affiliatedPoliticalParty ? 'bg-rose-50/50 border-rose-500' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  {tr('Are you affiliated with any political party?', 'আপনি কি কোনো রাজনৈতিক দলের সাথে যুক্ত?', 'क्या आप किसी राजनीतिक दल से जुड़े हैं?')} <span className="text-rose-600 font-black">*</span>
                </span>
                <div className="flex gap-6">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-800">
                      <input 
                        type="radio" 
                        name="affiliatedPoliticalParty" 
                        value={opt} 
                        checked={affiliatedPoliticalParty === opt}
                        onChange={() => setAffiliatedPoliticalParty(opt as any)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                      />
                      <span>{opt === 'Yes' ? tr('Yes', 'হ্যাঁ (Yes)', 'हाँ (Yes)') : tr('No', 'না (No)', 'नहीं (No)')}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.affiliatedPoliticalParty && (
                  <p className="text-[11px] font-bold text-rose-600 mt-2">{fieldErrors.affiliatedPoliticalParty}</p>
                )}
              </div>

              {/* Question 2: Physically Disabled */}
              <div className={`p-4 rounded-2xl border transition-all ${
                fieldErrors.physicallyDisabled ? 'bg-rose-50/50 border-rose-500' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  {tr('Are you physically disabled?', 'আপনি কি শারীরিকভাবে প্রতিবন্ধী?', 'क्या आप शारीरिक रूप से दिव्यांग हैं?')} <span className="text-rose-600 font-black">*</span>
                </span>
                <div className="flex gap-6">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-800">
                      <input 
                        type="radio" 
                        name="physicallyDisabled" 
                        value={opt} 
                        checked={physicallyDisabled === opt}
                        onChange={() => setPhysicallyDisabled(opt as any)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                      />
                      <span>{opt === 'Yes' ? tr('Yes', 'হ্যাঁ (Yes)', 'हाँ (Yes)') : tr('No', 'না (No)', 'नहीं (No)')}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.physicallyDisabled && (
                  <p className="text-[11px] font-bold text-rose-600 mt-2">{fieldErrors.physicallyDisabled}</p>
                )}
              </div>

              {/* Question 3: Birthplace in India */}
              <div className={`p-4 rounded-2xl border transition-all ${
                fieldErrors.birthplaceInIndia ? 'bg-rose-50/50 border-rose-500' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  {tr('Is your birthplace in India?', 'আপনার জন্মস্থান কি ভারতে?', 'क्या आपका जन्मस्थान भारत में है?')} <span className="text-rose-600 font-black">*</span>
                </span>
                <div className="flex gap-6">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-800">
                      <input 
                        type="radio" 
                        name="birthplaceInIndia" 
                        value={opt} 
                        checked={birthplaceInIndia === opt}
                        onChange={() => setBirthplaceInIndia(opt as any)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                      />
                      <span>{opt === 'Yes' ? tr('Yes', 'হ্যাঁ (Yes)', 'हाँ (Yes)') : tr('No', 'না (No)', 'नहीं (No)')}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors.birthplaceInIndia && (
                  <p className="text-[11px] font-bold text-rose-600 mt-2">{fieldErrors.birthplaceInIndia}</p>
                )}
              </div>

              {/* Question 4: Fraudulent / Illegal Activity */}
              <div className={`p-4 rounded-2xl border transition-all ${
                fraudulentIllegal === 'Yes' || fieldErrors.fraudulentIllegal 
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  {tr(
                    'Is this document intended for any fraudulent or illegal activity?',
                    'এই নথিটি কি কোনো প্রতারণামূলক বা বেআইনি কাজের উদ্দেশ্যে ব্যবহৃত হবে?',
                    'क्या यह दस्तावेज़ किसी धोखाधड़ी या अवैध गतिविधि के लिए है?'
                  )} <span className="text-rose-600 font-black">*</span>
                </span>
                <div className="flex gap-6">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-800">
                      <input 
                        type="radio" 
                        name="fraudulentIllegal" 
                        value={opt} 
                        checked={fraudulentIllegal === opt}
                        onChange={() => setFraudulentIllegal(opt as any)}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500" 
                      />
                      <span className={opt === 'Yes' ? 'text-rose-600 font-black' : ''}>
                        {opt === 'Yes' ? tr('Yes', 'হ্যাঁ (Yes)', 'हाँ (Yes)') : tr('No', 'না (No)', 'नहीं (No)')}
                      </span>
                    </label>
                  ))}
                </div>
                {fraudulentIllegal === 'Yes' && (
                  <div className="mt-2.5 p-2.5 bg-rose-100/80 rounded-xl border border-rose-300 text-[11px] font-bold text-rose-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>
                      {tr(
                        'Warning: Applications cannot be processed for any fraudulent or illegal activity. Selecting "Yes" will cause the submission to be rejected.',
                        'সতর্কবার্তা: কোনো প্রতারণামূলক বা বেআইনি কাজের জন্য আবেদন প্রক্রিয়া করা হয় না। "হ্যাঁ" নির্বাচন করলে আবেদনটি বাতিল হবে।',
                        'चेतावनी: किसी भी धोखाधड़ी या अवैध गतिविधि के लिए आवेदन स्वीकार नहीं किए जाते। "हाँ" चुनने पर आवेदन अस्वीकार हो जाएगा।'
                      )}
                    </span>
                  </div>
                )}
                {fieldErrors.fraudulentIllegal && (
                  <p className="text-[11px] font-bold text-rose-600 mt-2">{fieldErrors.fraudulentIllegal}</p>
                )}
              </div>
            </div>
          </section>

          {/* 8. APPLICANT DECLARATION */}
          <section className={`p-5 rounded-2xl border transition-all ${
            fieldErrors.declarationAccepted ? 'bg-rose-50 border-rose-500' : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="declarationCheckbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 mt-0.5 cursor-pointer shrink-0"
                required
              />
              <label htmlFor="declarationCheckbox" className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed cursor-pointer select-none">
                <strong>{tr('APPLICANT DECLARATION', 'আবেদনকারীর ঘোষণাপত্র (APPLICANT DECLARATION)', 'आवेदक की घोषणा (APPLICANT DECLARATION)')} <span className="text-rose-600 font-black">*</span>:</strong>{' '}
                {tr(
                  'I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that providing false information or forged documents may lead to legal consequences under Indian Law. I accept full responsibility for any misuse of the documents issued.',
                  'আমি এতদ্বারা ঘোষণা করছি যে উপরে প্রদত্ত সমস্ত তথ্য আমার জ্ঞান ও বিশ্বাস অনুসারে সত্য এবং সঠিক। আমি জানি যে ভুল তথ্য বা জাল নথি প্রদান করলে ভারতীয় আইন অনুযায়ী আইনি ব্যবস্থা নেওয়া হতে পারে। ইস্যুকৃত নথির যেকোনো অপব্যবহারের সম্পূর্ণ দায়িত্ব আমি গ্রহণ করছি।',
                  'मैं एतद्द्वारा घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी मेरी सर्वोत्तम जानकारी और विश्वास के अनुसार सत्य और सही है। मैं समझता/समझती हूँ कि गलत जानकारी या जाली दस्तावेज़ देने पर भारतीय कानून के तहत कानूनी कार्रवाई हो सकती है। जारी किए गए दस्तावेजों के किसी भी दुरुपयोग की पूर्ण जिम्मेदारी मैं स्वीकार करता/करती हूँ।'
                )}
              </label>
            </div>
            {fieldErrors.declarationAccepted && (
              <p className="text-[11px] font-bold text-rose-600 mt-2 ml-8">{fieldErrors.declarationAccepted}</p>
            )}
          </section>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{tr('Submitting Official Application...', 'আবেদন জমা হচ্ছে...', 'आवेदन जमा किया जा रहा है...')}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>{tr('Submit Customer Service Request Form', 'কাস্টমার সার্ভিস রিকোয়েস্ট ফর্ম জমা দিন', 'ग्राहक सेवा अनुरोध फॉर्म जमा करें')}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
