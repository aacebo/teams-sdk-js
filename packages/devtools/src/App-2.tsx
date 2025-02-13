import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import * as icons from '@fluentui/react-icons';
import { mergeClasses } from '@fluentui/react-components';

import { ConsoleLogger } from '@teams.sdk/common/logging';

import { SocketClient } from './socket-client';
import { ActivityContext, ChatContext, useActivityStore, useChatStore } from './Stores';

import ChatPane from './components/ChatPane/ChatPane';
import useGlobalStyles from './useGlobalStyles';
import Cards from './Screens/Cards';
import Activities from './Screens/Activities';
import Logs from './Screens/Logs';
import DevtoolsLandmark from './Components/DevtoolsLandmark/DevtoolsLandmark';
import TopNavButton from './Components/TopNavButton/TopNavButton';
import './App.css';

const socket = new SocketClient();
const log = new ConsoleLogger('devtools');

const App: FC = () => {
  const [connected, setConnected] = useState(false);
  const activityStore = useActivityStore();
  const chatStore = useChatStore();
  const styles = useGlobalStyles();

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

  return (
    <div
      data-tid="app-container"
      className={mergeClasses(styles.verticalLayout, styles.appContainer)}
    >
      <BrowserRouter basename="/devtools" data-tid="browser-router">
        <div data-tid="top-nav" className={mergeClasses(styles.horizontalLayout, styles.topNav)}>
          <div data-tid="landmark-container" className={styles.flexGrow}>
            <DevtoolsLandmark connected={connected} />
          </div>
          <div data-tid="nav-button-container" className={styles.navButtonContainer}>
            <TopNavButton
              to="/"
              icon={<icons.ChatRegular />}
              activeIcon={<icons.ChatFilled />}
              label="Chat"
            />
            <TopNavButton
              to="/cards"
              icon={<icons.CardUiRegular />}
              activeIcon={<icons.CardUiFilled />}
              label="Cards"
            />
            <TopNavButton
              to="/activities"
              icon={<icons.SearchRegular />}
              activeIcon={<icons.SearchFilled />}
              label="Activities"
            />
            <TopNavButton
              to="/logs"
              icon={<icons.DocumentBulletListRegular />}
              activeIcon={<icons.DocumentBulletListFilled />}
              label="Logs"
            />
          </div>
        </div>
        <div
          data-tid="app-routes"
          className={mergeClasses(styles.default, styles.verticalLayout, styles.flexGrow)}
        >
          <ActivityContext.Provider value={activityStore}>
            <ChatContext.Provider value={chatStore}>
              <Routes>
                <Route path="" element={<ChatPane connected={connected} />} />
                <Route path="cards" element={<Cards />} />
                <Route path="activities" element={<Activities />} />
                <Route path="logs" element={<Logs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ChatContext.Provider>
          </ActivityContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
