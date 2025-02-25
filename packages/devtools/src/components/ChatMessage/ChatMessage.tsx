import { FC, useContext, useEffect, useState } from 'react';
import { ChatMessageMarkdown } from './ChatMessageMarkdown';
import { useChatMessageStyles } from './ChatMessage.styles';
import {
  Button,
  mergeClasses,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningShorthand,
  Tooltip,
} from '@fluentui/react-components';
import MessageActionsToolbar, { MessageReactionsEmoji } from '../Toolbar/MessageActionsToolbar';
import { Message, MessageReaction, MessageReactionType } from '@teams.sdk/api';
import { ChatContext } from '../../stores/ChatStore';
import useSparkApi from '../../hooks/useSparkApi';
import capitalizeFirstLetter from '../../utils/capitalize-first';
interface ChatMessageProps {
  content: string;
  feedback: boolean;
  sendDirection: 'sent' | 'received';
  streaming: boolean;
  value: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({
  content,
  streaming,
  feedback,
  sendDirection,
  value,
}) => {
  const classes = useChatMessageStyles();
  const { chat, messages } = useContext(ChatContext);
  const sparkApi = useSparkApi();
  const labelId = `message-${value.id}`;
  const [html, setHtml] = useState<string>(
    (value.body?.contentType === 'text' && value.body?.content) || ''
  );
  const [reactions, setReactions] = useState<MessageReaction[]>(value.reactions || []);

  const handleMessageReaction = async (id: string, type: MessageReactionType) => {
    const message = messages[chat.id].find((m) => m.id === id);

    if (!message) return;

    const added: Array<MessageReaction> = [];
    const removed: Array<MessageReaction> = [];
    const reaction = (message.reactions || []).find(
      (r) => r.type === type && r.user?.id === 'devtools'
    );

    if (reaction) {
      removed.push(reaction);
    } else {
      added.push({
        type,
        user: { id: 'devtools', displayName: 'devtools' },
        createdDateTime: new Date().toUTCString(),
      });
    }

    try {
      await sparkApi.conversations.activities(chat.id).create({
        id,
        type: 'messageReaction',
        reactionsAdded: added,
        reactionsRemoved: removed,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(value.body?.content || '');
    }
    setReactions(value.reactions || []);
  }, [value]);

  return (
    <>
      {content && (
        <Popover
          closeOnScroll
          closeOnIframeFocus
          inertTrapFocus
          openOnHover
          positioning={'above-end' as PositioningShorthand}
          trapFocus
        >
          <PopoverTrigger disableButtonEnhancement>
            <div
              tabIndex={-1}
              id={labelId}
              aria-labelledby={labelId}
              className={mergeClasses(
                classes.messageContainer,
                streaming && classes.streaming,
              )}
            >
              <div tabIndex={0} className={mergeClasses(classes.messageBody, sendDirection === 'sent' ? classes.sent : classes.received)}>

                {html ? <ChatMessageMarkdown content={html} /> : content}
              </div>
              {streaming && <div id="streaming-indicator" className="streamingIndicator" />}
              {reactions.length > 0 && <div data-tid="reactions-container"className={mergeClasses(classes.reactionContainer, reactions.length > 0 ? classes.reactionContainerVisible : '', sendDirection === 'sent' ? classes.reactionContainerSent : '').trim()}>
                {reactions.map((reaction) => (
                  // TODO: tab order needs to be combined with MessageActionsToolbar
                  <Tooltip content={capitalizeFirstLetter(reaction.type)} relationship="label" key={reaction.type} positioning="below-end">
                    <Button className={mergeClasses(classes.reactionButton, reaction.user?.id === 'devtools' ? classes.reactionFromUser : '').trim()} key={reaction.type} onClick={() => handleMessageReaction(value.id, reaction.type)} shape="circular" size="small">
                      {MessageReactionsEmoji.find((r) => r.reaction === reaction.type)?.label}
                    </Button>
                  </Tooltip>
                ))}
              </div>}
            </div>
          </PopoverTrigger>
          <PopoverSurface className={classes.popoverSurface}>
            <MessageActionsToolbar sent={sendDirection === 'sent'} value={value} size="small" handleMessageReaction={handleMessageReaction} />

          </PopoverSurface>
        </Popover>
      )}
      {feedback && (
        <div className={classes.feedbackContainer}>{/* TODO: Add feedback UI here */}</div>
      )}
    </>
  );
};

export default ChatMessage;
