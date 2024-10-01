import axios from 'axios';
import qs from 'qs';

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
  private readonly _http: axios.AxiosInstance;
  private readonly _options?: axios.CreateAxiosDefaults;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create(options);
    this._options = options;
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
    return res.data;
  }

  async create(params: CreateConversationParams) {
    const res = await this._http.post<ConversationResource>('/v3/conversations', params);
    return res.data;
  }
}

export * from './activity';
export * from './member';
