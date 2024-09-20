import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { TeamsAdapter } from '@teams.sdk/botbuilder';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const logger = new ConsoleLogger('@samples/botbuilder', {
  level: 'debug',
});

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger,
  receiver: new TeamsAdapter({
    type: 'MultiTenant',
    clientId,
    clientSecret,
    logger,
  }),
});

app.on('message', async ({ send, activity }) => {
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
  });
});

(async () => {
  await app.start();
})();
