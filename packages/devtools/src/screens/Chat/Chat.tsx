import { useContext, useState } from 'react';
import { Client } from '@teams.sdk/api';
import * as outlines from '@heroicons/react/24/outline';

import { ChatContext } from '../../state';
import './Chat.css';

const api = new Client({
  headers: { 'X-Teams-Devtools': true }
});

export default function Chat() {
  const { chat, activities } = useContext(ChatContext);
  const [text, setText] = useState('');

  const send = async () => {
    if (!chat) return;

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

  return (
    <div className="Chat">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 mx-5 my-2 gap-2 overflow-y-auto">
          {
            (activities[chat.id] || []).filter(activity => activity.type === 'message').map(activity => {
              const dir = activity.from?.id === 'devtools' ? 'sent' : 'received';

              return (
                <div className={['flex', dir === 'sent' ? 'flex-row-reverse' : 'flex-row'].join(' ')}>
                  <div className={[
                    'flex',
                    'md:max-w-[80%]',
                    'gap-1',
                    'transition-all',
                    'px-4',
                    'py-2',
                    'rounded-lg',
                    'text-sm',
                    'border',
                    'border-transparent',
                    'group/item',
                    dir === 'received' ? 'bg-stone-400' : 'bg-indigo-800',
                    dir === 'received' ? 'dark:bg-stone-800' : 'dark:bg-indigo-800',
                  ].join(' ')}>
                    {activity.text}
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
          <input
            value={text}
            className="p-5 rounded-xl bg-transparent"
            placeholder="Enter message..."
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                send();
              }
            }}
          />

          <div className="flex p-5">
            <span className="flex-1" />
            <div className="flex">
              <button
                className="flex px-2 py-1.5 transition-all rounded text-sm my-auto opacity-80 bg-indigo-800 hover:opacity-100 disabled:opacity-50 disabled:bg-stone-700"
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
