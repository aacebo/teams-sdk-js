import React from 'react';

import './App.css';

export default function App() {
  React.useEffect(() => {
    console.log('hit...');
  }, []);

  return <h1 className="App">Hello from SSR!</h1>;
}
