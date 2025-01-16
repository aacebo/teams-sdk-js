import { Card, Element } from '@teams.sdk/cards';
import { useEffect, useState } from 'react';

import CardDesignerContent from './CardDesignerContent';
import CardDesignerEditor from './CardDesignerEditor';
import CardDesignerSidebar from './CardDesignerSidebar';

export interface CardDesignerProps {
  readonly value?: Card;
  readonly onChange?: (value: Card) => void;
}

export default function CardDesigner({ value, onChange }: CardDesignerProps) {
  const [card, setCard] = useState<Card>(value || Card());

  useEffect(() => {
    if (!onChange) return;
    onChange(card);
  }, [card, onChange]);

  const onSelect = (el: Element) => {
    if (!card.body) {
      card.body = [];
    }

    card.body.push(el);
    setCard({ ...card });
  };

  return (
    <div className="flex flex-1">
      <CardDesignerSidebar onSelect={onSelect} />
      <CardDesignerContent value={card} />
      <CardDesignerEditor value={card} />
    </div>
  );
}
