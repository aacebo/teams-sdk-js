import { DefaultHttpClient, HttpClient } from '@teams/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
import { Conversation } from '../../models';

import { ConversationMemberClient } from './member';
import { ConversationActivityClient } from './activity';

export interface GetConversationsParams {
  readonly continuationToken?: string;
}

export interface GetConversationsResponse {
  /**
   * Paging token
   */
  continuationToken: string;

  /**
   * List of conversations
   */
  conversations: Conversation[];
}

export class ConversationClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  activities(conversationId: string) {
    return new ConversationActivityClient(conversationId, { ...this._options, http: this._http });
  }

  members(conversationId: string) {
    return new ConversationMemberClient(conversationId, { ...this._options, http: this._http });
  }

  async get(params: GetConversationsParams) {
    const q = qs.stringify(params, { addQueryPrefix: true });
    const res = await this._http.get<GetConversationsResponse>(`/v3/conversations${q}`);
    return res.json();
  }
}