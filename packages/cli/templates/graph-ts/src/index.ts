import { MessageSendActivity } from '@teams.sdk/api';
import { App, HttpPlugin } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';
import { Card, CodeBlock } from '@teams.sdk/cards';

const app = new App({
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ log, signin, isSignedIn }) => {
  if (!isSignedIn) {
    await signin();
    return;
  }

  log.info('user already signed in!');
});

app.event('signin', async ({ send, graph }) => {
  const me = await graph.me.get();

  await send(
    MessageSendActivity(`hello ${me.displayName} 👋!`)
      .card(
        'adaptive',
        Card([
          CodeBlock({
            codeSnippet: JSON.stringify(me, null, 2),
          }),
        ])
      )
      .build()
  );
});

(async () => {
  await app.start();
})();
