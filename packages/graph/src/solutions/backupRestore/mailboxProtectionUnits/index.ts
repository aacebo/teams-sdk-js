import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === 'query') {
      query[param.name] = data[param.name];
    }

    if (param.in !== 'path') {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /solutions/backupRestore/mailboxProtectionUnits
 * Provides operations to manage the mailboxProtectionUnits property of the microsoft.graph.backupRestoreRoot entity.
 */
export class MailboxProtectionUnitsClient {
  protected baseUrl = '/solutions/backupRestore/mailboxProtectionUnits';
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
   * `/solutions/backupRestore/mailboxProtectionUnits/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}`
   *
   */
  async delete(
    params?: Endpoints['DELETE /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'mailboxProtectionUnit-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/mailboxProtectionUnits`
   *
   * The list of mailbox protection units in the tenant.
   */
  async list(
    params?: Endpoints['GET /solutions/backupRestore/mailboxProtectionUnits']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/mailboxProtectionUnits',
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
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/mailboxProtectionUnits']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}`
   *
   * The list of mailbox protection units in the tenant.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'mailboxProtectionUnit-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}',
      [{ name: 'mailboxProtectionUnit-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/mailboxProtectionUnits/{mailboxProtectionUnit-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/mailboxProtectionUnits`
   *
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/mailboxProtectionUnits']['body'],
    params?: Endpoints['POST /solutions/backupRestore/mailboxProtectionUnits']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl('/solutions/backupRestore/mailboxProtectionUnits', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/backupRestore/mailboxProtectionUnits']['response']
      );
  }
}
