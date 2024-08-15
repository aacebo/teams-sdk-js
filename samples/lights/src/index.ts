import { App } from '@teams/apps';
import { ChatPrompt, Message } from '@teams/ai';
import { ConsoleLogger } from '@teams/common/logging';
import { OpenAIChatModel } from '@teams/openai';

const state = new Map<
  string,
  {
    status?: boolean;
    history?: Message[];
  }
>();

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ level: 'debug', name: '@samples/lights' }),
});

app.on('activity.message', async ({ say, activity }) => {
  const prompt = new ChatPrompt({
    history: state.get(activity.from.id)?.history,
    instructions: `The following is a conversation with an AI assistant.
  The assistant can turn a light on or off.
  The lights are currently off.`,
    model: new OpenAIChatModel({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY,
    }),
  })
    .function('get_light_status', 'get the current light status', () => {
      return state.get(activity.from.id)?.status || false;
    })
    .function('lights_on', 'turn the lights on', () => {
      const userState = state.get(activity.from.id) || {};
      userState.status = true;
      state.set(activity.from.id, userState);
    })
    .function('lights_off', 'turn the lights off', () => {
      const userState = state.get(activity.from.id) || {};
      userState.status = false;
      state.set(activity.from.id, userState);
    });

  const text = await prompt.chat(activity.text);

  await say({
    type: 'message',
    text,
  });
});

(async () => {
  await app.start();
})();
