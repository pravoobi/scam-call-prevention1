import { FraudModule, FraudType, ScenarioType } from '@/types';

export const fraudModules: FraudModule[] = [
  {
    id: 'upi-fraud',
    title: 'UPI Fraud Protection',
    description: 'Learn to identify and prevent UPI-related frauds including fake cashback calls and payment manipulation.',
    icon: '💳',
    category: FraudType.UPI_FRAUD,
    difficulty: 'beginner',
    estimatedTime: 15,
    isUnlocked: true,
    scenarios: [
      {
        id: 'fake-cashback-call',
        title: 'Fake Cashback Call Scenario',
        description: 'You receive a call claiming you can get ₹500 cashback. Learn to identify the red flags.',
        type: ScenarioType.PHONE_CALL,
        context: {
          setting: 'At home after work',
          timeOfDay: 'evening',
          urgencyLevel: 'medium',
          emotionalTrigger: ['excitement', 'financial benefit'],
          backgroundInfo: 'You recently made several UPI payments and might be expecting cashback offers.'
        },
        story: [
          {
            id: 'step1',
            type: 'system',
            content: 'Your phone rings. The caller ID shows a number you don\'t recognize.',
          },
          {
            id: 'step2',
            type: 'dialogue',
            speaker: 'Caller',
            content: 'Hello sir/madam! Congratulations! You have won ₹500 cashback on your recent UPI transactions. To claim it, I need you to open your UPI app.',
          },
          {
            id: 'step3',
            type: 'thought',
            content: 'This sounds exciting, but something feels off about this call...',
          }
        ],
        choices: [
          {
            id: 'choice1',
            text: 'Ask for the caller\'s credentials and company details',
            isCorrect: true,
            explanation: 'Great! Always verify the caller\'s identity before proceeding with any financial transaction.',
            points: 10,
            riskLevel: 'safe',
            consequence: {
              immediate: 'The caller becomes evasive and eventually hangs up.',
              longTerm: 'You avoided a potential UPI fraud attempt.',
              scoreImpact: 10,
              outcome: 'success'
            }
          },
          {
            id: 'choice2',
            text: 'Immediately open your UPI app as instructed',
            isCorrect: false,
            explanation: 'This is risky! Never follow instructions from unknown callers regarding financial apps.',
            points: -5,
            riskLevel: 'dangerous',
            consequence: {
              immediate: 'The caller asks you to share your UPI PIN for "verification".',
              longTerm: 'This could lead to unauthorized transactions from your account.',
              scoreImpact: -5,
              outcome: 'failure'
            }
          },
          {
            id: 'choice3',
            text: 'Ask which transactions they\'re referring to',
            isCorrect: true,
            explanation: 'Good approach! Legitimate companies will have specific transaction details.',
            points: 8,
            riskLevel: 'safe',
            consequence: {
              immediate: 'The caller gives vague answers and can\'t provide specific transaction IDs.',
              longTerm: 'You identified a red flag indicating this is likely a fraud attempt.',
              scoreImpact: 8,
              outcome: 'success'
            }
          },
          {
            id: 'choice4',
            text: 'Hang up and call the official customer service',
            isCorrect: true,
            explanation: 'Excellent! This is the safest approach when receiving suspicious calls.',
            points: 15,
            riskLevel: 'safe',
            consequence: {
              immediate: 'You end the suspicious call immediately.',
              longTerm: 'You can verify if there are any genuine offers through official channels.',
              scoreImpact: 15,
              outcome: 'success'
            }
          }
        ],
        hints: [
          {
            id: 'hint1',
            level: 'subtle',
            content: 'Think about how legitimate companies usually contact customers about offers.',
            triggerCondition: 'after_10_seconds',
            pointsPenalty: 2
          },
          {
            id: 'hint2',
            level: 'moderate',
            content: 'Real cashback offers usually come through the app or official SMS, not cold calls.',
            triggerCondition: 'after_wrong_choice',
            pointsPenalty: 3
          },
          {
            id: 'hint3',
            level: 'obvious',
            content: 'Never share your UPI PIN with anyone, especially over phone calls.',
            triggerCondition: 'multiple_wrong_choices',
            pointsPenalty: 5
          }
        ],
        timeLimit: 60,
        difficulty: 2,
        tags: ['upi', 'phone-call', 'cashback', 'impersonation']
      }
    ]
  },
  {
    id: 'bank-impersonation',
    title: 'Bank Impersonation Detection',
    description: 'Recognize fake bank representatives and protect your banking credentials from fraudsters.',
    icon: '🏦',
    category: FraudType.BANK_IMPERSONATION,
    difficulty: 'beginner',
    estimatedTime: 20,
    isUnlocked: true,
    scenarios: [
      {
        id: 'fake-bank-call',
        title: 'Suspicious Bank Security Call',
        description: 'Someone claiming to be from your bank calls about suspicious activity on your account.',
        type: ScenarioType.PHONE_CALL,
        context: {
          setting: 'At work during lunch break',
          timeOfDay: 'afternoon',
          urgencyLevel: 'high',
          emotionalTrigger: ['fear', 'urgency', 'security concern'],
          backgroundInfo: 'You\'ve been hearing about bank frauds in the news lately.'
        },
        story: [
          {
            id: 'step1',
            type: 'system',
            content: 'Your phone rings during your lunch break. The display shows "SBI Bank".',
          },
          {
            id: 'step2',
            type: 'dialogue',
            speaker: 'Caller',
            content: 'Sir, this is urgent! I\'m calling from State Bank of India security department. We\'ve detected suspicious activity on your account. Someone tried to withdraw ₹50,000 from your account just now!',
          },
          {
            id: 'step3',
            type: 'dialogue',
            speaker: 'Caller',
            content: 'To secure your account immediately, I need you to verify your debit card details and provide the CVV number.',
          }
        ],
        choices: [
          {
            id: 'choice1',
            text: 'Provide the requested card details to "secure" the account',
            isCorrect: false,
            explanation: 'Never share card details over phone! Banks never ask for CVV or PIN over calls.',
            points: -10,
            riskLevel: 'dangerous',
            consequence: {
              immediate: 'The fraudster now has your card details.',
              longTerm: 'Your account could be compromised and money stolen.',
              scoreImpact: -10,
              outcome: 'failure'
            }
          },
          {
            id: 'choice2',
            text: 'Ask for the caller\'s employee ID and call back on official bank number',
            isCorrect: true,
            explanation: 'Perfect! Always verify by calling the bank directly using official numbers.',
            points: 15,
            riskLevel: 'safe',
            consequence: {
              immediate: 'The caller hesitates and then hangs up.',
              longTerm: 'You avoided sharing sensitive information with a fraudster.',
              scoreImpact: 15,
              outcome: 'success'
            }
          },
          {
            id: 'choice3',
            text: 'Panic and rush to the nearest ATM to check balance',
            isCorrect: false,
            explanation: 'Panicking leads to poor decisions. Stay calm and verify through proper channels.',
            points: -3,
            riskLevel: 'risky',
            consequence: {
              immediate: 'In your panic, you might make more mistakes.',
              longTerm: 'You miss the opportunity to properly verify the call.',
              scoreImpact: -3,
              outcome: 'warning'
            }
          },
          {
            id: 'choice4',
            text: 'Check your account balance through mobile banking app',
            isCorrect: true,
            explanation: 'Smart move! Always verify claims through official banking channels.',
            points: 12,
            riskLevel: 'safe',
            consequence: {
              immediate: 'You see no suspicious transactions in your account.',
              longTerm: 'You confirmed this was a fraud attempt without compromising security.',
              scoreImpact: 12,
              outcome: 'success'
            }
          }
        ],
        hints: [
          {
            id: 'hint1',
            level: 'subtle',
            content: 'Remember how your bank usually contacts you about security issues.',
            triggerCondition: 'after_15_seconds',
            pointsPenalty: 2
          },
          {
            id: 'hint2',
            level: 'moderate',
            content: 'Banks never ask for CVV, PIN, or OTP over phone calls.',
            triggerCondition: 'after_wrong_choice',
            pointsPenalty: 3
          }
        ],
        timeLimit: 90,
        difficulty: 3,
        tags: ['bank', 'impersonation', 'urgency', 'card-details']
      }
    ]
  },
  {
    id: 'kyc-scam',
    title: 'KYC Scam Prevention',
    description: 'Learn to distinguish between legitimate KYC requests and fraudulent attempts to steal your information.',
    icon: '📋',
    category: FraudType.KYC_SCAM,
    difficulty: 'intermediate',
    estimatedTime: 18,
    isUnlocked: false,
    prerequisites: ['upi-fraud'],
    scenarios: [
      {
        id: 'fake-kyc-sms',
        title: 'Urgent KYC Update SMS',
        description: 'You receive an SMS claiming your KYC will expire and asking you to update it immediately.',
        type: ScenarioType.SMS_MESSAGE,
        context: {
          setting: 'Evening at home',
          timeOfDay: 'evening',
          urgencyLevel: 'high',
          emotionalTrigger: ['urgency', 'fear of account closure'],
          backgroundInfo: 'You know KYC is important for banking and have updated it before.'
        },
        story: [
          {
            id: 'step1',
            type: 'system',
            content: 'You receive an SMS on your phone from "SBI-ALERT".',
          },
          {
            id: 'step2',
            type: 'system',
            content: 'SMS: "URGENT: Your KYC will expire in 24 hours. Click http://sbi-kyc-update.com to update immediately or your account will be blocked. -State Bank of India"',
          }
        ],
        choices: [
          {
            id: 'choice1',
            text: 'Click the link immediately to update KYC',
            isCorrect: false,
            explanation: 'Dangerous! This is a phishing link. Banks don\'t send KYC links via SMS.',
            points: -8,
            riskLevel: 'dangerous',
            consequence: {
              immediate: 'You\'re taken to a fake banking website.',
              longTerm: 'Your banking credentials could be stolen.',
              scoreImpact: -8,
              outcome: 'failure'
            }
          },
          {
            id: 'choice2',
            text: 'Visit the official bank website or branch to verify',
            isCorrect: true,
            explanation: 'Excellent! Always use official channels for KYC updates.',
            points: 15,
            riskLevel: 'safe',
            consequence: {
              immediate: 'You avoid the phishing attempt.',
              longTerm: 'You can verify your actual KYC status through secure methods.',
              scoreImpact: 15,
              outcome: 'success'
            }
          },
          {
            id: 'choice3',
            text: 'Check the sender and URL carefully for authenticity',
            isCorrect: true,
            explanation: 'Good thinking! The URL "sbi-kyc-update.com" is not the official bank domain.',
            points: 12,
            riskLevel: 'safe',
            consequence: {
              immediate: 'You notice the suspicious domain name.',
              longTerm: 'You avoid falling for the phishing scam.',
              scoreImpact: 12,
              outcome: 'success'
            }
          }
        ],
        hints: [
          {
            id: 'hint1',
            level: 'subtle',
            content: 'Look carefully at the website URL in the message.',
            triggerCondition: 'after_10_seconds',
            pointsPenalty: 2
          },
          {
            id: 'hint2',
            level: 'moderate',
            content: 'Banks usually don\'t send KYC update links via SMS.',
            triggerCondition: 'after_wrong_choice',
            pointsPenalty: 3
          }
        ],
        timeLimit: 45,
        difficulty: 2,
        tags: ['kyc', 'sms', 'phishing', 'fake-links']
      }
    ]
  },
  {
    id: 'aadhaar-pan-fraud',
    title: 'Aadhaar/PAN Fraud Alerts',
    description: 'Protect your Aadhaar and PAN information from fraudulent requests and identity theft.',
    icon: '🆔',
    category: FraudType.AADHAAR_PAN_FRAUD,
    difficulty: 'intermediate',
    estimatedTime: 25,
    isUnlocked: false,
    prerequisites: ['kyc-scam'],
    scenarios: []
  },
  {
    id: 'loan-credit-scam',
    title: 'Loan/Credit Card Scam Detection',
    description: 'Identify fake loan offers and credit card scams on social media and messaging platforms.',
    icon: '💰',
    category: FraudType.LOAN_CREDIT_SCAM,
    difficulty: 'intermediate',
    estimatedTime: 22,
    isUnlocked: false,
    prerequisites: ['bank-impersonation'],
    scenarios: []
  },
  {
    id: 'digital-arrest',
    title: 'Digital Arrest Scam Protection',
    description: 'Learn to recognize and respond to digital arrest scams and authority impersonation.',
    icon: '👮',
    category: FraudType.DIGITAL_ARREST,
    difficulty: 'advanced',
    estimatedTime: 30,
    isUnlocked: false,
    prerequisites: ['aadhaar-pan-fraud', 'loan-credit-scam'],
    scenarios: []
  }
];