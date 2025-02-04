import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";

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
 * \applications\{application-id}\owners\{directoryObject-id}\graphservicePrincipal
 * Casts the previous resource to servicePrincipal.
 */
export class GraphservicePrincipalClient {
  protected baseUrl =
    "\applications\{application-id}\owners\{directoryObject-id}\graphservicePrincipal";
  protected http: http.Client;

  constructor(
    protected readonly directoryObjectId: string,
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
   * `\applications\{application-id}\owners\{directoryObject-id}\graphservicePrincipal\count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `GET /applications/{application-id}/owners/graph.servicePrincipal`
   *
   */
  async get$1(
    params?: Endpoints["GET /applications/{application-id}/owners/graph.servicePrincipal"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/owners/graph.servicePrincipal",
      [
        { name: "ConsistencyLevel", in: "header" },
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "application-id", in: "path" },
      ],
      {
        ...(params || {}),
        "directoryObject-id": this.directoryObjectId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /applications/{application-id}/owners/graph.servicePrincipal"]["response"],
      );
  }

  /**
   * `GET /applications/{application-id}/owners/{directoryObject-id}/graph.servicePrincipal`
   *
   */
  async get(
    params?: Endpoints["GET /applications/{application-id}/owners/{directoryObject-id}/graph.servicePrincipal"]["parameters"],
    config?: http.RequestConfig,
  ) {
    const url = getInjectedUrl(
      "/applications/{application-id}/owners/{directoryObject-id}/graph.servicePrincipal",
      [
        { name: "ConsistencyLevel", in: "header" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "application-id", in: "path" },
        { name: "directoryObject-id", in: "path" },
      ],
      {
        ...(params || {}),
        "directoryObject-id": this.directoryObjectId,
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /applications/{application-id}/owners/{directoryObject-id}/graph.servicePrincipal"]["response"],
      );
  }
}
