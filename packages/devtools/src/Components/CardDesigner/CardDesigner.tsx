import { Card, Element } from '@teams.sdk/cards';
import { useEffect, useState } from 'react';
import prettier from 'prettier';
import parserTypeScript from 'prettier/parser-typescript';
import estree from 'prettier/plugins/estree';

import CardDesignerContent from './CardDesignerContent';
import CardDesignerEditor from './CardDesignerEditor';
import CardDesignerSidebar from './CardDesignerSidebar';

export interface CardDesignerProps {
  readonly value?: Card;
  readonly onChange?: (value: Card) => void;
}

export default function CardDesigner({ value, onChange }: CardDesignerProps) {
  const [card, setCard] = useState<Card>(value || Card());
  const [typescript, setTypescript] = useState<string>();
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    if (!onChange) return;
    onChange(card);
  }, [card, onChange]);

  useEffect(() => {
    (async () => {
      if (!typescript) return;
      const pretty = await prettier.format(`Card([${typescript}]);`, {
        parser: 'typescript',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        plugins: [parserTypeScript, estree],
      });

      setFormatted(pretty);
    })();
  }, [typescript]);

  const onSelect = (el: Element, ts: string) => {
    if (!card.body) {
      card.body = [];
    }

    card.body.push(el);
    setCard({ ...card });
    setTypescript([typescript, ts].filter((v) => !!v).join(','));
  };

  const onEditorUpdate = (value: Card) => {
    setCard({ ...value });
  };

  return (
    <div className="flex flex-1 min-h-0">
      <CardDesignerSidebar onSelect={onSelect} />
      <CardDesignerContent value={card} />
      <CardDesignerEditor value={card} typescript={formatted} onChange={onEditorUpdate} />
    </div>
  );
}
