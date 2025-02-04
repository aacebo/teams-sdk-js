# 🚀 Getting Started

First lets initialize an app.

```bash
npx '@teams.sdk/cli' new hello-world
```

Here is what your terminal should look like:

&nbsp;&nbsp;&nbsp;&nbsp;![Getting Started CLI](https://github.com/aacebo/teams-sdk-js/blob/main/assets/screenshots/getting_started_cli.png?raw=true)

---

This will use the `@teams.sdk/cli` to install a starter template and build then run the bot server. The starter code will look something like this:

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

And with just one command, you have a functioning echo bot! Visit `http://localhost:3001/devtools` to interact with the bot.

## Next

The upcoming subsections on the activity types will cover the different types of activities that can be used in a bot. The definition of activities follow the Agents Protocol, and activities specific to Teams are also indicated.
