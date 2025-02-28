import path from 'path';

import { App } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  plugins: [new DevtoolsPlugin()],
});

app.tab('test', path.resolve('dist/client'));
app.function('hello-world', async ({ log, data }) => {
  log.info(data);
});

(async () => {
  await app.start();
})();
