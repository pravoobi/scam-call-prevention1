// Core Types
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  language: SupportedLanguage;
  state: IndianState;
  preferences: UserPreferences;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  autoBlock: boolean;
  blockUnknownNumbers: boolean;
  enableWhitelist: boolean;
  blockDuringHours: TimeRange | null;
  priorityMode: boolean;
  language: SupportedLanguage;
  notifications: NotificationSettings;
  spamThreshold: SpamLevel;
}

export interface NotificationSettings {
  pushNotifications: boolean;
  smsAlerts: boolean;
  emailAlerts: boolean;
  communityAlerts: boolean;
  governmentAdvisories: boolean;
}

// Call & Spam Detection Types
export interface CallInfo {
  id: string;
  phoneNumber: string;
  callerName?: string;
  location?: string;
  timestamp: Date;
  duration?: number;
  isSpam: boolean;
  spamProbability: number;
  spamCategory?: SpamCategory;
  isBlocked: boolean;
  source: CallSource;
  riskLevel: RiskLevel;
  fraudPatterns: FraudPattern[];
  reportCount: number;
  telecomOperator?: TelecomOperator;
}

export interface SpamReport {
  id: string;
  phoneNumber: string;
  reportedBy: string;
  spamCategory: SpamCategory;
  description: string;
  timestamp: Date;
  verified: boolean;
  location?: string;
  fraudType?: FraudType;
}

export interface FraudPattern {
  type: FraudType;
  confidence: number;
  description: string;
  preventionTips: string[];
}

// Enums
export enum SupportedLanguage {
  ENGLISH = 'en',
  HINDI = 'hi',
  TAMIL = 'ta',
  TELUGU = 'te',
  BENGALI = 'bn',
  MARATHI = 'mr',
  GUJARATI = 'gu',
  KANNADA = 'kn',
  MALAYALAM = 'ml',
  PUNJABI = 'pa',
  URDU = 'ur'
}

export enum IndianState {
  ANDHRA_PRADESH = 'AP',
  ARUNACHAL_PRADESH = 'AR',
  ASSAM = 'AS',
  BIHAR = 'BR',
  CHHATTISGARH = 'CG',
  GOA = 'GA',
  GUJARAT = 'GJ',
  HARYANA = 'HR',
  HIMACHAL_PRADESH = 'HP',
  JHARKHAND = 'JH',
  KARNATAKA = 'KA',
  KERALA = 'KL',
  MADHYA_PRADESH = 'MP',
  MAHARASHTRA = 'MH',
  MANIPUR = 'MN',
  MEGHALAYA = 'ML',
  MIZORAM = 'MZ',
  NAGALAND = 'NL',
  ODISHA = 'OR',
  PUNJAB = 'PB',
  RAJASTHAN = 'RJ',
  SIKKIM = 'SK',
  TAMIL_NADU = 'TN',
  TELANGANA = 'TS',
  TRIPURA = 'TR',
  UTTAR_PRADESH = 'UP',
  UTTARAKHAND = 'UK',
  WEST_BENGAL = 'WB',
  DELHI = 'DL',
  JAMMU_KASHMIR = 'JK',
  LADAKH = 'LA',
  PUDUCHERRY = 'PY'
}

export enum SpamCategory {
  TELEMARKETING = 'telemarketing',
  FRAUD = 'fraud',
  ROBOCALL = 'robocall',
  POLITICAL = 'political',
  SURVEY = 'survey',
  DEBT_COLLECTION = 'debt_collection',
  FINANCIAL_SCAM = 'financial_scam',
  TECH_SUPPORT_SCAM = 'tech_support_scam',
  UNKNOWN = 'unknown'
}

export enum FraudType {
  UPI_FRAUD = 'upi_fraud',
  BANK_IMPERSONATION = 'bank_impersonation',
  KYC_SCAM = 'kyc_scam',
  AADHAAR_FRAUD = 'aadhaar_fraud',
  PAN_FRAUD = 'pan_fraud',
  LOAN_SCAM = 'loan_scam',
  CREDIT_CARD_SCAM = 'credit_card_scam',
  DIGITAL_ARREST = 'digital_arrest',
  FAKE_POLICE = 'fake_police',
  FAKE_CBI = 'fake_cbi',
  INVESTMENT_SCAM = 'investment_scam',
  LOTTERY_SCAM = 'lottery_scam',
  JOB_SCAM = 'job_scam',
  INSURANCE_SCAM = 'insurance_scam',
  COURIER_SCAM = 'courier_scam',
  OTP_SCAM = 'otp_scam'
}

export enum TelecomOperator {
  JIO = 'jio',
  AIRTEL = 'airtel',
  VI = 'vi',
  BSNL = 'bsnl',
  MTNL = 'mtnl',
  UNKNOWN = 'unknown'
}

export enum CallSource {
  TELECOM_DATABASE = 'telecom_db',
  COMMUNITY_REPORTS = 'community',
  GOVERNMENT_DATABASE = 'government',
  BUSINESS_DIRECTORY = 'business',
  AI_DETECTION = 'ai_detection',
  TRAI_DND = 'trai_dnd'
}

export enum RiskLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  CRITICAL = 'critical'
}

export enum SpamLevel {
  STRICT = 'strict',
  MODERATE = 'moderate',
  LENIENT = 'lenient'
}

// Utility Types
export interface TimeRange {
  start: string; // HH:MM format
  end: string;   // HH:MM format
}

export interface LocationInfo {
  state: IndianState;
  city?: string;
  circle?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Statistics and Analytics
export interface CallStatistics {
  totalCalls: number;
  spamCalls: number;
  blockedCalls: number;
  reportedNumbers: number;
  topSpamCategories: { category: SpamCategory; count: number }[];
  recentTrends: { date: string; spamCount: number; normalCount: number }[];
}

export interface ThreatIntelligence {
  id: string;
  title: string;
  description: string;
  fraudType: FraudType;
  severity: RiskLevel;
  affectedStates: IndianState[];
  isActive: boolean;
  createdAt: Date;
  source: string;
  preventionTips: string[];
}

// Real-time Features
export interface LiveAlert {
  id: string;
  type: 'scam_alert' | 'government_advisory' | 'community_warning';
  title: string;
  message: string;
  severity: RiskLevel;
  timestamp: Date;
  relatedNumbers?: string[];
  actionRequired?: boolean;
}

export interface CallBlockEvent {
  phoneNumber: string;
  reason: string;
  timestamp: Date;
  spamCategory: SpamCategory;
  riskLevel: RiskLevel;
}

// Database Models
export interface BlockedNumber {
  id: string;
  phoneNumber: string;
  reason: string;
  addedBy: string;
  isAutoBlocked: boolean;
  spamCategory: SpamCategory;
  createdAt: Date;
}

export interface WhitelistedNumber {
  id: string;
  phoneNumber: string;
  name: string;
  addedBy: string;
  createdAt: Date;
}

export interface BusinessListing {
  id: string;
  phoneNumber: string;
  businessName: string;
  category: string;
  isVerified: boolean;
  location: LocationInfo;
  website?: string;
  description?: string;
}

// Settings and Configuration
export interface AppSettings {
  language: SupportedLanguage;
  theme: 'light' | 'dark' | 'auto';
  autoUpdate: boolean;
  dataUsage: 'minimal' | 'standard' | 'full';
  emergencyContacts: string[];
}

export interface DatabaseConfig {
  spamThreshold: number;
  autoBlockEnabled: boolean;
  communityReportsWeight: number;
  aiDetectionWeight: number;
  telecomDataWeight: number;
  updateFrequency: number; // in hours
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// WebSocket Events
export interface SocketEvent {
  type: 'call_received' | 'spam_detected' | 'block_event' | 'live_alert';
  data: any;
  timestamp: Date;
}