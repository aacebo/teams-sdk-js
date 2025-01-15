import * as cards from '@teams.sdk/cards';

import Card from './Card';
import { ActionCard } from './Actions';

export interface AdaptiveCardProps {
  readonly value: cards.Card;
}

export default function AdaptiveCard({ value }: AdaptiveCardProps) {
  return (
    <div className="flex flex-col p-3 bg-white dark:bg-stone-800">
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
