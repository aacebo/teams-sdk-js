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
 * /me/calendar/calendarPermissions
 * Provides operations to manage the calendarPermissions property of the microsoft.graph.calendar entity.
 */
export class CalendarPermissionsClient {
  protected baseUrl = "/me/calendar/calendarPermissions";
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
   * `/me/calendar/calendarPermissions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /me/calendar/calendarPermissions/{calendarPermission-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/calendar/calendarPermissions/{calendarPermission-id}"]["body"],
    params?: Endpoints["DELETE /me/calendar/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/calendarPermissions/{calendarPermission-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendar/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendar/calendarPermissions`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async list(
    params?: Endpoints["GET /me/calendar/calendarPermissions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/calendarPermissions",
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendar/calendarPermissions"]["response"],
      );
  }

  /**
   * `GET /me/calendar/calendarPermissions/{calendarPermission-id}`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async get(
    params?: Endpoints["GET /me/calendar/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/calendarPermissions/{calendarPermission-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendar/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `PATCH /me/calendar/calendarPermissions/{calendarPermission-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /me/calendar/calendarPermissions/{calendarPermission-id}"]["body"],
    params?: Endpoints["PATCH /me/calendar/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/calendarPermissions/{calendarPermission-id}",
      [{ name: "calendarPermission-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /me/calendar/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendar/calendarPermissions`
   *
   * Create a calendarPermission resource to specify the identity and role of the user with whom the specified calendar is being shared or delegated.
   */
  async create(
    body: Endpoints["POST /me/calendar/calendarPermissions"]["body"],
    params?: Endpoints["POST /me/calendar/calendarPermissions"]["parameters"],
  ) {
    const url = getInjectedUrl("/me/calendar/calendarPermissions", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendar/calendarPermissions"]["response"],
      );
  }
}
