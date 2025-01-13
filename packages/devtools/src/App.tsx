import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router';
import { Activity } from '@teams.sdk/api';
import * as solids from '@heroicons/react/24/solid';
import * as outlines from '@heroicons/react/24/outline';

import './App.css';
import Logs from './screens/Logs';
import Activities from './screens/Activities';
import Chat from './screens/Chat';
import { SocketClient } from './socket-client';
import { ActivitiesContext, ChatState, ChatContext, ActivitiesState, DEFAULT_CHAT } from './state';

const socket = new SocketClient();

export default function App() {
  const [events, setEvents] = useState<ActivitiesState['activities']>([]);
  const [chats, setChats] = useState<ChatState['chats']>([DEFAULT_CHAT]);
  const [chat, setChat] = useState<ChatState['chat']>(DEFAULT_CHAT);
  const [activities, setActivities] = useState<Record<string, Array<Activity>>>({ });

  useEffect(() => {
    socket.connect();
    socket.on('activity', (event) => {
      const i = events.findIndex(e => e.id === event.id);

      if (i > -1) {
        events[i] = {
          ...events[i],
          type: event.type,
          body: event.body,
          sentAt: events[i].sentAt,
          updatedAt: event.sentAt,
        };
      } else {
        events.push(event);
      }

      setEvents([ ...events ]);

      if (event.type === 'received' || event.type === 'sent') {
        const chatActivities = activities[event.body.conversation.id] || [];
        chatActivities.push(event.body);
        activities[event.body.conversation.id] = chatActivities;
        setActivities({ ...activities });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2">
          <div className="flex font-semibold my-auto">
            <img src="/devtools/teams.png" className="w-10 my-auto" />
            <div className="my-auto">
              DevTools
            </div>
          </div>

          <div className="flex flex-1 justify-end">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <outlines.ChatBubbleOvalLeftIcon className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <solids.ChatBubbleOvalLeftIcon className="size-5 my-auto mr-1" />;
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
              to="/logs"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <outlines.DocumentTextIcon className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <solids.DocumentTextIcon className="size-5 my-auto mr-1" />;
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
              to="/activities"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <outlines.BoltIcon className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <solids.BoltIcon className="size-5 my-auto mr-1" />;
                }

                return (
                  <div className="flex">
                    {Icon}
                    Activities
                  </div>
                );
              }}
            />
          </div>
        </div>

        <ActivitiesContext.Provider value={{ activities: events, setActivities: setEvents }}>
          <ChatContext.Provider value={{ chats, setChats, chat, setChat, activities, setActivities }}>
            <Routes>
              <Route path="" element={<Chat />} />
              <Route path="logs" element={<Logs />} />
              <Route path="activities" element={<Activities />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ChatContext.Provider>
        </ActivitiesContext.Provider>
      </BrowserRouter>
    </div>
  );
}
