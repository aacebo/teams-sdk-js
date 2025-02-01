import { useEffect, useState } from 'react';
import { CodeBlock } from '@teams.sdk/cards';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

export interface CodeBlockCardProps {
  readonly value: CodeBlock;
}

export default function CodeBlockCard({ value }: CodeBlockCardProps) {
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (value.language) {
      try {
        setHtml(hljs.highlight(value.codeSnippet || 'null', { language: value.language }).value);
        return;
      } catch {}
    }

    setHtml(hljs.highlightAuto(value.codeSnippet || 'null').value);
  }, [value]);

  if (!html) {
    return <pre className="text-xs bg-black p-2 rounded" />;
  }

  return (
    <pre className="text-xs bg-black p-2 rounded" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
