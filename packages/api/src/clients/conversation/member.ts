import axios from 'axios';

import { Account } from '../../models';

export class ConversationMemberClient {
  private readonly _http: axios.AxiosInstance;

  constructor(conversationId: string, options?: axios.CreateAxiosDefaults) {
    this._http = axios.create({
      ...options,
      baseURL: `${options?.baseURL || ''}/v3/conversations/${conversationId}`,
    });
  }

  async get() {
    const res = await this._http.get<Account[]>('/members');
    return res.data;
  }

  async getById(id: string) {
    const res = await this._http.get<Account>(`/members/${id}`);
    return res.data;
  }

  async delete(id: string) {
    const res = await this._http.delete<void>(`/members/${id}`);
    return res.data;
  }
}
