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
 * /applications/{application-id}/owners/{directoryObject-id}/graphservicePrincipal
 * Casts the previous resource to servicePrincipal.
 */
export class GraphservicePrincipalClient {
  protected baseUrl =
    "/applications/{application-id}/owners/{directoryObject-id}/graphservicePrincipal";
  protected http: AxiosInstance;

  constructor(
    protected readonly directoryObjectId: string,
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
   * `/applications/{application-id}/owners/{directoryObject-id}/graphservicePrincipal/count`
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
      .get(url)
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /applications/{application-id}/owners/{directoryObject-id}/graph.servicePrincipal"]["response"],
      );
  }
}
