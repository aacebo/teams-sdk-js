import qs from 'qs';
import { Client, ClientOptions } from '@teams.sdk/common/http';

import { Credentials } from '../../auth';

export type GetBotTokenParams = Credentials;

export interface GetBotTokenResponse {
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly ext_expires_in?: number;
  readonly access_token: string;
}

export class BotTokenClient {
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

  async get(params: GetBotTokenParams) {
    const tenantId = params.tenantId || 'botframework.com';
    const res = await this.http.post<GetBotTokenResponse>(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
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
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
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
