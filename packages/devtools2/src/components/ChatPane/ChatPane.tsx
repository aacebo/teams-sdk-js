import { FC, useState } from 'react';
import { Avatar, mergeClasses } from '@fluentui/react-components';
import { Chat, ChatMessage, ChatMyMessage } from '@fluentui-contrib/react-chat';
import useStyles from './ChatPane.styles';
import useGlobalStyles from '../../useGlobalStyles';
import ComposeBox from '../ComposeBox/ComposeBox';

const ChatPane: FC = () => {
    const styles = useStyles();
    const globalStyles = useGlobalStyles();

    const [messages, setMessages] = useState<JSX.Element[]>([
        <ChatMessage avatar={<Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />}>Hello I am Ashley</ChatMessage>,
        <ChatMyMessage>Nice to meet you!</ChatMyMessage>
    ]);

    const handleSendMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, <ChatMyMessage>{message}</ChatMyMessage>]);
    };

    return (
        <div className={mergeClasses(globalStyles.verticalLayout, styles.chatPaneContainer)}>
            <Chat as="div" data-tid="chat-container" role="document" className={mergeClasses(globalStyles.verticalLayout, styles.chatPane)}>
                {messages}
            </Chat>
            <div>
            <div className={styles.bannerContainer}>
                {/* Optional banner content */}
            </div>
            <ComposeBox onSend={handleSendMessage} /> {/* Pass send function */}
            </div>
        </div>
    );
};

export default ChatPane;