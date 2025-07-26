import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { fraudModules } from '@/data/modules'

// Components
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import ModulesPage from '@/pages/ModulesPage'
import ScenarioPage from '@/pages/ScenarioPage'
import ProfilePage from '@/pages/ProfilePage'
import OnboardingPage from '@/pages/OnboardingPage'
import LoadingScreen from '@/components/LoadingScreen'

function App() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    setModules, 
    setUser 
  } = useAppStore()

  useEffect(() => {
    // Initialize modules data
    setModules(fraudModules)
    
    // Create a guest user if none exists (for demo purposes)
    if (!user && !isAuthenticated) {
      const guestUser = {
        id: 'guest-user',
        name: 'Demo User',
        riskProfile: {
          level: 'medium' as const,
          vulnerabilities: [],
          lastAssessment: new Date()
        },
        preferences: {
          language: 'en',
          region: 'india',
          bankingHabits: ['upi', 'mobile-banking'],
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
      setUser(guestUser)
    }
  }, [setModules, setUser, user, isAuthenticated])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="App">
      <Routes>
        {!isAuthenticated ? (
          <Route path="/*" element={<OnboardingPage />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="scenario/:moduleId/:scenarioId" element={<ScenarioPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App