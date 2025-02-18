import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { FluentProvider, mergeClasses } from '@fluentui/react-components';

import { ConsoleLogger } from '@teams.sdk/common/logging';
import { ChatContext, useChatStore } from './Stores/Chat';
import { ActivityContext, useActivityStore } from './Stores/Activity';
import getTheme from './Utils/get-theme';
import { SocketClient } from './socket-client';

import ChatPane from './components/ChatPane/ChatPane';
import useGlobalClasses from './useGlobalClasses';
import PageNavButton from './components/PageNavButton/PageNavButton';
import DevtoolsLandmark from './components/DevToolsLandmark/DevToolsLandmark';

const socket = new SocketClient();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const classes = useGlobalClasses();
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
    const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
      // TODO: Needs ARIA Live Region for the connection status
      socket.connect(() => {
        log.info('connected....');
        setConnected(true);

      socket.disconnect(() => {
        log.info('disconnected...');
        setConnected(false);
      });
    });

    socket.on('activity', (event) => {
      activityStore.put(event);
      chatStore.onActivity(event);
    });
  }, []);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  return (
    <FluentProvider theme={theme}>
      <div
        data-tid="app-container"
        className={mergeClasses(classes.default, classes.horizontalLayout, classes.appContainer)}
      >
        <BrowserRouter basename="/devtools2" data-tid="browser-router">
          <nav
            id="Page"
            className={mergeClasses(classes.verticalLayout, classes.mainNav)}
            aria-label="Page navigation"
          >
            <header id="banner" className={classes.flexGrow}>
              <DevtoolsLandmark connected={connected} />
            </header>
          </nav>
          <div
            id="nav and main container"
            className={mergeClasses(classes.verticalLayout, classes.mainContainer)}
          >
            <div
              data-tid="top-nav"
              className={mergeClasses(classes.horizontalLayout, classes.topNav)}
            >
              <nav id="Page" className={classes.navButtonContainer}>
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
              className={mergeClasses(classes.default, classes.verticalLayout, classes.flexGrow)}
            >
              <ActivityContext.Provider value={activityStore}>
                <ChatContext.Provider value={chatStore}>
                  <Routes>
                    <Route path="" element={<ChatPane />} />
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
    </FluentProvider>
  );
};

export default App;
