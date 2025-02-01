import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './filterOperators-types.d.ts';

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
 * /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators
 * Provides operations to call the filterOperators method.
 */
export class FilterOperatorsClient {
  protected baseUrl =
    '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators';
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
   * `GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators()`
   *
   * List all operators supported in the scoping filters.
   */
  async get(
    params?: Endpoints['GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators()']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators()',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'application-id', in: 'path' },
        { name: 'synchronizationJob-id', in: 'path' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/schema/filterOperators()']['response']
      );
  }
}
