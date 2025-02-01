import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

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
  for (const param of params) {
    if (param.in !== "path") continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /teams/{team-id}/schedule/shifts
 * Provides operations to manage the shifts property of the microsoft.graph.schedule entity.
 */
export class ShiftsClient {
  protected baseUrl = "/teams/{team-id}/schedule/shifts";
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
   * `/teams/{team-id}/schedule/shifts/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/schedule/shifts/{shift-id}`
   *
   * Delete a shift from the schedule.
   */
  async delete(
    body: Endpoints["DELETE /teams/{team-id}/schedule/shifts/{shift-id}"]["body"],
    params?: Endpoints["DELETE /teams/{team-id}/schedule/shifts/{shift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/shifts/{shift-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "shift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/schedule/shifts/{shift-id}"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/shifts`
   *
   * Get the list of shift instances in a schedule.
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/schedule/shifts"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/shifts",
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/shifts"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/shifts/{shift-id}`
   *
   * Retrieve the properties and relationships of a shift object by ID.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/schedule/shifts/{shift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/shifts/{shift-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "shift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/shifts/{shift-id}"]["response"],
      );
  }

  /**
   * `PATCH /teams/{team-id}/schedule/shifts/{shift-id}`
   *
   * Replace an existing shift. If the specified shift doesn&#x27;t exist, this method returns 404 Not found. The duration of a shift can&#x27;t be less than 1 minute or longer than 24 hours.
   */
  async update(
    body: Endpoints["PATCH /teams/{team-id}/schedule/shifts/{shift-id}"]["body"],
    params?: Endpoints["PATCH /teams/{team-id}/schedule/shifts/{shift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/shifts/{shift-id}",
      [
        { name: "team-id", in: "path" },
        { name: "shift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teams/{team-id}/schedule/shifts/{shift-id}"]["response"],
      );
  }

  /**
   * `POST /teams/{team-id}/schedule/shifts`
   *
   * Create a new shift instance in a schedule. The duration of a shift cannot be less than 1 minute or longer than 24 hours.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/schedule/shifts"]["body"],
    params?: Endpoints["POST /teams/{team-id}/schedule/shifts"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/shifts",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/schedule/shifts"]["response"],
      );
  }
}
