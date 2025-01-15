import * as cards from '@teams.sdk/cards';

import Card from './Card';

export interface AdaptiveCardProps {
  readonly value: cards.Card;
}

export default function AdaptiveCard({ value }: AdaptiveCardProps) {
  return (
    <div className="flex flex-col p-3 bg-white dark:bg-stone-800">
      {value.body?.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
}
