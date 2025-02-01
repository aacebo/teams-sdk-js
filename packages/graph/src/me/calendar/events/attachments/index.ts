import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

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
  for (const param of params) {
    if (param.in !== "path") continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /me/calendar/events/{event-id}/attachments
 * Provides operations to manage the attachments property of the microsoft.graph.event entity.
 */
export class AttachmentsClient {
  protected baseUrl = "/me/calendar/events/{event-id}/attachments";
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
   * `/me/calendar/events/{event-id}/attachments/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/attachments/createUploadSession`
   *
   * Provides operations to call the createUploadSession method.
   */
  get createUploadSession() {
    return new CreateUploadSessionClient(this.http);
  }

  /**
   * `DELETE /me/calendar/events/{event-id}/attachments/{attachment-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/calendar/events/{event-id}/attachments/{attachment-id}"]["body"],
    params?: Endpoints["DELETE /me/calendar/events/{event-id}/attachments/{attachment-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}/attachments/{attachment-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "event-id", in: "path" },
        { name: "attachment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendar/events/{event-id}/attachments/{attachment-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendar/events/{event-id}/attachments`
   *
   * The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation property. Read-only. Nullable.
   */
  async list(
    params?: Endpoints["GET /me/calendar/events/{event-id}/attachments"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}/attachments",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "event-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendar/events/{event-id}/attachments"]["response"],
      );
  }

  /**
   * `GET /me/calendar/events/{event-id}/attachments/{attachment-id}`
   *
   * The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation property. Read-only. Nullable.
   */
  async get(
    params?: Endpoints["GET /me/calendar/events/{event-id}/attachments/{attachment-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}/attachments/{attachment-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "event-id", in: "path" },
        { name: "attachment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendar/events/{event-id}/attachments/{attachment-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendar/events/{event-id}/attachments`
   *
   */
  async create(
    body: Endpoints["POST /me/calendar/events/{event-id}/attachments"]["body"],
    params?: Endpoints["POST /me/calendar/events/{event-id}/attachments"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}/attachments",
      [{ name: "event-id", in: "path" }],
      {
        ...(params || {}),
        "event-id": this.eventId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /me/calendar/events/{event-id}/attachments"]["response"],
      );
  }
}
