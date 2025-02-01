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
 * /teams/{team-id}/schedule/timeOffReasons
 * Provides operations to manage the timeOffReasons property of the microsoft.graph.schedule entity.
 */
export class TimeOffReasonsClient {
  protected baseUrl = "/teams/{team-id}/schedule/timeOffReasons";
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
   * `/teams/{team-id}/schedule/timeOffReasons/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}`
   *
   * Mark a timeOffReason as inactive by setting the isActive property. Every team must include at least one timeoff reason. This method doesn&#x27;t remove the specified timeOffReason instance. timeOffItem instances that have been assigned this reason remain assigned to this reason.
   */
  async delete(
    params?: Endpoints["DELETE /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "timeOffReason-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/timeOffReasons`
   *
   * Get the list of timeOffReasons in a schedule.
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/schedule/timeOffReasons"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/timeOffReasons",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/timeOffReasons"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}`
   *
   * Retrieve the properties and relationships of a timeOffReason object by ID.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "timeOffReason-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["response"],
      );
  }

  /**
   * `PATCH /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}`
   *
   * Replace an existing timeOffReason. If the specified timeOffReason doesn&#x27;t exist, this method returns 404 Not found.
   */
  async update(
    body: Endpoints["PATCH /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["body"],
    params?: Endpoints["PATCH /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}",
      [
        { name: "team-id", in: "path" },
        { name: "timeOffReason-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teams/{team-id}/schedule/timeOffReasons/{timeOffReason-id}"]["response"],
      );
  }

  /**
   * `POST /teams/{team-id}/schedule/timeOffReasons`
   *
   * Create a new timeOffReason.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/schedule/timeOffReasons"]["body"],
    params?: Endpoints["POST /teams/{team-id}/schedule/timeOffReasons"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/timeOffReasons",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/schedule/timeOffReasons"]["response"],
      );
  }
}
