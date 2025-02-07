import React from 'react';

export default function App() {
  React.useEffect(() => {
    console.log('hit...');
  }, []);

  return <h1>Hello from SSR!</h1>;
}
