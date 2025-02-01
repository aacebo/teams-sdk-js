import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./checkMemberObjects-types.d.ts";

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
 * /appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects
 * Provides operations to call the checkMemberObjects method.
 */
export class CheckMemberObjectsClient {
  protected baseUrl =
    "/appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects";
  protected http: AxiosInstance;

  constructor(
    protected readonly appRoleAssignmentId: string,
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
   * `POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects`
   *
   */
  async create(
    body: Endpoints["POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects"]["body"],
    params?: Endpoints["POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects",
      [{ name: "appRoleAssignment-id", in: "path" }],
      {
        ...(params || {}),
        "appRoleAssignment-id": this.appRoleAssignmentId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /appRoleAssignments/{appRoleAssignment-id}/checkMemberObjects"]["response"],
      );
  }
}
