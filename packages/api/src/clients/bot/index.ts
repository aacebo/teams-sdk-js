import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';

import { BotSignInClient } from './sign-in';

export class BotClient {
  readonly signIn: BotSignInClient;

  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
    this.signIn = new BotSignInClient({ ...this._options, http: this._http });
  }
}

export * from './sign-in';
