import { CodeBlock } from '@teams.sdk/cards';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

export interface CodeBlockCardProps {
  readonly value: CodeBlock;
}

export default function CodeBlockCard({ value }: CodeBlockCardProps) {
  let html: string;

  if (value.language) {
    html = hljs.highlight(value.codeSnippet || '', {
      language: value.language,
    }).value;
  } else {
    html = hljs.highlightAuto(value.codeSnippet || '').value;
  }

  return <pre
    className="text-xs bg-black p-2 rounded"
    dangerouslySetInnerHTML={{ __html: html }}
  />;
}
