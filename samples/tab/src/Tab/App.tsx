import React from 'react';
import * as client from '@teams.sdk/client';

import './App.css';

export default function App() {
  const [context, setContext] = React.useState<client.Context>();

  React.useEffect(() => {
    (async () => {
      const app = new client.App();
      const ctx = await app.connect();
      setContext(ctx);
    })();
  }, []);

  return (
    <div className="App">
      <pre>
        <code>{JSON.stringify(context)}</code>
      </pre>
    </div>
  );
}
