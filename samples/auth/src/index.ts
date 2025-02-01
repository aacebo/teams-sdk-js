import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { MessageSendActivity } from '@teams.sdk/api';
import { Card, CodeBlock, Column, ColumnSet, Image, TextBlock } from '@teams.sdk/cards';

const app = new App({
  logger: new ConsoleLogger('@samples/auth', { level: 'debug' }),
  oauth: { graph: 'graph-connection' }
});

app.on('message', async ({ signin }) => {
  await signin('graph-connection');
});

app.event('signin', async ({ send, api }) => {
  const me = await api.graph.me.get({ $select: ['id'] });
  const [meta, photo] = await Promise.all([
    api.graph.me.photo.get(),
    api.graph.me.photo.value.get({ }, { responseType: 'arraybuffer' }) as Promise<ArrayBuffer>,
  ]);

  const photoUrl = `data:${(meta as any)['@odata.mediaContentType']};base64,${Buffer.from(photo).toString('base64')}`;

  await send(
    MessageSendActivity(`hello ${me.displayName} 👋!`)
      .card('adaptive', Card([CodeBlock({
        codeSnippet: JSON.stringify(me, null, 2)
      })]))
      .card('adaptive', Card([
        ColumnSet([
          Column([Image(photoUrl)]),
          Column([
            TextBlock('Name:', { weight: 'bolder' }),
            TextBlock('Title:', { weight: 'bolder' }),
            TextBlock('Email:', { weight: 'bolder' }),
          ], { width: '65px' }),
          Column([
            TextBlock(me.displayName || ''),
            TextBlock(me.jobTitle || ''),
            TextBlock(me.mail || ''),
          ]),
        ], { spacing: 'small' }),
      ]))
      .build()
  );
});

(async () => {
  await app.start();
})();
