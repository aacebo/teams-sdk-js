import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { GranularMailboxRestoreArtifactsClient } from './granularMailboxRestoreArtifacts';
import { MailboxRestoreArtifactsClient } from './mailboxRestoreArtifacts';

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
 * /solutions/backupRestore/exchangeRestoreSessions
 * Provides operations to manage the exchangeRestoreSessions property of the microsoft.graph.backupRestoreRoot entity.
 */
export class ExchangeRestoreSessionsClient {
  protected baseUrl = '/solutions/backupRestore/exchangeRestoreSessions';
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
   * `/solutions/backupRestore/exchangeRestoreSessions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}/granularMailboxRestoreArtifacts`
   *
   * Provides operations to manage the granularMailboxRestoreArtifacts property of the microsoft.graph.exchangeRestoreSession entity.
   */
  granularMailboxRestoreArtifacts(exchangeRestoreSessionId: string) {
    return new GranularMailboxRestoreArtifactsClient(exchangeRestoreSessionId, this.http);
  }

  /**
   * `/solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}/mailboxRestoreArtifacts`
   *
   * Provides operations to manage the mailboxRestoreArtifacts property of the microsoft.graph.exchangeRestoreSession entity.
   */
  mailboxRestoreArtifacts(exchangeRestoreSessionId: string) {
    return new MailboxRestoreArtifactsClient(exchangeRestoreSessionId, this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['body'],
    params?: Endpoints['DELETE /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'exchangeRestoreSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/exchangeRestoreSessions`
   *
   * The list of Exchange restore sessions available in the tenant.
   */
  async list(
    params?: Endpoints['GET /solutions/backupRestore/exchangeRestoreSessions']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/exchangeRestoreSessions',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/exchangeRestoreSessions']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}`
   *
   * The list of Exchange restore sessions available in the tenant.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'exchangeRestoreSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}`
   *
   * Update the properties of an exchangeRestoreSession.
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}',
      [{ name: 'exchangeRestoreSession-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/exchangeRestoreSessions/{exchangeRestoreSession-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/exchangeRestoreSessions`
   *
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/exchangeRestoreSessions']['body'],
    params?: Endpoints['POST /solutions/backupRestore/exchangeRestoreSessions']['parameters']
  ) {
    const url = getInjectedUrl('/solutions/backupRestore/exchangeRestoreSessions', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/backupRestore/exchangeRestoreSessions']['response']
      );
  }
}
