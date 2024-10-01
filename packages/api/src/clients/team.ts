import axios from 'axios';

import { ChannelInfo, TeamDetails } from '../models';

export class TeamClient {
  private readonly _http: axios.AxiosInstance;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create(options);
  }

  async getById(id: string) {
    const res = await this._http.get<TeamDetails>(`/v3/teams/${id}`);
    return res.data;
  }

  async getConversations(id: string) {
    const res = await this._http.get<ChannelInfo[]>(`/v3/teams/${id}/conversations`);
    return res.data;
  }
}
