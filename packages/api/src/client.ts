import { HttpClient } from '@teams.sdk/common/http';

import pkg from '../package.json';

import { BotClient, ConversationClient, MeetingClient, TeamClient, UserClient } from './clients';
import { ClientOptions } from './client-options';

export class Client {
  readonly bots: BotClient;
  readonly users: UserClient;
  readonly conversations: ConversationClient;
  readonly teams: TeamClient;
  readonly meetings: MeetingClient;

  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = new HttpClient(this._options);
    this._http.headers.add('user-agent', `teams[api]/${pkg.version}`);
    this._http.headers.set('content-type', 'application/json');

    this.bots = new BotClient(this._options);
    this.users = new UserClient(this._options);
    this.conversations = new ConversationClient(this._options);
    this.teams = new TeamClient(this._options);
    this.meetings = new MeetingClient(this._options);
  }
}
