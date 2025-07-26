import React from 'react'
import { useAppStore } from '@/store/appStore'
import { 
  User, 
  Award, 
  TrendingUp, 
  Clock, 
  Shield, 
  Settings,
  Calendar,
  Target,
  BookOpen,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatTime, getScoreLevel, getRelativeTime } from '@/lib/utils'

const ProfilePage: React.FC = () => {
  const { user, modules } = useAppStore()

  if (!user) return null

  const completedModules = modules.filter(m => 
    user.progress.completedModules.includes(m.id)
  )
  
  const scoreInfo = getScoreLevel(user.progress.fraudAwarenessScore)

  const mockAchievements = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first fraud awareness module',
      icon: '🎯',
      earnedAt: new Date(Date.now() - 86400000), // 1 day ago
      category: 'completion' as const
    },
    {
      id: '2', 
      name: 'UPI Master',
      description: 'Mastered UPI fraud prevention',
      icon: '💳',
      earnedAt: new Date(Date.now() - 3600000), // 1 hour ago
      category: 'completion' as const
    }
  ]

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white p-6 md:p-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-purple-100 mb-3">
              Fraud Awareness Learner • Joined {getRelativeTime(user.createdAt)}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Risk Level: {user.riskProfile.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Last Active: {getRelativeTime(user.progress.lastActive)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Fraud Awareness Score</p>
                      <div className={`text-3xl font-bold ${scoreInfo.color}`}>
                        {user.progress.fraudAwarenessScore}/100
                      </div>
                      <p className="text-sm text-gray-500">{scoreInfo.level}</p>
                    </div>
                    <div className="text-right">
                      <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-xs text-gray-500">
                        {scoreInfo.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Learning Time</p>
                      <div className="text-3xl font-bold text-blue-600">
                        {formatTime(user.progress.totalTimeSpent)}
                      </div>
                      <p className="text-sm text-gray-500">Total invested</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module Completion</h3>
                  <span className="text-sm text-gray-500">
                    {completedModules.length} of {modules.length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((module) => {
                    const isCompleted = user.progress.completedModules.includes(module.id)
                    return (
                      <div key={module.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{module.icon}</span>
                            <span className={`text-sm font-medium ${
                              isCompleted ? 'text-green-700' : 'text-gray-700'
                            }`}>
                              {module.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            
            {mockAchievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAchievements.map((achievement) => (
                  <Card key={achievement.id} className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            Earned {getRelativeTime(achievement.earnedAt)}
                          </div>
                        </div>
                        <Award className="h-5 w-5 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No achievements yet
                  </h3>
                  <p className="text-gray-600">
                    Complete modules and scenarios to earn your first achievement!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Modules Completed</span>
                </div>
                <span className="font-semibold">{completedModules.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Achievements</span>
                </div>
                <span className="font-semibold">{user.progress.achievements.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Learning Streak</span>
                </div>
                <span className="font-semibold">{user.progress.streakDays} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Time Invested</span>
                </div>
                <span className="font-semibold">{formatTime(user.progress.totalTimeSpent)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Risk Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.riskProfile.level === 'low' 
                      ? 'bg-green-100 text-green-800'
                      : user.riskProfile.level === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {user.riskProfile.level}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Last Assessment:</span>
                  <br />
                  {getRelativeTime(user.riskProfile.lastAssessment)}
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Privacy & Security
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Banking Habits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Banking Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.preferences.bankingHabits.map((habit) => (
                  <div key={habit} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm capitalize">{habit.replace('-', ' ')}</span>
                  </div>
                ))}
                {user.preferences.bankingHabits.length === 0 && (
                  <p className="text-sm text-gray-500">No banking habits recorded</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage