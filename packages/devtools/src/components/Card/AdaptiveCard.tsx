import * as cards from '@teams.sdk/cards';

import Card from './Card';

export interface AdaptiveCardProps {
  readonly value: cards.Card;
}

export default function AdaptiveCard({ value }: AdaptiveCardProps) {
  return (
    <>
      {value.body?.map((item) => {
        return <Card value={item} />;
      })}
    </>
  );
}
