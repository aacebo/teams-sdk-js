import { HttpClient } from '@teams/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
import { Account, Conversation, ConversationResource } from '../../models';
import { Activity } from '../../activities';

import { ConversationMemberClient } from './member';
import { ConversationActivityClient } from './activity';

export interface GetConversationsParams {
  readonly continuationToken?: string;
}

export interface CreateConversationParams {
  readonly isGroup?: boolean;
  readonly bot?: Partial<Account>;
  readonly members?: Account[];
  readonly topicName?: string;
  readonly tenantId?: string;
  readonly activity?: Activity;
  readonly channelData?: Record<string, any>;
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
    this._http = new HttpClient(this._options);
  }

  activities(conversationId: string) {
    return new ConversationActivityClient(conversationId, this._options);
  }

  members(conversationId: string) {
    return new ConversationMemberClient(conversationId, this._options);
  }

  async get(params: GetConversationsParams) {
    const q = qs.stringify(params, { addQueryPrefix: true });
    const res = await this._http.get<GetConversationsResponse>(`/v3/conversations${q}`);
    return res.json();
  }

  async create(params: CreateConversationParams) {
    const res = await this._http.post<ConversationResource>('/v3/conversations', params);
    return res.json();
  }
}
