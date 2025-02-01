import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./setStatusMessage-types.d.ts";

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
 * /me/presence/setStatusMessage
 * Provides operations to call the setStatusMessage method.
 */
export class SetStatusMessageClient {
  protected baseUrl = "/me/presence/setStatusMessage";
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
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
   * `POST /me/presence/setStatusMessage`
   *
   * Set a presence status message for a user. An optional expiration date and time can be supplied.
   */
  async create(
    body: Endpoints["POST /me/presence/setStatusMessage"]["body"],
    params?: Endpoints["POST /me/presence/setStatusMessage"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/me/presence/setStatusMessage", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/presence/setStatusMessage"]["response"],
      );
  }
}
