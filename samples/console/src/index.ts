import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { ConsoleSender, ConsoleReceiver } from '@teams.sdk/dev';

const logger = new ConsoleLogger('@samples/console', { level: 'debug' });
const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  logger,
  receiver: new ConsoleReceiver({ logger }),
  sender: (ctx) => new ConsoleSender(ctx),
});

app.on('message', async ({ send, signin, activity }) => {
  await signin('graph-connection');
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
  });
});

(async () => {
  await app.start();
})();
