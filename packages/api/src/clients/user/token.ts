import { HttpClient } from '@teams.sdk/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
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
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = new HttpClient({
      ...this._options,
      baseUrl: 'https://token.botframework.com',
    });
  }

  async get(params: GetUserTokenParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<TokenResponse>(
      `/api/usertoken/GetToken?${q}`,
      this._options?.requestOptions
    );

    return res.json();
  }

  async getAad(params: GetUserAADTokenParams) {
    const q = qs.stringify(params);
    const res = await this._http.post<Record<string, TokenResponse>>(
      `/api/usertoken/GetAadTokens?${q}`,
      params,
      this._options?.requestOptions
    );

    return res.json();
  }

  async getStatus(params: GetUserTokenStatusParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<TokenStatus[]>(
      `/api/usertoken/GetTokenStatus?${q}`,
      this._options?.requestOptions
    );

    return res.json();
  }

  async signOut(params: SignOutUserParams) {
    const res = await this._http.delete<void>(
      '/api/usertoken/SignOut',
      params,
      this._options?.requestOptions
    );
    return res.json();
  }

  async exchange(params: ExchangeUserTokenParams) {
    const q = qs.stringify({
      userId: params.userId,
      connectionName: params.connectionName,
      channelId: params.channelId,
    });

    const res = await this._http.post<TokenResponse>(
      `/api/usertoken/exchange?${q}`,
      { exchangeRequest: params.exchangeRequest },
      this._options?.requestOptions
    );

    return res.json();
  }
}
