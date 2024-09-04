import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';

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

app.on('install.add', events.install);
app.on('install.remove', events.uninstall);
app.on('message', events.message);
app.on('mention', events.mention);
app.on('signin', events.signin);
app.on('dialog.open', events.taskFetch);

(async () => {
  await app.start();
})();
