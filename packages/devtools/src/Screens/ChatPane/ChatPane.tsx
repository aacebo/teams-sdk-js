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
import { EXAMPLE_MESSAGES } from '../../Components/ChatMessage/example-messages';

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

  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

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


  // const handleOfflineSendMessage = (message: string) => {
  //   const newMessage = {
  //     id: Date.now().toString(),
  //     from: { user: { id: 'devtools' } },
  //     body: {
  //       contentType: 'text' as const,
  //       content: message
  //     },
  //     createdDateTime: new Date().toISOString(),
  //   };

  //   chatStore.put(chatStore.chat.id, newMessage);
  // };

  const send = async () => {
    try {
      await api.conversations.activities(chatStore.chat.id).create({
        type: 'message',
        text,
        attachments,
      });
      setText('');
      setAttachments([]);
    } catch (err) {
      console.error(err);
    }
  };

  // const react = async (id: string, type: MessageReactionType) => {
  //   const message = messages.find((m) => m.id === id);
  //   if (!message) return;

  //   const added: Array<MessageReaction> = [];
  //   const removed: Array<MessageReaction> = [];
  //   const reaction = (message.reactions || []).find(
  //     (r) => r.type === type && r.user?.id === 'devtools'
  //   );

  //   if (reaction) {
  //     removed.push(reaction);
  //   } else {
  //     added.push({
  //       type,
  //       user: { id: 'devtools', displayName: 'devtools' },
  //       createdDateTime: new Date().toUTCString(),
  //     });
  //   }

  //   try {
  //     await api.conversations.activities(chatStore.chat.id).create({
  //       id,
  //       type: 'messageReaction',
  //       reactionsAdded: added,
  //       reactionsRemoved: removed,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const sendFeedback = async (text?: string) => {
  //   // Implement feedback logic similar to the original Chat.tsx
  // };

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
        <ComposeBox onSend={send} />
      </div>
    </Chat>
  );
};

export default ChatPane;
