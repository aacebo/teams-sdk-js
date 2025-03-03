import { FC, useContext, useState, useCallback, useEffect } from 'react';
import { ChatContext } from '../../stores/ChatStore';
import { useClasses } from './ChatScreen.styles';
import { Attachment } from '@teams.sdk/api';
import useSparkApi from '../../hooks/useSparkApi';
import { useDevModeSendMessage } from '../../utils/dev';

import Chat from '../../components/Chat/Chat';
import ChatMessageContainer from '../../components/ChatMessage/ChatMessageContainer';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import ComposeBox from '../../components/ComposeBox/ComposeBox';
import TypingIndicator from '../../components/TypingIndicator/TypingIndicator';
import { useScreensClasses } from '../Screens.styles';

interface ChatScreenProps {
  isConnected: boolean;
}

const ChatScreen: FC<ChatScreenProps> = ({ isConnected }) => {
  const classes = useClasses();
  const screenClasses = useScreensClasses();
  const { chat, feedback, messages, streaming, typing } = useContext(ChatContext);

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const sparkApi = useSparkApi();

  const handleSendMessage = useCallback(async (message: string, messageAttachments?: Attachment[]) => {
    if (messageAttachments) {
      setAttachments([...attachments, ...(messageAttachments || [])]);
    }
    try {
      await sparkApi.conversations.activities(chat.id).create({
        type: 'message',
        text: message,
        attachments: attachments || [],
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, [sparkApi, chat?.id]);

  // Use the hook to automatically send a message in development mode
  // This will be a no-op in production builds
  useDevModeSendMessage(handleSendMessage);

  return (
    <Chat className={screenClasses.screenContainer}>
      <div className={screenClasses.scrollbarContainer}>
        <div className={classes.messagesList}>
          {chat &&
            (messages[chat.id] || []).map((message) => (
              <ChatMessageContainer key={message.id} value={message} isConnected={isConnected}>
                <ChatMessage
                  content={message.body?.content || ''}
                  feedback={feedback[message.id]}
                  sendDirection={message.from?.user?.id === 'devtools' ? 'sent' : 'received'}
                  streaming={streaming[message.id]}
                  value={message}
                />
              </ChatMessageContainer>
            ))}
        </div>
      </div>
      <div className={classes.composeContainer}>
        <div className={classes.composeInner}>
          <div className={classes.typingIndicator}>{typing[chat.id] && <TypingIndicator />}</div>
          {/* <div className={classes.bannerContainer}>{/* TODO: Optional banner/toast content </div> */}
          <ComposeBox onSend={handleSendMessage} />
        </div>
      </div>
    </Chat>
  );
};

export default ChatScreen;
