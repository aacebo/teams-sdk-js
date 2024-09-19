import { App, AppOptions } from '@teams.sdk/apps';
import { Receiver, ReceiverEvents } from '@teams.sdk/apps';
import { Activity, MessageSendActivity, Resource, Token } from '@teams.sdk/api';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';


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

  app.use(async (ctx) => {
    ctx.send = send;
    await ctx.next();
  });

  app.event('start', async () => {
    // Do nothing
  });

  return app;
};


/**
 * Can receive messages via the console
 */
export class ConsoleReceiver implements Receiver {
  private readonly _events: ReceiverEvents = {};
  private readonly _jwtToken = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
      'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  ].join('');

  public constructor() {
    this.send = this.send.bind(this);
  }

  /**
   * Starts the Console Receiver.
   */
  start(_: number): Promise<void> {
    this.prompt();
    return Promise.resolve();
  }

  /**
   * Prompts the user for input in the console and sends the input as an activity.
   */
  prompt(): void {
    const rl = readline.createInterface({ input: stdin, output: stdout, terminal: false });

    this._setStyle();
    this._send('> ');
    rl.on('line', async (input) => {
      if (!input) {
        this._send('> ');
        return;
      }

      this._resetStyle();
      const activity = this._createDefaultActivity(input);
      await this._events.activity?.({ activity, token: new Token(this._jwtToken) });
      this._setStyle();
      this._send('\n');

      this._send('> ');
    });
  }

  /**
   * Prints the activity text to the console.
   *
   * The activity must be a message activity with a non-empty text property.
   * @param activity The activity to send to the console.
   */
  async send(activity: Partial<Activity>): Promise<Resource> {
    const messageActivity = activity as MessageSendActivity;
    if (!messageActivity?.text) {
      throw new Error('`activity.text` is required');
    }

    const message = messageActivity.text;
    if (message) {
      this._send(this._colorBlue(message));
    }

    return Promise.resolve({ id: 'id' });
  }

  on<Event extends keyof ReceiverEvents>(event: Event, cb: ReceiverEvents[Event]): this {
    this._events[event] = cb;
    return this;
  }

  private _send(message: string) {
    stdout.write(message);
  }

  private _colorBlue(message: string) {
    const blue = '\x1b[34m';
    const reset = '\x1b[0m';
    return `${blue}${message}${reset}`;
  }

  private _resetStyle() {
    this._send('\x1b[0m');
  }

  private _setStyle() {
    // Color grey
    this._send(`\x1b[90m`);
  }

  private _createDefaultActivity(input: string): MessageSendActivity {
    return {
      type: 'message',
      text: input,
      id: 'id',
      serviceUrl: 'console',
      callerId: 'console',
      channelId: 'webchat', // Should add a "console" channel?
      from: { id: 'console', name: 'console', role: 'user' },
      conversation: {
        conversationType: 'console',
        isGroup: false,
        id: 'console',
        name: 'console',
        role: 'user',
      },
      recipient: { id: 'console', name: 'console', role: 'bot' },
    };
  }
}
