import axios from 'axios';
import qs from 'qs';

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
  private readonly _http: axios.AxiosInstance;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create({
      ...options,
      baseURL: 'https://token.botframework.com/api/usertoken',
    });
  }

  async get(params: GetUserTokenParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<TokenResponse>(`/GetToken?${q}`);

    return res.data;
  }

  async getAad(params: GetUserAADTokenParams) {
    const q = qs.stringify(params);
    const res = await this._http.post<Record<string, TokenResponse>>(`/GetAadTokens?${q}`, params);

    return res.data;
  }

  async getStatus(params: GetUserTokenStatusParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<TokenStatus[]>(`/GetTokenStatus?${q}`);

    return res.data;
  }

  async signOut(params: SignOutUserParams) {
    const res = await this._http.delete<void>('/SignOut', { data: params });

    return res.data;
  }

  async exchange(params: ExchangeUserTokenParams) {
    const q = qs.stringify({
      userId: params.userId,
      connectionName: params.connectionName,
      channelId: params.channelId,
    });

    const res = await this._http.post<TokenResponse>(`/exchange?${q}`, {
      exchangeRequest: params.exchangeRequest,
    });

    return res.data;
  }
}
