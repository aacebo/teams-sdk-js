import { HttpClient } from '@teams.sdk/common/http';

import { ClientOptions } from '../../client-options';
import { Account, Resource } from '../../models';
import { Activity } from '../../activities';

export class ConversationActivityClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = new HttpClient(this._options);
  }

  async create(params: Partial<Activity>) {
    const res = await this._http.post<Resource>(
      `/v3/conversations/${this.conversationId}/activities`,
      params
    );

    return res.json();
  }

  async update(id: string, params: Partial<Activity>) {
    const res = await this._http.put<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );

    return res.json();
  }

  async reply(id: string, params: Partial<Activity>) {
    params.replyToId = id;

    const res = await this._http.post<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );

    return res.json();
  }

  async delete(id: string) {
    const res = await this._http.delete<void>(
      `/v3/conversations/${this.conversationId}/activities/${id}`
    );
    return res.json();
  }

  members(activityId: string) {
    return {
      get: async () => {
        const res = await this._http.get<Account[]>(
          `/v3/conversations/${this.conversationId}/activities/${activityId}/members`
        );

        return res.json();
      },
    };
  }
}
