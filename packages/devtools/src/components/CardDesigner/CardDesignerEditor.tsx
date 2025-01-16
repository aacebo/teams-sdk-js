import { Card } from '@teams.sdk/cards';
import { json } from '@codemirror/lang-json';
import { EditorState } from '@codemirror/state';
import { atomone } from '@uiw/codemirror-themes-all';
import { EditorView, basicSetup } from 'codemirror';
import { jsonSchema } from 'codemirror-json-schema';
import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';

import $schema from './json-schema.draft-6.json';
import './CardDesignerEditor.css';

export interface CardDesignerEditorProps {
  readonly value?: Card;
  readonly onChange?: (value: Card) => void;
}

export default function CardDesignerEditor({ value, onChange }: CardDesignerEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    setView(new EditorView({
      parent: ref.current,
      state: EditorState.create({
        doc: value ? JSON.stringify(value, null, 2) : undefined,
        extensions: [
          basicSetup,
          json(),
          jsonSchema($schema as any),
          atomone,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged || !onChange) return;

            try {
              const card = JSON.parse(update.state.doc.toString());
              onChange(card);
            } catch (err) { }
          }),
        ],
      }),
    }));
  }, [ref]);

  useEffect(() => {
    if (!view || !value) return;
    if (isEqual(tryParseJson(view.state.doc.toString()), value)) return;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }, [value]);

  return (
    <div ref={ref} className="CardDesignerEditor" />
  );
}

function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
