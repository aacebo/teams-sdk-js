import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

const app = new App({
  type: 'MultiTenant',
  clientId: process.env.CLIENT_ID || '241907c6-3ba3-48e7-9cf1-3cab8fda51c9',
  clientSecret: process.env.CLIENT_SECRET || 'X0J8Q~tVhrFztHuPBH5vjpj9XUiDJU2ipgE1mbfs',
  logger: new ConsoleLogger({ name: '@samples/echo' }),
});

app.on('activity', (activity) => {
  app.log.debug(activity);
});

app.on('activity.event', (activity) => {
  app.log.info(activity);
});

(async () => {
  await app.start();
})();
