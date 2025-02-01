import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { ValueClient } from "./value";

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
 * /me/photos
 * Provides operations to manage the photos property of the microsoft.graph.user entity.
 */
export class PhotosClient {
  protected baseUrl = "/me/photos";
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
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
   * `/me/photos/{profilePhoto-id}/value`
   *
   * Provides operations to manage the media for the user entity.
   */
  value(profilePhotoId: string) {
    return new ValueClient(profilePhotoId, this.http);
  }

  /**
   * `GET /me/photos`
   *
   * The collection of the user&#x27;s profile photos in different sizes. Read-only.
   */
  async list(
    params?: Endpoints["GET /me/photos"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/photos",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then((res) => res.data as Endpoints["GET /me/photos"]["response"]);
  }

  /**
   * `GET /me/photos/{profilePhoto-id}`
   *
   * The collection of the user&#x27;s profile photos in different sizes. Read-only.
   */
  async get(
    params?: Endpoints["GET /me/photos/{profilePhoto-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/me/photos/{profilePhoto-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "profilePhoto-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/photos/{profilePhoto-id}"]["response"],
      );
  }
}
