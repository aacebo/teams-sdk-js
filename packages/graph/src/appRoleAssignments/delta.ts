import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './delta-types.d.ts';

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
 * /appRoleAssignments/delta
 * Provides operations to call the delta method.
 */
export class DeltaClient {
  protected baseUrl = '/appRoleAssignments/delta';
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
   * `GET /appRoleAssignments/delta()`
   *
   * Get newly created, updated, or deleted directory objects without performing a full read of the entire directoryObject collection. For more information, see Use delta query to track changes in Microsoft Graph data for details.
   */
  async get(params?: Endpoints['GET /appRoleAssignments/delta()']['parameters']) {
    const url = getInjectedUrl(
      '/appRoleAssignments/delta()',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url)
      .then((res) => res.data as Endpoints['GET /appRoleAssignments/delta()']['response']);
  }
}
