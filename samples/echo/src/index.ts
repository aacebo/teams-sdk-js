import { App, HttpPlugin } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@samples/echo', { level: 'debug' }),
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ send, activity, next }) => {
  await send({ type: 'typing' });
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
  });

  return next();
});

(async () => {
  await app.start();
})();
