import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { AttendanceReportsClient } from "./attendanceReports";
import { AttendeeReportClient } from "./attendeeReport";
import { CountClient } from "./count";
import { CreateOrGetClient } from "./createOrGet";
import { GetAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient } from "./getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime";
import { GetAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient } from "./getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime";
import { GetVirtualAppointmentJoinWebUrlClient } from "./getVirtualAppointmentJoinWebUrl";
import { RecordingsClient } from "./recordings";
import { SendVirtualAppointmentReminderSmsClient } from "./sendVirtualAppointmentReminderSms";
import { SendVirtualAppointmentSmsClient } from "./sendVirtualAppointmentSms";
import { TranscriptsClient } from "./transcripts";

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
 * /users/{user-id}/onlineMeetings
 * Provides operations to manage the onlineMeetings property of the microsoft.graph.user entity.
 */
export class OnlineMeetingsClient {
  protected baseUrl = "/users/{user-id}/onlineMeetings";
  protected http: AxiosInstance;

  constructor(
    protected readonly userId: string,
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
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendanceReports`
   *
   * Provides operations to manage the attendanceReports property of the microsoft.graph.onlineMeetingBase entity.
   */
  attendanceReports(onlineMeetingId: string) {
    return new AttendanceReportsClient(onlineMeetingId, this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/attendeeReport`
   *
   * Provides operations to manage the media for the user entity.
   */
  attendeeReport(onlineMeetingId: string) {
    return new AttendeeReportClient(onlineMeetingId, this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/createOrGet`
   *
   * Provides operations to call the createOrGet method.
   */
  get createOrGet() {
    return new CreateOrGetClient(this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime`
   *
   * Provides operations to call the getAllRecordings method.
   */
  get getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime() {
    return new GetAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient(
      this.http,
    );
  }

  /**
   * `/users/{user-id}/onlineMeetings/getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime`
   *
   * Provides operations to call the getAllTranscripts method.
   */
  get getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime() {
    return new GetAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient(
      this.http,
    );
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/getVirtualAppointmentJoinWebUrl`
   *
   * Provides operations to call the getVirtualAppointmentJoinWebUrl method.
   */
  getVirtualAppointmentJoinWebUrl(onlineMeetingId: string) {
    return new GetVirtualAppointmentJoinWebUrlClient(
      onlineMeetingId,
      this.http,
    );
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings`
   *
   * Provides operations to manage the recordings property of the microsoft.graph.onlineMeeting entity.
   */
  recordings(onlineMeetingId: string) {
    return new RecordingsClient(onlineMeetingId, this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentReminderSms`
   *
   * Provides operations to call the sendVirtualAppointmentReminderSms method.
   */
  sendVirtualAppointmentReminderSms(onlineMeetingId: string) {
    return new SendVirtualAppointmentReminderSmsClient(
      onlineMeetingId,
      this.http,
    );
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/sendVirtualAppointmentSms`
   *
   * Provides operations to call the sendVirtualAppointmentSms method.
   */
  sendVirtualAppointmentSms(onlineMeetingId: string) {
    return new SendVirtualAppointmentSmsClient(onlineMeetingId, this.http);
  }

  /**
   * `/users/{user-id}/onlineMeetings/{onlineMeeting-id}/transcripts`
   *
   * Provides operations to manage the transcripts property of the microsoft.graph.onlineMeeting entity.
   */
  transcripts(onlineMeetingId: string) {
    return new TranscriptsClient(onlineMeetingId, this.http);
  }

  /**
   * `DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "user-id": this.userId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["response"],
      );
  }

  /**
   * `GET /users/{user-id}/onlineMeetings`
   *
   * Information about a meeting, including the URL used to join a meeting, the attendees list, and the description.
   */
  async list(
    params?: Endpoints["GET /users/{user-id}/onlineMeetings"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "user-id", in: "path" },
      ],
      {
        ...(params || {}),
        "user-id": this.userId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/onlineMeetings"]["response"],
      );
  }

  /**
   * `GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}`
   *
   * Information about a meeting, including the URL used to join a meeting, the attendees list, and the description.
   */
  async get(
    params?: Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "user-id": this.userId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["response"],
      );
  }

  /**
   * `PATCH /users/{user-id}/onlineMeetings/{onlineMeeting-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["body"],
    params?: Endpoints["PATCH /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings/{onlineMeeting-id}",
      [
        { name: "user-id", in: "path" },
        { name: "onlineMeeting-id", in: "path" },
      ],
      {
        ...(params || {}),
        "user-id": this.userId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /users/{user-id}/onlineMeetings/{onlineMeeting-id}"]["response"],
      );
  }

  /**
   * `POST /users/{user-id}/onlineMeetings`
   *
   */
  async create(
    body: Endpoints["POST /users/{user-id}/onlineMeetings"]["body"],
    params?: Endpoints["POST /users/{user-id}/onlineMeetings"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/users/{user-id}/onlineMeetings",
      [{ name: "user-id", in: "path" }],
      {
        ...(params || {}),
        "user-id": this.userId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /users/{user-id}/onlineMeetings"]["response"],
      );
  }
}
