import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Lock, 
  Play, 
  Star,
  Filter,
  Search,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { FraudType } from '@/types'

const ModulesPage: React.FC = () => {
  const { user, modules, setCurrentModule } = useAppStore()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  if (!user) return null

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty
    
    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getModuleStatus = (module: any) => {
    if (user.progress.completedModules.includes(module.id)) {
      return { status: 'completed', color: 'text-green-600', icon: CheckCircle }
    } else if (module.isUnlocked) {
      return { status: 'available', color: 'text-blue-600', icon: Play }
    } else {
      return { status: 'locked', color: 'text-gray-400', icon: Lock }
    }
  }

  const startModule = (module: any) => {
    if (module.isUnlocked) {
      setCurrentModule(module)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Fraud Awareness Modules
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master fraud prevention through interactive scenarios. Each module focuses on specific 
          types of scams common in India.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {user.progress.completedModules.length}
              </div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {user.progress.fraudAwarenessScore}
              </div>
              <div className="text-sm text-gray-600">Awareness Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {modules.filter(m => m.isUnlocked).length}
              </div>
              <div className="text-sm text-gray-600">Available Modules</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const moduleStatus = getModuleStatus(module)
          const StatusIcon = moduleStatus.icon
          const isCompleted = user.progress.completedModules.includes(module.id)
          const firstScenario = module.scenarios[0]

          return (
            <Card 
              key={module.id} 
              className={`card-hover ${!module.isUnlocked ? 'opacity-60' : ''}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{module.icon}</div>
                    <div>
                      <CardTitle className="text-lg mb-1">{module.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                          {module.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.estimatedTime}m
                        </span>
                      </div>
                    </div>
                  </div>
                  <StatusIcon className={`h-5 w-5 ${moduleStatus.color}`} />
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">
                  {module.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Scenarios:</span>
                    <span className="font-medium">{module.scenarios.length}</span>
                  </div>
                  
                  {module.prerequisites && module.prerequisites.length > 0 && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Prerequisites:</span>
                      <div className="mt-1">
                        {module.prerequisites.map((prereq) => {
                          const prereqModule = modules.find(m => m.id === prereq)
                          const isPrereqComplete = user.progress.completedModules.includes(prereq)
                          return (
                            <div key={prereq} className="flex items-center space-x-1">
                              <CheckCircle className={`h-3 w-3 ${isPrereqComplete ? 'text-green-500' : 'text-gray-300'}`} />
                              <span>{prereqModule?.title || prereq}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t">
                    {isCompleted ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => startModule(module)}>
                          Review
                        </Button>
                      </div>
                    ) : module.isUnlocked ? (
                      <div className="space-y-2">
                        {firstScenario ? (
                          <Link to={`/scenario/${module.id}/${firstScenario.id}`}>
                            <Button className="w-full" onClick={() => startModule(module)}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Module
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-2">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Lock className="h-4 w-4" />
                          <span className="text-sm">Complete prerequisites to unlock</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      {/* Learning Path */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-900">🎯 Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800 text-sm mb-4">
            For best results, we recommend completing modules in this order:
          </p>
          <div className="space-y-2">
            {modules.slice(0, 4).map((module, index) => (
              <div key={module.id} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.progress.completedModules.includes(module.id) 
                    ? 'bg-green-500 text-white' 
                    : module.isUnlocked 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-yellow-900">{module.title}</span>
                {index < 3 && <ArrowRight className="h-4 w-4 text-yellow-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModulesPage