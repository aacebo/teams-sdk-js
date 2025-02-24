import { useEffect, useRef, useState } from 'react';
import { Card } from '@teams.sdk/cards';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { ViewUpdate } from '@codemirror/view';
import { atomone } from '@uiw/codemirror-themes-all';
import { EditorView, basicSetup } from 'codemirror';

import './CardDesignerEditor.css';

export interface CardDesignerEditorProps {
  readonly value?: Card;
  readonly typescript?: string;
  readonly onChange?: (value: Card) => void;
}

export default function CardDesignerEditor({
  value,
  typescript,
  onChange,
}: CardDesignerEditorProps) {
  return (
    <TabGroup className="card-designer-editor">
      <TabList className="tab-list">
        <Tab key="json" className="tab">
          Json
        </Tab>
        <Tab key="typescript" className="tab">
          Typescript
        </Tab>
      </TabList>
      <TabPanels className="tab-panels">
        <TabPanel className="tab-panel">
          <CardDesignerJsonEditor value={value} onChange={onChange} />
        </TabPanel>
        <TabPanel className="tab-panel">
          <CardDesignerTypescriptEditor value={typescript} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

export interface CardDesignerJsonEditorProps {
  readonly value?: Card;
  readonly onChange?: (value: Card) => void;
}

export function CardDesignerJsonEditor({ value, onChange }: CardDesignerJsonEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    setView(
      new EditorView({
        parent: ref.current,
        state: EditorState.create({
          doc: value ? JSON.stringify(value, null, 2) : undefined,
          extensions: [
            basicSetup,
            atomone,
            json(),
            EditorView.updateListener.of((update: ViewUpdate) => {
              if (!update.docChanged || !onChange) return;

              try {
                const card = JSON.parse(update.state.doc.toString());
                onChange(card);
              } catch (err) {}
            }),
          ],
        }),
      })
    );
  }, [ref]);

  useEffect(() => {
    if (!view || !value) return;
    if (isDeepEqual(tryParseJson(view.state.doc.toString()), value)) return;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: JSON.stringify(value, null, 2),
      },
    });
  }, [value]);

  return <div ref={ref} className="CardDesignerEditor" />;
}

export interface CardDesignerTypescriptEditorProps {
  readonly value?: string;
}

export function CardDesignerTypescriptEditor({ value }: CardDesignerTypescriptEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    if (!ref.current) return;

    setView(
      new EditorView({
        parent: ref.current,
        doc: value,
        extensions: [
          basicSetup,
          atomone,
          javascript({ typescript: true }),
          EditorState.readOnly.of(true),
        ],
      })
    );
  }, [ref]);

  useEffect(() => {
    if (!view) return;
    if (isDeepEqual(view.state.doc.toString(), value)) return;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value,
      },
    });
  }, [value]);

  return <div ref={ref} className="CardDesignerEditor" />;
}

function tryParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isDeepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
