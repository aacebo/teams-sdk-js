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
 * /teams/{team-id}/schedule/schedulingGroups
 * Provides operations to manage the schedulingGroups property of the microsoft.graph.schedule entity.
 */
export class SchedulingGroupsClient {
  protected baseUrl = "/teams/{team-id}/schedule/schedulingGroups";
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
   * `/teams/{team-id}/schedule/schedulingGroups/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}`
   *
   * Mark a schedulingGroup as inactive by setting its isActive property.
This method does not remove the schedulingGroup from the schedule. Existing shift instances assigned to the scheduling group remain part of the group.
   */
  async delete(
    body: Endpoints["DELETE /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["body"],
    params?: Endpoints["DELETE /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "team-id", in: "path" },
        { name: "schedulingGroup-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/schedulingGroups`
   *
   * Get the list of schedulingGroups in this schedule.
   */
  async list(
    params?: Endpoints["GET /teams/{team-id}/schedule/schedulingGroups"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/schedulingGroups",
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
          res.data as Endpoints["GET /teams/{team-id}/schedule/schedulingGroups"]["response"],
      );
  }

  /**
   * `GET /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}`
   *
   * Retrieve the properties and relationships of a schedulingGroup by ID.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
        { name: "schedulingGroup-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["response"],
      );
  }

  /**
   * `PATCH /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}`
   *
   * Replace an existing schedulingGroup. If the specified schedulingGroup doesn&#x27;t exist, this method returns 404 Not found.
   */
  async update(
    body: Endpoints["PATCH /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["body"],
    params?: Endpoints["PATCH /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}",
      [
        { name: "team-id", in: "path" },
        { name: "schedulingGroup-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teams/{team-id}/schedule/schedulingGroups/{schedulingGroup-id}"]["response"],
      );
  }

  /**
   * `POST /teams/{team-id}/schedule/schedulingGroups`
   *
   * Create a new schedulingGroup.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/schedule/schedulingGroups"]["body"],
    params?: Endpoints["POST /teams/{team-id}/schedule/schedulingGroups"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/schedule/schedulingGroups",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/schedule/schedulingGroups"]["response"],
      );
  }
}
