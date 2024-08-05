import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import pkg from '../package.json';

import { BotClient, ConversationClient, UserClient } from './clients';
import { ClientOptions } from './client-options';

export class Client {
  readonly bots: BotClient;
  readonly users: UserClient;
  readonly conversations: ConversationClient;

  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
    this._http.headers.add('user-agent', `teams[api]/${pkg.version}`);
    this._http.headers.add('content-type', 'application/json');
    this._http.options.baseUrl = 'https://api.botframework.com';

    this.bots = new BotClient({ ...this._options, http: this._http });
    this.users = new UserClient({ ...this._options, http: this._http });
    this.conversations = new ConversationClient({ ...this._options, http: this._http });
  }
}
