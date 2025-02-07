import fs from 'fs';
import path from 'path';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { DevtoolsPlugin } from '@teams.sdk/dev';

import Tab from './Tab/App';

const index = fs.readFileSync(path.resolve('dist/client/index.html')).toString();

const app = new App({
  logger: new ConsoleLogger('@samples/tab', { level: 'debug' }),
  plugins: [new DevtoolsPlugin()],
});

app.tab('settings', path.resolve('dist/client'), () => {
  const node = StrictMode({ children: [Tab()] });
  const html = renderToString(node);
  return index.replace('<!--app-html-->', html ?? '');
});

(async () => {
  await app.start();
})();
