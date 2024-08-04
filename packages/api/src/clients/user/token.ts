import { DefaultHttpClient, HttpClient } from '@teams/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
import { TokenExchangeRequest, TokenResponse, TokenStatus } from '../../models';

export interface GetUserTokenParams {
  userId: string;
  connectionName: string;
  channelId: string;
  magicCode: string;
}

export interface GetUserAADTokenParams {
  userId: string;
  connectionName: string;
  resourceUrls: string[];
  channelId: string;
}

export interface GetUserTokenStatusParams {
  userId: string;
  channelId: string;
  includeFilter: string;
}

export interface SignOutUserParams {
  userId: string;
  connectionName: string;
  channelId: string;
}

export interface ExchangeUserTokenParams {
  userId: string;
  connectionName: string;
  channelId: string;
  exchangeRequest: TokenExchangeRequest;
}

export class UserTokenClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  async get(params: GetUserTokenParams) {
    const q = qs.stringify(params);
    return this._http.get<TokenResponse>(
      `/api/usertoken/GetToken?${q}`,
      this._options?.requestOptions
    );
  }

  async getAad(params: GetUserAADTokenParams) {
    const q = qs.stringify(params);
    return this._http.post<Record<string, TokenResponse>>(
      `/api/usertoken/GetAadTokens?${q}`,
      params,
      this._options?.requestOptions
    );
  }

  async getStatus(params: GetUserTokenStatusParams) {
    const q = qs.stringify(params);
    return this._http.get<TokenStatus[]>(
      `/api/usertoken/GetTokenStatus?${q}`,
      this._options?.requestOptions
    );
  }

  async signOut(params: SignOutUserParams) {
    return this._http.delete<void>('/api/usertoken/SignOut', params, this._options?.requestOptions);
  }

  async exchange(params: ExchangeUserTokenParams) {
    return this._http.post<TokenResponse>(
      '/api/usertoken/exchange',
      params,
      this._options?.requestOptions
    );
  }
}
