import { FC, useState } from 'react';
import { Avatar, mergeClasses } from '@fluentui/react-components';
import { Chat, ChatMessage, ChatMyMessage } from '@fluentui-contrib/react-chat';
import useStyles from './ChatPane.styles';
import useGlobalStyles from '../../useGlobalStyles';
import ComposeBox from '../ComposeBox/ComposeBox';

const ChatPane: FC = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();

  const [messages, setMessages] = useState<JSX.Element[]>([
    <ChatMessage avatar={<Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />}>
      Hello I am Ashley
    </ChatMessage>,
    <ChatMyMessage>Nice to meet you!</ChatMyMessage>,
  ]);

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, <ChatMyMessage>{message}</ChatMyMessage>]);
  };

  return (
    <div className={mergeClasses(globalStyles.verticalLayout, classes.chatPaneContainer)}>
      <Chat
        as="div"
        data-tid="chat-container"
        role="document"
        className={mergeClasses(globalStyles.verticalLayout, classes.chatPane)}
      >
        {/* TODO: Add message keys once we have sender information */}
        {messages}
      </Chat>
      <div>
        <div className={classes.bannerContainer}>{/* TODO: Optional banner/toast content */}</div>
        <ComposeBox onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPane;
