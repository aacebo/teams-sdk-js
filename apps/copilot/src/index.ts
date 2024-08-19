import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

import * as events from './events';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ level: 'debug', name: '@apps/copilot' }),
});

app.on('activity.conversationUpdate', events.conversationUpdate);
app.on('activity.message', events.message);
app.on('mention', events.mention);
app.on('signin', events.signin);

(async () => {
  await app.start();
})();
