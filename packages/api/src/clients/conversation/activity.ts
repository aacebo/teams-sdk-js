import { Account, Resource } from '../../models';
import { Activity } from '../../activities';
import { ClientBase } from '../client-base';

export type ActivityParams = Pick<Activity, 'type'> & Partial<Activity>;

export class ConversationActivityClient extends ClientBase {
  async create(conversationId: string, params: ActivityParams) {
    const res = await this.http.post<Resource>(
      `/v3/conversations/${conversationId}/activities`,
      params
    );
    return res.data;
  }

  async update(conversationId: string, id: string, params: ActivityParams) {
    const res = await this.http.put<Resource>(
      `/v3/conversations/${conversationId}/activities/${id}`,
      params
    );
    return res.data;
  }

  async reply(conversationId: string, id: string, params: ActivityParams) {
    params.replyToId = id;
    const res = await this.http.post<Resource>(
      `/v3/conversations/${conversationId}/activities/${id}`,
      params
    );
    return res.data;
  }

  async delete(conversationId: string, id: string) {
    const res = await this.http.delete<void>(
      `/v3/conversations/${conversationId}/activities/${id}`
    );
    return res.data;
  }

  members(conversationId: string, activityId: string) {
    return {
      get: async () => {
        const res = await this.http.get<Account[]>(
          `/v3/conversations/${conversationId}/activities/${activityId}/members`
        );
        return res.data;
      },
    };
  }
}
