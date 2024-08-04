import { DefaultHttpClient, HttpClient } from '@teams/common/http';

import { ClientOptions } from '../../client-options';
import { Account } from '../../models';

export class ConversationMemberClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  get() {
    return this._http.get<Account[]>(`/v3/conversations/${this.conversationId}/members`);
  }

  getById(id: string) {
    return this._http.get<Account>(`/v3/conversations/${this.conversationId}/members/${id}`);
  }

  delete(id: string) {
    return this._http.delete<void>(`/v3/conversations/${this.conversationId}/members/${id}`);
  }
}
