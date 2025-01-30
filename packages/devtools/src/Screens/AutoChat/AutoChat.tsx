import { Client } from '@teams.sdk/api';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../../Stores';
import Message from '../Chat/Message';
import './AutoChat.css';
import { AutoChatPrompt } from './autoChatUtil';

const api = new Client({
  headers: { 'x-teams-devtools': true },
});

const DEFAULT_SYSTEM_PROMPT = 'You are a friendly user who responds briefly and casually';
const MAX_INTERACTIONS = 5;
const INITIAL_MESSAGE = 'Hey My name is DevTools';

const AutoChat = () => {
  const { chat, messages } = useContext(ChatContext);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [interactionCount, setInteractionCount] = useState(0);
  const promptRef = useRef<AutoChatPrompt>();

  // Initialize or update the prompt when system prompt changes
  useEffect(() => {
    if (!promptRef.current) {
      promptRef.current = new AutoChatPrompt(systemPrompt);
    } else {
      promptRef.current.updateSystemPrompt(systemPrompt);
    }
  }, [systemPrompt]);

  useEffect(() => {
    console.log('useEffect', {
      chat,
      interactionCount,
      promptRef,
    });
    const handleNewMessage = async () => {
      if (!chat?.id || interactionCount >= MAX_INTERACTIONS || !promptRef.current) {
        console.log({
          chat,
          interactionCount,
          promptRef,
        });
        return;
      }

      const chatMessages = messages[chat.id] || [];
      const lastMessage = chatMessages.find((m) => m.messageType === 'message');

      // Only respond to messages from others
      if (!lastMessage || lastMessage.from?.user?.id === 'devtools') {
        console.log(JSON.stringify(messages, null, 2));
        console.log('No new message', lastMessage, messages, chat, chatMessages);
        return;
      }
      if (!lastMessage.body?.content) {
        console.log('No content in message', lastMessage, messages, chat, chatMessages);
        return;
      }

      try {
        // Convert messages to the format expected by AutoChatPrompt
        const messageHistory = chatMessages
          .slice(0, 10)
          .reverse()
          .map((msg) => {
            if (!msg.body?.content) return;
            if (!msg.from?.user?.id) return;
            return {
              role: msg.from?.user?.id === 'devtools' ? ('assistant' as const) : ('user' as const),
              content: msg.body?.content,
            };
          })
          .filter((v): v is NonNullable<typeof v> => v !== undefined);

        const response = await promptRef.current.chat(messageHistory);

        // Send AI response back to chat
        await api.conversations.activities(chat.id).create({
          type: 'message',
          text: response,
        });

        setInteractionCount((count) => count + 1);
      } catch (err) {
        console.error('Error in AI chat:', err);
      }
    };

    handleNewMessage();
  }, [chat?.id, messages[chat?.id || ''], interactionCount]);

  const startConversation = async () => {
    if (!chat?.id) return;

    try {
      await api.conversations.activities(chat.id).create({
        type: 'message',
        text: INITIAL_MESSAGE,
      });
      setInteractionCount(0);
    } catch (err) {
      console.error('Error starting conversation:', err);
    }
  };

  return (
    <div className="AutoChat flex flex-col h-full">
      <div className="flex flex-col p-4 gap-4 border-b dark:border-stone-800">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">System Prompt</label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="p-2 rounded-md bg-stone-800 min-h-[100px]"
            placeholder="Enter system prompt..."
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>
            Interactions: {interactionCount}/{MAX_INTERACTIONS}
          </span>
          <button
            onClick={() => setInteractionCount(0)}
            className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700"
          >
            Reset Count
          </button>
          <button
            onClick={startConversation}
            className="px-2 py-1 rounded bg-indigo-800 hover:bg-indigo-700"
          >
            Start Conversation
          </button>
        </div>
      </div>

      <div className="flex flex-col-reverse flex-1 my-2 gap-2 overflow-y-auto px-4">
        {chat?.id &&
          (messages[chat.id] || []).map((message) => (
            <Message
              key={message.id}
              value={message}
              streaming={false}
              feedback={false}
              react={() => {}}
              setFeedback={() => {}}
            />
          ))}
      </div>
    </div>
  );
};

export default AutoChat;
