import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router';

import * as icons from '@fluentui/react-icons';
import { ConsoleLogger } from '@teams.sdk/common/logging';

import { SocketClient } from './socket-client';
import { ActivityContext, ChatContext, useActivityStore, useChatStore } from './Stores';

import './App.css';
import Activities from './Screens/Activities';
import AutoChat from './Screens/AutoChat';
import Cards from './Screens/Cards';
import Chat from './Screens/Chat';
import Logs from './Screens/Logs';

const socket = new SocketClient();
const log = new ConsoleLogger('devtools');

export default function App() {
  const [connected, setConnected] = useState(false);
  const activityStore = useActivityStore();
  const chatStore = useChatStore();

  useEffect(() => {
    socket.connect(() => {
      log.info('connected...');
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
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2 border-b dark:border-stone-800 shadow-md">
          <div className="flex font-semibold my-auto">
            <img src="/devtools/teams.png" className="w-10 my-auto" />
            <div className="flex my-auto">
              DevTools
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connected ? 'bg-green-400' : 'bg-red-400'}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${connected ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-1 justify-end">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <icons.ChatRegular className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <icons.ChatFilled className="size-5 my-auto mr-1" />;
                }

                return (
                  <div className="flex">
                    {Icon}
                    Chat
                  </div>
                );
              }}
            />

            <NavLink
              to="/cards"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <icons.CardUiRegular className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <icons.CardUiFilled className="size-5 my-auto mr-1" />;
                }

                return (
                  <div className="flex">
                    {Icon}
                    Cards
                  </div>
                );
              }}
            />

            <NavLink
              to="/activities"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <icons.SearchRegular className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <icons.SearchFilled className="size-5 my-auto mr-1" />;
                }

                return (
                  <div className="flex">
                    {Icon}
                    Activities
                  </div>
                );
              }}
            />

            <NavLink
              to="/logs"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = (
                  <icons.DocumentBulletListRegular className="size-5 my-auto mr-1" />
                );

                if (isActive) {
                  Icon = <icons.DocumentBulletListFilled className="size-5 my-auto mr-1" />;
                }

                return (
                  <div className="flex">
                    {Icon}
                    Logs
                  </div>
                );
              }}
            />

            <NavLink
              to="/autochat"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <icons.ChatRegular className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <icons.ChatFilled className="size-5 my-auto mr-1" />;
                }

                return <div className="flex">{Icon} AutoChat</div>;
              }}
            />
          </div>
        </div>

        <ActivityContext.Provider value={activityStore}>
          <ChatContext.Provider value={chatStore}>
            <Routes>
              <Route path="" element={<Chat />} />
              <Route path="cards" element={<Cards />} />
              <Route path="activities" element={<Activities />} />
              <Route path="logs" element={<Logs />} />
              <Route path="autochat" element={<AutoChat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ChatContext.Provider>
        </ActivityContext.Provider>
      </BrowserRouter>
    </div>
  );
}
