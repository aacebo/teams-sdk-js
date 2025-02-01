import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName-types.d.ts';

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
 * /teams/{team-id}/primaryChannel/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName
 * Provides operations to call the doesUserHaveAccess method.
 */
export class DoesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalNameClient {
  protected baseUrl =
    '/teams/{team-id}/primaryChannel/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName';
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
   * `GET /teams/{team-id}/primaryChannel/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)`
   *
   * Determine whether a user has access to a shared channel.
   */
  async get(
    params?: Endpoints['GET /teams/{team-id}/primaryChannel/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/teams/{team-id}/primaryChannel/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)',
      [
        { name: 'team-id', in: 'path' },
        { name: 'userId', in: 'query' },
        { name: 'tenantId', in: 'query' },
        { name: 'userPrincipalName', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /teams/{team-id}/primaryChannel/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)']['response']
      );
  }
}
