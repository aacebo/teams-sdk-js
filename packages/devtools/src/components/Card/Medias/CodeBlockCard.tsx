import { CodeBlock } from '@teams.sdk/cards';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

export interface CodeBlockCardProps {
  readonly value: CodeBlock;
}

export default function CodeBlockCard({ value }: CodeBlockCardProps) {
  const html = hljs.highlight(value.codeSnippet || '', {
    language: value.language || 'auto',
  }).value;

  return <pre className="text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
}
