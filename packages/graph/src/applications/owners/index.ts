import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { GraphappRoleAssignmentClient } from './graphappRoleAssignment';
import { GraphendpointClient } from './graphendpoint';
import { GraphservicePrincipalClient } from './graphservicePrincipal';
import { GraphuserClient } from './graphuser';
import { RefClient } from './ref';

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
 * /applications/{application-id}/owners
 * Provides operations to manage the owners property of the microsoft.graph.application entity.
 */
export class OwnersClient {
  protected baseUrl = '/applications/{application-id}/owners';
  protected http: http.Client;

  constructor(
    protected readonly applicationId: string,
    options?: http.Client | http.ClientOptions
  ) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options.clone({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `/applications/{application-id}/owners/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/applications/{application-id}/owners/{directoryObject-id}/graphappRoleAssignment`
   *
   * Casts the previous resource to appRoleAssignment.
   */
  graphappRoleAssignment(directoryObjectId: string) {
    return new GraphappRoleAssignmentClient(directoryObjectId, this.http);
  }

  /**
   * `/applications/{application-id}/owners/{directoryObject-id}/graphendpoint`
   *
   * Casts the previous resource to endpoint.
   */
  graphendpoint(directoryObjectId: string) {
    return new GraphendpointClient(directoryObjectId, this.http);
  }

  /**
   * `/applications/{application-id}/owners/{directoryObject-id}/graphservicePrincipal`
   *
   * Casts the previous resource to servicePrincipal.
   */
  graphservicePrincipal(directoryObjectId: string) {
    return new GraphservicePrincipalClient(directoryObjectId, this.http);
  }

  /**
   * `/applications/{application-id}/owners/{directoryObject-id}/graphuser`
   *
   * Casts the previous resource to user.
   */
  graphuser(directoryObjectId: string) {
    return new GraphuserClient(directoryObjectId, this.http);
  }

  /**
   * `/applications/{application-id}/owners/{directoryObject-id}/ref`
   *
   * Provides operations to manage the collection of application entities.
   */
  ref(directoryObjectId: string) {
    return new RefClient(directoryObjectId, this.http);
  }

  /**
   * `GET /applications/{application-id}/owners`
   *
   * Retrieve a list of owners for an application that are directoryObject types.
   */
  async list(
    params?: Endpoints['GET /applications/{application-id}/owners']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/owners',
      [
        { name: 'ConsistencyLevel', in: 'header' },
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
      .get(url, config)
      .then(
        (res) => res.data as Endpoints['GET /applications/{application-id}/owners']['response']
      );
  }
}
