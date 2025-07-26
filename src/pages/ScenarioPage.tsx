import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateScore, formatTime } from '@/lib/utils'

const ScenarioPage: React.FC = () => {
  const { moduleId, scenarioId } = useParams()
  const navigate = useNavigate()
  const { 
    modules, 
    currentScenario, 
    setCurrentScenario, 
    currentStepIndex, 
    nextStep,
    previousStep,
    sessionScore,
    sessionChoices,
    hintsUsed,
    timeSpent,
    makeChoice,
    useHint,
    addTimeSpent,
    resetSession,
    showHints,
    completeModule,
    user
  } = useAppStore()

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentChoice, setCurrentChoice] = useState<any>(null)
  const [timer, setTimer] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Find and set the current scenario
    const module = modules.find(m => m.id === moduleId)
    const scenario = module?.scenarios.find(s => s.id === scenarioId)
    
    if (scenario) {
      setCurrentScenario(scenario)
      resetSession()
    } else {
      navigate('/modules')
    }
  }, [moduleId, scenarioId, modules, setCurrentScenario, resetSession, navigate])

  useEffect(() => {
    // Timer for tracking time spent
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
      addTimeSpent(1)
    }, 1000)

    return () => clearInterval(interval)
  }, [addTimeSpent])

  useEffect(() => {
    // Typing animation for dialogue
    if (currentScenario && currentStepIndex < currentScenario.story.length) {
      const currentStep = currentScenario.story[currentStepIndex]
      if (currentStep.type === 'dialogue' || currentStep.type === 'system') {
        setIsTyping(true)
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, Math.min(currentStep.content.length * 30, 2000)) // Max 2 seconds

        return () => clearTimeout(timeout)
      }
    }
  }, [currentStepIndex, currentScenario])

  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scenario...</p>
        </div>
      </div>
    )
  }

  const currentStep = currentScenario.story[currentStepIndex]
  const isLastStep = currentStepIndex >= currentScenario.story.length - 1
  const hasChoices = currentScenario.choices.length > 0

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId)
    const choice = currentScenario.choices.find(c => c.id === choiceId)
    setCurrentChoice(choice)
  }

  const handleChoiceSubmit = () => {
    if (!selectedChoice || !currentChoice) return

    makeChoice(selectedChoice, currentChoice.isCorrect, currentChoice.points)
    setShowFeedback(true)
  }

  const handleContinue = () => {
    setShowFeedback(false)
    setSelectedChoice(null)
    setCurrentChoice(null)
    
    if (isLastStep && hasChoices) {
      // Scenario completed
      completeScenario()
    } else {
      nextStep()
    }
  }

  const completeScenario = () => {
    const module = modules.find(m => m.id === moduleId)
    if (!module) return

    const totalChoices = sessionChoices.length
    const correctChoices = sessionChoices.filter(c => c.isCorrect).length
    const finalScore = calculateScore(correctChoices, totalChoices, hintsUsed)

    const result = {
      moduleId: module.id,
      score: finalScore,
      correctChoices,
      totalChoices,
      timeSpent: timer,
      hintsUsed,
      riskLevelImprovement: finalScore >= 75 ? 1 : 0,
      achievements: [],
      feedback: {
        overall: finalScore >= 75 ? 'Excellent work!' : 'Good effort, but there\'s room for improvement.',
        strengths: correctChoices > 0 ? ['Good decision making in critical situations'] : [],
        improvements: hintsUsed > 2 ? ['Try to rely less on hints'] : [],
        recommendations: ['Continue practicing with more scenarios'],
        nextSteps: ['Explore the next module']
      },
      completedAt: new Date()
    }

    // Complete the module if all scenarios are done
    completeModule(module.id, result)
    navigate('/modules')
  }

  const handleUseHint = () => {
    useHint()
  }

  const getScenarioIcon = () => {
    switch (currentScenario.type) {
      case 'phone_call': return <Phone className="h-6 w-6" />
      case 'sms_message': return <MessageSquare className="h-6 w-6" />
      case 'email': return <Mail className="h-6 w-6" />
      default: return <AlertTriangle className="h-6 w-6" />
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'safe': return 'border-green-500 bg-green-50'
      case 'risky': return 'border-yellow-500 bg-yellow-50'
      case 'dangerous': return 'border-red-500 bg-red-50'
      default: return 'border-gray-300 bg-white'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/modules')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Modules</span>
        </Button>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timer)}</span>
          </div>
          <div>Score: {sessionScore}</div>
          <div>Hints: {hintsUsed}</div>
        </div>
      </div>

      {/* Scenario Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="text-blue-600">
              {getScenarioIcon()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {currentScenario.title}
              </h1>
              <p className="text-gray-600 mb-3">
                {currentScenario.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {currentScenario.context.timeOfDay}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {currentScenario.context.urgencyLevel} urgency
                </span>
                <span className="text-gray-500">
                  Step {currentStepIndex + 1} of {currentScenario.story.length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context Information */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Scenario Context</h3>
              <p className="text-sm text-yellow-800">
                {currentScenario.context.backgroundInfo}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Step */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {currentStep.type === 'dialogue' && (
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {currentStep.speaker?.[0] || 'S'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {currentStep.speaker}
                    </div>
                    <div className={`text-gray-800 ${isTyping ? 'animate-pulse' : ''}`}>
                      {isTyping ? 'Typing...' : currentStep.content}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep.type === 'system' && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-blue-800">
                    {currentStep.content}
                  </div>
                </div>
              </div>
            )}

            {currentStep.type === 'thought' && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <div className="text-purple-600">💭</div>
                  <div className="text-purple-800 italic">
                    {currentStep.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Choices */}
      {isLastStep && hasChoices && !showFeedback && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What would you do?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentScenario.choices.map((choice) => (
              <div
                key={choice.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedChoice === choice.id 
                    ? getRiskLevelColor(choice.riskLevel) 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleChoiceSelect(choice.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedChoice === choice.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedChoice === choice.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{choice.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-4">
                {showHints && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUseHint}
                    className="flex items-center space-x-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Get Hint ({hintsUsed})</span>
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={handleChoiceSubmit}
                disabled={!selectedChoice}
                className="flex items-center space-x-2"
              >
                <span>Submit Choice</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback */}
      {showFeedback && currentChoice && (
        <Card className={`border-2 ${
          currentChoice.isCorrect 
            ? 'border-green-500 bg-green-50' 
            : 'border-red-500 bg-red-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                currentChoice.isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {currentChoice.isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <XCircle className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${
                  currentChoice.isCorrect ? 'text-green-900' : 'text-red-900'
                }`}>
                  {currentChoice.isCorrect ? 'Correct Choice!' : 'Not the best choice'}
                </h3>
                <p className={`mb-4 ${
                  currentChoice.isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {currentChoice.explanation}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Immediate consequence:</span>
                    <p className="text-gray-700">{currentChoice.consequence.immediate}</p>
                  </div>
                  <div>
                    <span className="font-medium">Long-term impact:</span>
                    <p className="text-gray-700">{currentChoice.consequence.longTerm}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">Points earned:</span>
                    <span className={`font-bold ${
                      currentChoice.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentChoice.points > 0 ? '+' : ''}{currentChoice.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={handleContinue}>
                {isLastStep ? 'Complete Scenario' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {!isLastStep && !showFeedback && !hasChoices && (
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={previousStep}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${((currentStepIndex + (showFeedback ? 1 : 0)) / currentScenario.story.length) * 100}%` 
          }}
        />
      </div>
    </div>
  )
}

export default ScenarioPage