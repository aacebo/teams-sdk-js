# Getting Started

First lets initialize an app.

```bash
npx '@teams.sdk/cli' new hello-world
```

![Getting Started CLI](https://github.com/aacebo/teams-sdk-js/blob/main/assets/screenshots/getting_started_cli.png?raw=true)

this will provide you with a starter template that will look something like this:

```typescript
import { App, HttpPlugin } from '@teams.sdk/apps';
import { DevtoolsPlugin } from '@teams.sdk/dev';

const app = new App({
  plugins: [new DevtoolsPlugin(), new HttpPlugin()],
});

app.on('message', async ({ send, activity, next }) => {
  await send({ type: 'typing' });
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
  });

  return next();
});

(async () => {
  await app.start();
})();
```
