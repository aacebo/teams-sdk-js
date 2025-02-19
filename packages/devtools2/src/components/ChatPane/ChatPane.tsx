import { FC, useContext, useEffect, useRef } from 'react';
import { mergeClasses } from '@fluentui/react-components';

import Chat from '../Chat/Chat';
import ChatMessageContainer from '../ChatMessage/ChatMessageContainer';
import ComposeBox from '../ComposeBox/ComposeBox';
import { ChatContext } from '../../Stores/Chat';
import { useClasses } from './ChatPane.styles';
import { EXAMPLE_MESSAGES } from './example-messages';

export interface ChatPaneProps {
  isConnected: boolean;
}

export const ChatPane: FC<ChatPaneProps> = ({ isConnected }) => {
  const classes = useClasses();
  const chatStore = useContext(ChatContext);
  const messages = chatStore.messages[chatStore.chat.id] || [];
  const composeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load example messages on mount
  useEffect(() => {
    EXAMPLE_MESSAGES.forEach(message => {
      chatStore.put(chatStore.chat.id, message);
    });
  }, []);

  useEffect(() => {
    if (!composeRef.current || !scrollContainerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const composeHeight = entries[0].contentRect.height;
      scrollContainerRef.current!.style.bottom = `${composeHeight}px`;
    });

    resizeObserver.observe(composeRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      from: { user: { id: 'devtools' } },
      body: {
        contentType: 'text' as const,
        content: message
      },
      createdDateTime: new Date().toISOString(),
    };

    chatStore.put(chatStore.chat.id, newMessage);
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
