import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router';
import * as solids from '@heroicons/react/24/solid';
import * as outlines from '@heroicons/react/24/outline';

import './App.css';
import Logs from './screens/Logs';
import Activities from './screens/Activities';
import { Client, ClientContext } from './client';
import { State, StateContext } from './state';

const client = new Client();

export default function App() {
  const [state, setState] = useState<State>({
    activities: [],
  });

  useEffect(() => {
    client.connect();
    client.on('activity', (event) => {
      const i = state.activities.findIndex(e => e.id === event.id);

      if (i > -1) {
        state.activities[i] = {
          ...state.activities[i],
          type: event.type,
          body: event.body,
          sentAt: state.activities[i].sentAt,
          updatedAt: event.sentAt,
        };
      } else {
        state.activities.push(event);
      }

      setState({ ...state });
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2">
          <div className="flex font-semibold my-auto">
            <img src="/devtools/teams.png" className="w-10 my-auto" />
            <div className="my-auto">
              Devtools
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

        <StateContext.Provider value={state}>
          <ClientContext.Provider value={client}>
            <Routes>
              <Route path="logs" element={<Logs />} />
              <Route path="activities" element={<Activities />} />
              <Route path="*" element={<Navigate to="/logs" replace />} />
            </Routes>
          </ClientContext.Provider>
        </StateContext.Provider>
      </BrowserRouter>
    </div>
  );
}
