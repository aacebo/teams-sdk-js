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
 * /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions
 * Provides operations to manage the calendarPermissions property of the microsoft.graph.calendar entity.
 */
export class CalendarPermissionsClient {
  protected baseUrl =
    "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions";
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
   * `/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "calendarGroup-id", in: "path" },
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async list(
    params?: Endpoints["GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendarGroup-id", in: "path" },
        { name: "calendar-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions"]["response"],
      );
  }

  /**
   * `GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   * The permissions of the users with whom the calendar is shared.
   */
  async get(
    params?: Endpoints["GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendarGroup-id", in: "path" },
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["body"],
    params?: Endpoints["PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}",
      [
        { name: "calendarGroup-id", in: "path" },
        { name: "calendar-id", in: "path" },
        { name: "calendarPermission-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions/{calendarPermission-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions`
   *
   */
  async create(
    body: Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions"]["body"],
    params?: Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions",
      [
        { name: "calendarGroup-id", in: "path" },
        { name: "calendar-id", in: "path" },
      ],
      {
        ...(params || {}),
        "calendar-id": this.calendarId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions"]["response"],
      );
  }
}
