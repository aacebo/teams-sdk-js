import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('dark'); // Default to light theme

export const ThemeProvider: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
