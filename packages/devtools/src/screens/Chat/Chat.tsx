import { useContext, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card } from '@teams.sdk/cards';
import { Attachment, cardAttachment, CardAttachmentTypes, Client, MessageReaction, MessageReactionType } from '@teams.sdk/api';
import { Dialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import * as icons from '@fluentui/react-icons';
import * as marked from 'marked';

import { ChatContext } from '../../Stores';
import CardDesigner from '../../Components/CardDesigner';
import AdaptiveCard from '../../Components/Card';
import './Chat.css';

const api = new Client({
  headers: { 'x-teams-devtools': true },
});

export default function Chat() {
  const { chat, messages, typing, streaming } = useContext(ChatContext);
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([ ]);
  const [card, setCard] = useState<Card>();
  const [cardBuilderOpen, setCardBuilderOpen] = useState(false);

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

  return (
    <div className="Chat">
      <div className="flex-col overflow-y-auto border-r dark:border-stone-800 shadow-md hidden md:flex">
        <div className="flex flex-col flex-1 mt-3 overflow-y-auto">
          <div className="flex px-3 py-1 mx-3 my-1 rounded border border-stone-800 bg-stone-700">
            <div className="flex flex-col justify-center mx-auto px-3 py-1 rounded-full bg-stone-900 overflow-hidden mr-2">
              <span className="font-semibold mx-auto">
                {chat.name[0].toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col justify-center mx-auto">
              <span className="text-sm mx-auto">
                {chat.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 mx-5 my-2 gap-2 overflow-y-auto pt-1 pb-5">
          {(messages[chat.id] || []).map((message) => {
            const dir = message.from?.user?.id === 'devtools' ? 'sent' : 'received';
            const isStreaming = streaming[message.id];
            let html: string | undefined;

            if (message.body?.contentType === 'text') {
              html = marked.parse(
                message.body?.content || '',
                { async: false, gfm: true }
              );
            }

            return (
              <div className={['flex', dir === 'sent' ? 'flex-row-reverse' : 'flex-row'].join(' ')}>
                <div
                  className={[
                    'flex',
                    'flex-col',
                    'max-w-[80%]',
                    `items-${dir === 'received' ? 'start' : 'end'}`,
                  ].join(' ')}
                >
                  <div className={`flex mb-1 ${dir === 'received' ? 'ml-2' : 'mr-2'}`}>
                    {message.createdDateTime && (
                      <div className="text-xs text-stone-400">
                        {formatDistanceToNow(message.createdDateTime)}
                      </div>
                    )}
                  </div>
                  <div
                    className={[
                      'flex',
                      'flex-col',
                      'relative',
                      'transition-all',
                      'px-4',
                      'py-2',
                      'rounded-lg',
                      'text-sm',
                      'border',
                      'border-transparent',
                      'group',
                      dir === 'received' ? 'bg-stone-400' : 'bg-indigo-800',
                      dir === 'received' ? 'dark:bg-stone-800' : 'dark:bg-indigo-800',
                      isStreaming ? 'fancy' : ''
                    ].join(' ')}
                  >
                    <div
                      className={`hidden absolute z-10 group-hover:flex transition-all text-lg rounded px-3 py-1 shadow-2xl dark:bg-stone-800 -top-6 ${dir === 'received' ? 'left' : 'right'}-1`}
                    >
                      <button
                        className="mr-1 transition hover:scale-125"
                        onClick={() => react(message.id, 'like')}
                      >
                        👍
                      </button>
                      <button
                        className="mr-1 transition hover:scale-125"
                        onClick={() => react(message.id, 'heart')}
                      >
                        ❤️
                      </button>
                      <button
                        className="mr-1 transition hover:scale-125"
                        onClick={() => react(message.id, 'laugh')}
                      >
                        😆
                      </button>
                      <button
                        className="transition hover:scale-125"
                        onClick={() => react(message.id, 'surprised')}
                      >
                        😮
                      </button>
                    </div>

                    <div className="flex flex-col aboslute z-10">
                      {message.body?.content && <div className="inline break-all">
                        {
                          html ?
                          <span className="inline break-all" dangerouslySetInnerHTML={{ __html: html }} /> :
                          message.body?.content
                        }
                        {isStreaming && <div className="inline-flex bg-white w-[5px] h-[13px] ml-1 animate-pulse" />}
                      </div>}
                      {message.attachments && (
                        <div className="flex gap-1 py-px">
                          {message.attachments.map(a => {
                            return <AdaptiveCard value={(a as CardAttachmentTypes['adaptive']).content} />;
                          })}
                        </div>
                      )}
                    </div>

                    {(message.reactions?.length || 0) > 0 && (
                      <div
                        className={`absolute z-10 flex transition-all text-lg rounded -bottom-6 ${dir === 'received' ? 'left' : 'right'}-1`}
                      >
                        {message.reactions!.map((r) => {
                          return (
                            <button
                              className="flex justify-center px-1 py-px my-auto dark:bg-stone-800 rounded-full shadow-lg [&:not(:last-child)]:mr-1"
                              onClick={() => react(message.id, r.type)}
                            >
                              <div className="flex my-auto flex-1">
                                {r.type === 'like'
                                  ? '👍'
                                  : r.type === 'heart'
                                    ? '❤️'
                                    : r.type === 'laugh'
                                      ? '😆'
                                      : r.type === 'surprised'
                                        ? '😮'
                                        : '??'}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="flex flex-col relative transition-all mx-5 mb-5 rounded-xl shadow-lg border border-transparent hover:border-zinc-800"
          style={{ backgroundColor: '#121212' }}
        >
          {typing[chat.id] && <div className="flex absolute z-10 -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-2 justify-center items-center bg-white dark:invert">
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-black rounded-full animate-bounce" />
          </div>}

          <textarea
            value={text}
            className="p-5 rounded-xl bg-transparent resize-none"
            placeholder="Enter message..."
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === 'enter' && event.ctrlKey) {
                send();
              }
            }}
          />

          {attachments.length > 0 && (
            <div className="flex gap-1 px-2 py-px">
              {attachments.map(a => <AdaptiveCard value={(a as CardAttachmentTypes['adaptive']).content} />)}
            </div>
          )}

          <div className="flex p-5">
            <span className="flex-1" />
            <div className="flex gap-1">
              <Popover className="relative">
                <PopoverButton className="flex px-2 py-1.5 transition-all rounded text-sm my-auto bg-stone-700 hover:bg-stone-600 active:bg-stone-700">
                  <icons.AttachFilled className="my-auto size-5" />
                </PopoverButton>
                <PopoverPanel anchor="bottom end" className="flex flex-col gap-1 px-2 py-2 bg-white dark:bg-stone-800 rounded-lg shadow-2xl [--anchor-gap:4px] sm:[--anchor-gap:8px]">
                  <button
                    className="flex px-3 py-1 transition rounded dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-700 dark:active:bg-stone-600"
                    onClick={() => setCardBuilderOpen(true)}
                  >
                    <icons.CardUiFilled className="size-5 my-auto" />
                    <span className="my-auto ml-2">Card</span>
                  </button>
                  <button className="flex px-3 py-1 transition rounded dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-700 dark:active:bg-stone-600">
                    <icons.DocumentFilled className="size-5 my-auto" />
                    <span className="my-auto ml-2">File</span>
                  </button>
                </PopoverPanel>
              </Popover>

              <button
                className="flex px-2 py-1.5 transition-all rounded text-sm my-auto bg-indigo-800 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-stone-700 active:bg-indigo-600"
                disabled={!text}
                onClick={send}
              >
                <span className="my-auto mr-2">Send</span>
                {!text ? (
                  <icons.SendRegular className="my-auto size-4" />
                ) : (
                  <icons.SendFilled className="my-auto size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Dialog open={cardBuilderOpen} onClose={setCardBuilderOpen} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-12">
            <DialogPanel className="w-full h-full relative flex flex-col space-y-4 rounded-lg shadow-2xl dark:text-white overflow-hidden dark:bg-stone-900">
              <CardDesigner value={card} onChange={setCard} />

              <button
                className="absolute right-5 bottom-5 flex p-3 rounded-full shadow-md bg-indigo-800 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-stone-700 active:bg-indigo-600"
                disabled={!card}
                onClick={() => {
                  if (!card) return;
                  setAttachments([
                    ...attachments,
                    cardAttachment('adaptive', card),
                  ]);

                  setCardBuilderOpen(false);
                  setCard(undefined);
                }}
              >
                {<icons.CheckmarkFilled className="size-6 my-auto" />}
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
