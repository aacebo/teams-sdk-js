import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { UndoDeleteClient } from "./undoDelete";

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
 * /teamwork/deletedChats
 * Provides operations to manage the deletedChats property of the microsoft.graph.teamwork entity.
 */
export class DeletedChatsClient {
  protected baseUrl = "/teamwork/deletedChats";
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
   * `/teamwork/deletedChats/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/teamwork/deletedChats/{deletedChat-id}/undoDelete`
   *
   * Provides operations to call the undoDelete method.
   */
  undoDelete(deletedChatId: string) {
    return new UndoDeleteClient(deletedChatId, this.http);
  }

  /**
   * `DELETE /teamwork/deletedChats/{deletedChat-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /teamwork/deletedChats/{deletedChat-id}"]["body"],
    params?: Endpoints["DELETE /teamwork/deletedChats/{deletedChat-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedChats/{deletedChat-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "deletedChat-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /teamwork/deletedChats/{deletedChat-id}"]["response"],
      );
  }

  /**
   * `GET /teamwork/deletedChats`
   *
   * Read the properties and relationships of a deletedChat object.
   */
  async list(params?: Endpoints["GET /teamwork/deletedChats"]["parameters"]) {
    const url = getInjectedUrl(
      "/teamwork/deletedChats",
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
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teamwork/deletedChats"]["response"],
      );
  }

  /**
   * `GET /teamwork/deletedChats/{deletedChat-id}`
   *
   * Read the properties and relationships of a deletedChat object.
   */
  async get(
    params?: Endpoints["GET /teamwork/deletedChats/{deletedChat-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedChats/{deletedChat-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "deletedChat-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /teamwork/deletedChats/{deletedChat-id}"]["response"],
      );
  }

  /**
   * `PATCH /teamwork/deletedChats/{deletedChat-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /teamwork/deletedChats/{deletedChat-id}"]["body"],
    params?: Endpoints["PATCH /teamwork/deletedChats/{deletedChat-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedChats/{deletedChat-id}",
      [{ name: "deletedChat-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /teamwork/deletedChats/{deletedChat-id}"]["response"],
      );
  }

  /**
   * `POST /teamwork/deletedChats`
   *
   */
  async create(
    body: Endpoints["POST /teamwork/deletedChats"]["body"],
    params?: Endpoints["POST /teamwork/deletedChats"]["parameters"],
  ) {
    const url = getInjectedUrl("/teamwork/deletedChats", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teamwork/deletedChats"]["response"],
      );
  }
}
