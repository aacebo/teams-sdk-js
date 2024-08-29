import { HttpClient } from '@teams.sdk/common/http';
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
    this._http = new HttpClient({
      ...this._options,
      baseUrl: 'https://login.microsoftonline.com',
    });
  }

  async get(params: GetBotTokenParams) {
    const res = await this._http.post<GetBotTokenResponse>(
      `/${params.tenantId || 'botframework.com'}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: params.clientId,
        client_secret: params.clientSecret,
        scope: 'https://api.botframework.com/.default',
      }),
      {
        ...this._options?.requestOptions,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
    );

    return res.json();
  }

  async getGraph(params: GetBotTokenParams) {
    const res = await this._http.post<GetBotTokenResponse>(
      `/${params.tenantId || 'botframework.com'}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: params.clientId,
        client_secret: params.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
      }),
      {
        ...this._options?.requestOptions,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      }
    );

    return res.json();
  }
}
