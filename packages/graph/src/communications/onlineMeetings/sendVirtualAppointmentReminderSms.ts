import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./sendVirtualAppointmentReminderSms-types.d.ts";

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
 * /communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms
 * Provides operations to call the sendVirtualAppointmentReminderSms method.
 */
export class SendVirtualAppointmentReminderSmsClient {
  protected baseUrl =
    "/communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms";
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
   * `POST /communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms`
   *
   * Send an SMS reminder to external attendees for a Teams virtual appointment. This feature requires Teams premium and attendees must have a valid United States phone number to receive SMS notifications.
   */
  async create(
    body: Endpoints["POST /communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms"]["body"],
    params?: Endpoints["POST /communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms",
      [{ name: "onlineMeeting-id", in: "path" }],
      {
        ...(params || {}),
        "onlineMeeting-id": this.onlineMeetingId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms"]["response"],
      );
  }
}
