import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { FluentProvider, mergeClasses } from '@fluentui/react-components';

import { ConsoleLogger } from '@teams.sdk/common/logging';
import { ChatContext, useChatStore } from './Stores/Chat';
import { ActivityContext, useActivityStore } from './Stores/Activity';
import getTheme from './Utils/get-theme';
import { ThemeProvider } from './contexts/ThemeContext';
import { SocketClient } from './socket-client';

import ChatPane from './components/ChatPane/ChatPane';
import PageNavButton from './components/PageNavButton/PageNavButton';
import DevtoolsLandmark from './components/DevToolsLandmark/DevToolsLandmark';
import useAppClasses from './useAppClasses';

const socket = new SocketClient();

const App: React.FC = () => {
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
    }
  }, []);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <FluentProvider theme={theme}>
      <ThemeProvider theme={isDarkMode ? 'dark' : 'light'}>
        <div
          id="app-container"
          className={mergeClasses(classes.default, classes.appContainer)}
        >
          <BrowserRouter basename="/devtools2" data-tid="browser-router">
            <nav
              id="sidebar"
              className={classes.sideBar}
              aria-label="Sidebar navigation"
            >
              <header id="banner" className={classes.header}>
                <DevtoolsLandmark connected={connected} />
              </header>
            </nav>
            <div
              id="nav-and-main-container"
              className={classes.sideBarAndMainContainer}
            >
              <div
                data-tid="top-nav"
                className={classes.pageNavContainer}
              >
                <nav id="Page" aria-label="Page navigation" className={classes.navButtonContainer}>
                  <PageNavButton
                    to="/"
                    iconType="chat"
                    label="Chat"
                  />
                  <PageNavButton
                    to="/cards"
                    iconType="cards"
                    label="Cards"
                  />
                  <PageNavButton
                    to="/activities"
                    iconType="activities"
                    label="Activities"
                  />

                {/* TODO: Add logs page back once implemented */}
                {/* <PageNavButton
                  to="/logs"
                  iconType="logs"
                  label="Logs"
                /> */}
              </nav>
            </div>
            <main
              id="main"
              className={mergeClasses(classes.default, classes.mainContainer)}
            >
              <ActivityContext.Provider value={activityStore}>
                <ChatContext.Provider value={chatStore}>
                  <Routes>
                    <Route path="" element={<ChatPane isConnected={connected} />} />
                    <Route path="cards" element={<div>Cards</div>} />
                    <Route path="activities" element={<div>Activities</div>} />
                    <Route path="logs" element={<div>Logs</div>} />
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
