import React from 'react';
import * as client from '@teams.sdk/client';
import { ConsoleLogger } from '@teams.sdk/common';

import './App.css';

export default function App() {
  const [context, setContext] = React.useState<client.Context>();

  React.useEffect(() => {
    (async () => {
      const app = new client.App({
        logger: new ConsoleLogger('@samples/tab', { level: 'debug' }),
      });

      const context = await app.connect();
      setContext(context);

      const res = await app.getUser();
      app.log.info(res);
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
