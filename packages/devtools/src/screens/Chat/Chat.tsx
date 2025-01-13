import { useContext, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Client, MessageReaction } from '@teams.sdk/api';
import * as outlines from '@heroicons/react/24/outline';

import { ChatContext } from '../../state';
import './Chat.css';

const api = new Client({
  headers: { 'X-Teams-Devtools': true }
});

export default function Chat() {
  const { chat, messages } = useContext(ChatContext);
  const [text, setText] = useState('');

  const send = async () => {
    try {
      await api.conversations.activities(chat.id).create({
        type: 'message',
        text,
      });

      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  const react = async (id: string, type: 'like' | 'heart' | 'laugh' | 'surprised') => {
    const message = messages[chat.id].find(m => m.id === id);

    if (!message) return;

    const added: Array<MessageReaction> = [];
    const removed: Array<MessageReaction> = [];
    const reaction = (message.reactions || []).find(r => r.type === type && r.user?.id === 'devtools');

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
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 mx-5 my-2 gap-2 overflow-y-auto pt-1">
          {
            (messages[chat.id] || []).map(message => {
              const dir = message.from?.user?.id === 'devtools' ? 'sent' : 'received';

              return (
                <div className={['flex', dir === 'sent' ? 'flex-row-reverse' : 'flex-row'].join(' ')}>
                  <div className={[
                    'flex',
                    'flex-col',
                    `items-${dir === 'received' ? 'start' : 'end'}`,
                  ].join(' ')}>
                    <div className={`flex mb-1 ${dir === 'received' ? 'ml-2' : 'mr-2'}`}>
                      {
                        message.createdDateTime && (
                          <div className="text-xs text-stone-400">
                            {formatDistanceToNow(message.createdDateTime)}
                          </div>
                        )
                      }
                    </div>
                    <div className={[
                      'flex',
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
                    ].join(' ')}>
                      <div className={`hidden absolute group-hover:flex transition-all text-lg rounded px-3 py-1 shadow-2xl dark:bg-stone-800 -top-6 ${dir === 'received' ? 'left' : 'right'}-1`}>
                        <button className="mr-1 transition hover:scale-125" onClick={() => react(message.id, 'like')}>
                          👍
                        </button>
                        <button className="mr-1 transition hover:scale-125" onClick={() => react(message.id, 'heart')}>
                          ❤️
                        </button>
                        <button className="mr-1 transition hover:scale-125" onClick={() => react(message.id, 'laugh')}>
                          😆
                        </button>
                        <button className="transition hover:scale-125" onClick={() => react(message.id, 'surprised')}>
                          😮
                        </button>
                      </div>

                      {message.body?.content}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div
          className="flex flex-col relative transition-all mx-5 mb-5 rounded-xl shadow-lg border border-transparent hover:border-zinc-800"
          style={{ backgroundColor: '#121212' }}
        >
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

          <div className="flex p-5">
            <span className="flex-1" />
            <div className="flex">
              <button
                className="flex px-2 py-1.5 transition-all rounded text-sm my-auto bg-indigo-800 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-stone-700"
                disabled={!text}
                onClick={send}
              >
                <span className="my-auto mr-2">Send</span>
                <outlines.PaperAirplaneIcon className="my-auto size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
