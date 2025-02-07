import React from 'react';
import * as client from '@teams.sdk/client';

import './App.css';

export default function App() {
  const [id, setId] = React.useState<string>();
  const [name, setName] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      const app = new client.App();
      await app.connect();

      setId(app.id);
      setName(app.name);

      app.log.info(app.id);
    })();
  }, []);

  return (
    <div className="App">
      <h1>{id}</h1>
      <h2>{name}</h2>
    </div>
  );
}
