import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { ActivateClient } from './activate';
import { CountClient } from './count';

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
 * /solutions/backupRestore/restoreSessions
 * Provides operations to manage the restoreSessions property of the microsoft.graph.backupRestoreRoot entity.
 */
export class RestoreSessionsClient {
  protected baseUrl = '/solutions/backupRestore/restoreSessions';
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
   * `/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}/activate`
   *
   * Provides operations to call the activate method.
   */
  activate(restoreSessionBaseId: string) {
    return new ActivateClient(restoreSessionBaseId, this.http);
  }

  /**
   * `/solutions/backupRestore/restoreSessions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}`
   *
   * Delete a draft restoreSessionBase object.
   */
  async delete(
    body: Endpoints['DELETE /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['body'],
    params?: Endpoints['DELETE /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'restoreSessionBase-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/restoreSessions`
   *
   * Get a list of restoreSession objects and their properties.
   */
  async list(params?: Endpoints['GET /solutions/backupRestore/restoreSessions']['parameters']) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/restoreSessions',
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
        (res) => res.data as Endpoints['GET /solutions/backupRestore/restoreSessions']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}`
   *
   * Get the properties of a restoreSession object by ID.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'restoreSessionBase-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/restoreSessions/{restoreSessionBase-id}',
      [{ name: 'restoreSessionBase-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/restoreSessions/{restoreSessionBase-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/restoreSessions`
   *
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/restoreSessions']['body'],
    params?: Endpoints['POST /solutions/backupRestore/restoreSessions']['parameters']
  ) {
    const url = getInjectedUrl('/solutions/backupRestore/restoreSessions', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /solutions/backupRestore/restoreSessions']['response']
      );
  }
}
