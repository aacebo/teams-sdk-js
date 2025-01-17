import axios from 'axios';
import qs from 'qs';

import { Credentials } from '../../auth';
import { ClientBase } from '../client-base';

export type GetBotTokenParams = Credentials;

export interface GetBotTokenResponse {
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly ext_expires_in?: number;
  readonly access_token: string;
}

export class BotTokenClient extends ClientBase {
  constructor(options?: axios.CreateAxiosDefaults) {
    super({
      ...options,
      baseURL: 'https://login.microsoftonline.com',
      children: [],
    });
  }

  async get(params: GetBotTokenParams) {
    const tenantId = params.tenantId || 'botframework.com';
    const res = await this.http.post<GetBotTokenResponse>(
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
    const tenantId = params.tenantId || 'botframework.com';
    const res = await this.http.post<GetBotTokenResponse>(
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
