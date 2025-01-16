import * as cards from '@teams.sdk/cards';
import classNames from 'classnames';

import Card from './Card';
import { ActionCard } from './Actions';
import { ComponentProps } from 'react';

export interface AdaptiveCardProps extends ComponentProps<'div'> {
  readonly value: cards.Card;
}

export default function AdaptiveCard({ value, className }: AdaptiveCardProps) {
  return (
    <div className={classNames(className, 'flex flex-col rounded p-3 bg-white dark:bg-stone-800')}>
      {
        value.body && value.body.length > 0 && (
          <div className="flex flex-col">
            {value.body.map((item) => {
              return <Card value={item} />;
            })}
          </div>
        )
      }

      {
        value.actions && value.actions.length > 0 && (
          <div className="flex gap-1">
            {value.actions.map((action) => {
              return <ActionCard value={action} />;
            })}
          </div>
        )
      }
    </div>
  );
}
