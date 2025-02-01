import { useEffect, useRef, useState } from 'react';
import { Card } from '@teams.sdk/cards';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import isEqual from 'lodash.isequal';

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
    <TabGroup className="flex flex-col flex-1 max-w-[50%] min-h-0 min-w-0 relative">
      <TabList className="flex absolute top-1 right-1 gap-1 z-10">
        <Tab
          key="json"
          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Json
        </Tab>
        <Tab
          key="typescript"
          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Typescript
        </Tab>
      </TabList>
      <TabPanels className="flex flex-col flex-1 min-h-0 min-w-0">
        <TabPanel className="flex flex-col flex-1 w-full h-full min-h-0 min-w-0">
          <CardDesignerJsonEditor value={value} onChange={onChange} />
        </TabPanel>
        <TabPanel className="flex flex-col flex-1 w-full h-full min-h-0 min-w-0">
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
    if (isEqual(tryParseJson(view.state.doc.toString()), value)) return;

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
    if (isEqual(view.state.doc.toString(), value)) return;

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
