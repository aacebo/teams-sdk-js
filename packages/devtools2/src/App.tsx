import React from 'react';
import ChatPane from './components/ChatPane/ChatPane';
import useGlobalStyles from './useGlobalStyles';

const App: React.FC = () => {
  const styles = useGlobalStyles();

  return (
    <div className={styles.default}>
      <ChatPane></ChatPane>
    </div>
  );
};

export default App;
