import { HttpClient } from '@teams.sdk/common/http';

import { ClientOptions } from '../../client-options';
import { Account } from '../../models';

export class ConversationMemberClient {
  private readonly _http: HttpClient;

  constructor(
    readonly conversationId: string,
    private readonly _options?: ClientOptions
  ) {
    this._http = new HttpClient(this._options);
  }

  async get() {
    const res = await this._http.get<Account[]>(`/v3/conversations/${this.conversationId}/members`);
    return res.json();
  }

  async getById(id: string) {
    const res = await this._http.get<Account>(
      `/v3/conversations/${this.conversationId}/members/${id}`
    );
    return res.json();
  }

  async delete(id: string) {
    const res = await this._http.delete<void>(
      `/v3/conversations/${this.conversationId}/members/${id}`
    );
    return res.json();
  }
}
