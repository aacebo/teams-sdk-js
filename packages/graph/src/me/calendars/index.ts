import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CalendarPermissionsClient } from "./calendarPermissions";
import { CalendarViewClient } from "./calendarView";
import { CountClient } from "./count";
import { EventsClient } from "./events";
import { GetScheduleClient } from "./getSchedule";

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
 * /me/calendars
 * Provides operations to call the allowedCalendarSharingRoles method.
 */
export class CalendarsClient {
  protected baseUrl = "/me/calendars";
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
   * `/me/calendars/{calendar-id}/calendarPermissions`
   *
   * Provides operations to manage the calendarPermissions property of the microsoft.graph.calendar entity.
   */
  calendarPermissions(calendarId: string) {
    return new CalendarPermissionsClient(calendarId, this.http);
  }

  /**
   * `/me/calendars/{calendar-id}/calendarView`
   *
   * Provides operations to manage the calendarView property of the microsoft.graph.calendar entity.
   */
  calendarView(calendarId: string) {
    return new CalendarViewClient(calendarId, this.http);
  }

  /**
   * `/me/calendars/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/me/calendars/{calendar-id}/events`
   *
   * Provides operations to manage the events property of the microsoft.graph.calendar entity.
   */
  events(calendarId: string) {
    return new EventsClient(calendarId, this.http);
  }

  /**
   * `/me/calendars/{calendar-id}/getSchedule`
   *
   * Provides operations to call the getSchedule method.
   */
  getSchedule(calendarId: string) {
    return new GetScheduleClient(calendarId, this.http);
  }

  /**
   * `DELETE /me/calendars/{calendar-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/calendars/{calendar-id}"]["body"],
    params?: Endpoints["DELETE /me/calendars/{calendar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "calendar-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendars/{calendar-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendars`
   *
   * Get all the user&#x27;s calendars (/calendars navigation property), get the calendars from the default calendar group or from a specific calendar group.
   */
  async list(params?: Endpoints["GET /me/calendars"]["parameters"]) {
    const url = getInjectedUrl(
      "/me/calendars",
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
      .then((res) => res.data as Endpoints["GET /me/calendars"]["response"]);
  }

  /**
   * `GET /me/calendars/{calendar-id}`
   *
   * The user&#x27;s calendars. Read-only. Nullable.
   */
  async get(
    params?: Endpoints["GET /me/calendars/{calendar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendar-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendars/{calendar-id}/allowedCalendarSharingRoles(User&#x3D;&#x27;{User}&#x27;)`
   *
   */
  async get$1(
    params?: Endpoints["GET /me/calendars/{calendar-id}/allowedCalendarSharingRoles(User&#x3D;&#x27;{User}&#x27;)"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/allowedCalendarSharingRoles(User&#x3D;&#x27;{User}&#x27;)",
      [
        { name: "calendar-id", in: "path" },
        { name: "User", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}/allowedCalendarSharingRoles(User&#x3D;&#x27;{User}&#x27;)"]["response"],
      );
  }

  /**
   * `PATCH /me/calendars/{calendar-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /me/calendars/{calendar-id}"]["body"],
    params?: Endpoints["PATCH /me/calendars/{calendar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}",
      [{ name: "calendar-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /me/calendars/{calendar-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendars`
   *
   * Create a new calendar for a user.
   */
  async create(
    body: Endpoints["POST /me/calendars"]["body"],
    params?: Endpoints["POST /me/calendars"]["parameters"],
  ) {
    const url = getInjectedUrl("/me/calendars", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then((res) => res.data as Endpoints["POST /me/calendars"]["response"]);
  }
}
