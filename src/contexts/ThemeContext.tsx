import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Theme = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to resolve theme synchronously (to avoid FOUC)
function resolveThemeSync(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('preferredTheme');
  return (saved as Theme) || 'system';
}

// Get initial resolved theme synchronously (to prevent flash)
function getInitialResolvedTheme(): 'light' | 'dark' {
  const theme = getInitialTheme();
  return resolveThemeSync(theme);
}

// Apply theme class to document immediately (before React hydration)
if (typeof window !== 'undefined') {
  const initialTheme = getInitialResolvedTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme);

  // Resolve actual theme (system -> light/dark)
  useEffect(() => {
    const resolveTheme = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(prefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    resolveTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        resolveTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Save preference
  useEffect(() => {
    localStorage.setItem('preferredTheme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
