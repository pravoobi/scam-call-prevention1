import React, { useState, useEffect } from 'react';
import {
  BellAlertIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { useAppContext } from '../context/AppContext';
import { LiveAlert, ThreatIntelligence, RiskLevel } from '../types';

const LiveAlerts: React.FC = () => {
  const { t } = useLanguage();
  const { state: notificationState, markAsRead, markAllAsRead } = useNotifications();
  const { state: appState } = useAppContext();
  
  const [filter, setFilter] = useState<'all' | 'scam_alert' | 'government_advisory' | 'community_warning'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<LiveAlert | null>(null);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'scam_alert':
        return ExclamationTriangleIcon;
      case 'government_advisory':
        return ShieldExclamationIcon;
      case 'community_warning':
        return BellAlertIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getAlertColor = (severity: RiskLevel) => {
    switch (severity) {
      case RiskLevel.CRITICAL:
        return 'border-red-500 bg-red-50';
      case RiskLevel.HIGH:
        return 'border-orange-500 bg-orange-50';
      case RiskLevel.MEDIUM:
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getSeverityBadge = (severity: RiskLevel) => {
    const colors = {
      [RiskLevel.CRITICAL]: 'bg-red-100 text-red-800',
      [RiskLevel.HIGH]: 'bg-orange-100 text-orange-800',
      [RiskLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800',
      [RiskLevel.LOW]: 'bg-blue-100 text-blue-800',
      [RiskLevel.VERY_LOW]: 'bg-gray-100 text-gray-800',
      [RiskLevel.VERY_HIGH]: 'bg-red-100 text-red-800'
    };
    
    return colors[severity] || colors[RiskLevel.LOW];
  };

  const filteredAlerts = notificationState.liveAlerts.filter(alert => {
    if (filter !== 'all' && alert.type !== filter) return false;
    if (showUnreadOnly && (alert as any).isRead) return false;
    return true;
  });

  const handleMarkAsRead = (alertId: string) => {
    markAsRead(alertId);
  };

  const ThreatIntelCard = ({ threat }: { threat: ThreatIntelligence }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card border-l-4 border-orange-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <ShieldExclamationIcon className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">{threat.title}</h3>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(threat.severity)}`}>
              {threat.severity.replace('_', ' ')}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{threat.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>Affects: {threat.affectedStates.join(', ')}</span>
            <ClockIcon className="h-4 w-4 ml-4 mr-1" />
            <span>{threat.createdAt.toLocaleDateString()}</span>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Prevention Tips:</h4>
            <ul className="space-y-1">
              {threat.preventionTips.map((tip, index) => (
                <li key={index} className="text-sm text-yellow-800 flex items-start">
                  <CheckIcon className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const AlertCard = ({ alert }: { alert: LiveAlert }) => {
    const Icon = getAlertIcon(alert.type);
    const isUnread = !(alert as any).isRead;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card border-l-4 ${getAlertColor(alert.severity)} ${
          isUnread ? 'ring-2 ring-blue-200' : ''
        } cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => {
          setSelectedAlert(alert);
          if (isUnread) handleMarkAsRead(alert.id);
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-1">
            <Icon className={`h-6 w-6 mt-1 mr-3 ${
              alert.severity === RiskLevel.CRITICAL ? 'text-red-600' :
              alert.severity === RiskLevel.HIGH ? 'text-orange-600' :
              alert.severity === RiskLevel.MEDIUM ? 'text-yellow-600' :
              'text-blue-600'
            }`} />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                {isUnread && (
                  <span className="ml-2 h-2 w-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
              <p className="text-gray-700 mb-2">{alert.message}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                  <span className="mx-2">•</span>
                  <span>{alert.timestamp.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(alert.severity)}`}>
                    {alert.severity.replace('_', ' ')}
                  </span>
                  {alert.actionRequired && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Action Required
                    </span>
                  )}
                </div>
              </div>
              
              {alert.relatedNumbers && alert.relatedNumbers.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Related numbers: {alert.relatedNumbers.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('nav.liveAlerts')}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Real-time threat intelligence and community warnings
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md ${
              showUnreadOnly ? 'bg-primary-50 text-primary-700 border-primary-300' : 'text-gray-700 bg-white hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            {showUnreadOnly ? <EyeSlashIcon className="h-4 w-4 mr-2" /> : <EyeIcon className="h-4 w-4 mr-2" />}
            {showUnreadOnly ? 'Show All' : 'Unread Only'}
          </button>
          {notificationState.unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-primary"
            >
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-lg p-4 border ${
          notificationState.isConnected 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full mr-3 ${
            notificationState.isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`} />
          <span className={`text-sm font-medium ${
            notificationState.isConnected ? 'text-green-800' : 'text-red-800'
          }`}>
            {notificationState.isConnected 
              ? 'Connected to real-time threat intelligence' 
              : 'Connection lost - trying to reconnect...'
            }
          </span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Filter by type:</span>
        {['all', 'scam_alert', 'government_advisory', 'community_warning'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType as any)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === filterType
                ? 'bg-primary-100 text-primary-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {filterType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-danger-600">{notificationState.unreadCount}</div>
          <div className="text-sm text-gray-600">Unread Alerts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">{notificationState.liveAlerts.length}</div>
          <div className="text-sm text-gray-600">Total Alerts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{notificationState.threatIntelligence.length}</div>
          <div className="text-sm text-gray-600">Active Threats</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {notificationState.lastUpdate ? new Date(notificationState.lastUpdate).toLocaleTimeString() : '--'}
          </div>
          <div className="text-sm text-gray-600">Last Update</div>
        </div>
      </div>

      {/* Active Threat Intelligence */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Threat Intelligence</h3>
        <div className="space-y-4">
          {notificationState.threatIntelligence.filter(t => t.isActive).map((threat) => (
            <ThreatIntelCard key={threat.id} threat={threat} />
          ))}
        </div>
      </div>

      {/* Live Alerts */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Alerts {filteredAlerts.length > 0 && `(${filteredAlerts.length})`}
        </h3>
        <AnimatePresence>
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BellAlertIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {showUnreadOnly ? 'No unread alerts at the moment.' : 'No alerts match your current filter.'}
                </p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Alert Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    {React.createElement(getAlertIcon(selectedAlert.type), {
                      className: "h-5 w-5 text-orange-600 mr-2"
                    })}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(selectedAlert.severity)}`}>
                      {selectedAlert.severity.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{selectedAlert.title}</h4>
                  <p className="text-gray-700 mt-1">{selectedAlert.message}</p>
                </div>
                
                <div className="text-sm text-gray-500">
                  <div>Type: {selectedAlert.type.replace('_', ' ')}</div>
                  <div>Time: {selectedAlert.timestamp.toLocaleString()}</div>
                  {selectedAlert.relatedNumbers && (
                    <div>Related Numbers: {selectedAlert.relatedNumbers.join(', ')}</div>
                  )}
                </div>
                
                {selectedAlert.actionRequired && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                      <span className="font-medium text-red-900">Action Required</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      This alert requires immediate attention. Please review and take necessary precautions.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveAlerts;