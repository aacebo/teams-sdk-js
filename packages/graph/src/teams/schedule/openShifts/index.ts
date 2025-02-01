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
 * /teams/{team-id}/schedule/openShifts
 * Provides operations to manage the openShifts property of the microsoft.graph.schedule entity.
 */
export class OpenShiftsClient {
  protected baseUrl = "/teams/{team-id}/schedule/openShifts";
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
   * `/teams/{team-id}/schedule/openShifts/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/schedule/openShifts/{openShift-id}`
   *
   * Delete an openShift object.
   */
  async delete(
    body: Endpoints["DELETE /teams/{team-id}/schedule/openShifts/{openShift-id}"]["body"],
    params?: Endpoints["DELETE /teams/{team-id}/schedule/openShifts/{openShift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/openShifts/{openShift-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "openShift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/schedule/openShifts/{openShift-id}"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/openShifts`
   *
   * List openShift objects in a team.
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/schedule/openShifts"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/openShifts",
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
          res.data as Endpoints["GET /teams/{team-id}/schedule/openShifts"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/openShifts/{openShift-id}`
   *
   * Retrieve the properties and relationships of an openshift object.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/schedule/openShifts/{openShift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/openShifts/{openShift-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "openShift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/openShifts/{openShift-id}"]["response"],
      );
  }

  /**
   * `PATCH /teams/{team-id}/schedule/openShifts/{openShift-id}`
   *
   * Update the properties of an openShift object.
   */
  async update(
    body: Endpoints["PATCH /teams/{team-id}/schedule/openShifts/{openShift-id}"]["body"],
    params?: Endpoints["PATCH /teams/{team-id}/schedule/openShifts/{openShift-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/openShifts/{openShift-id}",
      [
        { name: "team-id", in: "path" },
        { name: "openShift-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teams/{team-id}/schedule/openShifts/{openShift-id}"]["response"],
      );
  }

  /**
   * `POST /teams/{team-id}/schedule/openShifts`
   *
   * Create an instance of an openShift object.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/schedule/openShifts"]["body"],
    params?: Endpoints["POST /teams/{team-id}/schedule/openShifts"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/openShifts",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/schedule/openShifts"]["response"],
      );
  }
}
