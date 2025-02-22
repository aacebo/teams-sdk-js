import { FC, useEffect, useState } from 'react';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';
import { useChatMessageStyles } from './ChatMessage.styles';
import {
  mergeClasses,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningShorthand,
} from '@fluentui/react-components';
import { MessageActionsToolbar } from '../Toolbar/MessageActionsToolbar';
import { Message } from '@teams.sdk/api';
interface ChatMessageProps {
  content: string;
  feedback: boolean;
  sendDirection: 'sent' | 'received';
  streaming: boolean;
  value: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({
  content,
  streaming,
  feedback,
  sendDirection,
  value,
}) => {
  const classes = useChatMessageStyles();
  const labelId = `message-${value.id}`;
  const [html, setHtml] = useState<string>(
    (value.body?.contentType === 'text' && value.body?.content) || ''
  );

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(value.body?.content || '');
    }
  }, [value]);

  return (
    <>
      {content && (
        <Popover
          closeOnScroll
          closeOnIframeFocus
          inertTrapFocus
          openOnHover
          positioning={'above' as PositioningShorthand}
          trapFocus
        >
          <PopoverTrigger disableButtonEnhancement>
            <div
              tabIndex={0}
              id={labelId}
              aria-labelledby={labelId}
              className={mergeClasses(
                classes.messageContent,
                sendDirection === 'sent' ? classes.sent : classes.received,
                streaming && classes.streaming
              )}
            >
              {html ? <ChatMessageMarkdown content={html} /> : content}
              {streaming && <div id="streaming-indicator" className="streamingIndicator" />}
            </div>
          </PopoverTrigger>
          <PopoverSurface className={classes.popoverSurface}>
            <MessageActionsToolbar sent={sendDirection === 'sent'} value={value} size="small" />
          </PopoverSurface>
        </Popover>
      )}
      {feedback && (
        <div className={classes.feedbackContainer}>{/* TODO: Add feedback UI here */}</div>
      )}
    </>
  );
};

export default ChatMessage;
