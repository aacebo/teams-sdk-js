import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./teamsAppSettings-types.d.ts";

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
 * /teamwork/teamsAppSettings
 * Provides operations to manage the teamsAppSettings property of the microsoft.graph.teamwork entity.
 */
export class TeamsAppSettingsClient {
  protected baseUrl = "/teamwork/teamsAppSettings";
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
   * `DELETE /teamwork/teamsAppSettings`
   *
   */
  async delete(
    params?: Endpoints["DELETE /teamwork/teamsAppSettings"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamwork/teamsAppSettings",
      [{ name: "If-Match", in: "header" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teamwork/teamsAppSettings"]["response"],
      );
  }

  /**
   * `GET /teamwork/teamsAppSettings`
   *
   * Get the tenant-wide teamsAppSettings for all Teams apps in the tenant.
   */
  async list(
    params?: Endpoints["GET /teamwork/teamsAppSettings"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamwork/teamsAppSettings",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teamwork/teamsAppSettings"]["response"],
      );
  }

  /**
   * `PATCH /teamwork/teamsAppSettings`
   *
   * Update the tenant-wide teamsAppSettings for all Teams apps in the tenant.
   */
  async update(
    body: Endpoints["PATCH /teamwork/teamsAppSettings"]["body"],
    params?: Endpoints["PATCH /teamwork/teamsAppSettings"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/teamwork/teamsAppSettings", [], {
      ...(params || {}),
    });

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teamwork/teamsAppSettings"]["response"],
      );
  }
}
