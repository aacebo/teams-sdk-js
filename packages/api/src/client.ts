import axios from 'axios';

import pkg from '../package.json';

import { BotClient, ConversationClient, MeetingClient, TeamClient, UserClient } from './clients';

export class Client {
  readonly bots: BotClient;
  readonly users: UserClient;
  readonly conversations: ConversationClient;
  readonly teams: TeamClient;
  readonly meetings: MeetingClient;

  constructor(options?: axios.CreateAxiosDefaults) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        'User-Agent': `teams[api]/${pkg.version}`,
        'Content-Type': 'application/json',
      },
    };

    this.bots = new BotClient(options);
    this.users = new UserClient(options);
    this.conversations = new ConversationClient(options);
    this.teams = new TeamClient(options);
    this.meetings = new MeetingClient(options);
  }
}
