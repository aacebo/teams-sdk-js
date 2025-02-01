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
 * /me/calendars/{calendar-id}/calendarPermissions
 * Provides operations to manage the calendarPermissions property of the microsoft.graph.calendar entity.
 */
export class CalendarPermissionsClient {
  protected baseUrl = "/me/calendars/{calendar-id}/calendarPermissions";
  protected http: AxiosInstance;

  constructor(
    protected readonly calendarId: string,
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
   * `/me/calendars/{calendar-id}/calendarPermissions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["body"],
    params?: Endpoints["DELETE /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendars/{calendar-id}/calendarPermissions`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async list(
    params?: Endpoints["GET /me/calendars/{calendar-id}/calendarPermissions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarPermissions",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendar-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}/calendarPermissions"]["response"],
      );
  }

  /**
   * `GET /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async get(
    params?: Endpoints["GET /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `PATCH /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["body"],
    params?: Endpoints["PATCH /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /me/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendars/{calendar-id}/calendarPermissions`
   *
   */
  async create(
    body: Endpoints["POST /me/calendars/{calendar-id}/calendarPermissions"]["body"],
    params?: Endpoints["POST /me/calendars/{calendar-id}/calendarPermissions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarPermissions",
      [{ name: "calendar-id", in: "path" }],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendars/{calendar-id}/calendarPermissions"]["response"],
      );
  }
}
