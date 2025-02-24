import { Badge } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

import Tooltip from '../../Tooltip';
import IconCard from './IconCard';

export interface BadgeCardProps {
  readonly value: Badge;
}

// Define styles using makeStyles
const useStyles = makeStyles({
  badge: {
    display: 'inline-flex',
    padding: '0.5rem 0.75rem', // Adjust padding as needed
    fontWeight: 600,
    border: '1px solid transparent',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    '&.default': {
      backgroundColor: '#1f2937',
      border: '1px solid #4b5563',
      color: '#9ca3af',
    },
    '&.subtle': {
      backgroundColor: '#1f2937',
      border: '1px solid #4b5563',
      color: '#9ca3af',
    },
    '&.informative': {
      backgroundColor: '#1f2937',
      border: '1px solid #4b5563',
    },
    '&.accent': {
      backgroundColor: '#0ea5e9',
      border: '1px solid #0c4a6e',
    },
    '&.good': {
      backgroundColor: '#4ade80',
      border: '1px solid #4ade80',
    },
    '&.attention': {
      backgroundColor: '#f87171',
      border: '1px solid #991b1b',
    },
    '&.warning': {
      backgroundColor: '#fbbf24',
      border: '1px solid #fbbf24',
      color: 'black',
    },
  },
});

export default function BadgeCard({ value }: BadgeCardProps) {
  if (value.tooltip) {
    return (
      <Tooltip body={value.tooltip}>
        <BadgeCardContent value={value} />
      </Tooltip>
    );
  }

  return <BadgeCardContent value={value} />;
}

function BadgeCardContent({ value }: BadgeCardProps) {
  const classes = useStyles();
  
  return (
    <div className={mergeClasses(classes.badge, value.style)}>
      {value.icon && (
        <IconCard
          className="my-auto"
          value={{
            type: 'Icon',
            name: value.icon,
          }}
        />
      )}
      <span className="ml-1 my-auto">{value.text}</span>
    </div>
  );
}
