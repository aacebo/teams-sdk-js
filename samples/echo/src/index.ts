import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

const app = new App({
  type: 'MultiTenant',
  clientId: 'test',
  clientSecret: 'test',
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
})().catch(onError);

function onError(err: Error) {
  console.log(err);
  app.log.error(err);
}
