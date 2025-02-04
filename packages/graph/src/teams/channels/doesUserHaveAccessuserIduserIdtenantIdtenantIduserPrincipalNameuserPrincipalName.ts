import qs from "qs";
import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import type { Endpoints } from "./doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName-types.d.ts";

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
 * /teams/{team-id}/channels/{channel-id}/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName
 * Provides operations to call the doesUserHaveAccess method.
 */
export class DoesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalNameClient {
  protected baseUrl =
    "/teams/{team-id}/channels/{channel-id}/doesUserHaveAccessuserIduserIdtenantIdtenantIduserPrincipalNameuserPrincipalName";
  protected http: http.Client;

  constructor(
    protected readonly channelId: string,
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
   * `GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)`
   *
   * Determine whether a user has access to a shared channel.
   */
  async get(
    params?: Endpoints["GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)"]["parameters"],
    config?: http.RequestConfig,
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
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId&#x3D;&#x27;@userId&#x27;,tenantId&#x3D;&#x27;@tenantId&#x27;,userPrincipalName&#x3D;&#x27;@userPrincipalName&#x27;)"]["response"],
      );
  }
}
