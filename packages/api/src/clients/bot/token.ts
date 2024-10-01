import axios from 'axios';
import qs from 'qs';

import { Credentials } from '../../auth';

export type GetBotTokenParams = Credentials;

export interface GetBotTokenResponse {
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly ext_expires_in?: number;
  readonly access_token: string;
}

export class BotTokenClient {
  private readonly _http: axios.AxiosInstance;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create({
      ...options,
      baseURL: 'https://login.microsoftonline.com',
    });
  }

  async get(params: GetBotTokenParams) {
    let tenantId = 'botframework.com';

    if (params.type === 'SingleTenant') {
      tenantId = params.tenantId;
    }

    const res = await this._http.post<GetBotTokenResponse>(
      `/${tenantId}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: params.clientId,
        client_secret: params.clientSecret,
        scope: 'https://api.botframework.com/.default',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return res.data;
  }

  async getGraph(params: GetBotTokenParams) {
    let tenantId = 'botframework.com';

    if (params.type === 'SingleTenant') {
      tenantId = params.tenantId;
    }

    const res = await this._http.post<GetBotTokenResponse>(
      `/${tenantId}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: params.clientId,
        client_secret: params.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return res.data;
  }
}
