import { FC, useContext, useState } from 'react';
import { ChatContext } from '../../stores/ChatStore';
import { useClasses } from './ChatScreen.styles';
import { Attachment } from '@teams.sdk/api';
import useSparkApi from '../../hooks/useSparkApi';

import Chat from '../../components/Chat/Chat';
import ChatMessageContainer from '../../components/ChatMessage/ChatMessageContainer';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import ComposeBox from '../../components/ComposeBox/ComposeBox';

interface ChatScreenProps {
  isConnected: boolean;
}

const ChatScreen: FC<ChatScreenProps> = ({ isConnected }) => {
  const classes = useClasses();
  const chatStore = useContext(ChatContext);
  const messages = chatStore.messages[chatStore.chat.id] || [];
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const api = useSparkApi();

  const handleSendMessage = async (message: string) => {
    try {
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

export default ChatScreen;
