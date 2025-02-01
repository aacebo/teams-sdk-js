import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
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
 * /applications/{application-id}/extensionProperties
 * Provides operations to manage the extensionProperties property of the microsoft.graph.application entity.
 */
export class ExtensionPropertiesClient {
  protected baseUrl = '/applications/{application-id}/extensionProperties';
  protected http: AxiosInstance;

  constructor(
    protected readonly applicationId: string,
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
   * `/applications/{application-id}/extensionProperties/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /applications/{application-id}/extensionProperties/{extensionProperty-id}`
   *
   * Delete a directory extension definition represented by an extensionProperty object. You can delete only directory extensions that aren&#x27;t synced from on-premises active directory (AD).
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/extensionProperties/{extensionProperty-id}']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/extensionProperties/{extensionProperty-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/extensionProperties/{extensionProperty-id}',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'extensionProperty-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/extensionProperties/{extensionProperty-id}']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/extensionProperties`
   *
   * Retrieve the list of directory extension definitions, represented by extensionProperty objects on an application.
   */
  async list(
    params?: Endpoints['GET /applications/{application-id}/extensionProperties']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/extensionProperties',
      [
        { name: '$orderby', in: 'query' },
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/extensionProperties']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/extensionProperties/{extensionProperty-id}`
   *
   * Read a directory extension definition represented by an extensionProperty object.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/extensionProperties/{extensionProperty-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/extensionProperties/{extensionProperty-id}',
      [
        { name: '$select', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'application-id', in: 'path' },
        { name: 'extensionProperty-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/extensionProperties/{extensionProperty-id}']['response']
      );
  }

  /**
   * `PATCH /applications/{application-id}/extensionProperties/{extensionProperty-id}`
   *
   */
  async update(
    body: Endpoints['PATCH /applications/{application-id}/extensionProperties/{extensionProperty-id}']['body'],
    params?: Endpoints['PATCH /applications/{application-id}/extensionProperties/{extensionProperty-id}']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/extensionProperties/{extensionProperty-id}',
      [
        { name: 'application-id', in: 'path' },
        { name: 'extensionProperty-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PATCH /applications/{application-id}/extensionProperties/{extensionProperty-id}']['response']
      );
  }

  /**
   * `POST /applications/{application-id}/extensionProperties`
   *
   * Create a new directory extension definition, represented by an extensionProperty object.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/extensionProperties']['body'],
    params?: Endpoints['POST /applications/{application-id}/extensionProperties']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/extensionProperties',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'application-id': this.applicationId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/extensionProperties']['response']
      );
  }
}
