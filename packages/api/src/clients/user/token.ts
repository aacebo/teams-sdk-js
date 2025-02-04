import qs from 'qs';
import { Client, ClientOptions } from '@teams.sdk/common/http';

import { ChannelID, TokenExchangeRequest, TokenResponse, TokenStatus } from '../../models';

export interface GetUserTokenParams {
  userId: string;
  connectionName: string;
  channelId?: ChannelID;
  code?: string;
}

export interface GetUserAADTokenParams {
  userId: string;
  connectionName: string;
  resourceUrls: string[];
  channelId: ChannelID;
}

export interface GetUserTokenStatusParams {
  userId: string;
  channelId: ChannelID;
  includeFilter: string;
}

export interface SignOutUserParams {
  userId: string;
  connectionName: string;
  channelId: ChannelID;
}

export interface ExchangeUserTokenParams {
  userId: string;
  connectionName: string;
  channelId: ChannelID;
  exchangeRequest: TokenExchangeRequest;
}

export class UserTokenClient {
  protected http: Client;

  constructor(options?: Client | ClientOptions) {
    if (!options) {
      this.http = new Client();
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new Client(options);
    }
  }

  async get(params: GetUserTokenParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<TokenResponse>(
      `https://token.botframework.com/api/usertoken/GetToken?${q}`
    );

    return res.data;
  }

  async getAad(params: GetUserAADTokenParams) {
    const q = qs.stringify(params);
    const res = await this.http.post<Record<string, TokenResponse>>(
      `https://token.botframework.com/api/usertoken/GetAadTokens?${q}`,
      params
    );

    return res.data;
  }

  async getStatus(params: GetUserTokenStatusParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<TokenStatus[]>(
      `https://token.botframework.com/api/usertoken/GetTokenStatus?${q}`
    );

    return res.data;
  }

  async signOut(params: SignOutUserParams) {
    const res = await this.http.delete<void>(
      'https://token.botframework.com/api/usertoken/SignOut',
      { data: params }
    );

    return res.data;
  }

  async exchange(params: ExchangeUserTokenParams) {
    const q = qs.stringify({
      userId: params.userId,
      connectionName: params.connectionName,
      channelId: params.channelId,
    });

    const res = await this.http.post<TokenResponse>(
      `https://token.botframework.com/api/usertoken/exchange?${q}`,
      {
        exchangeRequest: params.exchangeRequest,
      }
    );

    return res.data;
  }
}
