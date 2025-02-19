import { FC, useEffect, useState } from 'react';
import { mergeClasses } from '@fluentui/react-components';

import * as api from '@teams.sdk/api';
import { useClasses } from './ChatMessageContainer.styles';
import { formatMessageTime } from '../../Utils/date-format';
import AvatarComponent from './AvatarComponent';
import Message from './ChatMessage';

export interface MessageProps {
  readonly value: api.Message;
  readonly streaming?: boolean;
  readonly feedback?: boolean;
  readonly isConnected?: boolean;
}

const ChatMessageContainer: FC<MessageProps> = ({
  value,
  streaming = false,
  feedback = false,
  isConnected = false
}) => {
  const classes = useClasses();
  const sendDirection = value.from?.user?.id === 'devtools' ? 'sent' : 'received';
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(value.body?.content || '');
    }
  }, [value]);

  return (
    <article id="chat-message-row" className={mergeClasses(
      classes.messageRow,
      sendDirection === 'sent' ? classes.messageGroupSent : classes.messageGroupReceived
    )}>
      <div className={classes.messageContainer}>
        <div className={classes.badgeMessageContainer}>
          {sendDirection === 'received' && <AvatarComponent isConnected={isConnected} />}
          <div className={classes.timeMessageContainer}>
            <time className={classes.timestamp}>
              {value.createdDateTime && formatMessageTime(value.createdDateTime)}
            </time>
            <Message
              content={value.body?.content || ''}
              html={html}
              streaming={streaming}
              feedback={feedback}
              sendDirection={sendDirection}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChatMessageContainer;