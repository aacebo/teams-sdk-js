import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';

import { UserTokenClient } from './token';

export class UserClient {
  readonly token: UserTokenClient;

  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
    this.token = new UserTokenClient({ ...this._options, http: this._http });
  }
}

export * from './token';