import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./attendeeReport-types.d.ts";

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
 * /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport
 * Provides operations to manage the media for the user entity.
 */
export class AttendeeReportClient {
  protected baseUrl =
    "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport";
  protected http: AxiosInstance;

  constructor(
    protected readonly onlineMeetingId: string,
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
   * `DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport`
   *
   * The content stream of the attendee report of a Microsoft Teams live event. Read-only.
   */
  async delete(
    params?: Endpoints["DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport",
      [
        { name: "If-Match", in: "header" },
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "onlineMeeting-id": this.onlineMeetingId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["response"],
      );
  }

  /**
   * `GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport`
   *
   * The content stream of the attendee report of a Microsoft Teams live event. Read-only.
   */
  async get(
    params?: Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport",
      [
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "onlineMeeting-id": this.onlineMeetingId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["response"],
      );
  }

  /**
   * `PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport`
   *
   * The content stream of the attendee report of a Microsoft Teams live event. Read-only.
   */
  async set(
    body: Endpoints["PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["body"],
    params?: Endpoints["PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport",
      [
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "onlineMeeting-id": this.onlineMeetingId,
      },
    );

    return this.http
      .put(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport"]["response"],
      );
  }
}
