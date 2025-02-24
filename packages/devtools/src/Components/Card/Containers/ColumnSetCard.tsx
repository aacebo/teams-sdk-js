import { ColumnSet } from '@teams.sdk/cards';
import { makeStyles } from '@fluentui/react-components';
import ColumnCard from './ColumnCard';

export interface ColumnSetCardProps {
  readonly value: ColumnSet;
}


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
  small: {
    gap: '0.125rem',
  },
  medium: {
    gap: '0.5rem',
  },
  large: {
    gap: '0.75rem',
  },
  extraLarge: {
    gap: '1rem',
  },
  padding: {
    gap: '1.25rem',
  },
});

export default function ColumnSetCard({ value }: ColumnSetCardProps) {
  const classes = useStyles();
  const gapClass = `${value.spacing} || classes.medium`

  return (
    <div className={`${classes.container} ${gapClass}`}>
      {value.columns?.map((column) => {
        return <ColumnCard key={column.id} value={column} />;
      })}
    </div>
  );
}
