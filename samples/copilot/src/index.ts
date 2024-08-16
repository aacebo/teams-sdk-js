import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import * as MSGraph from '@microsoft/microsoft-graph-types';

import { storage } from './storage';
import { prompt } from './prompt';
import { graph } from './graph';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ level: 'debug', name: '@samples/github' }),
});

app.on('activity.message', async ({ say, activity, signin }) => {
  let state = storage.get(activity.from.id);

  if (!state) {
    state = { history: [] };
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

  const text = await prompt(state).chat(activity.text);
  storage.set(activity.from.id, state);
  await say({ type: 'message', text });
});

app.on('sign-in', async ({ say, activity, tokenResponse }) => {
  let state = storage.get(activity.from.id);

  if (!state) {
    state = { history: [] };
  }

  const msgraph = graph(tokenResponse.token);
  const me = await (msgraph.api('/me').get() as Promise<MSGraph.User>);

  state.user = me;
  state.auth = {
    token: tokenResponse.token,
    expiration: tokenResponse.expiration,
  };

  storage.set(activity.from.id, state);
  await say({ type: 'message', text: `Welcome ${me.displayName}` });
});

(async () => {
  await app.start();
})();
