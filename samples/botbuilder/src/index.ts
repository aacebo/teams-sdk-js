import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';
import { TeamsAdapter } from '@teams/botbuilder';
import {
  ConfigurationBotFrameworkAuthentication,
  ConfigurationServiceClientCredentialFactory,
} from 'botbuilder-core';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const logger = new ConsoleLogger('@samples/botbuilder', {
  level: 'debug',
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
