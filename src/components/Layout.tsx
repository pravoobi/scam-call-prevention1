import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { Shield, Home, BookOpen, User, Menu, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const Layout: React.FC = () => {
  const location = useLocation()
  const { user, sessionScore, fraudAwarenessScore } = useAppStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      current: location.pathname === '/'
    },
    {
      name: 'Modules',
      href: '/modules',
      icon: BookOpen,
      current: location.pathname === '/modules'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      current: location.pathname === '/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">
                FraudGuard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                    item.current
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              {/* Fraud Awareness Score */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Awareness Score</div>
                  <div className="text-sm font-semibold text-primary">
                    {user?.progress.fraudAwarenessScore || 0}/100
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 bg-white border-t">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-base font-medium',
                    item.current
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Info */}
              <div className="px-3 py-2 border-t mt-2">
                <div className="text-sm text-gray-500">Hello, {user?.name}</div>
                <div className="text-xs text-gray-400">
                  Fraud Awareness Score: {user?.progress.fraudAwarenessScore || 0}/100
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">FraudGuard</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Empowering Indians with knowledge and skills to protect themselves from fraud and scams. 
                Learn through interactive scenarios and become fraud-aware.
              </p>
              <div className="flex space-x-4">
                <span className="text-xs text-gray-500">© 2024 FraudGuard. Educational Platform.</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/modules" className="text-sm text-gray-600 hover:text-primary">
                    Learning Modules
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-sm text-gray-600 hover:text-primary">
                    My Progress
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary">
                    Emergency Contacts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary">
                    Report Fraud
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Emergency Help</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">
                  <span className="font-medium">Cybercrime Helpline:</span>
                  <br />1930
                </li>
                <li className="text-sm text-gray-600">
                  <span className="font-medium">Banking Fraud:</span>
                  <br />Report to your bank immediately
                </li>
                <li className="text-sm text-gray-600">
                  <span className="font-medium">UPI Fraud:</span>
                  <br />Block UPI ID in your app
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout