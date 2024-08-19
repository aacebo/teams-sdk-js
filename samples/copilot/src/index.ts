import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import { LocalStorage } from '@teams/common/storage';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { State } from './state';
import { graph } from './graph';
import { RootPrompt } from './prompts';

const storage = new LocalStorage<State>();
const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ level: 'debug', name: '@samples/copilot' }),
});

app.on('activity.conversationUpdate', async ({ activity, signin }) => {
  if (!activity.membersAdded?.length) return;
  if (!activity.membersAdded?.some(m => m.id === activity.from.id)) return;
  await signin('graph-connection');
});

app.on('activity.message', async ({ say, activity, signin }) => {
  if (activity.conversation.isGroup) return;

  const key = activity.from.id;
  let state = storage.get(key);

  if (!state) {
    state = {
      auth: {
        conversationId: activity.conversation.id,
      },
      history: [],
    };

    storage.set(key, state);
  }

  if (!state.auth?.token) {
    await signin('graph-connection');
    return;
  }

  if (activity.text === '/history') {
    await say({
      type: 'message',
      text: state.history.map((m) => `- **${m.role}**: ${JSON.stringify(m.content)}`).join('\n'),
    });

    return;
  }

  const prompt = new RootPrompt(state);
  const text = await prompt.chat(activity.text);
  await say({ type: 'message', text });
  storage.set(key, state);
});

app.on('mention', async ({ say, activity, signin }) => {
  const key = activity.from.id;
  let state = storage.get(key);

  if (!state) {
    state = {
      auth: {
        conversationId: activity.conversation.id,
      },
      history: [],
    };

    storage.set(key, state);
  }

  if (!state.auth?.token) {
    await signin('graph-connection');
    return;
  }

  if (activity.text === '/history') {
    await say({
      type: 'message',
      text: state.history.map((m) => `- **${m.role}**: ${JSON.stringify(m.content)}`).join('\n'),
    });

    return;
  }

  const prompt = new RootPrompt(state);
  const text = await prompt.chat(activity.text);
  await say({ type: 'message', text });
  storage.set(key, state);
});

app.on('signin', async ({ api, activity, tokenResponse }) => {
  const key = activity.from.id;
  let state = storage.get(key);

  if (!state) {
    return;
  }

  const conversationId = state.auth?.conversationId || activity.conversation.id;
  const msgraph = graph(tokenResponse.token);
  const me: MSGraph.User = await msgraph.api('/me').get();
  const tz: { value?: string } = await msgraph.api('/me/mailboxSettings/timeZone').get();

  state.user = {
    ...me,
    timezone: tz.value,
  };

  state.auth = {
    token: tokenResponse.token,
    expiration: tokenResponse.expiration,
  };

  storage.set(key, state);
  await api.conversations.activities(conversationId).create({
    type: 'message',
    text: `Welcome ${me.displayName}, how may I assist you?`,
  });
});

(async () => {
  await app.start();
})();
