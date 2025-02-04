import { Client, ClientOptions } from '@teams.sdk/common/http';

import { ChannelInfo, TeamDetails } from '../models';

export class TeamClient {
  protected serviceUrl: string;
  protected http: Client;

  constructor(serviceUrl: string, options?: Client | ClientOptions) {
    this.serviceUrl = serviceUrl;

    if (!options) {
      this.http = new Client();
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new Client(options);
    }
  }

  async getById(id: string) {
    const res = await this.http.get<TeamDetails>(`${this.serviceUrl}/v3/teams/${id}`);
    return res.data;
  }

  async getConversations(id: string) {
    const res = await this.http.get<ChannelInfo[]>(
      `${this.serviceUrl}/v3/teams/${id}/conversations`
    );
    return res.data;
  }
}
