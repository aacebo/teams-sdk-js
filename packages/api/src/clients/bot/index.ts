import axios from 'axios';

import { BotSignInClient } from './sign-in';
import { BotTokenClient } from './token';

export class BotClient {
  readonly token: BotTokenClient;
  readonly signIn: BotSignInClient;

  constructor(options?: axios.CreateAxiosDefaults) {
    this.token = new BotTokenClient(options);
    this.signIn = new BotSignInClient(options);
  }
}

export * from './sign-in';
export * from './token';
