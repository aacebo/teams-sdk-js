import path from 'path';

import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  logger: new ConsoleLogger('@samples/tab', { level: 'debug' }),
  plugins: [new DevtoolsPlugin()],
});

app.tab('test', path.resolve('dist/client'));

(async () => {
  await app.start();
})();
