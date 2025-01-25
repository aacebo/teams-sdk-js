import * as marked from 'marked';

import { TextBlock } from '@teams.sdk/cards';
import { useEffect, useState } from 'react';

export interface TextBlockCardProps {
  readonly value: TextBlock;
}

export default function ImageCard({ value }: TextBlockCardProps) {
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    setHtml(marked.parse(value.text, { async: false, gfm: true }));
  }, [value]);

  if (!html) {
    return <></>;
  }

  return (
    <div
      className="text-black dark:text-stone-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
