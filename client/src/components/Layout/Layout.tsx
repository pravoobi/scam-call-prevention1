import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  ChartBarIcon,
  BellAlertIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';
import { useNotifications } from '../../context/NotificationContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { state: appState } = useAppContext();
  const { state: notificationState } = useNotifications();

  const navigation = [
    { name: t('nav.dashboard'), href: '/', icon: HomeIcon },
    { name: t('nav.callHistory'), href: '/call-history', icon: PhoneIcon },
    { name: t('nav.spamReports'), href: '/spam-reports', icon: ExclamationTriangleIcon },
    { name: t('nav.blockedNumbers'), href: '/blocked-numbers', icon: NoSymbolIcon },
    { name: t('nav.whitelistedNumbers'), href: '/whitelisted-numbers', icon: CheckCircleIcon },
    { name: t('nav.analytics'), href: '/analytics', icon: ChartBarIcon },
    { 
      name: t('nav.liveAlerts'), 
      href: '/live-alerts', 
      icon: BellAlertIcon,
      badge: notificationState.unreadCount > 0 ? notificationState.unreadCount : undefined
    },
    { name: t('nav.fraudEducation'), href: '/fraud-education', icon: AcademicCapIcon },
    { name: t('nav.settings'), href: '/settings', icon: Cog6ToothIcon },
  ];

  const isCurrentPage = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">FraudGuard</span>
            </div>
            <button
              type="button"
              className="rounded-md text-gray-300 hover:text-gray-400"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isCurrentPage(item.href)
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center justify-between rounded-md border-l-4 px-3 py-2 text-sm font-medium transition-colors`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-danger-500 rounded-full">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FraudGuard</span>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isCurrentPage(item.href)
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center justify-between rounded-md border-l-4 px-3 py-2 text-sm font-medium transition-colors`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-danger-500 rounded-full">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* User info at bottom */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{appState.user?.name}</p>
                <p className="text-xs text-gray-500">{appState.user?.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => isCurrentPage(item.href))?.name || t('nav.dashboard')}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Protection Status */}
              <div className="flex items-center mr-4">
                <div className={`h-3 w-3 rounded-full mr-2 ${
                  appState.callProtectionEnabled ? 'bg-success-500' : 'bg-danger-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {appState.callProtectionEnabled ? t('protection.enabled') : t('protection.disabled')}
                </span>
              </div>
              
              {/* Real-time connection status */}
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  notificationState.isConnected ? 'bg-success-500 animate-pulse' : 'bg-gray-400'
                }`} />
                <span className="text-xs text-gray-500">
                  {notificationState.isConnected ? 'Live' : 'Offline'}
                </span>
              </div>
              
              {/* Notification badge */}
              {notificationState.unreadCount > 0 && (
                <Link
                  to="/live-alerts"
                  className="ml-3 relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <BellAlertIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-danger-500 text-center text-xs font-medium text-white">
                    {notificationState.unreadCount > 9 ? '9+' : notificationState.unreadCount}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;