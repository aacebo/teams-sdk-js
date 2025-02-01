import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

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
 * /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments
 * Provides operations to manage the segments property of the microsoft.graph.callRecords.session entity.
 */
export class SegmentsClient {
  protected baseUrl =
    "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments";
  protected http: AxiosInstance;

  constructor(
    protected readonly sessionId: string,
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
   * `/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "callRecord-id", in: "path" },
        { name: "session-id", in: "path" },
        { name: "segment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "session-id": this.sessionId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments`
   *
   * The list of segments involved in the session. Read-only. Nullable.
   */
  async list(
    params?: Endpoints["GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "callRecord-id", in: "path" },
        { name: "session-id", in: "path" },
      ],
      {
        ...(params || {}),
        "session-id": this.sessionId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}`
   *
   * The list of segments involved in the session. Read-only. Nullable.
   */
  async get(
    params?: Endpoints["GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "callRecord-id", in: "path" },
        { name: "session-id", in: "path" },
        { name: "segment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "session-id": this.sessionId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["response"],
      );
  }

  /**
   * `PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["body"],
    params?: Endpoints["PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}",
      [
        { name: "callRecord-id", in: "path" },
        { name: "session-id", in: "path" },
        { name: "segment-id", in: "path" },
      ],
      {
        ...(params || {}),
        "session-id": this.sessionId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments/{segment-id}"]["response"],
      );
  }

  /**
   * `POST /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments`
   *
   */
  async create(
    body: Endpoints["POST /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments"]["body"],
    params?: Endpoints["POST /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}/sessions/{session-id}/segments",
      [
        { name: "callRecord-id", in: "path" },
        { name: "session-id", in: "path" },
      ],
      {
        ...(params || {}),
        "session-id": this.sessionId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/callRecords/{callRecord-id}/sessions/{session-id}/segments"]["response"],
      );
  }
}
