import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./deactivate-types.d.ts";

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(
  url: string,
  params: Array<Param>,
  data: Record<string, any>,
) {
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === "query") {
      query[param.name] = data[param.name];
    }

    if (param.in !== "path") {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate
 * Provides operations to call the deactivate method.
 */
export class DeactivateClient {
  protected baseUrl =
    "/solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate";
  protected http: AxiosInstance;

  constructor(
    protected readonly serviceAppId: string,
    options?: GraphClientOptions,
  ) {
    if (!options) {
      this.http = axios.create({
        baseURL: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
        },
      });
    } else if ("get" in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `POST /solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate`
   *
   * Deactivate a serviceApp.
   */
  async create(
    body: Endpoints["POST /solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate"]["body"],
    params?: Endpoints["POST /solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate",
      [{ name: "serviceApp-id", in: "path" }],
      {
        ...(params || {}),
        "serviceApp-id": this.serviceAppId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/backupRestore/serviceApps/{serviceApp-id}/deactivate"]["response"],
      );
  }
}
