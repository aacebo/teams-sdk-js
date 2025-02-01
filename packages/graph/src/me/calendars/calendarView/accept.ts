import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./accept-types.d.ts";

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
 * /me/calendars/{calendar-id}/calendarView/{event-id}/accept
 * Provides operations to call the accept method.
 */
export class AcceptClient {
  protected baseUrl =
    "/me/calendars/{calendar-id}/calendarView/{event-id}/accept";
  protected http: AxiosInstance;

  constructor(
    protected readonly eventId: string,
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
   * `POST /me/calendars/{calendar-id}/calendarView/{event-id}/accept`
   *
   * Accept the specified event in a user calendar.
   */
  async create(
    body: Endpoints["POST /me/calendars/{calendar-id}/calendarView/{event-id}/accept"]["body"],
    params?: Endpoints["POST /me/calendars/{calendar-id}/calendarView/{event-id}/accept"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/calendarView/{event-id}/accept",
      [
        { name: "calendar-id", in: "path" },
        { name: "event-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendars/{calendar-id}/calendarView/{event-id}/accept"]["response"],
      );
  }
}
