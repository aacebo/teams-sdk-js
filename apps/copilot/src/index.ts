import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';

import { RedisStorage } from './redis-storage';
import * as cmds from './cmds';
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
  storage: new RedisStorage(),
  logger: new ConsoleLogger('@apps/copilot', { level: 'debug' }),
});

app.message('/clear', cmds.clear);
app.message('/history', cmds.history);
app.message('/logout', cmds.logout);
app.event('signin', events.signin);

app.on('install.add', events.install);
app.on('install.remove', events.uninstall);
app.on('mention', events.mention);
app.on('message', events.message);
app.on('dialog.open', events.dialogOpen);
app.on('message.submit.feedback', () => {
  return {
    status: 200,
    body: {},
  };
});

(async () => {
  await app.start();
})();
