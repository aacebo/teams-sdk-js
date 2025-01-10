import { Account } from '../../models';
import { ClientBase, ClientOptions } from '../client-base';

export class ConversationMemberClient extends ClientBase {
  constructor(conversationId: string, options?: ClientOptions) {
    super({
      ...options,
      baseURL: `${options?.baseURL || ''}/v3/conversations/${conversationId}`,
      children: [],
    });
  }

  async get() {
    const res = await this.http.get<Account[]>('/members');
    return res.data;
  }

  async getById(id: string) {
    const res = await this.http.get<Account>(`/members/${id}`);
    return res.data;
  }

  async delete(id: string) {
    const res = await this.http.delete<void>(`/members/${id}`);
    return res.data;
  }
}
