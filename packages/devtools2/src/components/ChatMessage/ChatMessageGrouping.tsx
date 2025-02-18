import { FC, useEffect, useState } from 'react';
import { Avatar, mergeClasses } from '@fluentui/react-components';

import * as api from '@teams.sdk/api';
import { useStyles } from './ChatMessage.styles';
import { formatMessageTime } from '../../utils/date-format';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';

export interface MessageProps {
  readonly value: api.Message;
  readonly streaming?: boolean;
  readonly feedback?: boolean;
  readonly isConnected?: boolean;
}

export const ChatMessageGrouping: FC<MessageProps> = ({ 
  value, 
  streaming = false,
  feedback = false,
  isConnected = false
}) => {
  const classes = useStyles();
  const sendDirection = value.from?.user?.id === 'devtools' ? 'sent' : 'received';
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(value.body?.content || '');
    }
  }, [value]);

  return (
    <div data-tid="message-group" className={mergeClasses(
      classes.messageGroup,
      sendDirection === 'sent' ? classes.messageGroupSent : classes.messageGroupReceived
    )}>
      <div data-tid="message-container" className={mergeClasses(
        classes.messageContainer,
        sendDirection === 'sent' ? classes.directionSent : classes.directionReceived
      )}>
        <div className={classes.timestamp}>
          {value.createdDateTime && formatMessageTime(value.createdDateTime)}
        </div>
        <div className={classes.contentWrapper}>
          {sendDirection === 'received' && (
            <div className={classes.avatar}>
              <Avatar 
                name="User" 
                badge={{ status: isConnected ? 'available' : 'offline' }} 
                size={40} 
              />
            </div>
          )}
          <div className={mergeClasses(
            classes.contentContainer,
            sendDirection === 'sent' ? classes.sent : classes.received,
            streaming && classes.streaming
          )}>
            <div className={classes.messageContent}>
              {value.body?.content && (
                <div>
                  {html ? (
                    <ChatMessageMarkdown content={html} />
                  ) : (
                    value.body?.content
                  )}
                  {streaming && (
                    <div id="streaming-indicator" className={classes.streamingIndicator} />
                  )}
                </div>
              )}
              
              {/* {value.attachments && (
                <div className={classes.attachments}>
                  {value.attachments.map((a, index) => (
                    <AdaptiveCard 
                      key={`attachment-${value.id}-${index}`}
                      value={(a as api.CardAttachmentTypes['adaptive']).content} 
                    />
                  ))}
                </div>
              )} */}

              {feedback && (
                <div className={classes.feedbackContainer}>
                  {/* Add feedback UI here if needed */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
