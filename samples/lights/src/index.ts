import { App } from '@teams.sdk/apps';
import { ChatPrompt, Message } from '@teams.sdk/ai';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { OpenAIChatModel } from '@teams.sdk/openai';
import { LocalStorage } from '@teams.sdk/common/storage';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const storage = new LocalStorage<{
  status: boolean;
  messages: Message[];
}>();

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@samples/lights', { level: 'debug' }),
});

app.on('message', async ({ send, activity }) => {
  let state = storage.get(activity.from.id);

  if (!state) {
    state = {
      status: false,
      messages: [],
    };

    storage.set(activity.from.id, state);
  }

  if (activity.text === '/history') {
    await send({
      type: 'message',
      text: state.messages.map((m) => `- ${m.role}: ${JSON.stringify(m.content)}`).join('\n'),
    });

    return;
  }

  const prompt = new ChatPrompt({
    messages: storage.get(activity.from.id)?.messages,
    instructions: `The following is a conversation with an AI assistant.
  The assistant can turn a light on or off.
  The lights are currently off.`,
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    }),
  })
    .function('get_light_status', 'get the current light status', () => {
      return state.status;
    })
    .function('lights_on', 'turn the lights on', () => {
      state.status = true;
      storage.set(activity.from.id, state);
    })
    .function('lights_off', 'turn the lights off', () => {
      state.status = false;
      storage.set(activity.from.id, state);
    });

  const text = await prompt.chat(activity.text);

  await send({
    type: 'message',
    text,
  });
});

(async () => {
  await app.start();
})();
