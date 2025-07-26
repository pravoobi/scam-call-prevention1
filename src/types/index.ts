// Core Types
export interface User {
  id: string;
  name: string;
  email?: string;
  age?: number;
  riskProfile: RiskProfile;
  preferences: UserPreferences;
  progress: UserProgress;
  createdAt: Date;
}

export interface UserPreferences {
  language: string;
  region: string;
  bankingHabits: string[];
  notificationSettings: NotificationSettings;
  accessibilityOptions: AccessibilityOptions;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  dailyReminders: boolean;
}

export interface AccessibilityOptions {
  largeText: boolean;
  highContrast: boolean;
  voiceOver: boolean;
  simplifiedMode: boolean;
  audioOnly: boolean;
}

export interface RiskProfile {
  level: 'low' | 'medium' | 'high';
  vulnerabilities: string[];
  lastAssessment: Date;
}

export interface UserProgress {
  completedModules: string[];
  currentModule?: string;
  fraudAwarenessScore: number;
  achievements: Achievement[];
  streakDays: number;
  totalTimeSpent: number;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'completion' | 'score' | 'streak' | 'special';
}

// Module and Scenario Types
export interface FraudModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: FraudType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  scenarios: Scenario[];
  isUnlocked: boolean;
  prerequisites?: string[];
}

export enum FraudType {
  UPI_FRAUD = 'upi_fraud',
  BANK_IMPERSONATION = 'bank_impersonation',
  KYC_SCAM = 'kyc_scam',
  AADHAAR_PAN_FRAUD = 'aadhaar_pan_fraud',
  LOAN_CREDIT_SCAM = 'loan_credit_scam',
  DIGITAL_ARREST = 'digital_arrest'
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  type: ScenarioType;
  context: ScenarioContext;
  story: StoryStep[];
  choices: Choice[];
  hints: Hint[];
  timeLimit?: number;
  difficulty: number;
  tags: string[];
}

export enum ScenarioType {
  PHONE_CALL = 'phone_call',
  SMS_MESSAGE = 'sms_message',
  UPI_INTERFACE = 'upi_interface',
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
  BANKING_APP = 'banking_app',
  SOCIAL_MEDIA = 'social_media'
}

export interface ScenarioContext {
  setting: string;
  timeOfDay: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  emotionalTrigger: string[];
  backgroundInfo: string;
}

export interface StoryStep {
  id: string;
  type: 'dialogue' | 'action' | 'system' | 'thought';
  speaker?: string;
  content: string;
  media?: MediaContent;
  duration?: number;
  effects?: VisualEffect[];
}

export interface MediaContent {
  type: 'image' | 'audio' | 'video' | 'animation';
  url: string;
  alt?: string;
  duration?: number;
}

export interface VisualEffect {
  type: 'typing' | 'fade' | 'highlight' | 'shake' | 'glow';
  duration: number;
  target: string;
}

export interface Choice {
  id: string;
  text: string;
  consequence: Consequence;
  isCorrect: boolean;
  explanation: string;
  points: number;
  nextStepId?: string;
  riskLevel: 'safe' | 'risky' | 'dangerous';
}

export interface Consequence {
  immediate: string;
  longTerm: string;
  scoreImpact: number;
  outcome: 'success' | 'warning' | 'failure';
  nextScenarioId?: string;
}

export interface Hint {
  id: string;
  level: 'subtle' | 'moderate' | 'obvious';
  content: string;
  triggerCondition: string;
  pointsPenalty: number;
}

// Assessment and Scoring
export interface AssessmentResult {
  moduleId: string;
  score: number;
  correctChoices: number;
  totalChoices: number;
  timeSpent: number;
  hintsUsed: number;
  riskLevelImprovement: number;
  achievements: Achievement[];
  feedback: Feedback;
  completedAt: Date;
}

export interface Feedback {
  overall: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
}

// UI Interface Types
export interface InterfaceMockup {
  type: ScenarioType;
  components: UIComponent[];
  interactions: Interaction[];
  animations: Animation[];
}

export interface UIComponent {
  id: string;
  type: 'button' | 'input' | 'text' | 'image' | 'notification' | 'popup';
  position: Position;
  properties: ComponentProperties;
  isInteractive: boolean;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComponentProperties {
  text?: string;
  placeholder?: string;
  color?: string;
  backgroundColor?: string;
  image?: string;
  value?: string;
  disabled?: boolean;
}

export interface Interaction {
  id: string;
  trigger: 'click' | 'input' | 'hover' | 'timer';
  target: string;
  action: InteractionAction;
  conditions?: string[];
}

export interface InteractionAction {
  type: 'navigate' | 'show' | 'hide' | 'animate' | 'validate' | 'score';
  target?: string;
  parameters?: Record<string, any>;
}

export interface Animation {
  id: string;
  type: 'appear' | 'disappear' | 'move' | 'resize' | 'color' | 'shake';
  target: string;
  duration: number;
  easing: string;
  delay?: number;
}

// Emergency and Safety
export interface EmergencyContact {
  id: string;
  name: string;
  type: 'bank' | 'police' | 'cybercrime' | 'helpline';
  phone: string;
  description: string;
  region?: string;
  isVerified: boolean;
}

export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  applicableScenarios: string[];
  lastUpdated: Date;
}

export interface IncidentReport {
  id: string;
  userId: string;
  fraudType: FraudType;
  description: string;
  amountInvolved?: number;
  dateOccurred: Date;
  status: 'reported' | 'investigating' | 'resolved';
  evidence: Evidence[];
  officialComplaint?: boolean;
}

export interface Evidence {
  id: string;
  type: 'screenshot' | 'audio' | 'text' | 'document';
  content: string;
  description: string;
  timestamp: Date;
}

// Analytics and Insights
export interface LearningAnalytics {
  userId: string;
  modulePerformance: ModulePerformance[];
  commonMistakes: string[];
  improvementAreas: string[];
  timeSpentByCategory: Record<string, number>;
  engagementScore: number;
  retentionRate: number;
}

export interface ModulePerformance {
  moduleId: string;
  attempts: number;
  bestScore: number;
  averageScore: number;
  timeSpent: number;
  completionRate: number;
  difficultyRating: number;
}

// Community and Social Features
export interface CommunityPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: 'experience' | 'warning' | 'success' | 'question';
  isAnonymous: boolean;
  likes: number;
  replies: Reply[];
  tags: string[];
  createdAt: Date;
  isVerified: boolean;
}

export interface Reply {
  id: string;
  authorId: string;
  content: string;
  isAnonymous: boolean;
  likes: number;
  createdAt: Date;
}

// App State and Navigation
export interface AppState {
  user: User | null;
  currentModule: FraudModule | null;
  currentScenario: Scenario | null;
  isLoading: boolean;
  error: string | null;
  settings: AppSettings;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoSave: boolean;
  offlineMode: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Event Types for Analytics
export interface UserEvent {
  type: 'module_start' | 'scenario_complete' | 'choice_made' | 'hint_used' | 'time_spent';
  data: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}