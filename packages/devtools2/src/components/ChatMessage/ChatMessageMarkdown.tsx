import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownLink: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
);

interface ChatMessageMarkdownProps {
  content: string;
}

export const ChatMessageMarkdown: FC<ChatMessageMarkdownProps> = ({ content }) => (
  <ReactMarkdown 
    remarkPlugins={[remarkGfm]}
    components={{
      a: MarkdownLink
    }}
  >
    {content}
  </ReactMarkdown>
); 