import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import { cardAttachment } from '@teams/api';

import { graph } from './graph';
import * as cards from './cards';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger('@samples/auth', { level: 'debug' }),
});

app.on('activity.message', async ({ signin }) => {
  await signin('graph-connection');
});

app.on('signin', async ({ say, tokenResponse }) => {
  const msgraph = graph(tokenResponse.token);
  const me = await graph(tokenResponse.token).api('/me').get();
  const [meta, photo] = await Promise.all([
    msgraph.api('/me/photo').get(),
    msgraph.api('/me/photo/$value').get() as Promise<Blob>,
  ]);

  const photoUrl = `data:${meta['@odata.mediaContentType']};base64,${Buffer.from(await photo.arrayBuffer()).toString('base64')}`;

  await say({
    type: 'message',
    text: `\`${JSON.stringify(me, null, 2)}\``,
    attachments: [cardAttachment('adaptive', cards.oauth(me, photoUrl))],
  });
});

(async () => {
  await app.start();
})();
