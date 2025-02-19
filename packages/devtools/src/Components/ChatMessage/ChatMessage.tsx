import { FC } from 'react';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';
import { useChatMessageStyles } from './ChatMessage.styles';
import { mergeClasses } from '@fluentui/react-components';

interface ChatMessageProps {
  content: string;
  html: string | undefined;
  streaming: boolean;
  feedback: boolean;
  sendDirection: 'sent' | 'received';
}

const ChatMessage: FC<ChatMessageProps> = ({
  content,
  html,
  streaming,
  feedback,
  sendDirection,
}) => {
  const classes = useChatMessageStyles();

  return (
    <>
      {content && (
        <div
          id="message-content"
          className={mergeClasses(
            classes.messageContent,
            sendDirection === 'sent' ? classes.sent : classes.received,
            streaming && classes.streaming
          )}
        >
          {html ? <ChatMessageMarkdown content={html} /> : content}
          {streaming && <div id="streaming-indicator" className="streamingIndicator" />}
        </div>
      )}
      {feedback && (
        <div className={classes.feedbackContainer}>{/* TODO: Add feedback UI here */}</div>
      )}
    </>
  );
};

export default ChatMessage;
