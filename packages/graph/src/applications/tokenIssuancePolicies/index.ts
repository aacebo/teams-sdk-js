import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './index-types.d.ts';
import { CountClient } from './count';
import { RefClient } from './ref';

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
 * /applications/{application-id}/tokenIssuancePolicies
 * Provides operations to manage the tokenIssuancePolicies property of the microsoft.graph.application entity.
 */
export class TokenIssuancePoliciesClient {
  protected baseUrl = '/applications/{application-id}/tokenIssuancePolicies';
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
   * `/applications/{application-id}/tokenIssuancePolicies/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/applications/{application-id}/tokenIssuancePolicies/{tokenIssuancePolicy-id}/ref`
   *
   * Provides operations to manage the collection of application entities.
   */
  ref(tokenIssuancePolicyId: string) {
    return new RefClient(tokenIssuancePolicyId, this.http);
  }

  /**
   * `GET /applications/{application-id}/tokenIssuancePolicies`
   *
   * List the tokenIssuancePolicy objects that are assigned to an application.
   */
  async list(
    params?: Endpoints['GET /applications/{application-id}/tokenIssuancePolicies']['parameters']
  ) {
    const url = getInjectedUrl(
      '/applications/{application-id}/tokenIssuancePolicies',
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
          res.data as Endpoints['GET /applications/{application-id}/tokenIssuancePolicies']['response']
      );
  }
}
