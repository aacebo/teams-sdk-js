import { App, HttpPlugin } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/echo', { level: 'debug' }),
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ send, activity }) => {
  await send({ type: 'typing' });
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
    channelData: {
      feedbackLoopEnabled: true,
    },
  });
});

(async () => {
  await app.start();
})();
