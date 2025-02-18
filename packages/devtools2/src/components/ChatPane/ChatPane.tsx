import { FC, useState } from 'react';
import { mergeClasses } from '@fluentui/react-components';

import useStyles from './ChatPane.styles';
import useGlobalClasses from '../../useGlobalClasses';
import ComposeBox from '../ComposeBox/ComposeBox';
import { ChatMessageGrouping } from '../ChatMessage/ChatMessageGrouping';
import { EXAMPLE_MESSAGES } from './example-messages';
import { Chat } from '../Chat/Chat';

const ChatPane: FC = () => {
  const classes = useStyles();
  const globalClasses = useGlobalClasses();

  const [messages, setMessages] = useState<JSX.Element[]>(
    EXAMPLE_MESSAGES.map((message) => (
      <ChatMessageGrouping 
        key={message.id} 
        value={message}
      />
    ))
  );

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

    setMessages((prevMessages) => [
      ...prevMessages,
      <ChatMessageGrouping 
        key={newMessage.id} 
        value={newMessage}
      />
    ]);
  };

  return (
    <div className={mergeClasses(globalClasses.verticalLayout, classes.chatPaneContainer)}>
      <Chat
        as="div"
        data-tid="message-pane-list-runways"
        role="document"
        className={mergeClasses(globalClasses.verticalLayout, classes.chatPane)}
      >
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
