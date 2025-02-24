import { ActionSet } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import ActionCard from '../Actions/ActionCard';

export interface ActionSetCardProps {
  readonly value: ActionSet;
}


const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '0.25rem', // default gap
  },
  small: {
    gap: '0.125rem', // small gap
  },
  medium: {
    gap: '0.5rem', // medium gap
  },
  large: {
    gap: '0.75rem', // large gap
  },
  extraLarge: {
    gap: '1rem', // extra large gap
  },
  padding: {
    gap: '1.25rem', // padding gap
  },
});

export default function ActionSetCard({ value }: ActionSetCardProps) {
  const classes = useStyles();
  const gapClass = `${value.spacing} || ${classes.medium}`  

  return (
    <div className={mergeClasses(classes.container, gapClass)}>
      {value.actions?.map((action) => {
        return <ActionCard key={action.id} value={action} />;
      })}
    </div>
  );
}
