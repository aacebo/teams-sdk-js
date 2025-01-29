import { App, HttpPlugin } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ send, activity }) => {
  await send({ type: 'typing' });
  await send(`you said "${activity.text}"`);
});

(async () => {
  await app.start();
})();
