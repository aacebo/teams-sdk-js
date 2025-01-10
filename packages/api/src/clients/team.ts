import { ChannelInfo, TeamDetails } from '../models';
import { ClientBase, ClientOptions } from './client-base';

export class TeamClient extends ClientBase {
  constructor(options?: ClientOptions) {
    super({
      ...options,
      children: [],
    });
  }

  async getById(id: string) {
    const res = await this.http.get<TeamDetails>(`/v3/teams/${id}`);
    return res.data;
  }

  async getConversations(id: string) {
    const res = await this.http.get<ChannelInfo[]>(`/v3/teams/${id}/conversations`);
    return res.data;
  }
}
