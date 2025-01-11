import { useEffect } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router';
import { WifiIcon } from '@heroicons/react/24/solid';
import { DocumentTextIcon, BoltIcon } from '@heroicons/react/24/outline';

import './App.css';
import Logs from './screens/Logs';
import Activities from './screens/Activities';
import { Client, ClientContext } from './client';

const client = new Client();

export default function App() {
  useEffect(() => {
    client.connect();
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2">
          <span className="font-semibold">Teams Devtools</span>
          <div className="flex flex-1 justify-end">
            <NavLink to="/logs" className={({ isActive }) => isActive ? 'App__route active' : 'App__route'}>
              <DocumentTextIcon className="size-5 my-auto mr-1" />
              Logs
            </NavLink>

            <NavLink to="/activities" className={({ isActive }) => isActive ? 'App__route active' : 'App__route'}>
              <BoltIcon className="size-5 my-auto mr-1" />
              Activities
            </NavLink>

            <NavLink to="/network" className={({ isActive }) => isActive ? 'App__route active' : 'App__route'}>
              <WifiIcon className="size-5 my-auto mr-1" />
              Network
            </NavLink>
          </div>
        </div>

        <ClientContext.Provider value={client}>
          <Routes>
            <Route path="logs" element={<Logs />} />
            <Route path="activities" element={<Activities />} />
            <Route path="*" element={<Navigate to="/logs" replace />} />
          </Routes>
        </ClientContext.Provider>
      </BrowserRouter>
    </div>
  );
}
