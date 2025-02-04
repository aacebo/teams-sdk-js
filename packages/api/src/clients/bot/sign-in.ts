import qs from 'qs';
import { Client, ClientOptions } from '@teams.sdk/common/http';

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

  async getUrl(params: GetBotSignInUrlParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<string>(
      `https://token.botframework.com/api/botsignin/GetSignInUrl?${q}`
    );

    return res.data;
  }

  async getResource(params: GetBotSignInResourceParams) {
    const q = qs.stringify(params);
    const res = await this.http.get<SignInUrlResponse>(
      `https://token.botframework.com/api/botsignin/GetSignInResource?${q}`
    );

    return res.data;
  }
}
