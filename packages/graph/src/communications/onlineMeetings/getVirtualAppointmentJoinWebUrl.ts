import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./getVirtualAppointmentJoinWebUrl-types.d.ts";

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
 * \communications\onlineMeetings\{onlineMeeting-id}\getVirtualAppointmentJoinWebUrl
 * Provides operations to call the getVirtualAppointmentJoinWebUrl method.
 */
export class GetVirtualAppointmentJoinWebUrlClient {
  protected baseUrl =
    "\communications\onlineMeetings\{onlineMeeting-id}\getVirtualAppointmentJoinWebUrl";
  protected http: http.Client;

  constructor(
    protected readonly onlineMeetingId: string,
    options?: http.Client | http.ClientOptions,
  ) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
        },
      });
    } else if ("request" in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: "https://graph.microsoft.com/v1.0",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `GET /communications/onlineMeetings/{onlineMeeting-id}/getVirtualAppointmentJoinWebUrl()`
   *
   * Get a join web URL for a Microsoft Virtual Appointment. This web URL includes enhanced business-to-customer experiences such as mobile browser join and virtual lobby rooms. With Teams Premium, you can configure a custom lobby room experience for attendees by adding your company logo and access the Virtual Appointments usage report for organizational analytics.
   */
  async get(
    params?: Endpoints["GET /communications/onlineMeetings/{onlineMeeting-id}/getVirtualAppointmentJoinWebUrl()"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/onlineMeetings/{onlineMeeting-id}/getVirtualAppointmentJoinWebUrl()",
      [{ name: "onlineMeeting-id", in: "path" }],
      {
        ...(params || {}),
        "onlineMeeting-id": this.onlineMeetingId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/onlineMeetings/{onlineMeeting-id}/getVirtualAppointmentJoinWebUrl()"]["response"],
      );
  }
}
