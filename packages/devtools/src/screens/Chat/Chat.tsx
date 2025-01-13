import { useState } from 'react';
import * as outlines from '@heroicons/react/24/outline';

import './Chat.css';

export default function Chat() {
  const [text, setText] = useState('');

  return (
    <div className="Chat">
      <div className="flex flex-col">sidebar...</div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 mx-5 my-2 gap-2 overflow-y-auto">
          ...messages
        </div>

        <div
          className="flex flex-col relative transition-all mx-5 mb-5 rounded-xl shadow-lg border border-transparent hover:border-zinc-800"
          style={{ backgroundColor: '#121212' }}
        >
          <input
            className="p-5 rounded-xl bg-transparent"
            placeholder="Enter message..."
            onChange={(event) => setText(event.target.value)}
          />

          <div className="flex p-5">
            <span className="flex-1"></span>
            <div className="flex">
              <button
                className="flex px-2 py-1.5 transition rounded text-sm my-auto opacity-70 bg-emerald-600 hover:opacity-100 disabled:opacity-50"
                disabled={!text}
                onClick={() => console.log(text)}
              >
                <span className="m-auto mr-2">Send</span>
                <div className="flex gap-0.5 px-1 py-1 m-auto border border-gray-300 rounded">
                  <outlines.PaperAirplaneIcon className="size-3" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
