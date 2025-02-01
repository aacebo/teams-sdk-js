import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { ActivateClient } from './activate';
import { CountClient } from './count';
import { DeactivateClient } from './deactivate';

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
 * /solutions/backupRestore/serviceApps
 * Provides operations to manage the serviceApps property of the microsoft.graph.backupRestoreRoot entity.
 */
export class ServiceAppsClient {
  protected baseUrl = '/solutions/backupRestore/serviceApps';
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
   * `/solutions/backupRestore/serviceApps/{serviceApp-id}/activate`
   *
   * Provides operations to call the activate method.
   */
  activate(serviceAppId: string) {
    return new ActivateClient(serviceAppId, this.http);
  }

  /**
   * `/solutions/backupRestore/serviceApps/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate`
   *
   * Provides operations to call the deactivate method.
   */
  deactivate(serviceAppId: string) {
    return new DeactivateClient(serviceAppId, this.http);
  }

  /**
   * `DELETE /solutions/backupRestore/serviceApps/{serviceApp-id}`
   *
   * Delete a serviceApp.
   */
  async delete(
    body: Endpoints['DELETE /solutions/backupRestore/serviceApps/{serviceApp-id}']['body'],
    params?: Endpoints['DELETE /solutions/backupRestore/serviceApps/{serviceApp-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/serviceApps/{serviceApp-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'serviceApp-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /solutions/backupRestore/serviceApps/{serviceApp-id}']['response']
      );
  }

  /**
   * `GET /solutions/backupRestore/serviceApps`
   *
   * Get a list of serviceApp objects and their properties.
   */
  async list(params?: Endpoints['GET /solutions/backupRestore/serviceApps']['parameters']) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/serviceApps',
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
      .then((res) => res.data as Endpoints['GET /solutions/backupRestore/serviceApps']['response']);
  }

  /**
   * `GET /solutions/backupRestore/serviceApps/{serviceApp-id}`
   *
   * Read the properties and relationships of a serviceApp object.
   */
  async get(
    params?: Endpoints['GET /solutions/backupRestore/serviceApps/{serviceApp-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/serviceApps/{serviceApp-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'serviceApp-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /solutions/backupRestore/serviceApps/{serviceApp-id}']['response']
      );
  }

  /**
   * `PATCH /solutions/backupRestore/serviceApps/{serviceApp-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /solutions/backupRestore/serviceApps/{serviceApp-id}']['body'],
    params?: Endpoints['PATCH /solutions/backupRestore/serviceApps/{serviceApp-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/serviceApps/{serviceApp-id}',
      [{ name: 'serviceApp-id', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /solutions/backupRestore/serviceApps/{serviceApp-id}']['response']
      );
  }

  /**
   * `POST /solutions/backupRestore/serviceApps`
   *
   * Create a new serviceApp.
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/serviceApps']['body'],
    params?: Endpoints['POST /solutions/backupRestore/serviceApps']['parameters']
  ) {
    const url = getInjectedUrl('/solutions/backupRestore/serviceApps', [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints['POST /solutions/backupRestore/serviceApps']['response']
      );
  }
}
