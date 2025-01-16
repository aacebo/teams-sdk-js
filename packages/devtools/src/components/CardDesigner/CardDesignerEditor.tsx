import { Card } from '@teams.sdk/cards';
import { EditorView, basicSetup } from 'codemirror';
import { json } from '@codemirror/lang-json';
import { useEffect, useRef } from 'react';

export interface CardDesignerEditorProps {
  readonly value?: Card;
  readonly onChange?: (value: Card) => void;
}

export default function CardDesignerEditor({ value }: CardDesignerEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    new EditorView({
      extensions: [basicSetup, json()],
      parent: ref.current,
      doc: value ? JSON.stringify(value, null, 2) : undefined,
    });
  }, [ref]);

  return (
    <div ref={ref} className="flex flex-col flex-1">
    </div>
  );
}
