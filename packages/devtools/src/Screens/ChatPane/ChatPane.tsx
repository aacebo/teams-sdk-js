import { FC, useContext, useState } from 'react';
import {
  Attachment,
  Client,
  // MessageReaction,
  // MessageReactionType,
} from '@teams.sdk/api';

import Chat from '../../Components/Chat/Chat';
import ChatMessageContainer from '../../Components/ChatMessage/ChatMessageContainer';
import ComposeBox from '../../Components/ComposeBox/ComposeBox';
import { ChatContext } from '../../Stores/Chat';
import { useClasses } from './ChatPane.styles';

export interface ChatPaneProps {
  isConnected: boolean;
}

const api = new Client('', {
  headers: { 'x-teams-devtools': 'true' },
});

export const ChatPane: FC<ChatPaneProps> = ({ isConnected }) => {
  const classes = useClasses();
  const chatStore = useContext(ChatContext);
  const messages = chatStore.messages[chatStore.chat.id] || [];
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleSendMessage = async (message: string) => {
    try {
      // Now send the message to the server
      await api.conversations.activities(chatStore.chat.id).create({
        type: 'message',
        text: message,
        attachments,
      });

      // Call handleSendMessage to update the chat store after sending
      // handleSendMessage(message);
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
            <ChatMessageContainer
              key={message.id}
              value={message}
              streaming={chatStore.streaming[message.id]}
              feedback={chatStore.feedback[message.id]}
              isConnected={isConnected}
            />
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
