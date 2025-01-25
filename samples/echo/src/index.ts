import { App, HttpPlugin } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/echo', { level: 'debug' }),
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ stream, activity, next }) => {
  // await send({ type: 'typing' });
  stream.emit({
    type: 'message',
    text: `you said "${activity.text}"`,
    channelData: {
      feedbackLoopEnabled: true
    }
  });

  return next();
});

(async () => {
  await app.start();
})();
