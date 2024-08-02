import { DefaultHttpClient, HttpClient } from '@teams/common';

import { UsersClient } from './clients';

import { ClientOptions } from './client-options';

export class Client {
  readonly users: UsersClient;

  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
    this.users = new UsersClient({ ...this._options, http: this._http });
  }
}
