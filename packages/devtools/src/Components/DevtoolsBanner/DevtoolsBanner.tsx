import { FC } from 'react';
import { Badge, Text, Tooltip } from '@fluentui/react-components';
import useClasses from './DevtoolsBanner.styles';

interface DevtoolsBannerProps {
  connected: boolean;
}

const DevtoolsBanner: FC<DevtoolsBannerProps> = ({ connected }) => {
  const classes = useClasses();

  return (
    <div data-tid="devtools-" className={classes.devtoolsLandmark}>
      <img src="/devtools/teams.png" className={classes.teamsImg} role="presentation" />
      <Text as="h1" size={500} weight="semibold">
        DevTools
      </Text>
      <Tooltip content={connected ? 'Connected' : 'Disconnected'} relationship="description">
        <Badge
          data-tid="status badge"
          role="status"
          aria-label={connected ? 'Connected' : 'Disconnected'}
          color={connected ? 'success' : 'danger'}
          size="extra-small"
          className={classes.badge}
        >
          <div className={connected ? classes.pingAnimation : ''} />
        </Badge>
      </Tooltip>
      <Badge aria-label="Beta" appearance="tint" className={classes.betaBadge}>
        Beta
      </Badge>
    </div>
  );
};

export default DevtoolsBanner;
