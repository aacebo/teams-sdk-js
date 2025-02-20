import { FC, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { FluentProvider, mergeClasses } from '@fluentui/react-components';

import { ConsoleLogger } from '@teams.sdk/common/logging';

import { ChatContext, useChatStore } from './Stores/Chat';
import { ActivityContext, useActivityStore } from './Stores/Activity';
import { getTheme } from './Utils/get-theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { SocketClient } from './socket-client';

import ChatPane from './Screens/ChatPane/ChatPane';
import Cards from './Screens/Cards';
import Activities from './Screens/Activities';
import Logs from './Screens/Logs';

import PageNavButton from './Components/PageNavButton/PageNavButton';
import DevtoolsBanner from './Components/DevtoolsBanner/DevtoolsBanner';
import useAppClasses from './useAppClasses';

const socket = new SocketClient();

const App: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const classes = useAppClasses();
  const [connected, setConnected] = useState(false);
  const activityStore = useActivityStore();
  const chatStore = useChatStore();

  let log: ConsoleLogger;
  try {
    log = new ConsoleLogger('devtools');
  } catch (error) {
    // Catch error so render doesn't fail if logger initialization fails
    console.error('Logger initialization failed:', error);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    // TODO: Needs ARIA Live Region for the connection status
    socket.connect(() => {
      log.info('Connected to server...');
      setConnected(true);
    });

    socket.on('activity', (event) => {
      activityStore.put(event);
      chatStore.onActivity(event);
    });

    return () => {
      socket.off('activity');
      socket.disconnect(() => {
        log.info('Disconnected from server...');
        setConnected(false);
      });
    };
  }, []);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <FluentProvider theme={theme}>
      <ThemeProvider theme={isDarkMode ? 'dark' : 'light'}>
        <div id="app-root" className={mergeClasses(classes.default, classes.appContainer)}>
          <BrowserRouter basename="/devtools" data-tid="browser-router">
            <nav id="app-sidebar" className={classes.sideBar} aria-label="Sidebar navigation">
              <header id="banner" className={classes.header}>
                <DevtoolsBanner connected={connected} />
              </header>
            </nav>
            <div id="app-content" className={classes.mainLayout} data-tid="main-layout">
              <nav
                id="top-nav"
                className={classes.pageNavContainer}
                aria-label="Page navigation"
                data-tid="top-nav"
              >
                <div className={classes.navButtonContainer}>
                  <PageNavButton to="/" iconType="chat" label="Chat" />
                  <PageNavButton to="/cards" iconType="cards" label="Cards" />
                  <PageNavButton to="/activities" iconType="activities" label="Activities" />

                  {/* TODO: Add logs page back once implemented */}
                  {/* <PageNavButton
                    to="/logs"
                    iconType="logs"
                    label="Logs"
                  /> */}
                </div>
              </nav>
              <main id="page-content" className={classes.mainContent}>
                <ActivityContext.Provider value={activityStore}>
                  <ChatContext.Provider value={chatStore}>
                    <Routes>
                      <Route path="" element={<ChatPane isConnected={connected} />} />
                      <Route path="cards" element={<Cards />} />
                      <Route path="activities" element={<Activities />} />
                      <Route path="logs" element={<Logs />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </ChatContext.Provider>
                </ActivityContext.Provider>
              </main>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </FluentProvider>
  );
};

export default App;
