import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './sendActivityNotificationToRecipients-types.d.ts';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  for (const param of params) {
    if (param.in !== 'path') continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /teamwork/sendActivityNotificationToRecipients
 * Provides operations to call the sendActivityNotificationToRecipients method.
 */
export class SendActivityNotificationToRecipientsClient {
  protected baseUrl = '/teamwork/sendActivityNotificationToRecipients';
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
    if (!options) {
      this.http = axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('get' in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `POST /teamwork/sendActivityNotificationToRecipients`
   *
   * Send activity feed notifications to multiple users, in bulk.  For more information, see sending Teams activity notifications.
   */
  async create(
    body: Endpoints['POST /teamwork/sendActivityNotificationToRecipients']['body'],
    params?: Endpoints['POST /teamwork/sendActivityNotificationToRecipients']['parameters']
  ) {
    const url = getInjectedUrl('/teamwork/sendActivityNotificationToRecipients', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /teamwork/sendActivityNotificationToRecipients']['response']
      );
  }
}
