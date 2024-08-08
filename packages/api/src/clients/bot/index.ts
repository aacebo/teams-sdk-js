import { ClientOptions } from '../../client-options';

import { BotSignInClient } from './sign-in';
import { BotTokenClient } from './token';

export class BotClient {
  readonly token: BotTokenClient;
  readonly signIn: BotSignInClient;

  constructor(private readonly _options?: ClientOptions) {
    this.token = new BotTokenClient(this._options);
    this.signIn = new BotSignInClient(this._options);
  }
}

export * from './sign-in';
export * from './token';
