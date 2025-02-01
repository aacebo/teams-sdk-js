import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

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
  for (const param of params) {
    if (param.in !== "path") continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /communications/calls/{call-id}/contentSharingSessions
 * Provides operations to manage the contentSharingSessions property of the microsoft.graph.call entity.
 */
export class ContentSharingSessionsClient {
  protected baseUrl = "/communications/calls/{call-id}/contentSharingSessions";
  protected http: AxiosInstance;

  constructor(
    protected readonly callId: string,
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
   * `/communications/calls/{call-id}/contentSharingSessions/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["body"],
    params?: Endpoints["DELETE /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "call-id", in: "path" },
        { name: "contentSharingSession-id", in: "path" },
      ],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["response"],
      );
  }

  /**
   * `GET /communications/calls/{call-id}/contentSharingSessions`
   *
   * Retrieve a list of contentSharingSession objects in a call.
   */
  async list(
    params?: Endpoints["GET /communications/calls/{call-id}/contentSharingSessions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/contentSharingSessions",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "call-id", in: "path" },
      ],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/calls/{call-id}/contentSharingSessions"]["response"],
      );
  }

  /**
   * `GET /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}`
   *
   * Retrieve the properties of a contentSharingSession object in a call.
   */
  async get(
    params?: Endpoints["GET /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "call-id", in: "path" },
        { name: "contentSharingSession-id", in: "path" },
      ],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["response"],
      );
  }

  /**
   * `PATCH /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["body"],
    params?: Endpoints["PATCH /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}",
      [
        { name: "call-id", in: "path" },
        { name: "contentSharingSession-id", in: "path" },
      ],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /communications/calls/{call-id}/contentSharingSessions/{contentSharingSession-id}"]["response"],
      );
  }

  /**
   * `POST /communications/calls/{call-id}/contentSharingSessions`
   *
   */
  async create(
    body: Endpoints["POST /communications/calls/{call-id}/contentSharingSessions"]["body"],
    params?: Endpoints["POST /communications/calls/{call-id}/contentSharingSessions"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/contentSharingSessions",
      [{ name: "call-id", in: "path" }],
      {
        ...(params || {}),
        "call-id": this.callId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/calls/{call-id}/contentSharingSessions"]["response"],
      );
  }
}
