import { Account, Resource } from '../../models';
import { Activity } from '../../activities';
import { ClientBase, ClientOptions } from '../client-base';

export class ConversationActivityClient extends ClientBase {
  constructor(conversationId: string, options?: ClientOptions) {
    super({
      ...options,
      baseURL: `${options?.baseURL || ''}/v3/conversations/${conversationId}`,
      children: [],
    });
  }

  async create(params: Partial<Activity>) {
    const res = await this.http.post<Resource>('/activities', params);
    return res.data;
  }

  async update(id: string, params: Partial<Activity>) {
    const res = await this.http.put<Resource>(`/activities/${id}`, params);
    return res.data;
  }

  async reply(id: string, params: Partial<Activity>) {
    params.replyToId = id;
    const res = await this.http.post<Resource>(`/activities/${id}`, params);
    return res.data;
  }

  async delete(id: string) {
    const res = await this.http.delete<void>(`/activities/${id}`);
    return res.data;
  }

  members(activityId: string) {
    return {
      get: async () => {
        const res = await this.http.get<Account[]>(`/activities/${activityId}/members`);
        return res.data;
      },
    };
  }
}
