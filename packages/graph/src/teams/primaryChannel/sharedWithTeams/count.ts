import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./count-types.d.ts";

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
 * \teams\{team-id}\primaryChannel\sharedWithTeams\count
 * Provides operations to count the resources in the collection.
 */
export class CountClient {
  protected baseUrl = "\teams\{team-id}\primaryChannel\sharedWithTeams\count";
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
        },
      });
    } else if ("request" in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/sharedWithTeams/$count`
   *
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams/$count"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/sharedWithTeams/$count",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/primaryChannel/sharedWithTeams/$count"]["response"],
      );
  }
}
