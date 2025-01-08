import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { cardAttachment } from '@teams.sdk/api';

import { graph } from './graph';
import * as cards from './cards';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@samples/auth', { level: 'debug' }),
});

app.on('message', async ({ signin }) => {
  await signin('graph-connection');
});

app.event('signin', async ({ send, token }) => {
  const msgraph = graph(token.token);
  const me = await graph(token.token).api('/me').get();
  const [meta, photo] = await Promise.all([
    msgraph.api('/me/photo').get(),
    msgraph.api('/me/photo/$value').get() as Promise<Blob>,
  ]);

  const photoUrl = `data:${meta['@odata.mediaContentType']};base64,${Buffer.from(await photo.arrayBuffer()).toString('base64')}`;

  await send({
    type: 'message',
    text: `\`${JSON.stringify(me, null, 2)}\``,
    attachments: [cardAttachment('adaptive', cards.oauth(me, photoUrl))],
  });
});

(async () => {
  await app.start();
})();
