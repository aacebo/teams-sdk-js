import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router';
import { WifiIcon } from '@heroicons/react/24/solid';
import { DocumentTextIcon, BoltIcon } from '@heroicons/react/24/outline';

import './App.css';
import Logs from './screens/Logs';
import Activities from './screens/Activities';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/devtools">
        <div className="flex px-5 py-2">
          <span className="font-semibold">Teams Devtools</span>
          <div className="flex flex-1 justify-end">
            <Link className="App__route" to="/logs">
              <DocumentTextIcon className="size-5 my-auto mr-1" />
              Logs
            </Link>

            <Link className="App__route" to="/activities">
              <BoltIcon className="size-5 my-auto mr-1" />
              Activities
            </Link>

            <Link className="App__route" to="/network">
              <WifiIcon className="size-5 my-auto mr-1" />
              Network
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="logs" element={<Logs />} />
          <Route path="activities" element={<Activities />} />
          <Route path="*" element={<Navigate to="/logs" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
