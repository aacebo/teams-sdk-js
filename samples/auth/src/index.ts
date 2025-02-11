import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { MessageSendActivity } from '@teams.sdk/api';
import { Card, CodeBlock, Column, ColumnSet, Image, TextBlock } from '@teams.sdk/cards';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/auth', { level: 'debug' }),
  plugins: [new DevtoolsPlugin()],
});

app.message('/signout', async ({ send, signout, isSignedIn }) => {
  if (!isSignedIn) return;
  await signout();
  await send('you have been signed out!');
});

app.on('message', async ({ log, signin, api, isSignedIn }) => {
  if (!isSignedIn) {
    await signin();
    return;
  }

  const me = await api.user.me.get();
  log.info(`user "${me.displayName}" already signed in!`);
});

app.event('signin', async ({ send, api }) => {
  const me = await api.user.me.get();
  const [meta, photo] = await Promise.all([
    api.user.me.photo.get(),
    api.user.me.photo.value.get({}, { responseType: 'arraybuffer' }) as Promise<ArrayBuffer>,
  ]);

  const photoUrl = `data:${(meta as any)['@odata.mediaContentType']};base64,${Buffer.from(photo).toString('base64')}`;

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
      .card(
        'adaptive',
        Card([
          ColumnSet(
            [
              Column([Image(photoUrl)]),
              Column(
                [
                  TextBlock('Name:', { weight: 'bolder' }),
                  TextBlock('Title:', { weight: 'bolder' }),
                  TextBlock('Email:', { weight: 'bolder' }),
                ],
                { width: '65px' }
              ),
              Column([
                TextBlock(me.displayName || ''),
                TextBlock(me.jobTitle || ''),
                TextBlock(me.mail || ''),
              ]),
            ],
            { spacing: 'small' }
          ),
        ])
      )
  );
});

(async () => {
  await app.start();
})();
