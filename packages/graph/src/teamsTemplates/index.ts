import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";

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
 * /teamsTemplates
 * Provides operations to manage the collection of teamsTemplate entities.
 */
export class TeamsTemplatesClient {
  protected baseUrl = "/teamsTemplates";
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
   * `/teamsTemplates/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teamsTemplates/{teamsTemplate-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /teamsTemplates/{teamsTemplate-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamsTemplates/{teamsTemplate-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "teamsTemplate-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teamsTemplates/{teamsTemplate-id}"]["response"],
      );
  }

  /**
   * `GET /teamsTemplates`
   *
   */
  async list(
    params?: Endpoints["GET /teamsTemplates"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamsTemplates",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints["GET /teamsTemplates"]["response"]);
  }

  /**
   * `GET /teamsTemplates/{teamsTemplate-id}`
   *
   */
  async get(
    params?: Endpoints["GET /teamsTemplates/{teamsTemplate-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamsTemplates/{teamsTemplate-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "teamsTemplate-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teamsTemplates/{teamsTemplate-id}"]["response"],
      );
  }

  /**
   * `PATCH /teamsTemplates/{teamsTemplate-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /teamsTemplates/{teamsTemplate-id}"]["body"],
    params?: Endpoints["PATCH /teamsTemplates/{teamsTemplate-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teamsTemplates/{teamsTemplate-id}",
      [{ name: "teamsTemplate-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teamsTemplates/{teamsTemplate-id}"]["response"],
      );
  }

  /**
   * `POST /teamsTemplates`
   *
   */
  async create(
    body: Endpoints["POST /teamsTemplates"]["body"],
    params?: Endpoints["POST /teamsTemplates"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/teamsTemplates", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then((res) => res.data as Endpoints["POST /teamsTemplates"]["response"]);
  }
}
