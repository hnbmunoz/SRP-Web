import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme types
export type Theme = 'light' | 'dark';

// Theme state interface
interface ThemeState {
  // State
  theme: Theme;
  isDarkMode: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

// Apply theme to document
const applyThemeToDocument = (theme: Theme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
};

// Get system theme preference
const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'light',
      isDarkMode: false,

      // Set theme
      setTheme: (theme: Theme) => {
        applyThemeToDocument(theme);
        set({
          theme,
          isDarkMode: theme === 'dark'
        });
      },

      // Toggle theme
      toggleTheme: () => {
        const { theme } = get();
        const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      // Initialize theme (called on app startup)
      initializeTheme: () => {
        const { theme } = get();
        // If no theme is persisted, use system preference
        const initialTheme = theme || getSystemTheme();
        get().setTheme(initialTheme);
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme
      }),
    }
  )
);

// Utility hook for theme operations
export const useTheme = () => {
  const store = useThemeStore();
  return {
    theme: store.theme,
    isDarkMode: store.isDarkMode,
    setTheme: store.setTheme,
    toggleTheme: store.toggleTheme,
    initializeTheme: store.initializeTheme,
  };
};

// Hook for theme-aware components
export const useThemeClass = () => {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  return {
    isDarkMode,
    themeClass: isDarkMode ? 'dark' : 'light',
    getThemeClass: (lightClass: string, darkClass: string) => 
      isDarkMode ? darkClass : lightClass,
  };
};