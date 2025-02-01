import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName-types.d.ts";

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
 * /teams/{team-id}/channels/{channel-id}/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName
 * Provides operations to call the doesUserHaveAccess method.
 */
export class DoesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalNameClient {
  protected baseUrl =
    "/teams/{team-id}/channels/{channel-id}/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName";
  protected http: AxiosInstance;

  constructor(
    protected readonly channelId: string,
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
   * `GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)`
   *
   * Determine whether a user has access to a shared channel.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)",
      [
        { name: "team-id", in: "path" },
        { name: "channel-id", in: "path" },
        { name: "userId", in: "query" },
        { name: "tenantId", in: "query" },
        { name: "userPrincipalName", in: "query" },
      ],
      {
        ...(params || {}),
        "channel-id": this.channelId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)"]["response"],
      );
  }
}
