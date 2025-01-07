import axios from 'axios';

import { Account, Resource } from '../../models';
import { Activity } from '../../activities';

export class ConversationActivityClient {
  private readonly _http: axios.AxiosInstance;

  constructor(conversationId: string, options?: axios.CreateAxiosDefaults) {
    this._http = axios.create({
      ...options,
      baseURL: `${options?.baseURL || ''}/v3/conversations/${conversationId}`,
    });
  }

  async create(params: Partial<Activity>) {
    const res = await this._http.post<Resource>('/activities', params);

    return res.data;
  }

  async update(id: string, params: Partial<Activity>) {
    const res = await this._http.put<Resource>(`/activities/${id}`, params);

    return res.data;
  }

  async reply(id: string, params: Partial<Activity>) {
    params.replyToId = id;

    const res = await this._http.post<Resource>(`/activities/${id}`, params);

    return res.data;
  }

  async delete(id: string) {
    const res = await this._http.delete<void>(`/activities/${id}`);
    return res.data;
  }

  members(activityId: string) {
    return {
      get: async () => {
        const res = await this._http.get<Account[]>(`/activities/${activityId}/members`);
        return res.data;
      },
    };
  }
}
