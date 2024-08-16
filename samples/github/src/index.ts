import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

import { storage } from './storage';
import { prompt } from './prompt';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ level: 'debug', name: '@samples/github' }),
});

app.on('activity.message', async ({ say, activity }) => {
  let state = storage.get(activity.from.id);

  if (!state) {
    state = {
      status: false,
      history: [],
    };

    storage.set(activity.from.id, state);
  }

  if (activity.text === '/history') {
    await say({
      type: 'message',
      text: state.history.map((m) => `- **${m.role}**: ${JSON.stringify(m.content)}`).join('\n'),
    });

    return;
  }

  const text = await prompt(activity.from.id).chat(activity.text);

  await say({
    type: 'message',
    text,
  });
});

(async () => {
  await app.start();
})();
