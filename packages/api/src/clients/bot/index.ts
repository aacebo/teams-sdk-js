import { Client, ClientOptions } from '@teams.sdk/common/http';

import { BotSignInClient } from './sign-in';
import { BotTokenClient } from './token';

export class BotClient {
  readonly token: BotTokenClient;
  readonly signIn: BotSignInClient;

  constructor(options?: Client | ClientOptions) {
    this.token = new BotTokenClient(options);
    this.signIn = new BotSignInClient(options);
  }
}

export * from './sign-in';
export * from './token';
