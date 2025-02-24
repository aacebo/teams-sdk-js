import { Container } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import Card from '../Card';

export interface ContainerCardProps {
  readonly value: Container;
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

export default function ContainerCard({ value }: ContainerCardProps) {
  const classes = useStyles();
  const gapClass = `${value.spacing} || classes.medium`;

  return (
    <div className={mergeClasses(classes.container, gapClass)}>
      {value.items.map((item, index) => {
        return <Card key={`cardContainer-${index}`} value={item} />;
      })}
    </div>
  );
}
