import React, { useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { Shield, ArrowRight, CheckCircle, AlertTriangle, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const OnboardingPage: React.FC = () => {
  const { setUser } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    region: 'india',
    bankingHabits: [] as string[],
    riskLevel: 'medium' as 'low' | 'medium' | 'high'
  })

  const steps = [
    {
      title: "Welcome to FraudGuard",
      component: WelcomeStep
    },
    {
      title: "About You",
      component: UserInfoStep
    },
    {
      title: "Your Banking Habits",
      component: BankingHabitsStep
    },
    {
      title: "Risk Assessment",
      component: RiskAssessmentStep
    },
    {
      title: "Ready to Learn!",
      component: FinalStep
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name || 'Anonymous User',
      age: userData.age ? parseInt(userData.age) : undefined,
      riskProfile: {
        level: userData.riskLevel,
        vulnerabilities: [],
        lastAssessment: new Date()
      },
      preferences: {
        language: 'en',
        region: userData.region,
        bankingHabits: userData.bankingHabits,
        notificationSettings: {
          emailAlerts: true,
          smsAlerts: true,
          pushNotifications: true,
          dailyReminders: true
        },
        accessibilityOptions: {
          largeText: false,
          highContrast: false,
          voiceOver: false,
          simplifiedMode: false,
          audioOnly: false
        }
      },
      progress: {
        completedModules: [],
        fraudAwarenessScore: 0,
        achievements: [],
        streakDays: 0,
        totalTimeSpent: 0,
        lastActive: new Date()
      },
      createdAt: new Date()
    }
    
    setUser(newUser)
  }

  function WelcomeStep() {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Shield className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Welcome to FraudGuard</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal fraud awareness and prevention platform. Learn to identify and protect yourself 
          from the most common scams targeting Indians today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Real-world scenarios and decision-based learning</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Content tailored to your risk profile and habits</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your fraud awareness score and achievements</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  function UserInfoStep() {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
          <p className="text-gray-600">This helps us personalize your learning experience</p>
        </div>
        
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range (Optional)
            </label>
            <select
              value={userData.age}
              onChange={(e) => setUserData({...userData, age: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select age range</option>
              <option value="18-25">18-25 years</option>
              <option value="26-35">26-35 years</option>
              <option value="36-50">36-50 years</option>
              <option value="51-65">51-65 years</option>
              <option value="65+">65+ years</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  function BankingHabitsStep() {
    const bankingOptions = [
      { id: 'upi', label: 'UPI Payments (PhonePe, Google Pay, Paytm)', icon: '💳' },
      { id: 'mobile-banking', label: 'Mobile Banking Apps', icon: '📱' },
      { id: 'internet-banking', label: 'Internet Banking', icon: '💻' },
      { id: 'atm', label: 'ATM Transactions', icon: '🏧' },
      { id: 'branch-banking', label: 'Branch Banking', icon: '🏦' },
      { id: 'credit-cards', label: 'Credit Cards', icon: '💳' }
    ]

    const toggleBankingHabit = (habitId: string) => {
      const habits = userData.bankingHabits.includes(habitId)
        ? userData.bankingHabits.filter(h => h !== habitId)
        : [...userData.bankingHabits, habitId]
      setUserData({...userData, bankingHabits: habits})
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Banking Habits</h2>
          <p className="text-gray-600">Select the banking methods you commonly use</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {bankingOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all ${
                userData.bankingHabits.includes(option.id)
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:shadow-md'
              }`}
              onClick={() => toggleBankingHabit(option.id)}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
                {userData.bankingHabits.includes(option.id) && (
                  <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function RiskAssessmentStep() {
    const riskLevels = [
      {
        id: 'low',
        title: 'Low Risk',
        description: 'I rarely receive suspicious calls or messages',
        icon: CheckCircle,
        color: 'text-green-500'
      },
      {
        id: 'medium',
        title: 'Medium Risk',
        description: 'I sometimes get suspicious calls but usually ignore them',
        icon: AlertTriangle,
        color: 'text-yellow-500'
      },
      {
        id: 'high',
        title: 'High Risk',
        description: 'I frequently receive suspicious calls/messages or have been targeted before',
        icon: AlertTriangle,
        color: 'text-red-500'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk Assessment</h2>
          <p className="text-gray-600">Help us understand your current exposure to fraud attempts</p>
        </div>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          {riskLevels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all ${
                userData.riskLevel === level.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setUserData({...userData, riskLevel: level.id as any})}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <level.icon className={`h-6 w-6 ${level.color}`} />
                <div className="flex-1">
                  <h3 className="font-semibold">{level.title}</h3>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </div>
                {userData.riskLevel === level.id && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  function FinalStep() {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">You're All Set!</h2>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          Your personalized fraud awareness journey is ready. Start learning with interactive scenarios 
          tailored to your profile.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-blue-900 mb-2">Your Profile Summary</h3>
          <div className="text-left space-y-1 text-sm text-blue-800">
            <p><strong>Name:</strong> {userData.name || 'Anonymous User'}</p>
            <p><strong>Risk Level:</strong> {userData.riskLevel}</p>
            <p><strong>Banking Methods:</strong> {userData.bankingHabits.length} selected</p>
          </div>
        </div>
      </div>
    )
  }

  const StepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <StepComponent />
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <Button onClick={completeOnboarding} className="button-glow">
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage