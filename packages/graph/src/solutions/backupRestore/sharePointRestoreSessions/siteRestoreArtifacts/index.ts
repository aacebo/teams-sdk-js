import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { RestorePointClient } from './restorePoint';

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
 * /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts
 * Provides operations to manage the siteRestoreArtifacts property of the microsoft.graph.sharePointRestoreSession entity.
 */
export class SiteRestoreArtifactsClient {
  protected baseUrl =
    '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts';
  protected http: AxiosInstance;

  constructor(
    protected readonly sharePointRestoreSessionId: string,
    options?: GraphClientOptions
  ) {
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
   * `/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}/restorePoint`
   *
   * Provides operations to manage the restorePoint property of the microsoft.graph.restoreArtifactBase entity.
   */
  restorePoint(siteRestoreArtifactId: string) {
    return new RestorePointClient(siteRestoreArtifactId, this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}`
   *
   */
  async delete(
    body: Endpoints['DELETE /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['body'],
    params?: Endpoints['DELETE /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'sharePointRestoreSession-id', in: 'path' },
        { name: 'siteRestoreArtifact-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'sharePointRestoreSession-id': this.sharePointRestoreSessionId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts`
   *
   * List all the siteRestoreArtifact objects for a sharePointRestoreSession for the tenant.
   */
  async list(
    params?: Endpoints['GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'sharePointRestoreSession-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'sharePointRestoreSession-id': this.sharePointRestoreSessionId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}`
   *
   * A collection of restore points and destination details that can be used to restore SharePoint sites.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'sharePointRestoreSession-id', in: 'path' },
        { name: 'siteRestoreArtifact-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'sharePointRestoreSession-id': this.sharePointRestoreSessionId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}',
      [
        { name: 'sharePointRestoreSession-id', in: 'path' },
        { name: 'siteRestoreArtifact-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'sharePointRestoreSession-id': this.sharePointRestoreSessionId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts/{siteRestoreArtifact-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts`
   *
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts']['body'],
    params?: Endpoints['POST /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts',
      [{ name: 'sharePointRestoreSession-id', in: 'path' }],
      {
        ...(params || {}),
        'sharePointRestoreSession-id': this.sharePointRestoreSessionId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/backupRestore/sharePointRestoreSessions/{sharePointRestoreSession-id}/siteRestoreArtifacts']['response']
      );
  }
}
