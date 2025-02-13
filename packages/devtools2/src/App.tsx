import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import {
  ChatRegular,
  ChatFilled,
  CardUiRegular,
  CardUiFilled,
  SearchRegular,
  SearchFilled,
  DocumentBulletListRegular,
  DocumentBulletListFilled,
} from '@fluentui/react-icons';
import { FluentProvider, mergeClasses } from '@fluentui/react-components';

import { ConsoleLogger } from '@teams.sdk/common/logging';
import { ChatContext, useChatStore } from './Stores/Chat';
import { ActivityContext, useActivityStore } from './Stores/Activity';
import getTheme from './Utils/get-theme';
import { SocketClient } from './socket-client';

import ChatPane from './components/ChatPane/ChatPane';
import useGlobalStyles from './useGlobalStyles';
import TopNavButton from './components/TopNavButton/TopNavButton';
import DevtoolsLandmark from './components/DevToolsLandmark/DevToolsLandmark';

const socket = new SocketClient();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const classes = useGlobalStyles();
  const [connected, setConnected] = useState(false);
  const activityStore = useActivityStore();
  const chatStore = useChatStore();

  let log: ConsoleLogger;
  try {
    log = new ConsoleLogger('devtools');
  } catch (error) {
    console.error('Logger initialization failed:', error);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
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
        className={mergeClasses(classes.default, classes.verticalLayout, classes.appContainer)}
      >
        <BrowserRouter basename="/devtools2" data-tid="browser-router">
          <div
            data-tid="top-nav"
            className={mergeClasses(classes.horizontalLayout, classes.topNav)}
          >
            <div data-tid="landmark-container" className={classes.flexGrow}>
              <DevtoolsLandmark connected={connected} />
            </div>
            <div data-tid="nav-button-container" className={classes.navButtonContainer}>
              <TopNavButton
                to="/"
                icon={<ChatRegular />}
                activeIcon={<ChatFilled />}
                label="Chat"
              />
              <TopNavButton
                to="/cards"
                icon={<CardUiRegular />}
                activeIcon={<CardUiFilled />}
                label="Cards"
              />
              <TopNavButton
                to="/activities"
                icon={<SearchRegular />}
                activeIcon={<SearchFilled />}
                label="Activities"
              />
              <TopNavButton
                to="/logs"
                icon={<DocumentBulletListRegular />}
                activeIcon={<DocumentBulletListFilled />}
                label="Logs"
              />
            </div>
          </div>
          <div
            data-tid="app-routes"
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
          </div>
        </BrowserRouter>
      </div>
    </FluentProvider>
  );
};

export default App;
