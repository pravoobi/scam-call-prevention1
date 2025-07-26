import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, FraudModule, Scenario, AppSettings, Achievement, AssessmentResult } from '@/types';

interface AppState {
  // User State
  user: User | null;
  isAuthenticated: boolean;
  
  // Learning State
  modules: FraudModule[];
  currentModule: FraudModule | null;
  currentScenario: Scenario | null;
  currentStepIndex: number;
  
  // Progress & Scoring
  sessionScore: number;
  sessionChoices: Array<{ choiceId: string; isCorrect: boolean; points: number }>;
  hintsUsed: number;
  timeSpent: number;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  settings: AppSettings;
  showHints: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  setModules: (modules: FraudModule[]) => void;
  setCurrentModule: (module: FraudModule) => void;
  setCurrentScenario: (scenario: Scenario) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetScenario: () => void;
  
  // Choice & Scoring Actions
  makeChoice: (choiceId: string, isCorrect: boolean, points: number) => void;
  useHint: () => void;
  addTimeSpent: (seconds: number) => void;
  resetSession: () => void;
  
  // Progress Actions
  completeModule: (moduleId: string, result: AssessmentResult) => void;
  unlockModule: (moduleId: string) => void;
  addAchievement: (achievement: Achievement) => void;
  updateFraudAwarenessScore: (score: number) => void;
  
  // Settings Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleHints: () => void;
  
  // UI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'en',
  soundEnabled: true,
  notificationsEnabled: true,
  autoSave: true,
  offlineMode: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      modules: [],
      currentModule: null,
      currentScenario: null,
      currentStepIndex: 0,
      sessionScore: 0,
      sessionChoices: [],
      hintsUsed: 0,
      timeSpent: 0,
      isLoading: false,
      error: null,
      settings: defaultSettings,
      showHints: true,

      // User Actions
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: true,
          error: null
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          currentModule: null,
          currentScenario: null,
          sessionScore: 0,
          sessionChoices: [],
          hintsUsed: 0,
          timeSpent: 0,
          error: null
        });
      },

      // Module Actions
      setModules: (modules) => {
        set({ modules });
      },

      setCurrentModule: (module) => {
        set({ 
          currentModule: module,
          currentScenario: null,
          currentStepIndex: 0,
          sessionScore: 0,
          sessionChoices: [],
          hintsUsed: 0,
          timeSpent: 0
        });
      },

      setCurrentScenario: (scenario) => {
        set({ 
          currentScenario: scenario,
          currentStepIndex: 0,
          sessionScore: 0,
          sessionChoices: [],
          hintsUsed: 0
        });
      },

      nextStep: () => {
        const { currentStepIndex, currentScenario } = get();
        if (currentScenario && currentStepIndex < currentScenario.story.length - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        }
      },

      previousStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 });
        }
      },

      resetScenario: () => {
        set({
          currentStepIndex: 0,
          sessionScore: 0,
          sessionChoices: [],
          hintsUsed: 0,
          timeSpent: 0
        });
      },

      // Choice & Scoring Actions
      makeChoice: (choiceId, isCorrect, points) => {
        const { sessionChoices, sessionScore } = get();
        set({
          sessionChoices: [...sessionChoices, { choiceId, isCorrect, points }],
          sessionScore: sessionScore + points
        });
      },

      useHint: () => {
        const { hintsUsed } = get();
        set({ hintsUsed: hintsUsed + 1 });
      },

      addTimeSpent: (seconds) => {
        const { timeSpent, user } = get();
        const newTimeSpent = timeSpent + seconds;
        set({ timeSpent: newTimeSpent });
        
        // Update user's total time spent
        if (user) {
          set({
            user: {
              ...user,
              progress: {
                ...user.progress,
                totalTimeSpent: user.progress.totalTimeSpent + seconds
              }
            }
          });
        }
      },

      resetSession: () => {
        set({
          sessionScore: 0,
          sessionChoices: [],
          hintsUsed: 0,
          timeSpent: 0
        });
      },

      // Progress Actions
      completeModule: (moduleId, result) => {
        const { user, modules } = get();
        if (!user) return;

        const updatedUser = {
          ...user,
          progress: {
            ...user.progress,
            completedModules: [...user.progress.completedModules, moduleId],
            fraudAwarenessScore: Math.max(user.progress.fraudAwarenessScore, result.score),
            lastActive: new Date()
          }
        };

        // Unlock next module if prerequisites are met
        const updatedModules = modules.map(module => {
          if (module.prerequisites && 
              module.prerequisites.every(prereq => updatedUser.progress.completedModules.includes(prereq))) {
            return { ...module, isUnlocked: true };
          }
          return module;
        });

        set({ 
          user: updatedUser, 
          modules: updatedModules,
          currentModule: null,
          currentScenario: null
        });
      },

      unlockModule: (moduleId) => {
        const { modules } = get();
        const updatedModules = modules.map(module =>
          module.id === moduleId ? { ...module, isUnlocked: true } : module
        );
        set({ modules: updatedModules });
      },

      addAchievement: (achievement) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = {
          ...user,
          progress: {
            ...user.progress,
            achievements: [...user.progress.achievements, achievement]
          }
        };
        set({ user: updatedUser });
      },

      updateFraudAwarenessScore: (score) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = {
          ...user,
          progress: {
            ...user.progress,
            fraudAwarenessScore: Math.max(user.progress.fraudAwarenessScore, score)
          }
        };
        set({ user: updatedUser });
      },

      // Settings Actions
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({ settings: { ...settings, ...newSettings } });
      },

      toggleHints: () => {
        const { showHints } = get();
        set({ showHints: !showHints });
      },

      // UI Actions
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },
    }),
    {
      name: 'fraud-awareness-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        settings: state.settings,
        modules: state.modules
      }),
    }
  )
);