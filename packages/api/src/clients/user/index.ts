import { UserTokenClient } from './token';
import { ClientBase, ClientOptions } from '../client-base';

export class UserClient extends ClientBase {
  readonly token: UserTokenClient;

  constructor(options?: ClientOptions) {
    const token = new UserTokenClient(options);

    super({
      ...options,
      children: [token],
    });

    this.token = token;
  }
}

export * from './token';
