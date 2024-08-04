import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';
import { Account, Resource } from '../../models';
import { Activity } from '../../activities';

export type CreateActivityParams<T extends Activity['type']> = Activity<T>;

export type UpdateActivityParams<T extends Activity['type']> = Activity<T>;

export type ReplyActivityParams<T extends Activity['type']> = Activity<T>;

export class ConversationActivityClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  create<T extends Activity['type']>(params: CreateActivityParams<T>) {
    return this._http.post<Resource>(`/v3/conversations/${this.conversationId}/activities`, params);
  }

  update<T extends Activity['type']>(id: string, params: UpdateActivityParams<T>) {
    return this._http.put<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );
  }

  reply<T extends Activity['type']>(id: string, params: ReplyActivityParams<T>) {
    return this._http.post<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );
  }

  delete(id: string) {
    return this._http.delete<void>(`/v3/conversations/${this.conversationId}/activities/${id}`);
  }

  members(activityId: string) {
    return {
      get: () => {
        return this._http.get<Account[]>(
          `/v3/conversations/${this.conversationId}/activities/${activityId}/members`
        );
      },
    };
  }
}
