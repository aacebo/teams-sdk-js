import { FC, useContext, useEffect, useRef, useState } from 'react';
import { mergeClasses } from '@fluentui/react-components';
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
// import { EXAMPLE_MESSAGES } from '../../Components/ChatMessage/example-messages';

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
  const composeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useEffect(() => {
    if (!composeRef.current || !scrollContainerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const composeHeight = entries[0].contentRect.height;
      scrollContainerRef.current!.style.bottom = `${composeHeight}px`;
    });

    resizeObserver.observe(composeRef.current);
    return () => resizeObserver.disconnect();
  }, []);

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
      <div
        ref={scrollContainerRef}
        className={mergeClasses(classes.scrollContainer, 'scroll-on-hover')}
      >
        <div className={classes.messagesContainer}>
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
      <div ref={composeRef} className={classes.composeContainer}>
        <div className={classes.bannerContainer}>
          {/* TODO: Optional banner/toast content */}
        </div>
        <ComposeBox onSend={handleSendMessage} />
      </div>
    </Chat>
  );
};

export default ChatPane;
