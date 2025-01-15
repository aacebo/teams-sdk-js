import { BotClient, ConversationClient, MeetingClient, TeamClient, UserClient } from './clients';
import { ClientBase, ClientOptions } from './clients/client-base';

export class Client extends ClientBase {
  readonly bots: BotClient;
  readonly users: UserClient;
  readonly conversations: ConversationClient;
  readonly teams: TeamClient;
  readonly meetings: MeetingClient;

  constructor(options?: Omit<ClientOptions, 'children'>) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    };

    const bots = new BotClient(options);
    const users = new UserClient(options);
    const conversations = new ConversationClient(options);
    const teams = new TeamClient(options);
    const meetings = new MeetingClient(options);

    super({
      ...options,
      children: [bots, users, conversations, teams, meetings],
    });

    this.bots = bots;
    this.users = users;
    this.conversations = conversations;
    this.teams = teams;
    this.meetings = meetings;
  }
}
