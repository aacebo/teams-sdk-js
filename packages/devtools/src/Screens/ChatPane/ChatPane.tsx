import { FC, useContext, useState } from 'react';
import { Attachment } from '@teams.sdk/api';

import Chat from '../../Components/Chat/Chat';
import ChatMessageContainer from '../../Components/ChatMessage/ChatMessageContainer';
import ComposeBox from '../../Components/ComposeBox/ComposeBox';
import { ChatContext } from '../../Stores/Chat';
import { useClasses } from './ChatPane.styles';
import useSparkApi from '../../Hooks/useSparkApi';
import ChatMessage from '../../Components/ChatMessage/ChatMessage';

export interface ChatPaneProps {
  isConnected: boolean;
}

export const ChatPane: FC<ChatPaneProps> = ({ isConnected }) => {
  const classes = useClasses();
  const chatStore = useContext(ChatContext);
  const messages = chatStore.messages[chatStore.chat.id] || [];
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const api = useSparkApi();

  const handleSendMessage = async (message: string) => {
    try {
      // Now send the message to the server
      await api.conversations.activities(chatStore.chat.id).create({
        type: 'message',
        text: message,
        attachments,
      });

      setAttachments([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Chat className={classes.chatPaneContainer}>
      <div className={classes.scrollbarContainer}>
        <div className={classes.messagesList}>
          {messages.map((message) => (
            <ChatMessageContainer key={message.id} value={message} isConnected={isConnected}>
              <ChatMessage
                content={message.body?.content || ''}
                feedback={chatStore.feedback[message.id]}
                sendDirection={message.from?.user?.id === 'devtools' ? 'sent' : 'received'}
                streaming={chatStore.streaming[message.id]}
                value={message}
              />
            </ChatMessageContainer>
          ))}
        </div>
      </div>
      <div className={classes.composeContainer}>
        <div className={classes.composeInner}>
          <div className={classes.bannerContainer}>{/* TODO: Optional banner/toast content */}</div>
          <ComposeBox onSend={handleSendMessage} />
        </div>
      </div>
    </Chat>
  );
};

export default ChatPane;
