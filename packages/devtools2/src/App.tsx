import React, { useState, useEffect, useMemo } from 'react';
import { FluentProvider, teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components';
import ChatPane from './components/ChatPane/ChatPane';
import useGlobalStyles from './useGlobalStyles';

const App: React.FC = () => {
  const getTheme = (isDarkMode: boolean) => {
    return isDarkMode ? teamsDarkTheme : teamsLightTheme;
  };

  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);
  const styles = useGlobalStyles();

  return (
    <FluentProvider theme={theme}>
      <div className={styles.default}>
        <ChatPane />
      </div>
    </FluentProvider>
  );
};

export default App;
