import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  [SupportedLanguage.ENGLISH]: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.callHistory': 'Call History',
    'nav.spamReports': 'Spam Reports',
    'nav.blockedNumbers': 'Blocked Numbers',
    'nav.whitelistedNumbers': 'Whitelist',
    'nav.analytics': 'Analytics',
    'nav.liveAlerts': 'Live Alerts',
    'nav.fraudEducation': 'Fraud Education',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Fraud Call Protection Dashboard',
    'dashboard.callsBlocked': 'Calls Blocked Today',
    'dashboard.spamDetected': 'Spam Detected',
    'dashboard.reportsSubmitted': 'Reports Submitted',
    'dashboard.protectionActive': 'Protection Active',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.threatAlerts': 'Active Threat Alerts',
    
    // Call Protection
    'protection.enabled': 'Call Protection Enabled',
    'protection.disabled': 'Call Protection Disabled',
    'protection.realTime': 'Real-time Protection',
    'protection.autoBlock': 'Auto Block Spam',
    'protection.whitelist': 'Whitelist Protection',
    
    // Fraud Types
    'fraud.upi': 'UPI Fraud',
    'fraud.bank': 'Bank Impersonation',
    'fraud.kyc': 'KYC Scam',
    'fraud.aadhaar': 'Aadhaar Fraud',
    'fraud.pan': 'PAN Fraud',
    'fraud.loan': 'Loan Scam',
    'fraud.creditCard': 'Credit Card Scam',
    'fraud.digitalArrest': 'Digital Arrest',
    'fraud.fakePolice': 'Fake Police',
    'fraud.investment': 'Investment Scam',
    'fraud.lottery': 'Lottery Scam',
    'fraud.job': 'Job Scam',
    'fraud.otp': 'OTP Scam',
    
    // Risk Levels
    'risk.veryLow': 'Very Low',
    'risk.low': 'Low',
    'risk.medium': 'Medium',
    'risk.high': 'High',
    'risk.veryHigh': 'Very High',
    'risk.critical': 'Critical',
    
    // Common Actions
    'action.block': 'Block',
    'action.whitelist': 'Add to Whitelist',
    'action.report': 'Report Spam',
    'action.call': 'Call',
    'action.details': 'View Details',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    
    // Messages
    'message.noSpamToday': 'No spam calls detected today!',
    'message.protectionActive': 'Your phone is protected from fraud calls',
    'message.reportSubmitted': 'Spam report submitted successfully',
    'message.numberBlocked': 'Number added to block list',
    'message.numberWhitelisted': 'Number added to whitelist',
  },
  
  [SupportedLanguage.HINDI]: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.callHistory': 'कॉल हिस्ट्री',
    'nav.spamReports': 'स्पैम रिपोर्ट',
    'nav.blockedNumbers': 'ब्लॉक किए गए नंबर',
    'nav.whitelistedNumbers': 'व्हाइटलिस्ट',
    'nav.analytics': 'एनालिटिक्स',
    'nav.liveAlerts': 'लाइव अलर्ट',
    'nav.fraudEducation': 'धोखाधड़ी शिक्षा',
    'nav.settings': 'सेटिंग्स',
    
    // Dashboard
    'dashboard.title': 'धोखाधड़ी कॉल सुरक्षा डैशबोर्ड',
    'dashboard.callsBlocked': 'आज ब्लॉक किए गए कॉल',
    'dashboard.spamDetected': 'स्पैम का पता लगाया गया',
    'dashboard.reportsSubmitted': 'रिपोर्ट जमा की गई',
    'dashboard.protectionActive': 'सुरक्षा सक्रिय',
    'dashboard.recentActivity': 'हाल की गतिविधि',
    'dashboard.threatAlerts': 'सक्रिय खतरे की चेतावनी',
    
    // Call Protection
    'protection.enabled': 'कॉल सुरक्षा सक्षम',
    'protection.disabled': 'कॉल सुरक्षा अक्षम',
    'protection.realTime': 'रियल-टाइम सुरक्षा',
    'protection.autoBlock': 'ऑटो ब्लॉक स्पैम',
    'protection.whitelist': 'व्हाइटलिस्ट सुरक्षा',
    
    // Fraud Types
    'fraud.upi': 'UPI धोखाधड़ी',
    'fraud.bank': 'बैंक का रूप धारण',
    'fraud.kyc': 'KYC घोटाला',
    'fraud.aadhaar': 'आधार धोखाधड़ी',
    'fraud.pan': 'PAN धोखाधड़ी',
    'fraud.loan': 'लोन घोटाला',
    'fraud.creditCard': 'क्रेडिट कार्ड घोटाला',
    'fraud.digitalArrest': 'डिजिटल गिरफ्तारी',
    'fraud.fakePolice': 'नकली पुलिस',
    'fraud.investment': 'निवेश घोटाला',
    'fraud.lottery': 'लॉटरी घोटाला',
    'fraud.job': 'नौकरी घोटाला',
    'fraud.otp': 'OTP घोटाला',
    
    // Risk Levels
    'risk.veryLow': 'बहुत कम',
    'risk.low': 'कम',
    'risk.medium': 'मध्यम',
    'risk.high': 'उच्च',
    'risk.veryHigh': 'बहुत उच्च',
    'risk.critical': 'गंभीर',
    
    // Common Actions
    'action.block': 'ब्लॉक करें',
    'action.whitelist': 'व्हाइटलिस्ट में जोड़ें',
    'action.report': 'स्पैम रिपोर्ट करें',
    'action.call': 'कॉल करें',
    'action.details': 'विवरण देखें',
    'action.save': 'सेव करें',
    'action.cancel': 'रद्द करें',
    'action.delete': 'डिलीट करें',
    'action.edit': 'संपादित करें',
    
    // Messages
    'message.noSpamToday': 'आज कोई स्पैम कॉल नहीं मिली!',
    'message.protectionActive': 'आपका फोन धोखाधड़ी कॉल से सुरक्षित है',
    'message.reportSubmitted': 'स्पैम रिपोर्ट सफलतापूर्वक जमा की गई',
    'message.numberBlocked': 'नंबर ब्लॉक लिस्ट में जोड़ा गया',
    'message.numberWhitelisted': 'नंबर व्हाइटलिस्ट में जोड़ा गया',
  },
  
  [SupportedLanguage.TAMIL]: {
    // Navigation
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.callHistory': 'அழைப்பு வரலாறு',
    'nav.spamReports': 'ஸ்பாம் அறிக்கைகள்',
    'nav.blockedNumbers': 'தடுக்கப்பட்ட எண்கள்',
    'nav.whitelistedNumbers': 'வெள்ளை பட்டியல்',
    'nav.analytics': 'பகுப்பாய்வு',
    'nav.liveAlerts': 'நேரடி எச்சரிக்கைகள்',
    'nav.fraudEducation': 'மோசடி கல்வி',
    'nav.settings': 'அமைப்புகள்',
    
    // Dashboard
    'dashboard.title': 'மோசடி அழைப்பு பாதுகாப்பு டாஷ்போர்டு',
    'dashboard.callsBlocked': 'இன்று தடுக்கப்பட்ட அழைப்புகள்',
    'dashboard.spamDetected': 'ஸ்பாம் கண்டறியப்பட்டது',
    'dashboard.reportsSubmitted': 'அறிக்கைகள் சமர்பிக்கப்பட்டன',
    'dashboard.protectionActive': 'பாதுகாப்பு செயலில்',
    'dashboard.recentActivity': 'சமீபத்திய நடவடிக்கை',
    'dashboard.threatAlerts': 'செயலில் உள்ள அச்சுறுத்தல் எச்சரிக்கைகள்',
    
    // Fraud Types
    'fraud.upi': 'UPI மோசடி',
    'fraud.bank': 'வங்கி ஆள்மாறாட்டம்',
    'fraud.kyc': 'KYC மோசடி',
    'fraud.aadhaar': 'ஆதார் மோசடி',
    'fraud.pan': 'PAN மோசடி',
    'fraud.loan': 'கடன் மோசடி',
    'fraud.creditCard': 'கிரெடிட் கார்ட் மோசடி',
    'fraud.digitalArrest': 'டிஜிட்டல் கைது',
    'fraud.fakePolice': 'போலி காவல்துறை',
    'fraud.investment': 'முதலீட்டு மோசடி',
    'fraud.lottery': 'லாட்டரி மோசடி',
    'fraud.job': 'வேலை மோசடி',
    'fraud.otp': 'OTP மோசடி',
  },
  
  [SupportedLanguage.TELUGU]: {
    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.callHistory': 'కాల్ చరిత్ర',
    'nav.spamReports': 'స్పామ్ నివేదికలు',
    'nav.blockedNumbers': 'బ్లాక్ చేయబడిన నంబర్లు',
    'nav.whitelistedNumbers': 'వైట్‌లిస్ట్',
    'nav.analytics': 'విశ్లేషణలు',
    'nav.liveAlerts': 'లైవ్ అలర్ట్‌లు',
    'nav.fraudEducation': 'మోసం విద్య',
    'nav.settings': 'సెట్టింగ్‌లు',
    
    // Dashboard
    'dashboard.title': 'మోసం కాల్ రక్షణ డాష్‌బోర్డ్',
    'dashboard.callsBlocked': 'ఈరోజు బ్లాక్ చేయబడిన కాల్‌లు',
    'dashboard.spamDetected': 'స్పామ్ గుర్తించబడింది',
    'dashboard.reportsSubmitted': 'నివేదికలు సమర్పించబడ్డాయి',
    'dashboard.protectionActive': 'రక్షణ సక్రియం',
    'dashboard.recentActivity': 'ఇటీవలి కార్యకలాపాలు',
    'dashboard.threatAlerts': 'చురుకైన ముప్పు హెచ్చరికలు',
    
    // Fraud Types
    'fraud.upi': 'UPI మోసం',
    'fraud.bank': 'బ్యాంక్ వేషధారణ',
    'fraud.kyc': 'KYC మోసం',
    'fraud.aadhaar': 'ఆధార్ మోసం',
    'fraud.pan': 'PAN మోసం',
    'fraud.loan': 'రుణ మోసం',
    'fraud.creditCard': 'క్రెడిట్ కార్డ్ మోసం',
    'fraud.digitalArrest': 'డిజిటల్ అరెస్ట్',
    'fraud.fakePolice': 'నకిలీ పోలీసు',
    'fraud.investment': 'పెట్టుబడి మోసం',
    'fraud.lottery': 'లాటరీ మోసం',
    'fraud.job': 'ఉద్యోగ మోసం',
    'fraud.otp': 'OTP మోసం',
  },
  
  [SupportedLanguage.BENGALI]: {
    // Navigation
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.callHistory': 'কল ইতিহাস',
    'nav.spamReports': 'স্প্যাম রিপোর্ট',
    'nav.blockedNumbers': 'ব্লক করা নম্বর',
    'nav.whitelistedNumbers': 'হোয়াইটলিস্ট',
    'nav.analytics': 'বিশ্লেষণ',
    'nav.liveAlerts': 'লাইভ সতর্কতা',
    'nav.fraudEducation': 'প্রতারণা শিক্ষা',
    'nav.settings': 'সেটিংস',
    
    // Dashboard
    'dashboard.title': 'প্রতারণা কল সুরক্ষা ড্যাশবোর্ড',
    'dashboard.callsBlocked': 'আজ ব্লক করা কল',
    'dashboard.spamDetected': 'স্প্যাম সনাক্ত',
    'dashboard.reportsSubmitted': 'রিপোর্ট জমা দেওয়া হয়েছে',
    'dashboard.protectionActive': 'সুরক্ষা সক్রিয়',
    'dashboard.recentActivity': 'সাম্প্রতিক কার্যকলাপ',
    'dashboard.threatAlerts': 'সক్রিয় হুমকি সতর্কতা',
    
    // Fraud Types
    'fraud.upi': 'UPI প্রতারণা',
    'fraud.bank': 'ব্যাংকের ছদ্মবেশ',
    'fraud.kyc': 'KYC কেলেঙ্কারি',
    'fraud.aadhaar': 'আধার প্রতারণা',
    'fraud.pan': 'PAN প্রতারণা',
    'fraud.loan': 'ঋণ কেলেঙ্কারি',
    'fraud.creditCard': 'ক্রেডিট কার্ড কেলেঙ্কারি',
    'fraud.digitalArrest': 'ডিজিটাল গ্রেফতার',
    'fraud.fakePolice': 'নকল পুলিশ',
    'fraud.investment': 'বিনিয়োগ কেলেঙ্কারি',
    'fraud.lottery': 'লটারি কেলেঙ্কারি',
    'fraud.job': 'চাকরি কেলেঙ্কারি',
    'fraud.otp': 'OTP কেলেঙ্কারি',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(SupportedLanguage.ENGLISH);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('app_language');
    if (savedLanguage && Object.values(SupportedLanguage).includes(savedLanguage as SupportedLanguage)) {
      setCurrentLanguage(savedLanguage as SupportedLanguage);
    }
  }, []);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('app_language', language);
    
    // Update document direction for RTL languages
    if (language === SupportedLanguage.URDU) {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }
  };

  const t = (key: string): string => {
    const languageTranslations = translations[currentLanguage];
    return languageTranslations?.[key] || translations[SupportedLanguage.ENGLISH]?.[key] || key;
  };

  const isRTL = currentLanguage === SupportedLanguage.URDU;

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};