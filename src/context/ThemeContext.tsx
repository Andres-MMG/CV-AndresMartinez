import React, { createContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light') {
      setTheme('light');
    }
  }, []);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
