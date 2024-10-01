import axios from 'axios';
import qs from 'qs';

import { SignInUrlResponse } from '../../models';

export interface GetBotSignInUrlParams {
  state: string;
  codeChallenge?: string;
  emulatorUrl?: string;
  finalRedirect?: string;
}

export interface GetBotSignInResourceParams {
  state: string;
  codeChallenge?: string;
  emulatorUrl?: string;
  finalRedirect?: string;
}

export class BotSignInClient {
  private readonly _http: axios.AxiosInstance;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create({
      ...options,
      baseURL: 'https://token.botframework.com',
    });
  }

  async getUrl(params: GetBotSignInUrlParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<string>(`/api/botsignin/GetSignInUrl?${q}`);

    return res.data;
  }

  async getResource(params: GetBotSignInResourceParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<SignInUrlResponse>(`/api/botsignin/GetSignInResource?${q}`);

    return res.data;
  }
}
