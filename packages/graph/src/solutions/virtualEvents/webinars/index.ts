import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { PresentersClient } from "./presenters";
import { RegistrationConfigurationClient } from "./registrationConfiguration";
import { RegistrationsClient } from "./registrations";
import { RegistrationsemailemailClient } from "./registrationsemailemail";
import { RegistrationsuserIduserIdClient } from "./registrationsuserIduserId";
import { SessionsClient } from "./sessions";

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
 * /solutions/virtualEvents/webinars
 * Provides operations to call the getByUserRole method.
 */
export class WebinarsClient {
  protected baseUrl = "/solutions/virtualEvents/webinars";
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
   * `/solutions/virtualEvents/webinars/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/presenters`
   *
   * Provides operations to manage the presenters property of the microsoft.graph.virtualEvent entity.
   */
  presenters(virtualEventWebinarId: string) {
    return new PresentersClient(virtualEventWebinarId, this.http);
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationConfiguration`
   *
   * Provides operations to manage the registrationConfiguration property of the microsoft.graph.virtualEventWebinar entity.
   */
  registrationConfiguration(virtualEventWebinarId: string) {
    return new RegistrationConfigurationClient(
      virtualEventWebinarId,
      this.http,
    );
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrations`
   *
   * Provides operations to manage the registrations property of the microsoft.graph.virtualEventWebinar entity.
   */
  registrations(virtualEventWebinarId: string) {
    return new RegistrationsClient(virtualEventWebinarId, this.http);
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationsemailemail`
   *
   * Provides operations to manage the registrations property of the microsoft.graph.virtualEventWebinar entity.
   */
  registrationsemailemail(virtualEventWebinarId: string) {
    return new RegistrationsemailemailClient(virtualEventWebinarId, this.http);
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/registrationsuserIduserId`
   *
   * Provides operations to manage the registrations property of the microsoft.graph.virtualEventWebinar entity.
   */
  registrationsuserIduserId(virtualEventWebinarId: string) {
    return new RegistrationsuserIduserIdClient(
      virtualEventWebinarId,
      this.http,
    );
  }

  /**
   * `/solutions/virtualEvents/webinars/{virtualEventWebinar-id}/sessions`
   *
   * Provides operations to manage the sessions property of the microsoft.graph.virtualEvent entity.
   */
  sessions(virtualEventWebinarId: string) {
    return new SessionsClient(virtualEventWebinarId, this.http);
  }

  /**
   * `DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["body"],
    params?: Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "virtualEventWebinar-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars`
   *
   * Get the list of all virtualEventWebinar objects created in a tenant.
   */
  async list(
    params?: Endpoints["GET /solutions/virtualEvents/webinars"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars",
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
          res.data as Endpoints["GET /solutions/virtualEvents/webinars"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)`
   *
   * Get a virtualEventWebinar collection where the specified user is either the organizer or a coorganizer.
   */
  async get$1(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)",
      [
        { name: "$select", in: "query" },
        { name: "$orderby", in: "query" },
        { name: "$expand", in: "query" },
        { name: "userId", in: "path" },
        { name: "role", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/getByUserIdAndRole(userId&#x3D;&#x27;{userId}&#x27;,role&#x3D;&#x27;{role}&#x27;)"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/getByUserRole(role&#x3D;&#x27;{role}&#x27;)`
   *
   * Get a virtualEventWebinar collection where the signed-in user is either the organizer or a coorganizer.
   */
  async get$2(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/getByUserRole(role&#x3D;&#x27;{role}&#x27;)"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/getByUserRole(role&#x3D;&#x27;{role}&#x27;)",
      [
        { name: "$select", in: "query" },
        { name: "$orderby", in: "query" },
        { name: "$expand", in: "query" },
        { name: "role", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/getByUserRole(role&#x3D;&#x27;{role}&#x27;)"]["response"],
      );
  }

  /**
   * `GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}`
   *
   * Read the properties and relationships of a virtualEventWebinar object. All roles can get the details of a webinar event.
   */
  async get(
    params?: Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "virtualEventWebinar-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["response"],
      );
  }

  /**
   * `PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}`
   *
   * Update the properties of a virtualEventWebinar object. Only the Organizer and Co-organizer can make changes to a webinar event.
   */
  async update(
    body: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["body"],
    params?: Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/solutions/virtualEvents/webinars/{virtualEventWebinar-id}",
      [{ name: "virtualEventWebinar-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /solutions/virtualEvents/webinars/{virtualEventWebinar-id}"]["response"],
      );
  }

  /**
   * `POST /solutions/virtualEvents/webinars`
   *
   * Create a new virtualEventWebinar object in draft mode.
   */
  async create(
    body: Endpoints["POST /solutions/virtualEvents/webinars"]["body"],
    params?: Endpoints["POST /solutions/virtualEvents/webinars"]["parameters"],
  ) {
    const url = getInjectedUrl("/solutions/virtualEvents/webinars", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) =>
          res.data as Endpoints["POST /solutions/virtualEvents/webinars"]["response"],
      );
  }
}
