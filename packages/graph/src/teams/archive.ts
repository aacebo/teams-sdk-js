import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./archive-types.d.ts";

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
 * /teams/{team-id}/archive
 * Provides operations to call the archive method.
 */
export class ArchiveClient {
  protected baseUrl = "/teams/{team-id}/archive";
  protected http: AxiosInstance;

  constructor(
    protected readonly teamId: string,
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
   * `POST /teams/{team-id}/archive`
   *
   * Archive the specified team. 
When a team is archived, users can no longer make most changes to the team. For example, users can no longer: send or like messages on any channel in the team; edit the team&#x27;s name or description; nor edit other settings. However, membership changes to the team are still allowed. Archiving is an async operation. A team is archived once the async operation completes successfully, which might occur subsequent to a response from this API. To archive a team, the team and group must have an owner. To restore a team from its archived state, use the API to unarchive.
   */
  async create(
    body: Endpoints["POST /teams/{team-id}/archive"]["body"],
    params?: Endpoints["POST /teams/{team-id}/archive"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/archive",
      [{ name: "team-id", in: "path" }],
      {
        ...(params || {}),
        "team-id": this.teamId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teams/{team-id}/archive"]["response"],
      );
  }
}
