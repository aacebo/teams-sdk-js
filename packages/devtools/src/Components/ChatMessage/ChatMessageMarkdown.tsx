import { FC, HTMLProps } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../contexts/ThemeContext';

const MarkdownLink: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
);

const MarkdownCode: FC<HTMLProps<HTMLElement>> = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const theme = useTheme(); 
  const style = theme === 'dark' ? a11yDark : solarizedlight;

  return match ? (
    <SyntaxHighlighter
    // @ts-ignore
      style={style}
      language={match[1]}
      PreTag="div"
      useInlineStyles={false}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

interface ChatMessageMarkdownProps {
  content: string;
}

export const ChatMessageMarkdown: FC<ChatMessageMarkdownProps> = ({ content }) => {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: MarkdownLink,
        code: MarkdownCode,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}; 