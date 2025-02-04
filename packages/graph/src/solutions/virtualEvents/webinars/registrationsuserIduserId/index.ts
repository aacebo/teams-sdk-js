import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CancelClient } from "./cancel";

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
 * \solutions\virtualEvents\webinars\{virtualEventWebinar-id}\registrationsuserIduserId
 * Provides operations to manage the registrations property of the microsoft.graph.virtualEventWebinar entity.
 */
export class RegistrationsuserIduserIdClient {
  protected baseUrl =
    "\solutions\virtualEvents\webinars\{virtualEventWebinar-id}\registrationsuserIduserId";
  protected http: http.Client;

  constructor(
    protected readonly virtualEventWebinarId: string,
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
   * `\solutions\virtualEvents\webinars\{virtualEventWebinar-id}\registrationsuserIduserId\cancel`
   *
   * Provides operations to call the cancel method.
   */
  get cancel() {
    return new CancelClient(this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)`
   *
   */
  async delete(
    params?: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)",
      [
        { name: "If-Match", in: "header" },
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "userId", in: "path" },
      ],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)`
   *
   * Get the properties and relationships of a virtualEventRegistration object.
   */
  async get(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "userId", in: "path" },
      ],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["response"],
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)`
   *
   */
  async update(
    body: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["body"],
    params?: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)",
      [
        { name: "virtualEventWebinar-id", in: "path" },
        { name: "userId", in: "path" },
      ],
      {
        ...(params || {}),
        "virtualEventWebinar-id": this.virtualEventWebinarId,
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations(userId&#x3D;&#x27;{userId}&#x27;)"]["response"],
      );
  }
}
