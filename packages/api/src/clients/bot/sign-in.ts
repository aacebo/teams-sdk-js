import qs from 'qs';

import { SignInUrlResponse } from '../../models';
import { ClientBase, ClientOptions } from '../client-base';

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

export class BotSignInClient extends ClientBase {
  constructor(options?: ClientOptions) {
    super({
      ...options,
      baseURL: 'https://token.botframework.com',
      children: [],
    });
  }

  async getUrl(params: GetBotSignInUrlParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<string>(`/api/botsignin/GetSignInUrl?${q}`);

    return res.data;
  }

  async getResource(params: GetBotSignInResourceParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<SignInUrlResponse>(`/api/botsignin/GetSignInResource?${q}`);

    return res.data;
  }
}
