import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./unarchive-types.d.ts";

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
 * /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive
 * Provides operations to call the unarchive method.
 */
export class UnarchiveClient {
  protected baseUrl =
    "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive";
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
   * `POST /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive`
   *
   * Restore an archived channel. Unarchiving restores the ability for users to send messages and edit the channel. Channels are archived via the channel: archive method. Unarchiving is an asynchronous operation; a channel is unarchived when the asynchronous unarchiving operation completes successfully, which might occur after this method responds.
   */
  async create(
    body: Endpoints["POST /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive"]["body"],
    params?: Endpoints["POST /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive",
      [
        { name: "deletedTeam-id", in: "path" },
        { name: "channel-id", in: "path" },
      ],
      {
        ...(params || {}),
        "channel-id": this.channelId,
      },
    );

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /teamwork/deletedTeams/{deletedTeam-id}/channels/{channel-id}/unarchive"]["response"],
      );
  }
}
