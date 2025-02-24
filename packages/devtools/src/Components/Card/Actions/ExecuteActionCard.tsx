import { ExecuteAction } from '@teams.sdk/cards';
import { mergeClasses, makeStyles } from '@fluentui/react-components';
import Tooltip from '../../Tooltip';

export interface ExecuteActionCardProps {
  readonly value: ExecuteAction;
}

const useStyles = makeStyles({
  button: {
    display: 'inline-flex',
    padding: '0.25rem 0.75rem',
    gap: '0.25rem',
    fontWeight: 600,
    border: '1px solid transparent',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    '&.default': {
      backgroundColor: '#1f2937',
      border: '1px solid #4b5563',
      color: '#9ca3af',
    },
    '&.positive': {
      backgroundColor: '#0ea5e9',
      border: '1px solid #0c4a6e',
    },
    '&.destructive': {
      backgroundColor: '#b91c1c',
      border: '1px solid #991b1b',
    },
  },
});

export default function ExecuteActionCard({ value }: ExecuteActionCardProps) {
  const classes = useStyles();

  return (
    <Tooltip body={value.tooltip}>
      <ExecuteActionCardContent value={value} classes={classes} />
    </Tooltip>
  );
}

function ExecuteActionCardContent({ value, classes }: ExecuteActionCardProps & { classes: any }) {

  return (
    <button className={mergeClasses(classes.base,
      value.style ? classes[value.style] : classes.default)}>
      {value.iconUrl && <img src={value.iconUrl} draggable={false} />}
      {value.title}
    </button>
  );
}
