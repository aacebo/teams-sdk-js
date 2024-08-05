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
    this._http.options.baseUrl = 'https://token.botframework.com';
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
    const res = await this._http.post<TokenResponse>(
      '/api/usertoken/exchange',
      params,
      this._options?.requestOptions
    );

    return res.json();
  }
}
