import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { BotBuilderPlugin } from '@teams.sdk/botbuilder';

const app = new App({
  logger: new ConsoleLogger('@samples/botbuilder', { level: 'debug' }),
  plugins: [new BotBuilderPlugin()],
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
