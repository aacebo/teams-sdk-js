import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./value-types.d.ts";

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
 * \applications\{application-id}\synchronization\jobs\{synchronizationJob-id}\bulkUpload\value
 * Provides operations to manage the media for the application entity.
 */
export class ValueClient {
  protected baseUrl =
    "\applications\{application-id}\synchronization\jobs\{synchronizationJob-id}\bulkUpload\value";
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
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
   * `DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async delete(
    params?: Endpoints["DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value",
      [
        { name: "If-Match", in: "header" },
        { name: "application-id", in: "path" },
        { name: "synchronizationJob-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["response"],
      );
  }

  /**
   * `GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async get(
    params?: Endpoints["GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value",
      [
        { name: "application-id", in: "path" },
        { name: "synchronizationJob-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["response"],
      );
  }

  /**
   * `PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value`
   *
   * The bulk upload operation for the job.
   */
  async set(
    body: Endpoints["PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["body"],
    params?: Endpoints["PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value",
      [
        { name: "application-id", in: "path" },
        { name: "synchronizationJob-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .put(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PUT /applications/{application-id}/synchronization/jobs/{synchronizationJob-id}/bulkUpload/$value"]["response"],
      );
  }
}
