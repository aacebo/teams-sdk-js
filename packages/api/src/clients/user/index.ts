import { ClientOptions } from '../../client-options';

import { UserTokenClient } from './token';

export class UserClient {
  readonly token: UserTokenClient;

  constructor(private readonly _options?: ClientOptions) {
    this.token = new UserTokenClient(this._options);
  }
}

export * from './token';
