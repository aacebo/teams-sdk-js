import axios from 'axios';

import { UserTokenClient } from './token';

export class UserClient {
  readonly token: UserTokenClient;

  constructor(options?: axios.CreateAxiosDefaults) {
    this.token = new UserTokenClient(options);
  }
}

export * from './token';
