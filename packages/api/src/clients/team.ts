import { HttpClient } from '@teams.sdk/common/http';

import { ClientOptions } from '../client-options';
import { ChannelInfo, TeamDetails } from '../models';

export class TeamClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = new HttpClient(this._options);
  }

  async getById(id: string) {
    const res = await this._http.get<TeamDetails>(`/v3/teams/${id}`);
    return res.json();
  }

  async getConversations(id: string) {
    const res = await this._http.get<ChannelInfo[]>(`/v3/teams/${id}/conversations`);
    return res.json();
  }
}
