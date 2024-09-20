import { ConsoleLogger } from '@teams.sdk/common/logging';
import { config } from 'dotenv';
import { ConsoleApp } from './console-app';

// load environment variables from '.env' file
config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('missing environment variables');
}

const app = ConsoleApp({
  type: 'MultiTenant',
  clientId,
  clientSecret,
  logger: new ConsoleLogger('@samples/echo', { level: 'debug' }),
});

app.on('message', async ({ send, activity }) => {
  await send({
    type: 'message',
    text: `you said "${activity.text}"`,
  });
});

(async () => {
  await app.start();
})();
