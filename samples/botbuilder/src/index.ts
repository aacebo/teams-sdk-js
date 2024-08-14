import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import { TeamsAdapter } from '@teams/botbuilder';
import {
  ConfigurationBotFrameworkAuthentication,
  ConfigurationServiceClientCredentialFactory,
} from 'botbuilder-core';

const clientId = process.env.CLIENT_ID || 'b4e3dcad-6c1a-4f21-8a48-dd539afa61bb';
const clientSecret = process.env.CLIENT_SECRET || 'C4y8Q~d_Ip-wdR4pcLByptK2.Z.xg51ialgDtbyb';
const logger = new ConsoleLogger({
  level: 'debug',
  name: '@samples/botbuilder',
});

const app = new App({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger,
  receiver: new TeamsAdapter({
    logger,
    auth: new ConfigurationBotFrameworkAuthentication(
      {},
      new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppType: 'MultiTenant',
        MicrosoftAppId: clientId,
        MicrosoftAppPassword: clientSecret,
      })
    ),
  }),
});

app.on('activity.message', async ({ say, activity }) => {
  await say({
    type: 'message',
    text: `you said "${activity.text}"`,
  });
});

(async () => {
  await app.start();
})();
