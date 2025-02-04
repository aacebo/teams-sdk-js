import * as http from '@teams.sdk/common/http';

import { BotClient } from './bot';
import { UserClient } from './user';
import { ConversationClient } from './conversation';
import { TeamClient } from './team';
import { MeetingClient } from './meeting';

export class Client {
  readonly bots: BotClient;
  readonly users: UserClient;
  readonly conversations: ConversationClient;
  readonly teams: TeamClient;
  readonly meetings: MeetingClient;

  protected serviceUrl: string;
  protected http: http.Client;

  constructor(serviceUrl: string, options?: http.Client | http.ClientOptions) {
    this.serviceUrl = serviceUrl;

    if (!options) {
      this.http = new http.Client();
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        headers: {
          ...options?.headers,
          'Content-Type': 'application/json',
        },
      });
    }

    this.bots = new BotClient(this.http);
    this.users = new UserClient(this.http);
    this.conversations = new ConversationClient(serviceUrl, this.http);
    this.teams = new TeamClient(serviceUrl, this.http);
    this.meetings = new MeetingClient(serviceUrl, this.http);
  }
}

export * from './user';
export * from './bot';
export * from './conversation';
export * from './meeting';
export * from './team';
