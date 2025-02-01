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
 * /communications/calls/{call-id}/operations
 * Provides operations to manage the operations property of the microsoft.graph.call entity.
 */
export class OperationsClient {
  protected baseUrl = "/communications/calls/{call-id}/operations";
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
   * `/communications/calls/{call-id}/operations/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /communications/calls/{call-id}/operations/{commsOperation-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /communications/calls/{call-id}/operations/{commsOperation-id}"]["body"],
    params?: Endpoints["DELETE /communications/calls/{call-id}/operations/{commsOperation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/operations/{commsOperation-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "call-id", in: "path" },
        { name: "commsOperation-id", in: "path" },
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
          res.data as Endpoints["DELETE /communications/calls/{call-id}/operations/{commsOperation-id}"]["response"],
      );
  }

  /**
   * `GET /communications/calls/{call-id}/operations`
   *
   * Get the status of an operation that adds the large gallery view to a call.
   */
  async list(
    params?: Endpoints["GET /communications/calls/{call-id}/operations"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/operations",
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
          res.data as Endpoints["GET /communications/calls/{call-id}/operations"]["response"],
      );
  }

  /**
   * `GET /communications/calls/{call-id}/operations/{commsOperation-id}`
   *
   * Get the status of an operation that adds the large gallery view to a call.
   */
  async get(
    params?: Endpoints["GET /communications/calls/{call-id}/operations/{commsOperation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/operations/{commsOperation-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "call-id", in: "path" },
        { name: "commsOperation-id", in: "path" },
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
          res.data as Endpoints["GET /communications/calls/{call-id}/operations/{commsOperation-id}"]["response"],
      );
  }

  /**
   * `PATCH /communications/calls/{call-id}/operations/{commsOperation-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /communications/calls/{call-id}/operations/{commsOperation-id}"]["body"],
    params?: Endpoints["PATCH /communications/calls/{call-id}/operations/{commsOperation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/operations/{commsOperation-id}",
      [
        { name: "call-id", in: "path" },
        { name: "commsOperation-id", in: "path" },
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
          res.data as Endpoints["PATCH /communications/calls/{call-id}/operations/{commsOperation-id}"]["response"],
      );
  }

  /**
   * `POST /communications/calls/{call-id}/operations`
   *
   */
  async create(
    body: Endpoints["POST /communications/calls/{call-id}/operations"]["body"],
    params?: Endpoints["POST /communications/calls/{call-id}/operations"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/communications/calls/{call-id}/operations",
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
          res.data as Endpoints["POST /communications/calls/{call-id}/operations"]["response"],
      );
  }
}
