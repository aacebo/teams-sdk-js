import { useContext, useState } from 'react';
import { Card } from '@teams.sdk/cards';
import {
  Attachment,
  cardAttachment,
  CardAttachmentTypes,
  Client,
  MessageReaction,
  MessageReactionType,
} from '@teams.sdk/api';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import {
  AttachFilled,
  CardUiFilled,
  CheckmarkFilled,
  DocumentFilled,
  SendFilled,
  SendRegular,
} from '@fluentui/react-icons/lib/fonts';

import { ChatContext } from '../../Stores/Chat';
import CardDesigner from '../../Components/CardDesigner/CardDesigner';
import AdaptiveCard from '../../Components/Card/AdaptiveCard';
import FeedbackDialog from '../../Components/FeedbackDialog';

import Message from './Message';
import './Chat.css';

const api = new Client('', {
  headers: { 'x-teams-devtools': 'true' },
});

export default function Chat() {
  const { chat, messages, typing, streaming, feedback } = useContext(ChatContext);
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [card, setCard] = useState<Card>();
  const [cardBuilderOpen, setCardBuilderOpen] = useState(false);
  const [replyToId, setReplyToId] = useState<string>();
  const [feedbackType, setFeedbackType] = useState<'like' | 'dislike'>();

  const send = async () => {
    try {
      await api.conversations.activities(chat.id).create({
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

  const react = async (id: string, type: MessageReactionType) => {
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
      await api.conversations.activities(chat.id).create({
        id,
        type: 'messageReaction',
        reactionsAdded: added,
        reactionsRemoved: removed,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendFeedback = async (text?: string) => {
    if (!replyToId || !feedbackType) return;

    try {
      await api.conversations.activities(chat.id).create({
        type: 'invoke',
        name: 'message/submitAction',
        replyToId,
        value: {
          actionName: 'feedback',
          actionValue: {
            reaction: feedbackType,
            feedback: JSON.stringify({
              feedbackText: text,
            }),
          },
        },
      });

      setReplyToId(undefined);
      setFeedbackType(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Chat">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-name">
            <span className="chat-initial">{chat.name[0].toUpperCase()}</span>
            <span className="chat-fullname">{chat.name}</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        <div className="message-list">
          {(messages[chat.id] || []).map((message) => (
            <Message
              value={message}
              streaming={streaming[message.id]}
              feedback={feedback[message.id]}
              react={react}
              setFeedback={(type) => {
                setReplyToId(message.id);
                setFeedbackType(type);
              }}
            />
          ))}
        </div>

        <div className="message-input">
          {typing[chat.id] && (
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}

          <textarea
            value={text}
            className="input-textarea"
            placeholder="Enter message..."
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === 'enter' && event.ctrlKey) {
                send();
              }
            }}
          />

          {attachments.length > 0 && (
            <div className="attachment-list">
              {attachments.map((a) => (
                <AdaptiveCard value={(a as CardAttachmentTypes['adaptive']).content} />
              ))}
            </div>
          )}

          <div className="input-actions">
            <span className="flex-1" />
            <div className="action-buttons">
              <Popover className="relative">
                <PopoverButton className="attach-button">
                  <AttachFilled className="icon" />
                </PopoverButton>
                <PopoverPanel className="popover-panel">
                  <button
                    className="card-button"
                    onClick={() => setCardBuilderOpen(true)}
                  >
                    <CardUiFilled className="icon" />
                    <span className="button-text">Card</span>
                  </button>
                  <button className="file-button">
                    <DocumentFilled className="icon" />
                    <span className="button-text">File</span>
                  </button>
                </PopoverPanel>
              </Popover>

              <button
                className="send-button"
                disabled={!text}
                onClick={send}
              >
                <span className="button-text">Send</span>
                {!text ? (
                  <SendRegular className="icon" />
                ) : (
                  <SendFilled className="icon" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Dialog open={cardBuilderOpen} onClose={setCardBuilderOpen} className="dialog">
          <DialogBackdrop className="dialog-backdrop" />
          <div className="dialog-content">
            <DialogPanel className="dialog-panel">
              <CardDesigner value={card} onChange={setCard} />

              <button
                className="confirm-button"
                disabled={!card}
                onClick={() => {
                  if (!card) return;
                  setAttachments([...attachments, cardAttachment('adaptive', card)]);

                  setCardBuilderOpen(false);
                  setCard(undefined);
                }}
              >
                {<CheckmarkFilled className="icon" />}
              </button>
            </DialogPanel>
          </div>
        </Dialog>

        <FeedbackDialog
          type={feedbackType || 'like'}
          open={!!feedbackType}
          onClose={() => {
            setReplyToId(undefined);
            setFeedbackType(undefined);
          }}
          onSubmit={sendFeedback}
        />
      </div>
    </div>
  );
}
