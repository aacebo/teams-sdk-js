import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./getSchedule-types.d.ts";

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
 * /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule
 * Provides operations to call the getSchedule method.
 */
export class GetScheduleClient {
  protected baseUrl =
    "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule";
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
   * `POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule`
   *
   * Get the free/busy availability information for a collection of users, distributions lists, or resources (rooms or equipment) for a specified time period.
   */
  async create(
    body: Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule"]["body"],
    params?: Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule",
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
          res.data as Endpoints["POST /me/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/getSchedule"]["response"],
      );
  }
}
