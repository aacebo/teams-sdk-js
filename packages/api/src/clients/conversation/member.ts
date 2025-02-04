import { Client, ClientOptions } from '@teams.sdk/common/http';

import { Account } from '../../models';

export class ConversationMemberClient {
  protected serviceUrl: string;
  protected http: Client;

  constructor(serviceUrl: string, options?: Client | ClientOptions) {
    this.serviceUrl = serviceUrl;

    if (!options) {
      this.http = new Client();
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new Client(options);
    }
  }

  async get(conversationId: string) {
    const res = await this.http.get<Account[]>(
      `${this.serviceUrl}/v3/conversations/${conversationId}/members`
    );
    return res.data;
  }

  async getById(conversationId: string, id: string) {
    const res = await this.http.get<Account>(
      `${this.serviceUrl}/v3/conversations/${conversationId}/members/${id}`
    );
    return res.data;
  }

  async delete(conversationId: string, id: string) {
    const res = await this.http.delete<void>(
      `${this.serviceUrl}/v3/conversations/${conversationId}/members/${id}`
    );
    return res.data;
  }
}
