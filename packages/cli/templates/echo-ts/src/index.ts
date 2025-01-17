import { App, HttpPlugin } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
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
