import qs from 'qs';

import { Account, Conversation, ConversationResource } from '../../models';
import { Activity } from '../../activities';
import { ClientBase } from '../client-base';

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

export class ConversationClient extends ClientBase {
  activities(conversationId: string) {
    return new ConversationActivityClient(conversationId, this.options);
  }

  members(conversationId: string) {
    return new ConversationMemberClient(conversationId, this.options);
  }

  async get(params: GetConversationsParams) {
    const q = qs.stringify(params, { addQueryPrefix: true });
    const res = await this.http.get<GetConversationsResponse>(`/v3/conversations${q}`);
    return res.data;
  }

  async create(params: CreateConversationParams) {
    const res = await this.http.post<ConversationResource>('/v3/conversations', params);
    return res.data;
  }
}

export * from './activity';
export * from './member';
