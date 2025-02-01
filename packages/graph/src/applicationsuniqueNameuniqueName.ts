import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './applicationsuniqueNameuniqueName-types.d.ts';

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
 * /applicationsuniqueNameuniqueName
 * Provides operations to manage the collection of application entities.
 */
export class ApplicationsuniqueNameuniqueNameClient {
  protected baseUrl = '/applicationsuniqueNameuniqueName';
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
   * `DELETE /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)`
   *
   * Delete an application object. When deleted, apps are moved to a temporary container and can be restored within 30 days. After that time, they are permanently deleted.
   */
  async delete(
    body: Endpoints['DELETE /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['body'],
    params?: Endpoints['DELETE /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'uniqueName', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['response']
      );
  }

  /**
   * `GET /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)`
   *
   * Get the properties and relationships of an application object.
   */
  async get(
    params?: Endpoints['GET /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'uniqueName', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['response']
      );
  }

  /**
   * `PATCH /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)`
   *
   * Create a new application object if it doesn&#x27;t exist, or update the properties of an existing application object.
   */
  async update(
    body: Endpoints['PATCH /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['body'],
    params?: Endpoints['PATCH /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)',
      [{ name: 'uniqueName', in: 'path' }],
      {
        ...(params || {}),
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /applications(uniqueName&#x3D;&#x27;{uniqueName}&#x27;)']['response']
      );
  }
}
