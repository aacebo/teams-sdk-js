import { ConsoleLogger } from '@teams.sdk/common/logging';
import { config } from 'dotenv';
import { ConsoleApp } from './console';
import { LocalStorage } from '@teams.sdk/common/storage';
import { OpenAIAssistantModel } from '@teams.sdk/openai';
import { ChatPrompt } from '@teams.sdk/ai';

// load environment variables from '.env' file
config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const openaiKey = process.env.OPENAI_KEY;
const assistantId = process.env.ASSISTANT_ID!;
const threadId = process.env.THREAD_ID!;

if (!clientId || !clientSecret || !assistantId || !threadId || !openaiKey) {
  throw new Error('missing environment variables');
}

const app = ConsoleApp({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@samples/assistants', { level: 'debug' }),
  storage: new LocalStorage(),
});

app.on('message', async ({ send, activity }) => {
  const model = new OpenAIAssistantModel({
    apiKey: openaiKey,
    assistantId: assistantId,
    threadId: threadId,
    logger: new ConsoleLogger(`openai-assistant-model`, { level: 'debug' }),
  });

  const prompt = new ChatPrompt({ model }).function(
    'get_weather',
    'Determines weather in my location',
    (params) => {
      // parse JSON string
      const data: {
        location: string;
        weather: string;
      } = JSON.parse(params);

      return `The weather in ${data.location} is ${data.weather}.`;
    }
  );
  const response = await prompt.chat(activity.text);

  await send({
    type: 'message',
    text: response,
  });
});

(async () => {
  await app.start();
})();
