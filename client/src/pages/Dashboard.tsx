import React, { useState, useEffect } from 'react';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  PhoneXMarkIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  BellAlertIcon,
  EyeIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { useNotifications } from '../context/NotificationContext';
import { CallInfo, RiskLevel, SpamCategory, TelecomOperator } from '../types';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { state: appState, toggleCallProtection } = useAppContext();
  const { state: notificationState } = useNotifications();
  
  // Demo statistics
  const [stats, setStats] = useState({
    callsBlockedToday: 12,
    spamDetectedToday: 18,
    reportsSubmitted: 3,
    totalProtectedDays: 45
  });

  // Demo recent calls data
  const recentCalls: CallInfo[] = [
    {
      id: 'call-1',
      phoneNumber: '+919876543210',
      callerName: 'SBI Customer Care (Fake)',
      location: 'Delhi',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isSpam: true,
      spamProbability: 0.95,
      spamCategory: SpamCategory.FINANCIAL_SCAM,
      isBlocked: true,
      source: 'AI_DETECTION' as any,
      riskLevel: RiskLevel.HIGH,
      fraudPatterns: [
        {
          type: 'BANK_IMPERSONATION' as any,
          confidence: 0.92,
          description: 'Caller impersonating bank official',
          preventionTips: ['Never share OTP', 'Banks don\'t ask for PIN over phone']
        }
      ],
      reportCount: 156,
      telecomOperator: TelecomOperator.JIO
    },
    {
      id: 'call-2',
      phoneNumber: '+918765432109',
      callerName: 'KYC Update Required',
      location: 'Mumbai',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isSpam: true,
      spamProbability: 0.88,
      spamCategory: SpamCategory.FRAUD,
      isBlocked: true,
      source: 'COMMUNITY_REPORTS' as any,
      riskLevel: RiskLevel.HIGH,
      fraudPatterns: [
        {
          type: 'KYC_SCAM' as any,
          confidence: 0.85,
          description: 'Fake KYC update scam',
          preventionTips: ['Banks send KYC notices by mail', 'Don\'t share documents over phone']
        }
      ],
      reportCount: 89,
      telecomOperator: TelecomOperator.AIRTEL
    },
    {
      id: 'call-3',
      phoneNumber: '+917654321098',
      callerName: 'Amazon Customer Service',
      location: 'Bangalore',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isSpam: false,
      spamProbability: 0.15,
      isBlocked: false,
      source: 'BUSINESS_DIRECTORY' as any,
      riskLevel: RiskLevel.LOW,
      fraudPatterns: [],
      reportCount: 2,
      telecomOperator: TelecomOperator.VI
    }
  ];

  // Chart data
  const weeklyData = [
    { day: 'Mon', spam: 8, normal: 15 },
    { day: 'Tue', spam: 12, normal: 18 },
    { day: 'Wed', spam: 6, normal: 22 },
    { day: 'Thu', spam: 15, normal: 12 },
    { day: 'Fri', spam: 18, normal: 25 },
    { day: 'Sat', spam: 10, normal: 30 },
    { day: 'Sun', spam: 7, normal: 20 }
  ];

  const riskData = [
    { name: 'Low Risk', value: 45, color: '#22c55e' },
    { name: 'Medium Risk', value: 30, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' },
    { name: 'Critical', value: 5, color: '#7f1d1d' }
  ];

  const fraudTypesData = [
    { type: 'UPI Fraud', count: 45 },
    { type: 'Bank Impersonation', count: 38 },
    { type: 'KYC Scam', count: 25 },
    { type: 'Digital Arrest', count: 18 },
    { type: 'Loan Scam', count: 12 }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to update stats
        setStats(prev => ({
          ...prev,
          callsBlockedToday: prev.callsBlockedToday + Math.floor(Math.random() * 3),
          spamDetectedToday: prev.spamDetectedToday + Math.floor(Math.random() * 2)
        }));
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: number | string;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('dashboard.title')}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t('message.protectionActive')} • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={toggleCallProtection}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              appState.callProtectionEnabled 
                ? 'bg-success-600 hover:bg-success-700' 
                : 'bg-danger-600 hover:bg-danger-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors`}
          >
            {appState.callProtectionEnabled ? (
              <>
                <PauseIcon className="-ml-1 mr-2 h-5 w-5" />
                Pause Protection
              </>
            ) : (
              <>
                <PlayIcon className="-ml-1 mr-2 h-5 w-5" />
                Enable Protection
              </>
            )}
          </button>
        </div>
      </div>

      {/* Protection Status Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-lg p-4 ${
          appState.callProtectionEnabled 
            ? 'bg-success-50 border border-success-200' 
            : 'bg-danger-50 border border-danger-200'
        }`}
      >
        <div className="flex items-center">
          {appState.callProtectionEnabled ? (
            <ShieldCheckIcon className="h-8 w-8 text-success-600" />
          ) : (
            <ShieldExclamationIcon className="h-8 w-8 text-danger-600" />
          )}
          <div className="ml-3">
            <h3 className={`text-lg font-medium ${
              appState.callProtectionEnabled ? 'text-success-800' : 'text-danger-800'
            }`}>
              {appState.callProtectionEnabled ? t('protection.enabled') : t('protection.disabled')}
            </h3>
            <p className={`text-sm ${
              appState.callProtectionEnabled ? 'text-success-700' : 'text-danger-700'
            }`}>
              {appState.callProtectionEnabled 
                ? 'Your phone is actively protected from fraud calls and spam'
                : 'Turn on protection to block spam and fraud calls automatically'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('dashboard.callsBlocked')}
          value={stats.callsBlockedToday}
          icon={PhoneXMarkIcon}
          color="bg-danger-500"
          subtitle="vs 8 yesterday"
        />
        <StatCard
          title={t('dashboard.spamDetected')}
          value={stats.spamDetectedToday}
          icon={ExclamationTriangleIcon}
          color="bg-warning-500"
          subtitle="AI + Community"
        />
        <StatCard
          title={t('dashboard.reportsSubmitted')}
          value={stats.reportsSubmitted}
          icon={DocumentTextIcon}
          color="bg-primary-500"
          subtitle="Contributing to safety"
        />
        <StatCard
          title={t('dashboard.protectionActive')}
          value={stats.totalProtectedDays}
          icon={ShieldCheckIcon}
          color="bg-success-500"
          subtitle="days protected"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.recentActivity')}</h3>
            <a href="/call-history" className="text-sm text-primary-600 hover:text-primary-500">
              View all
            </a>
          </div>
          <div className="space-y-3">
            {recentCalls.slice(0, 3).map((call) => (
              <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-3 ${
                    call.isSpam ? 'bg-danger-500' : 'bg-success-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{call.phoneNumber}</p>
                    <p className="text-xs text-gray-500">
                      {call.callerName} • {call.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {call.isSpam && (
                    <span className="badge-danger mr-2">
                      {call.spamCategory?.replace('_', ' ')}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {call.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Threat Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.threatAlerts')}</h3>
            <a href="/live-alerts" className="text-sm text-primary-600 hover:text-primary-500">
              View all
            </a>
          </div>
          <div className="space-y-3">
            {notificationState.threatIntelligence.slice(0, 3).map((threat) => (
              <div key={threat.id} className="flex items-start p-3 bg-orange-50 rounded-lg border border-orange-200">
                <BellAlertIcon className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{threat.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{threat.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`badge-${
                      threat.severity === RiskLevel.CRITICAL ? 'danger' : 
                      threat.severity === RiskLevel.HIGH ? 'warning' : 'info'
                    }`}>
                      {threat.severity}
                    </span>
                    <span className="text-xs text-gray-500">{threat.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Call Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spam" fill="#ef4444" name="Spam Calls" />
              <Bar dataKey="normal" fill="#22c55e" name="Normal Calls" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Fraud Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Fraud Types This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fraudTypesData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="type" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/spam-reports"
            className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <ExclamationTriangleIcon className="h-6 w-6 text-primary-600 mr-3" />
            <span className="text-sm font-medium text-primary-900">Report Spam</span>
            <ChevronRightIcon className="h-4 w-4 text-primary-600 ml-auto" />
          </a>
          <a
            href="/blocked-numbers"
            className="flex items-center p-4 bg-danger-50 rounded-lg hover:bg-danger-100 transition-colors"
          >
            <PhoneXMarkIcon className="h-6 w-6 text-danger-600 mr-3" />
            <span className="text-sm font-medium text-danger-900">Manage Blocks</span>
            <ChevronRightIcon className="h-4 w-4 text-danger-600 ml-auto" />
          </a>
          <a
            href="/fraud-education"
            className="flex items-center p-4 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
          >
            <EyeIcon className="h-6 w-6 text-warning-600 mr-3" />
            <span className="text-sm font-medium text-warning-900">Learn & Prevent</span>
            <ChevronRightIcon className="h-4 w-4 text-warning-600 ml-auto" />
          </a>
          <a
            href="/analytics"
            className="flex items-center p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors"
          >
            <DocumentTextIcon className="h-6 w-6 text-success-600 mr-3" />
            <span className="text-sm font-medium text-success-900">View Analytics</span>
            <ChevronRightIcon className="h-4 w-4 text-success-600 ml-auto" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;