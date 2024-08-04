import { DefaultHttpClient, HttpClient } from '@teams/common/http';
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
  userId: string;
  connectionName: string;
  resourceUrls: string[];
  channelId: string;
}

export class BotSignInClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
  }

  async getUrl(params: GetBotSignInUrlParams) {
    const q = qs.stringify(params);
    return this._http.get<string>(
      `/api/botsignin/GetSignInUrl?${q}`,
      this._options?.requestOptions
    );
  }

  async getResource(params: GetBotSignInResourceParams) {
    const q = qs.stringify(params);
    return this._http.post<SignInUrlResponse>(
      `/api/botsignin/GetSignInResource?${q}`,
      params,
      this._options?.requestOptions
    );
  }
}
