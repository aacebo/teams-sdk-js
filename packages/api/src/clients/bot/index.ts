import { ClientBase, ClientOptions } from '../client-base';

import { BotSignInClient } from './sign-in';
import { BotTokenClient } from './token';

export class BotClient extends ClientBase {
  readonly token: BotTokenClient;
  readonly signIn: BotSignInClient;

  constructor(options?: ClientOptions) {
    const token = new BotTokenClient(options);
    const signIn = new BotSignInClient(options);

    super({
      ...options,
      children: [token, signIn],
    });

    this.token = token;
    this.signIn = signIn;
  }
}

export * from './sign-in';
export * from './token';
