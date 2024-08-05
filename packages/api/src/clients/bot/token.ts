import { DefaultHttpClient, HttpClient } from '@teams/common/http';
import qs from 'qs';

import { ClientOptions } from '../../client-options';
import { Credentials } from '../../auth';

export type GetBotTokenParams = Credentials;

export interface GetBotTokenResponse {
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly ext_expires_in?: number;
  readonly access_token: string;
}

export class BotTokenClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = this._options?.http || new DefaultHttpClient();
    this._http.options.baseUrl = 'https://login.microsoftonline.com';
  }

  async get(params: GetBotTokenParams) {
    const q = qs.stringify({
      client_id: params.clientId,
      client_secret: params.clientSecret,
      scope: 'https://api.botframework.com/.default',
    });

    const res = await this._http.post<GetBotTokenResponse>(
      `/${params.tenantId || 'botframework.com'}/oauth2/v2.0/token?${q}`
    );

    return res.json();
  }
}
