import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';
import { Account, Resource } from '../../models';

export interface CreateActivityParams {}

export interface UpdateActivityParams {}

export interface ReplyActivityParams {}

export class ConversationActivityClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  create(params: CreateActivityParams) {
    return this._http.post<Resource>(`/v3/conversations/${this.conversationId}/activities`, params);
  }

  update(id: string, params: UpdateActivityParams) {
    return this._http.put<Resource>(
      `/v3/conversations/${this.conversationId}/activities/${id}`,
      params
    );
  }

  reply(id: string, params: ReplyActivityParams) {
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
