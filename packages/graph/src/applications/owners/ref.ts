import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './ref-types.d.ts';

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
 * /applications/{application-id}/owners/{directoryObject-id}/ref
 * Provides operations to manage the collection of application entities.
 */
export class RefClient {
  protected baseUrl = '/applications/{application-id}/owners/{directoryObject-id}/ref';
  protected http: AxiosInstance;

  constructor(
    protected readonly directoryObjectId: string,
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
   * `DELETE /applications/{application-id}/owners/$ref`
   *
   * Remove an owner from an application. As a recommended best practice, apps should have at least two owners.
   */
  async delete$1(
    body: Endpoints['DELETE /applications/{application-id}/owners/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/owners/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/owners/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: '@id', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'directoryObject-id': this.directoryObjectId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/owners/$ref']['response']
      );
  }

  /**
   * `DELETE /applications/{application-id}/owners/{directoryObject-id}/$ref`
   *
   * Remove an owner from an application. As a recommended best practice, apps should have at least two owners.
   */
  async delete(
    body: Endpoints['DELETE /applications/{application-id}/owners/{directoryObject-id}/$ref']['body'],
    params?: Endpoints['DELETE /applications/{application-id}/owners/{directoryObject-id}/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/owners/{directoryObject-id}/$ref',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'application-id', in: 'path' },
        { name: 'directoryObject-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'directoryObject-id': this.directoryObjectId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /applications/{application-id}/owners/{directoryObject-id}/$ref']['response']
      );
  }

  /**
   * `GET /applications/{application-id}/owners/$ref`
   *
   * Retrieve a list of owners for an application that are directoryObject types.
   */
  async get(params?: Endpoints['GET /applications/{application-id}/owners/$ref']['parameters']) {
    const url = getInjectedUrl(
      '/applications/{application-id}/owners/$ref',
      [
        { name: 'ConsistencyLevel', in: 'header' },
        { name: '$orderby', in: 'query' },
        { name: 'application-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'directoryObject-id': this.directoryObjectId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) => res.data as Endpoints['GET /applications/{application-id}/owners/$ref']['response']
      );
  }

  /**
   * `POST /applications/{application-id}/owners/$ref`
   *
   * Add an owner to an application. Currently, only individual users are supported as owners of applications.
   */
  async create(
    body: Endpoints['POST /applications/{application-id}/owners/$ref']['body'],
    params?: Endpoints['POST /applications/{application-id}/owners/$ref']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/owners/$ref',
      [{ name: 'application-id', in: 'path' }],
      {
        ...(params || {}),
        'directoryObject-id': this.directoryObjectId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /applications/{application-id}/owners/$ref']['response']
      );
  }
}
