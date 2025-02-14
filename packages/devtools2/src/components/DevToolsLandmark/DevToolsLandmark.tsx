import { FC } from 'react';
import { Badge, Text, Tooltip } from '@fluentui/react-components';
import useStyles from './DevtoolsLandmark.styles';

interface DevtoolsLandmarkProps {
  connected: boolean;
}

const DevtoolsLandmark: FC<DevtoolsLandmarkProps> = ({ connected }) => {
  const styles = useStyles();

  return (
    <div data-tid="devtools-" className={styles.devtoolsLandmark}>
      <img src="/devtools2/teams.png" className={styles.teamsImg} role="presentation" />
      <Text as="h1" size={500} weight="semibold">
        DevTools
      </Text>
      <Tooltip content={connected ? 'Connected' : 'Disconnected'} relationship="description">
        <Badge
          data-tid="badge"
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
