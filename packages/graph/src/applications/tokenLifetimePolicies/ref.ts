import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./ref-types.d.ts";

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
 * \applications\{application-id}\tokenLifetimePolicies\{tokenLifetimePolicy-id}\ref
 * Provides operations to manage the collection of application entities.
 */
export class RefClient {
  protected baseUrl =
    "\applications\{application-id}\tokenLifetimePolicies\{tokenLifetimePolicy-id}\ref";
  protected http: http.Client;

  constructor(
    protected readonly tokenLifetimePolicyId: string,
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
   * `DELETE /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * Remove a tokenLifetimePolicy from an application.
   */
  async delete$1(
    params?: Endpoints["DELETE /applications/{application-id}/tokenLifetimePolicies/$ref"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/tokenLifetimePolicies/$ref",
      [
        { name: "If-Match", in: "header" },
        { name: "@id", in: "query" },
        { name: "application-id", in: "path" },
      ],
      {
        ...(params || {}),
        "tokenLifetimePolicy-id": this.tokenLifetimePolicyId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /applications/{application-id}/tokenLifetimePolicies/$ref"]["response"],
      );
  }

  /**
   * `DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref`
   *
   * Remove a tokenLifetimePolicy from an application.
   */
  async delete(
    params?: Endpoints["DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref",
      [
        { name: "If-Match", in: "header" },
        { name: "application-id", in: "path" },
        { name: "tokenLifetimePolicy-id", in: "path" },
      ],
      {
        ...(params || {}),
        "tokenLifetimePolicy-id": this.tokenLifetimePolicyId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /applications/{application-id}/tokenLifetimePolicies/{tokenLifetimePolicy-id}/$ref"]["response"],
      );
  }

  /**
   * `GET /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * List the tokenLifetimePolicy objects that are assigned to an application. Only one object is returned in the collection because only one tokenLifetimePolicy can be assigned to an application.
   */
  async get(
    params?: Endpoints["GET /applications/{application-id}/tokenLifetimePolicies/$ref"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/tokenLifetimePolicies/$ref",
      [
        { name: "$orderby", in: "query" },
        { name: "application-id", in: "path" },
      ],
      {
        ...(params || {}),
        "tokenLifetimePolicy-id": this.tokenLifetimePolicyId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /applications/{application-id}/tokenLifetimePolicies/$ref"]["response"],
      );
  }

  /**
   * `POST /applications/{application-id}/tokenLifetimePolicies/$ref`
   *
   * Assign a tokenLifetimePolicy to an application. You can have multiple tokenLifetimePolicy policies in a tenant but can assign only one tokenLifetimePolicy per application.
   */
  async create(
    body: Endpoints["POST /applications/{application-id}/tokenLifetimePolicies/$ref"]["body"],
    params?: Endpoints["POST /applications/{application-id}/tokenLifetimePolicies/$ref"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/tokenLifetimePolicies/$ref",
      [{ name: "application-id", in: "path" }],
      {
        ...(params || {}),
        "tokenLifetimePolicy-id": this.tokenLifetimePolicyId,
      },
    );

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /applications/{application-id}/tokenLifetimePolicies/$ref"]["response"],
      );
  }
}
