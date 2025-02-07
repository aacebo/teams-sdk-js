import React from 'react';
import * as client from '@teams.sdk/client';

import './App.css';

export default function App() {
  React.useEffect(() => {
    const app = new client.App();
    console.log('hit...', app);
  }, []);

  return <h1 className="App">Hello from SSR!</h1>;
}
