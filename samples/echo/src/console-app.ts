import { App, AppOptions } from '@teams.sdk/apps';
import { ConsoleReceiver } from './console-receiver';

/**
 * Creates an instance of App with a ConsoleReceiver.
 *
 * It override thes `context.send` method to use the ConsoleReceiver's `send` method.
 * It also overrides the app event `start` to do nothing by default.
 * @param appOptions The app options
 * @returns an App instance
 */
export const ConsoleApp = (appOptions: AppOptions): App => {
  const receiver = new ConsoleReceiver();
  const { send } = receiver;

  const app = new App({ ...appOptions, receiver });

  app.use((ctx) => {
    ctx.send = send;
    ctx.next();
  });

  app.event('start', async () => {
    // Do nothing
  });

  return app;
};
