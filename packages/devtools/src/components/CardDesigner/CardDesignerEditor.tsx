import { Card } from '@teams.sdk/cards';
import { EditorView, basicSetup } from 'codemirror';
import { json } from '@codemirror/lang-json';
import { EditorState } from '@codemirror/state';
import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';

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
    <div
      ref={ref}
      className="flex flex-col max-w-[50%] border-l dark:border-stone-800 shadow-md"
    />
  );
}

function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
