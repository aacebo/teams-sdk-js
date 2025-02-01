import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { ContentClient } from "./content";

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
 * /teams/{team-id}/primaryChannel/filesFolder
 * Provides operations to manage the filesFolder property of the microsoft.graph.channel entity.
 */
export class FilesFolderClient {
  protected baseUrl = "/teams/{team-id}/primaryChannel/filesFolder";
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
   * `/teams/{team-id}/primaryChannel/filesFolder/content`
   *
   * Provides operations to manage the media for the team entity.
   */
  get content() {
    return new ContentClient(this.http);
  }

  /**
   * `GET /teams/{team-id}/primaryChannel/filesFolder`
   *
   * Metadata for the location where the channel&#x27;s files are stored.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/primaryChannel/filesFolder"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/primaryChannel/filesFolder",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "team-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/primaryChannel/filesFolder"]["response"],
      );
  }
}
