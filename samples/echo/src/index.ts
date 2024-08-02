import { App } from '@teams/apps';
import { ConsoleLogger } from '@teams/common/logging';

const app = new App({
  logger: new ConsoleLogger({ name: '@samples/echo' }),
});

app.on('activity', (activity) => {
  app.log.debug(activity);
});

(async () => {
  await app.start();
})();
