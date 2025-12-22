import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const THEME_KEY = 'orbosis_theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored;
    } catch (e) {}
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    // handle 'auto' by checking system preference
    if (theme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }, [theme]);

  // if auto, listen for system changes
  useEffect(() => {
    if (theme !== 'auto') return;
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
      document.documentElement.classList.toggle('light', !e.matches);
    };
    m.addEventListener ? m.addEventListener('change', handler) : m.addListener(handler);
    return () => {
      m.removeEventListener ? m.removeEventListener('change', handler) : m.removeListener(handler);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
