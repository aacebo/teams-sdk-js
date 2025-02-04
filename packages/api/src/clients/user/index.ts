import { Client, ClientOptions } from '@teams.sdk/common/http';

import { UserTokenClient } from './token';

export class UserClient {
  readonly token: UserTokenClient;

  constructor(options?: Client | ClientOptions) {
    this.token = new UserTokenClient(options);
  }
}

export * from './token';
