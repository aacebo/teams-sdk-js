import qs from 'qs';
import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './restore-types.d.ts';

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
 * /appRoleAssignments/{appRoleAssignment-id}/restore
 * Provides operations to call the restore method.
 */
export class RestoreClient {
  protected baseUrl = '/appRoleAssignments/{appRoleAssignment-id}/restore';
  protected http: AxiosInstance;

  constructor(
    protected readonly appRoleAssignmentId: string,
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
   * `POST /appRoleAssignments/{appRoleAssignment-id}/restore`
   *
   * Restore a recently deleted application, group, servicePrincipal, administrative unit, or user object from deleted items. If an item was accidentally deleted, you can fully restore the item. However, security groups can&#x27;t be restored. Also, restoring an application doesn&#x27;t restore the associated service principal automatically. You must call this API to explicitly restore the deleted service principal. A recently deleted item remains available for up to 30 days. After 30 days, the item is permanently deleted.
   */
  async create(
    body: Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/restore']['body'],
    params?: Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/restore']['parameters'],
    config?: AxiosRequestConfig
  ) {
    const url = getInjectedUrl(
      '/appRoleAssignments/{appRoleAssignment-id}/restore',
      [{ name: 'appRoleAssignment-id', in: 'path' }],
      {
        ...(params || {}),
        'appRoleAssignment-id': this.appRoleAssignmentId,
      }
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints['POST /appRoleAssignments/{appRoleAssignment-id}/restore']['response']
      );
  }
}
