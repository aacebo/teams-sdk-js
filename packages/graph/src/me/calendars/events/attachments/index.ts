import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { CreateUploadSessionClient } from "./createUploadSession";

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
 * /me/calendars/{calendar-id}/events/{event-id}/attachments
 * Provides operations to manage the attachments property of the microsoft.graph.event entity.
 */
export class AttachmentsClient {
  protected baseUrl =
    "/me/calendars/{calendar-id}/events/{event-id}/attachments";
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
   * `/me/calendars/{calendar-id}/events/{event-id}/attachments/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/me/calendars/{calendar-id}/events/{event-id}/attachments/createUploadSession`
   *
   * Provides operations to call the createUploadSession method.
   */
  get createUploadSession() {
    return new CreateUploadSessionClient(this.http);
  }

  /**
   * `DELETE /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "calendar-id", in: "path" },
        { name: "event-id", in: "path" },
        { name: "attachment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendars/{calendar-id}/events/{event-id}/attachments`
   *
   * The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation property. Read-only. Nullable.
   */
  async list(
    params?: Endpoints["GET /me/calendars/{calendar-id}/events/{event-id}/attachments"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/events/{event-id}/attachments",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendar-id", in: "path" },
        { name: "event-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}/events/{event-id}/attachments"]["response"],
      );
  }

  /**
   * `GET /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}`
   *
   * The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation property. Read-only. Nullable.
   */
  async get(
    params?: Endpoints["GET /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "calendar-id", in: "path" },
        { name: "event-id", in: "path" },
        { name: "attachment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendars/{calendar-id}/events/{event-id}/attachments/{attachment-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendars/{calendar-id}/events/{event-id}/attachments`
   *
   */
  async create(
    body: Endpoints["POST /me/calendars/{calendar-id}/events/{event-id}/attachments"]["body"],
    params?: Endpoints["POST /me/calendars/{calendar-id}/events/{event-id}/attachments"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/calendars/{calendar-id}/events/{event-id}/attachments",
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
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendars/{calendar-id}/events/{event-id}/attachments"]["response"],
      );
  }
}
