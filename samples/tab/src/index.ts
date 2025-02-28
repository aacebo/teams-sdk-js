import path from 'path';

import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/tab', { level: 'debug' }),
  plugins: [new DevtoolsPlugin()],
});

app.tab('test', path.resolve('dist/client'));
app.function('hello-world', async ({ log, data }) => {
  log.info(data);
});

(async () => {
  await app.start();
})();
