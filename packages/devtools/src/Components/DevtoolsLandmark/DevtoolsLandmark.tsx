import { FC } from 'react';
import { Badge, Title3, Tooltip } from '@fluentui/react-components';
import useStyles from './DevtoolsLandmark.styles';

interface DevtoolsLandmarkProps {
  connected: boolean;
}

const DevtoolsLandmark: FC<DevtoolsLandmarkProps> = ({ connected }) => {
  const styles = useStyles();

  return (
    <div data-tid="devtools-" className={styles.devtoolsLandmark}>
      <img src="/devtools/teams.png" className={styles.teamsImg} />
      <Title3 as="h1" align="center">
        DevTools
      </Title3>
      <Tooltip content={connected ? 'Connected' : 'Disconnected'} relationship="description">
        <Badge
          aria-label={connected ? 'Connected' : 'Disconnected'}
          color={connected ? 'success' : 'danger'}
          size="extra-small"
          className={styles.badge}
        >
          <div className={connected ? styles.pingAnimation : ''} />
        </Badge>
      </Tooltip>
    </div>
  );
};

export default DevtoolsLandmark;
