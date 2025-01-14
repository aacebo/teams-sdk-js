import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router';
import { Message } from '@teams.sdk/api';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import * as solids from '@heroicons/react/24/solid';
import * as outlines from '@heroicons/react/24/outline';

import './App.css';
import Cards from './screens/Cards';
import Activities from './screens/Activities';
import Logs from './screens/Logs';
import Chat from './screens/Chat';
import { SocketClient } from './socket-client';
import { ActivitiesContext, ChatState, ChatContext, ActivitiesState, DEFAULT_CHAT } from './state';

const socket = new SocketClient();
const log = new ConsoleLogger('devtools');

export default function App() {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ActivitiesState['activities']>([]);
  const [chats, setChats] = useState<ChatState['chats']>([DEFAULT_CHAT]);
  const [chat, setChat] = useState<ChatState['chat']>(DEFAULT_CHAT);
  const [messages, setMessages] = useState<Record<string, Array<Message>>>({ });

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
        const chatMessages = messages[event.body.conversation.id] || [];

        if (event.body.type === 'message') {
          chatMessages.push({
            id: event.body.id,
            replyToId: event.body.replyToId,
            messageType: 'message',
            attachments: event.body.attachments,
            attachmentLayout: event.body.attachmentLayout,
            reactions: [],
            body: {
              content: event.body.text,
              contentType: 'text',
              textContent: event.body.text,
            },
            from: {
              conversation: {
                id: event.body.conversation.id,
                displayName: event.body.conversation.name,
              },
              user: event.body.from ? {
                id: event.body.from.id,
                displayName: event.body.from.name,
              } : undefined,
            },
            createdDateTime: (event.body.timestamp || new Date()).toUTCString(),
          });
        } else if (event.body.type === 'messageUpdate') {
          const i = chatMessages.findIndex(m => m.id === event.body.id);

          if (i === -1) return;

          if (event.body.text) {
            if (!chatMessages[i].body) {
              chatMessages[i].body = { };
            }

            chatMessages[i].body.content = event.body.text;
            chatMessages[i].body.textContent = event.body.text;
          }

          chatMessages[i].lastModifiedDateTime = (event.body.timestamp || new Date()).toUTCString();
        } else if (event.body.type === 'messageDelete') {
          const i = chatMessages.findIndex(m => m.id === event.body.id);

          if (i === -1) return;

          chatMessages[i].deleted = true;
        } else if (event.body.type === 'messageReaction') {
          const i = chatMessages.findIndex(m => m.id === event.body.id);

          if (i === -1) return;

          const reactions = chatMessages[i].reactions || [];

          for (const removed of event.body.reactionsRemoved || []) {
            const j = reactions.findIndex(r => r.type === removed.type && r.user?.id === 'devtools');

            if (j === -1) continue;

            reactions.splice(j, 1);
          }

          for (const added of event.body.reactionsAdded || []) {
            reactions.push(added);
          }

          chatMessages[i].reactions = reactions;
        }

        messages[event.body.conversation.id] = chatMessages;
        setMessages({ ...messages });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2">
          <div className="flex font-semibold my-auto">
            <img src="/devtools/teams.png" className="w-10 my-auto" />
            <div className="flex my-auto">
              DevTools
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
              </span>
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
              to="/cards"
              className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}
              children={({ isActive }) => {
                let Icon: JSX.Element = <outlines.ComputerDesktopIcon className="size-5 my-auto mr-1" />;

                if (isActive) {
                  Icon = <solids.ComputerDesktopIcon className="size-5 my-auto mr-1" />;
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
          </div>
        </div>

        <ActivitiesContext.Provider value={{ activities: events, setActivities: setEvents }}>
          <ChatContext.Provider value={{ chats, setChats, chat, setChat, messages, setMessages }}>
            <Routes>
              <Route path="" element={<Chat />} />
              <Route path="cards" element={<Cards />} />
              <Route path="activities" element={<Activities />} />
              <Route path="logs" element={<Logs />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ChatContext.Provider>
        </ActivitiesContext.Provider>
      </BrowserRouter>
    </div>
  );
}
