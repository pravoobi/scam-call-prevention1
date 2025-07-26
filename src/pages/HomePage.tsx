import React from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { 
  Shield, 
  TrendingUp, 
  Clock, 
  Award, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Phone,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatTime, getScoreLevel } from '@/lib/utils'

const HomePage: React.FC = () => {
  const { user, modules } = useAppStore()

  if (!user) return null

  const completedModules = modules.filter(m => 
    user.progress.completedModules.includes(m.id)
  )
  
  const availableModules = modules.filter(m => m.isUnlocked)
  const nextModule = modules.find(m => 
    m.isUnlocked && !user.progress.completedModules.includes(m.id)
  )

  const scoreInfo = getScoreLevel(user.progress.fraudAwarenessScore)

  const recentThreats = [
    {
      title: "Fake UPI Cashback Calls",
      risk: "High",
      description: "Scammers offering instant cashback for UPI transactions",
      color: "text-red-600"
    },
    {
      title: "KYC Update SMS Scams",
      risk: "Medium",
      description: "Fraudulent messages claiming KYC expiry",
      color: "text-yellow-600"
    },
    {
      title: "Digital Arrest Calls",
      risk: "High", 
      description: "Impersonating police for digital arrest scams",
      color: "text-red-600"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user.name}! 
            </h1>
            <p className="text-blue-100 mb-4">
              Continue your fraud awareness journey and stay protected online.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Awareness Score: {user.progress.fraudAwarenessScore}/100</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>{completedModules.length} modules completed</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Shield className="h-24 w-24 text-white/20" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Awareness Score</p>
                <div className={`text-2xl font-bold ${scoreInfo.color}`}>
                  {user.progress.fraudAwarenessScore}/100
                </div>
                <p className="text-xs text-gray-500">{scoreInfo.level}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Time</p>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(user.progress.totalTimeSpent)}
                </div>
                <p className="text-xs text-gray-500">Total time</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <div className="text-2xl font-bold text-purple-600">
                  {user.progress.achievements.length}
                </div>
                <p className="text-xs text-gray-500">Earned badges</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                <div className="text-2xl font-bold text-orange-600">
                  {user.progress.streakDays}
                </div>
                <p className="text-xs text-gray-500">Days in a row</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            
            {nextModule ? (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{nextModule.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {nextModule.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {nextModule.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>⏱️ {nextModule.estimatedTime} mins</span>
                          <span>📚 {nextModule.difficulty}</span>
                          <span>🎯 {nextModule.scenarios.length} scenarios</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/modules`}>
                      <Button className="whitespace-nowrap">
                        Start Module
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    All modules completed!
                  </h3>
                  <p className="text-gray-600">
                    Congratulations! You've completed all available fraud awareness modules.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Threats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Threat Alerts</h2>
            <div className="space-y-4">
              {recentThreats.map((threat, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{threat.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            threat.risk === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {threat.risk} Risk
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{threat.description}</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/modules">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Modules
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Emergency Contacts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Fraud
              </Button>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{Math.round((completedModules.length / modules.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {modules.slice(0, 3).map((module) => (
                    <div key={module.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{module.icon}</span>
                        <span className="text-sm font-medium">{module.title}</span>
                      </div>
                      {user.progress.completedModules.includes(module.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : module.isUnlocked ? (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-200 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tip */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">💡 Daily Safety Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800">
                Never share your UPI PIN, bank password, or OTP with anyone over phone calls or messages. 
                Banks never ask for this information through calls.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage