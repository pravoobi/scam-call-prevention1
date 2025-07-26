import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LiveAlert, CallBlockEvent, ThreatIntelligence, RiskLevel } from '../types';

interface NotificationState {
  liveAlerts: LiveAlert[];
  recentBlocks: CallBlockEvent[];
  threatIntelligence: ThreatIntelligence[];
  unreadCount: number;
  isConnected: boolean;
  lastUpdate: Date | null;
}

interface NotificationContextType {
  state: NotificationState;
  addAlert: (alert: LiveAlert) => void;
  addBlockEvent: (event: CallBlockEvent) => void;
  addThreatIntel: (intel: ThreatIntelligence) => void;
  markAsRead: (alertId: string) => void;
  markAllAsRead: () => void;
  clearOldAlerts: () => void;
  playAlertSound: (severity: RiskLevel) => void;
  showNotification: (title: string, message: string, type: 'info' | 'warning' | 'error' | 'success') => void;
}

const initialState: NotificationState = {
  liveAlerts: [],
  recentBlocks: [],
  threatIntelligence: [],
  unreadCount: 0,
  isConnected: false,
  lastUpdate: null
};

// Sample threat intelligence data for demo
const sampleThreatIntelligence: ThreatIntelligence[] = [
  {
    id: 'threat-1',
    title: 'Fake UPI Reversal Scam Alert',
    description: 'Scammers calling about fake UPI transaction reversals asking for OTP and bank details',
    fraudType: 'UPI_FRAUD' as any,
    severity: RiskLevel.HIGH,
    affectedStates: ['DELHI', 'MAHARASHTRA', 'KARNATAKA'] as any,
    isActive: true,
    createdAt: new Date(),
    source: 'Cybercrime Cell Delhi',
    preventionTips: [
      'Never share OTP or bank details over phone',
      'UPI transactions cannot be reversed by calling',
      'Contact your bank directly for any UPI issues',
      'Report suspicious calls to cybercrime helpline'
    ]
  },
  {
    id: 'threat-2',
    title: 'Digital Arrest Scam Surge',
    description: 'Increase in fake police/CBI calls claiming digital arrest and demanding money',
    fraudType: 'DIGITAL_ARREST' as any,
    severity: RiskLevel.CRITICAL,
    affectedStates: ['UTTAR_PRADESH', 'BIHAR', 'WEST_BENGAL'] as any,
    isActive: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    source: 'National Cyber Crime Portal',
    preventionTips: [
      'Police never make arrest calls',
      'No digital arrest process exists',
      'Never transfer money to avoid arrest',
      'Report to local police immediately'
    ]
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NotificationState>({
    ...initialState,
    threatIntelligence: sampleThreatIntelligence
  });

  // Simulate real-time connection
  useEffect(() => {
    const connectToRealTime = () => {
      setState(prev => ({ ...prev, isConnected: true, lastUpdate: new Date() }));
      
      // Simulate periodic updates
      const interval = setInterval(() => {
        setState(prev => ({ ...prev, lastUpdate: new Date() }));
        
        // Randomly generate demo alerts
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
          generateDemoAlert();
        }
      }, 30000);

      return () => clearInterval(interval);
    };

    const cleanup = connectToRealTime();
    return cleanup;
  }, []);

  const generateDemoAlert = () => {
    const alertTypes = ['scam_alert', 'government_advisory', 'community_warning'] as const;
    const severities = [RiskLevel.MEDIUM, RiskLevel.HIGH, RiskLevel.CRITICAL];
    const titles = [
      'New Fraud Pattern Detected',
      'Government Advisory Update',
      'Community Warning: Suspicious Numbers',
      'Bank Impersonation Calls Reported',
      'KYC Scam Alert in Your Area'
    ];
    
    const messages = [
      'Multiple reports of fake bank calls in your area',
      'New UPI fraud technique being used by scammers',
      'Government warns against digital arrest scams',
      'Community reports increased telemarketing calls',
      'Suspicious pattern detected in recent calls'
    ];

    const demoAlert: LiveAlert = {
      id: `alert-${Date.now()}`,
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      timestamp: new Date(),
      relatedNumbers: [`+91${Math.floor(Math.random() * 10000000000)}`],
      actionRequired: Math.random() < 0.3
    };

    addAlert(demoAlert);
  };

  const addAlert = useCallback((alert: LiveAlert) => {
    setState(prev => ({
      ...prev,
      liveAlerts: [alert, ...prev.liveAlerts.slice(0, 49)], // Keep last 50 alerts
      unreadCount: prev.unreadCount + 1,
      lastUpdate: new Date()
    }));

    // Show browser notification if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(alert.title, {
        body: alert.message,
        icon: '/favicon.ico'
      });
    }

    // Play alert sound
    playAlertSound(alert.severity);
  }, []);

  const addBlockEvent = useCallback((event: CallBlockEvent) => {
    setState(prev => ({
      ...prev,
      recentBlocks: [event, ...prev.recentBlocks.slice(0, 99)], // Keep last 100 blocks
      lastUpdate: new Date()
    }));

    showNotification(
      'Call Blocked',
      `Blocked ${event.phoneNumber} - ${event.reason}`,
      'success'
    );
  }, []);

  const addThreatIntel = useCallback((intel: ThreatIntelligence) => {
    setState(prev => ({
      ...prev,
      threatIntelligence: [intel, ...prev.threatIntelligence.filter(t => t.id !== intel.id)],
      lastUpdate: new Date()
    }));
  }, []);

  const markAsRead = useCallback((alertId: string) => {
    setState(prev => ({
      ...prev,
      liveAlerts: prev.liveAlerts.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      ),
      unreadCount: Math.max(0, prev.unreadCount - 1)
    }));
  }, []);

  const markAllAsRead = useCallback(() => {
    setState(prev => ({
      ...prev,
      liveAlerts: prev.liveAlerts.map(alert => ({ ...alert, isRead: true })),
      unreadCount: 0
    }));
  }, []);

  const clearOldAlerts = useCallback(() => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    setState(prev => ({
      ...prev,
      liveAlerts: prev.liveAlerts.filter(alert => alert.timestamp > oneDayAgo),
      recentBlocks: prev.recentBlocks.filter(block => block.timestamp > oneDayAgo)
    }));
  }, []);

  const playAlertSound = useCallback((severity: RiskLevel) => {
    if ('Audio' in window) {
      try {
        let frequency = 440; // Default frequency
        let duration = 200; // Default duration
        
        switch (severity) {
          case RiskLevel.CRITICAL:
            frequency = 800;
            duration = 500;
            break;
          case RiskLevel.HIGH:
            frequency = 600;
            duration = 300;
            break;
          case RiskLevel.MEDIUM:
            frequency = 500;
            duration = 200;
            break;
        }

        // Create audio context for beep sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
      } catch (error) {
        console.warn('Could not play alert sound:', error);
      }
    }
  }, []);

  const showNotification = useCallback((title: string, message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    // Simple notification implementation
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
    } else {
      console.log(`${type.toUpperCase()}: ${title} - ${message}`);
    }
  }, []);

  // Auto-cleanup old alerts every hour
  useEffect(() => {
    const interval = setInterval(clearOldAlerts, 60 * 60 * 1000); // 1 hour
    return () => clearInterval(interval);
  }, [clearOldAlerts]);

  const value: NotificationContextType = {
    state,
    addAlert,
    addBlockEvent,
    addThreatIntel,
    markAsRead,
    markAllAsRead,
    clearOldAlerts,
    playAlertSound,
    showNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};