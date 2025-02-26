import { App } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  plugins: [new DevtoolsPlugin()],
});

app.on('message', async ({ send, activity }) => {
  await send({ type: 'typing' });
  await send(`you said "${activity.text}"`);
});

(async () => {
  await app.start(+(process.env.PORT || 3000));
})();
