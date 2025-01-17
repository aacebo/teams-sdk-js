import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { ConsolePlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/console', { level: 'debug' }),
  plugins: [new ConsolePlugin()],
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
