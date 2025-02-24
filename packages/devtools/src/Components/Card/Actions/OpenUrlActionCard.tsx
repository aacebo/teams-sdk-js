import { OpenUrlAction } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import Tooltip from '../../Tooltip';

export interface OpenUrlActionCardProps {
  readonly value: OpenUrlAction;
}


const useStyles = makeStyles({
  link: {
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

export default function OpenUrlActionCard({ value }: OpenUrlActionCardProps) {

  return (
    <Tooltip body={value.tooltip}>
      <OpenUrlActionCardContent value={value}  />
    </Tooltip>
  );
}

function OpenUrlActionCardContent({ value }: OpenUrlActionCardProps) {
  const classes = useStyles();

  return (
    <a href={value.url} target="_blank" className={mergeClasses(classes.link, `${value.style || 'default'}`)}>
      {value.iconUrl && <img src={value.iconUrl} draggable={false} />}
      {value.title}
    </a>
  );
}
