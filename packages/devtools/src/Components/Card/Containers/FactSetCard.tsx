import { FactSet } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import FactCard from './FactCard';

export interface FactSetCardProps {
  readonly value: FactSet;
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

export default function FactSetCard({ value }: FactSetCardProps) {
  const classes = useStyles();
  const gapClass = `${value.spacing} || classes.medium`;

  return (
    <div className={mergeClasses(classes.container, gapClass)}>
      {value.facts?.map((fact, index) => {
        return <FactCard key={`fact-${index}`} value={fact} />;
      })}
    </div>
  );
}
