import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';
import { Account, Resource } from '../../models';
import { Activity } from '../../activities';

export type CreateActivityParams<T extends Activity['type']> = Partial<Activity<T>>;

export type UpdateActivityParams<T extends Activity['type']> = Partial<Activity<T>>;

export type ReplyActivityParams<T extends Activity['type']> = Partial<Activity<T>>;

export class ConversationActivityClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  async create<T extends Activity['type']>(params: CreateActivityParams<T>) {
    const res = await this._http.post<Resource>(
      `/v3/conversations/${this.conversationId}/activities`,
      params
    );

    return res.json();
  }

  async update<T extends Activity['type']>(id: string, params: UpdateActivityParams<T>) {
    const res = await this._http.put<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );

    return res.json();
  }

  async reply<T extends Activity['type']>(id: string, params: ReplyActivityParams<T>) {
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
