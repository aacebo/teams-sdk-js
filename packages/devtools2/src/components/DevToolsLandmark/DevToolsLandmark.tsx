import { FC } from 'react';
import { Badge, Text, Tooltip } from '@fluentui/react-components';
import useStyles from './DevtoolsLandmark.styles';

interface DevtoolsLandmarkProps {
  connected: boolean;
}

const DevtoolsLandmark: FC<DevtoolsLandmarkProps> = ({ connected }) => {
  const classes = useStyles();

  return (
    <div data-tid="devtools-" className={classes.devtoolsLandmark}>
      <img src="/devtools2/teams.png" className={classes.teamsImg} role="presentation" />
      <Text as="h1" size={500} weight="semibold">
        DevTools
      </Text>
      <Tooltip content={connected ? 'Connected' : 'Disconnected'} relationship="description">
        <Badge
          data-tid="badge"
          aria-label={connected ? 'Connected' : 'Disconnected'}
          color={connected ? 'success' : 'danger'}
          size="extra-small"
          className={classes.badge}
        >
          <div className={connected ? classes.pingAnimation : ''} />
        </Badge>
      </Tooltip>
    </div>
  );
};

export default DevtoolsLandmark;
