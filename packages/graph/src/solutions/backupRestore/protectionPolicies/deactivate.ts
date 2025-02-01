import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './deactivate-types.d.ts';

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
 * /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate
 * Provides operations to call the deactivate method.
 */
export class DeactivateClient {
  protected baseUrl =
    '/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate';
  protected http: AxiosInstance;

  constructor(
    protected readonly protectionPolicyBaseId: string,
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
   * `POST /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate`
   *
   * Deactivate a protectionPolicyBase.
   */
  async create(
    body: Endpoints['POST /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate']['body'],
    params?: Endpoints['POST /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate']['parameters']
  ) {
    const url = getInjectedUrl(
      '/solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate',
      [{ name: 'protectionPolicyBase-id', in: 'path' }],
      {
        ...(params || {}),
        'protectionPolicyBase-id': this.protectionPolicyBaseId,
      }
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints['POST /solutions/backupRestore/protectionPolicies/{protectionPolicyBase-id}/deactivate']['response']
      );
  }
}
