import React, { useState } from 'react';
import {
  AcademicCapIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  BookOpenIcon,
  PlayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  CreditCardIcon,
  BanknotesIcon,
  IdentificationIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { FraudType, RiskLevel } from '../types';

interface FraudInfo {
  type: FraudType;
  title: string;
  description: string;
  commonTactics: string[];
  preventionTips: string[];
  warningSignsCall: string[];
  warningSignsSMS: string[];
  realExamples: string[];
  icon: any;
  color: string;
}

const FraudEducation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFraud, setSelectedFraud] = useState<FraudInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'prevention' | 'examples' | 'quiz'>('overview');

  const fraudTypes: FraudInfo[] = [
    {
      type: FraudType.UPI_FRAUD,
      title: 'UPI & Payment Fraud',
      description: 'Scammers pretend there\'s an issue with your UPI transaction and ask for OTP or bank details to "reverse" or "help" with payments.',
      commonTactics: [
        'Fake UPI transaction reversal calls',
        'Requesting OTP to "cancel" transactions',
        'Claiming money was sent by mistake',
        'Posing as payment app customer care'
      ],
      preventionTips: [
        'Never share OTP with anyone over phone',
        'UPI transactions cannot be reversed by calling',
        'Contact your bank directly through official numbers',
        'Don\'t click links sent via SMS for UPI issues'
      ],
      warningSignsCall: [
        'Caller claims urgent UPI transaction issue',
        'Asks for OTP, PIN, or passwords',
        'Creates panic about money being debited',
        'Requests remote access to phone'
      ],
      warningSignsSMS: [
        'Messages about failed UPI transactions',
        'Links to "reverse" payments',
        'Fake transaction alerts',
        'Requests to verify account details'
      ],
      realExamples: [
        '"Sir, ₹50,000 has been debited from your account by mistake. To reverse, please share the OTP we are sending."',
        '"Madam, your UPI payment of ₹25,000 failed. Click this link to get refund."',
        '"Your account will be blocked. Share OTP to prevent blocking."'
      ],
      icon: CreditCardIcon,
      color: 'bg-red-500'
    },
    {
      type: FraudType.BANK_IMPERSONATION,
      title: 'Bank Impersonation',
      description: 'Fraudsters pose as bank officials and create urgency about account issues to steal banking credentials.',
      commonTactics: [
        'Claiming account will be blocked',
        'Fake security breach alerts',
        'KYC update requirements',
        'Suspicious transaction notifications'
      ],
      preventionTips: [
        'Banks never ask for passwords over phone',
        'Verify by calling bank\'s official number',
        'Don\'t share card details or OTP',
        'Banks send official notices by mail'
      ],
      warningSignsCall: [
        'Urgent account blocking threats',
        'Requests for internet banking passwords',
        'Asks for card CVV numbers',
        'Claims of suspicious transactions'
      ],
      warningSignsSMS: [
        'Account blocking notifications',
        'Fake security alerts',
        'Links to update KYC',
        'Suspicious transaction messages'
      ],
      realExamples: [
        '"Your account shows suspicious activity. Provide your internet banking password to secure it."',
        '"KYC will expire today. Share Aadhaar and PAN details to update."',
        '"Your debit card is compromised. Share CVV to block it."'
      ],
      icon: BanknotesIcon,
      color: 'bg-orange-500'
    },
    {
      type: FraudType.DIGITAL_ARREST,
      title: 'Digital Arrest Scam',
      description: 'Scammers pose as police, CBI, or court officials claiming you\'re under "digital arrest" and demand money to avoid legal action.',
      commonTactics: [
        'Fake police/CBI officer calls',
        'Claims of pending arrest warrant',
        'Demands immediate payment',
        'Video calls to intimidate'
      ],
      preventionTips: [
        'No "digital arrest" process exists in India',
        'Police never demand money over phone',
        'Real arrests require physical presence',
        'Report to local police immediately'
      ],
      warningSignsCall: [
        'Claims you\'re under arrest',
        'Demands immediate money transfer',
        'Threatens legal consequences',
        'Asks to stay on video call'
      ],
      warningSignsSMS: [
        'Arrest warrant notifications',
        'Court summons via SMS',
        'Legal action threats',
        'Immediate payment demands'
      ],
      realExamples: [
        '"You are under digital arrest for money laundering. Transfer ₹2 lakh to avoid jail."',
        '"CBI has issued warrant against you. Pay fine to close case."',
        '"Stay on video call. You cannot leave until case is resolved."'
      ],
      icon: ShieldExclamationIcon,
      color: 'bg-purple-500'
    },
    {
      type: FraudType.KYC_SCAM,
      title: 'KYC Update Scam',
      description: 'Fraudsters claim your KYC is expiring and ask for personal documents and banking details for "updating".',
      commonTactics: [
        'Fake KYC expiry notifications',
        'Urgent update requirements',
        'Document collection calls',
        'Account freezing threats'
      ],
      preventionTips: [
        'Banks send KYC notices by mail',
        'Never share documents over phone',
        'Visit bank branch for KYC updates',
        'Verify through official bank channels'
      ],
      warningSignsCall: [
        'Urgent KYC update requirements',
        'Requests for Aadhaar/PAN photos',
        'Account blocking threats',
        'Asks for document verification'
      ],
      warningSignsSMS: [
        'KYC expiry notifications',
        'Links to update documents',
        'Account deactivation warnings',
        'Immediate action required messages'
      ],
      realExamples: [
        '"Your KYC expires today. Send Aadhaar and PAN photos to avoid account closure."',
        '"Bank requires immediate KYC update. Share OTP to verify documents."',
        '"Account will be frozen. Complete KYC update via this link."'
      ],
      icon: IdentificationIcon,
      color: 'bg-blue-500'
    },
    {
      type: FraudType.LOAN_SCAM,
      title: 'Loan & Credit Scam',
      description: 'Fake loan offers with attractive terms that require upfront fees or personal information.',
      commonTactics: [
        'Pre-approved loan offers',
        'No documentation required',
        'Advance fee demands',
        'Instant approval claims'
      ],
      preventionTips: [
        'Legitimate loans require proper documentation',
        'Never pay processing fees upfront',
        'Verify lender credentials',
        'Read terms and conditions carefully'
      ],
      warningSignsCall: [
        'Guaranteed loan approval',
        'No credit check required',
        'Upfront fee demands',
        'Pressure to decide immediately'
      ],
      warningSignsSMS: [
        'Pre-approved loan messages',
        'Instant money offers',
        'No documentation needed',
        'Limited time offers'
      ],
      realExamples: [
        '"Congratulations! You\'re pre-approved for ₹5 lakh loan. Pay ₹10,000 processing fee."',
        '"Get instant loan without documents. Just share Aadhaar and bank details."',
        '"Limited offer: ₹2 lakh loan at 2% interest. Apply now with processing fee."'
      ],
      icon: DocumentTextIcon,
      color: 'bg-green-500'
    },
    {
      type: FraudType.OTP_SCAM,
      title: 'OTP & Password Scam',
      description: 'Scammers trick people into sharing OTPs, passwords, and PINs through various fake scenarios.',
      commonTactics: [
        'Fake verification calls',
        'Prize/lottery winning claims',
        'Technical support scams',
        'Account security threats'
      ],
      preventionTips: [
        'Never share OTP with anyone',
        'OTP is only for your own use',
        'Banks/companies never ask for OTP',
        'Beware of fake tech support calls'
      ],
      warningSignsCall: [
        'Requests for OTP sharing',
        'Claims of winning prizes',
        'Fake technical support',
        'Account verification calls'
      ],
      warningSignsSMS: [
        'Prize winning notifications',
        'Fake OTP verification requests',
        'Technical support messages',
        'Account confirmation texts'
      ],
      realExamples: [
        '"Congratulations! You won ₹25,000. Share the OTP we are sending to claim prize."',
        '"Your phone has virus. Share OTP to clean it."',
        '"For account security, please confirm the OTP we are sending."'
      ],
      icon: PhoneIcon,
      color: 'bg-yellow-500'
    }
  ];

  const QuizQuestion = ({ question, options, correct, explanation }: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (index: number) => {
      setSelectedAnswer(index);
      setShowResult(true);
    };

    return (
      <div className="card">
        <h4 className="font-medium text-gray-900 mb-4">{question}</h4>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                showResult
                  ? index === correct
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                {showResult && (
                  <div className="mr-3">
                    {index === correct ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : index === selectedAnswer ? (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    ) : null}
                  </div>
                )}
                {option}
              </div>
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">{explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const quizQuestions = [
    {
      question: "A caller says there's an issue with your UPI payment and asks for OTP. What should you do?",
      options: [
        "Share the OTP to resolve the issue",
        "Ask for their employee ID first",
        "Never share OTP and hang up",
        "Call them back to verify"
      ],
      correct: 2,
      explanation: "Never share OTP with anyone over phone. UPI transactions cannot be reversed by calling, and legitimate companies never ask for OTP."
    },
    {
      question: "You receive a call claiming you're under 'digital arrest'. What is the truth?",
      options: [
        "It's a real legal process in India",
        "Only CBI can do digital arrest",
        "No such process exists - it's a scam",
        "It's valid if they show ID"
      ],
      correct: 2,
      explanation: "Digital arrest is completely fake. No such legal process exists in India. Police never arrest people over phone or demand money."
    },
    {
      question: "Your bank calls saying your KYC expired and asks for Aadhaar details. What's suspicious?",
      options: [
        "Banks always call for KYC updates",
        "They should send official mail notice",
        "KYC never expires",
        "Nothing suspicious about this"
      ],
      correct: 1,
      explanation: "Banks send KYC update notices through official mail, not phone calls. Never share documents over phone - visit the branch instead."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('nav.fraudEducation')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Learn about common fraud patterns in India and protect yourself from scammers. 
          Knowledge is your best defense against fraud calls and digital scams.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-danger-600">₹1,200+ Cr</div>
          <div className="text-sm text-gray-600">Lost to cyber fraud in 2023</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">95%</div>
          <div className="text-sm text-gray-600">Cases involve phone calls</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">76%</div>
          <div className="text-sm text-gray-600">Victims share OTP/passwords</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">90%</div>
          <div className="text-sm text-gray-600">Prevention rate with awareness</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Fraud Types', icon: ExclamationTriangleIcon },
            { id: 'prevention', name: 'Prevention Guide', icon: ShieldExclamationIcon },
            { id: 'examples', name: 'Real Examples', icon: BookOpenIcon },
            { id: 'quiz', name: 'Test Knowledge', icon: AcademicCapIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fraudTypes.map((fraud) => (
              <motion.div
                key={fraud.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedFraud(fraud)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${fraud.color}`}>
                    <fraud.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{fraud.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{fraud.description}</p>
                <div className="flex items-center text-primary-600 text-sm font-medium">
                  <span>Learn more</span>
                  <PlayIcon className="h-4 w-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="space-y-6">
            <div className="card border-l-4 border-green-500">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <LightBulbIcon className="h-5 w-5 text-green-600 mr-2" />
                Golden Rules to Stay Safe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Never Share:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• OTP with anyone over phone</li>
                    <li>• Internet banking passwords</li>
                    <li>• Debit/Credit card PIN or CVV</li>
                    <li>• Aadhaar or PAN details over phone</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Always Verify:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Call official bank numbers directly</li>
                    <li>• Visit bank branch for important updates</li>
                    <li>• Check company websites independently</li>
                    <li>• Confirm with family before big decisions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Red Flags in Calls</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    Creates urgent panic situations
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    Asks for sensitive information
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    Demands immediate action
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    Threatens consequences
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    Offers deals too good to be true
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">What to Do if Targeted</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Hang up immediately
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Block the number
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Report to cybercrime portal
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Warn family and friends
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Monitor bank accounts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-6">
            {fraudTypes.map((fraud) => (
              <div key={fraud.type} className="card">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${fraud.color}`}>
                    <fraud.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{fraud.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Real Examples:</h4>
                    <div className="space-y-2">
                      {fraud.realExamples.map((example, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-800 italic">"{example}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">How to Respond:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Prevention Tips:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {fraud.preventionTips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Warning Signs:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {fraud.warningSignsCall.slice(0, 4).map((sign, index) => (
                            <li key={index} className="flex items-start">
                              <ExclamationTriangleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                              {sign}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Test Your Knowledge</h3>
              <p className="text-gray-600">See how well you can identify and handle fraud attempts</p>
            </div>
            
            <div className="space-y-6">
              {quizQuestions.map((question, index) => (
                <QuizQuestion
                  key={index}
                  question={`${index + 1}. ${question.question}`}
                  options={question.options}
                  correct={question.correct}
                  explanation={question.explanation}
                />
              ))}
            </div>

            <div className="card border-l-4 border-blue-500">
              <h4 className="font-medium text-gray-900 mb-2">Remember:</h4>
              <p className="text-sm text-gray-600">
                The best defense against fraud is awareness and skepticism. When in doubt, 
                always verify independently and never share sensitive information over phone calls.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fraud Detail Modal */}
      {selectedFraud && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${selectedFraud.color}`}>
                  <selectedFraud.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-medium text-gray-900">{selectedFraud.title}</h3>
              </div>
              <button
                onClick={() => setSelectedFraud(null)}
                className="text-gray-400 hover:text-gray-600"
                             >
                 <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedFraud.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Common Tactics</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {selectedFraud.commonTactics.map((tactic, index) => (
                      <li key={index} className="flex items-start">
                        <ExclamationTriangleIcon className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tactic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prevention Tips</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {selectedFraud.preventionTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Warning Signs (Calls)</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {selectedFraud.warningSignsCall.map((sign, index) => (
                      <li key={index} className="flex items-start">
                        <XCircleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Real Examples</h4>
                  <div className="space-y-2">
                    {selectedFraud.realExamples.map((example, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-800 italic">"{example}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudEducation;