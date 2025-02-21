import { FC, useEffect, useState } from 'react';
import { mergeClasses } from '@fluentui/react-components';

import { Message } from '@teams.sdk/api';
import { useClasses } from './ChatMessageContainer.styles';
import { formatMessageTime } from '../../Utils/date-format';
import ChatAvatarWrapper from './ChatAvatarWrapper';
import ChatMessage from './ChatMessage';

export interface MessageProps {
  readonly value: Message;
  readonly streaming?: boolean;
  readonly feedback?: boolean;
  readonly isConnected?: boolean;
}

const ChatMessageContainer: FC<MessageProps> = ({
  value,
  streaming = false,
  feedback = false,
  isConnected = false,
}) => {
  const classes = useClasses();
  const sendDirection = value.from?.user?.id === 'devtools' ? 'sent' : 'received';
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(value.body?.content || '');
    }
  }, [value]);

  const ariaLabel = sendDirection === 'sent' ? 'Sent message at' : 'Received message at';

  return (
    <article
      id="chat-message-row"
      className={mergeClasses(
        classes.messageRow,
        sendDirection === 'sent' ? classes.messageGroupSent : classes.messageGroupReceived
      )}
    >
      <div className={classes.messageContainer}>
        <div className={classes.badgeMessageContainer}>
          {sendDirection === 'received' && <ChatAvatarWrapper isConnected={isConnected} />}
          <div className={classes.timeMessageContainer}>
            <time aria-label={ariaLabel} id={value.id} className={mergeClasses(classes.timestamp, sendDirection === 'sent' && classes.sentTime)}>
              {value.createdDateTime && formatMessageTime(value.createdDateTime)}
            </time>
            <ChatMessage
              content={value.body?.content || ''}
              feedback={feedback}
              html={html}
              labelId={ariaLabel}
              sendDirection={sendDirection}
              streaming={streaming}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChatMessageContainer;
