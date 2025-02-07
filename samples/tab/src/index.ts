import fs from 'fs';
import path from 'path';

import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

import { render } from './Tab/server';

const app = new App({
  logger: new ConsoleLogger('@samples/tab', { level: 'debug' }),
  plugins: [new DevtoolsPlugin()],
});

app.tab('settings', path.resolve('dist/client'), async () => {
  const rendered = render();
  const html = fs
    .readFileSync(path.resolve('dist/client/index.html'))
    .toString()
    .replace(`<!--app-html-->`, rendered.html ?? '');

  return html;
});

(async () => {
  await app.start();
})();
