import { AdaptiveCardAttachment } from '@teams/api';
import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb',
  clientSecret: process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb',
  logger: new ConsoleLogger({ name: '@samples/echo' }),
});

app.on('activity.message', async ({ activity, say }) => {
  await say({
    type: 'message',
    text: `you said: "${activity.text}"`,
  });

  await say({
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          version: '1.4',
          body: [
            {
              type: 'TextBlock',
              text: 'testing123',
              wrap: true,
            },
          ],
        },
      } as AdaptiveCardAttachment,
    ],
  });
});

(async () => {
  await app.start();
})();
