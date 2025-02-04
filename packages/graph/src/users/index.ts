import * as http from "@teams.sdk/common/http";

import pkg from "src/../package.json";
import { OnlineMeetingsClient } from "./onlineMeetings";
import { PresenceClient } from "./presence";
import { TeamworkClient } from "./teamwork";

/**
 * /users
 */
export class UsersClient {
  protected baseUrl = "/users";
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
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
   * `/users/{user-id}/onlineMeetings`
   *
   * Provides operations to manage the onlineMeetings property of the microsoft.graph.user entity.
   */
  onlineMeetings(userId: string) {
    return new OnlineMeetingsClient(userId, this.http);
  }

  /**
   * `/users/{user-id}/presence`
   *
   * Provides operations to manage the presence property of the microsoft.graph.user entity.
   */
  presence(userId: string) {
    return new PresenceClient(userId, this.http);
  }

  /**
   * `/users/{user-id}/teamwork`
   *
   * Provides operations to manage the teamwork property of the microsoft.graph.user entity.
   */
  teamwork(userId: string) {
    return new TeamworkClient(userId, this.http);
  }
}
