/* eslint-disable react-refresh/only-export-components */
/**
 * @file ThemeContext.jsx
 * @path src/context/ThemeContext.jsx
 * @description Global light/dark modes themes manager. Toggles HTML class indicators
 * for tailwind rendering and syncs selections into localStorage parameters.
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { createContext, useState, useEffect, useContext } from 'react';

/* ==========================================================================
   2. CONTEXT DECLARATION & PROVIDER
   ========================================================================== */
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  /* --- STATE INITIALIZATION --- */
  // Lazy load saved setting from local storage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Toggles the class target on document element and stores choice keys in cache
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* ==========================================================================
     3. STATE MUTATOR CALLBACK (DISPATCHER)
     ========================================================================== */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /* ==========================================================================
     4. PROVIDER RENDER
     ========================================================================== */
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ==========================================================================
   5. CUSTOM HOOK EXPORT
   ========================================================================== */
export const useTheme = () => useContext(ThemeContext);
