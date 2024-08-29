import { HttpClient } from '@teams.sdk/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
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
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = new HttpClient({
      ...this._options,
      baseUrl: 'https://token.botframework.com',
    });
  }

  async getUrl(params: GetBotSignInUrlParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<string>(
      `/api/botsignin/GetSignInUrl?${q}`,
      this._options?.requestOptions
    );

    return res.json();
  }

  async getResource(params: GetBotSignInResourceParams) {
    const q = qs.stringify(params);
    const res = await this._http.get<SignInUrlResponse>(
      `/api/botsignin/GetSignInResource?${q}`,
      this._options?.requestOptions
    );

    return res.json();
  }
}
