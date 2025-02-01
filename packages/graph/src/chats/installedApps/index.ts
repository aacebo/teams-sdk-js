import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { TeamsAppClient } from "./teamsApp";
import { TeamsAppDefinitionClient } from "./teamsAppDefinition";
import { UpgradeClient } from "./upgrade";

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
 * /chats/{chat-id}/installedApps
 * Provides operations to manage the installedApps property of the microsoft.graph.chat entity.
 */
export class InstalledAppsClient {
  protected baseUrl = "/chats/{chat-id}/installedApps";
  protected http: AxiosInstance;

  constructor(
    protected readonly chatId: string,
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
   * `/chats/{chat-id}/installedApps/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsApp`
   *
   * Provides operations to manage the teamsApp property of the microsoft.graph.teamsAppInstallation entity.
   */
  teamsApp(teamsAppInstallationId: string) {
    return new TeamsAppClient(teamsAppInstallationId, this.http);
  }

  /**
   * `/chats/{chat-id}/installedApps/{teamsAppInstallation-id}/teamsAppDefinition`
   *
   * Provides operations to manage the teamsAppDefinition property of the microsoft.graph.teamsAppInstallation entity.
   */
  teamsAppDefinition(teamsAppInstallationId: string) {
    return new TeamsAppDefinitionClient(teamsAppInstallationId, this.http);
  }

  /**
   * `/chats/{chat-id}/installedApps/{teamsAppInstallation-id}/upgrade`
   *
   * Provides operations to call the upgrade method.
   */
  upgrade(teamsAppInstallationId: string) {
    return new UpgradeClient(teamsAppInstallationId, this.http);
  }

  /**
   * `DELETE /chats/{chat-id}/installedApps/{teamsAppInstallation-id}`
   *
   * Uninstall an app installed within a chat.
   */
  async delete(
    body: Endpoints["DELETE /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["body"],
    params?: Endpoints["DELETE /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps/{teamsAppInstallation-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "chat-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/installedApps`
   *
   * List all app installations within a chat.
   */
  async list(
    params?: Endpoints["GET /chats/{chat-id}/installedApps"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps",
      [
        { name: "$orderby", in: "query" },
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/installedApps"]["response"],
      );
  }

  /**
   * `GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}`
   *
   * Get an app installed in a chat.
   */
  async get(
    params?: Endpoints["GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps/{teamsAppInstallation-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "chat-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["response"],
      );
  }

  /**
   * `PATCH /chats/{chat-id}/installedApps/{teamsAppInstallation-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["body"],
    params?: Endpoints["PATCH /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps/{teamsAppInstallation-id}",
      [
        { name: "chat-id", in: "path" },
        { name: "teamsAppInstallation-id", in: "path" },
      ],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /chats/{chat-id}/installedApps/{teamsAppInstallation-id}"]["response"],
      );
  }

  /**
   * `POST /chats/{chat-id}/installedApps`
   *
   * Install a teamsApp to the specified chat.
   */
  async create(
    body: Endpoints["POST /chats/{chat-id}/installedApps"]["body"],
    params?: Endpoints["POST /chats/{chat-id}/installedApps"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/chats/{chat-id}/installedApps",
      [{ name: "chat-id", in: "path" }],
      {
        ...(params || {}),
        "chat-id": this.chatId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /chats/{chat-id}/installedApps"]["response"],
      );
  }
}
