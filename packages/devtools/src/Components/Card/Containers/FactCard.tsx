import { Fact } from '@teams.sdk/cards';
import { makeStyles } from '@fluentui/react-components';

export interface FactCardProps {
  readonly value: Fact;
}


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    color: 'black',
    '@media (prefers-color-scheme: dark)': {
      color: '#D1D5DB', // dark:text-stone-300
    },
  },
  title: {
    fontWeight: 600,
    marginRight: '0.5rem', // mr-2
  },
});

export default function FactCard({ value }: FactCardProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>{value.title}</div>
      {value.value}
    </div>
  );
}
