import React from 'react';
import * as client from '@teams.sdk/client';

import './App.css';

export default function App() {
  const [context, setContext] = React.useState<client.Context>();

  React.useEffect(() => {
    (async () => {
      const app = new client.App();
      const context = await app.connect();
      setContext(context);
    })();
  }, []);

  return (
    <div className="App">
      <pre>
        <code>{JSON.stringify(context, null, 2)}</code>
      </pre>
    </div>
  );
}
