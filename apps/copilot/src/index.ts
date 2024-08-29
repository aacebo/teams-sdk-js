import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

import * as events from './events';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@apps/copilot', { level: 'debug' }),
});

app.on('activity.conversationUpdate', events.conversationUpdate);
app.on('activity.message', events.message);
app.on('mention', events.mention);
app.on('signin', events.signin);
app.on('activity.invoke[task/fetch]', events.taskFetch);

(async () => {
  await app.start();
})();
