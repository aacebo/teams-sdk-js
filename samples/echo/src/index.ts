import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import { Client, AuthProviderCallback } from '@microsoft/microsoft-graph-client';
import { cardAttachment } from '@teams/api';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ name: '@samples/echo' }),
});

app.on('activity.message', async ({ signin }) => {
  await signin('graph-connection');
});

app.on('sign-in', async ({ say, tokenResponse }) => {
  const msgraph = graph(tokenResponse.token);
  const me = await graph(tokenResponse.token).api('/me').get();
  const [meta, photo] = await Promise.all([
    msgraph.api('/me/photo').get(),
    msgraph.api('/me/photo/$value').get() as Promise<Blob>,
  ]);

  await say({
    type: 'message',
    text: `\`${JSON.stringify(me, null, 2)}\``,
    attachments: [
      cardAttachment('adaptive', {
        type: 'AdaptiveCard',
        version: '1.6',
        body: [
          {
            type: 'ColumnSet',
            spacing: 'small',
            columns: [
              {
                type: 'Column',
                items: [
                  {
                    type: 'Image',
                    url: `data:${meta['@odata.mediaContentType']};base64,${Buffer.from(await photo.arrayBuffer()).toString('base64')}`,
                  },
                ],
              },
              {
                type: 'Column',
                width: '65px',
                items: [
                  {
                    type: 'TextBlock',
                    text: 'Name:',
                    weight: 'bolder',
                  },
                  {
                    type: 'TextBlock',
                    text: 'Title:',
                    weight: 'bolder',
                  },
                  {
                    type: 'TextBlock',
                    text: 'Email:',
                    weight: 'bolder',
                  },
                ],
              },
              {
                type: 'Column',
                items: [
                  {
                    type: 'TextBlock',
                    text: me.displayName,
                  },
                  {
                    type: 'TextBlock',
                    text: me.jobTitle,
                  },
                  {
                    type: 'TextBlock',
                    text: me.mail,
                  },
                ],
              },
            ],
          },
        ],
      }),
    ],
  });
});

app.on('error', (err) => {
  app.log.debug(err);
});

(async () => {
  await app.start();
})();

function graph(token: string) {
  return Client.init({
    authProvider: (callback: AuthProviderCallback) => {
      callback(null, token);
    },
  });
}
