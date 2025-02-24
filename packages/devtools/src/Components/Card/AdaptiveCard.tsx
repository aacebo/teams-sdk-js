import * as cards from '@teams.sdk/cards';
import { makeStyles } from '@fluentui/react-components';
import Card from './Card';
import ActionCard from './Actions/ActionCard';
import { ComponentProps } from 'react';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.375rem', // rounded
    padding: '0.75rem', // p-3
    backgroundColor: 'white', // bg-white
    '@media (prefers-color-scheme: dark)': {
      backgroundColor: '#1f2937', // dark:bg-stone-800
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    gap: '0.25rem', // gap-1
  },
});

export interface AdaptiveCardProps extends ComponentProps<'div'> {
  readonly value: cards.Card;
}

export default function AdaptiveCard({ value, className }: AdaptiveCardProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${className}`}>
      {value.body && value.body.length > 0 && (
        <div className={classes.body}>
          {value.body.map((item, index) => {
            return <Card key={`card-${index}`} value={item} />;
          })}
        </div>
      )}

      {value.actions && value.actions.length > 0 && (
        <div className={classes.actions}>
          {value.actions.map((action) => {
            return <ActionCard key={action.id} value={action} />;
          })}
        </div>
      )}
    </div>
  );
}
