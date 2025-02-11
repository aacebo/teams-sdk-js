import React from 'react';

import useGlobalStyles from './useGlobalStyles';

const App: React.FC = () => {
  const styles = useGlobalStyles();

  return <div className={styles.body}></div>;
};

export default App;
