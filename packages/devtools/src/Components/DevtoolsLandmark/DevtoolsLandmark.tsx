import { FC } from 'react';
import { Badge, Title3 } from '@fluentui/react-components';
import useStyles from './DevtoolsLandmark.styles';

interface DevtoolsProps {
  connected: boolean;
}

const Devtools: FC<DevtoolsProps> = ({ connected }) => {
  const styles = useStyles();

  return (
    <div data-tid="devtools-" className={styles.devtoolsLandmark}>
      <img src="/devtools/teams.png" className={styles.teamsImg} />
      <Title3 as="h1" align="center">
        DevTools
      </Title3>
      <Badge color={connected ? 'success' : 'danger'} size="extra-small" className={styles.badge}>
        <div className={connected ? styles.pingAnimation : ''} />
      </Badge>
    </div>
  );
};

export default Devtools;
