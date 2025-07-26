import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, UserPreferences, AppSettings, SupportedLanguage, IndianState, SpamLevel } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
  callProtectionEnabled: boolean;
  realTimeProtection: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'TOGGLE_CALL_PROTECTION' }
  | { type: 'TOGGLE_REAL_TIME_PROTECTION' }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  settings: {
    language: SupportedLanguage.ENGLISH,
    theme: 'light',
    autoUpdate: true,
    dataUsage: 'standard',
    emergencyContacts: []
  },
  isLoading: false,
  error: null,
  callProtectionEnabled: true,
  realTimeProtection: true
};

const defaultUserPreferences: UserPreferences = {
  autoBlock: true,
  blockUnknownNumbers: false,
  enableWhitelist: true,
  blockDuringHours: null,
  priorityMode: false,
  language: SupportedLanguage.ENGLISH,
  notifications: {
    pushNotifications: true,
    smsAlerts: false,
    emailAlerts: true,
    communityAlerts: true,
    governmentAdvisories: true
  },
  spamThreshold: SpamLevel.MODERATE
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'UPDATE_PREFERENCES':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
    case 'TOGGLE_CALL_PROTECTION':
      return {
        ...state,
        callProtectionEnabled: !state.callProtectionEnabled
      };
    case 'TOGGLE_REAL_TIME_PROTECTION':
      return {
        ...state,
        realTimeProtection: !state.realTimeProtection
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  toggleCallProtection: () => void;
  toggleRealTimeProtection: () => void;
  initializeUser: (userData: Partial<User>) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('fraud_prevention_user');
    const savedSettings = localStorage.getItem('fraud_prevention_settings');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: userData });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    } else {
      // Initialize demo user for testing
      const demoUser: User = {
        id: 'demo-user-1',
        name: 'Rajesh Kumar',
        phoneNumber: '+919876543210',
        email: 'rajesh.kumar@example.com',
        language: SupportedLanguage.HINDI,
        state: IndianState.DELHI,
        preferences: defaultUserPreferences,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      dispatch({ type: 'SET_USER', payload: demoUser });
    }
    
    if (savedSettings) {
      try {
        const settingsData = JSON.parse(savedSettings);
        dispatch({ type: 'UPDATE_SETTINGS', payload: settingsData });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('fraud_prevention_user', JSON.stringify(state.user));
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('fraud_prevention_settings', JSON.stringify(state.settings));
  }, [state.settings]);

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const toggleCallProtection = () => {
    dispatch({ type: 'TOGGLE_CALL_PROTECTION' });
  };

  const toggleRealTimeProtection = () => {
    dispatch({ type: 'TOGGLE_REAL_TIME_PROTECTION' });
  };

  const initializeUser = (userData: Partial<User>) => {
    const fullUser: User = {
      id: userData.id || 'user-' + Date.now(),
      name: userData.name || '',
      phoneNumber: userData.phoneNumber || '',
      email: userData.email,
      language: userData.language || SupportedLanguage.ENGLISH,
      state: userData.state || IndianState.DELHI,
      preferences: userData.preferences || defaultUserPreferences,
      isVerified: userData.isVerified || false,
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date()
    };
    dispatch({ type: 'SET_USER', payload: fullUser });
  };

  const logout = () => {
    localStorage.removeItem('fraud_prevention_user');
    localStorage.removeItem('fraud_prevention_settings');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    updateUserPreferences,
    updateAppSettings,
    toggleCallProtection,
    toggleRealTimeProtection,
    initializeUser,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};