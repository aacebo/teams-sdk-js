import { Column } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import Card from '../Card';

export interface ColumnCardProps {
  readonly value: Column;
}


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
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

export default function ColumnCard({ value }: ColumnCardProps) {
  const classes = useStyles();
  const gapClass = value.style || classes.medium;

  return (
    <div className={mergeClasses(classes.container, gapClass)}>
      {value.items?.map((item, index) => {
        return <Card key={`card-${index}`} value={item} />;
      })}
    </div>
  );
}
