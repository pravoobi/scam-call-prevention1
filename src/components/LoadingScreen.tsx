import React from 'react'
import { Shield, Loader } from 'lucide-react'

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Shield className="h-16 w-16 text-primary" />
            <Loader className="h-6 w-6 text-primary animate-spin absolute -bottom-1 -right-1" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">FraudGuard</h2>
        <p className="text-gray-600 mb-4">Loading your fraud awareness platform...</p>
        <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto">
          <div className="h-2 bg-primary rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen