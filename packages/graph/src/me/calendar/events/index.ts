import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { AcceptClient } from "./accept";
import { AttachmentsClient } from "./attachments";
import { CalendarClient } from "./calendar";
import { CancelClient } from "./cancel";
import { CountClient } from "./count";
import { DeclineClient } from "./decline";
import { DeltaClient } from "./delta";
import { DismissReminderClient } from "./dismissReminder";
import { ExtensionsClient } from "./extensions";
import { ForwardClient } from "./forward";
import { InstancesClient } from "./instances";
import { SnoozeReminderClient } from "./snoozeReminder";
import { TentativelyAcceptClient } from "./tentativelyAccept";

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
 * /me/calendar/events
 * Provides operations to manage the events property of the microsoft.graph.calendar entity.
 */
export class EventsClient {
  protected baseUrl = "/me/calendar/events";
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
   * `/me/calendar/events/{event-id}/accept`
   *
   * Provides operations to call the accept method.
   */
  accept(eventId: string) {
    return new AcceptClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/attachments`
   *
   * Provides operations to manage the attachments property of the microsoft.graph.event entity.
   */
  attachments(eventId: string) {
    return new AttachmentsClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/calendar`
   *
   * Provides operations to manage the calendar property of the microsoft.graph.event entity.
   */
  calendar(eventId: string) {
    return new CalendarClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/cancel`
   *
   * Provides operations to call the cancel method.
   */
  cancel(eventId: string) {
    return new CancelClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/decline`
   *
   * Provides operations to call the decline method.
   */
  decline(eventId: string) {
    return new DeclineClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/delta`
   *
   * Provides operations to call the delta method.
   */
  get delta() {
    return new DeltaClient(this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/dismissReminder`
   *
   * Provides operations to call the dismissReminder method.
   */
  dismissReminder(eventId: string) {
    return new DismissReminderClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/extensions`
   *
   * Provides operations to manage the extensions property of the microsoft.graph.event entity.
   */
  extensions(eventId: string) {
    return new ExtensionsClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/forward`
   *
   * Provides operations to call the forward method.
   */
  forward(eventId: string) {
    return new ForwardClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/instances`
   *
   * Provides operations to manage the instances property of the microsoft.graph.event entity.
   */
  instances(eventId: string) {
    return new InstancesClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/snoozeReminder`
   *
   * Provides operations to call the snoozeReminder method.
   */
  snoozeReminder(eventId: string) {
    return new SnoozeReminderClient(eventId, this.http);
  }

  /**
   * `/me/calendar/events/{event-id}/tentativelyAccept`
   *
   * Provides operations to call the tentativelyAccept method.
   */
  tentativelyAccept(eventId: string) {
    return new TentativelyAcceptClient(eventId, this.http);
  }

  /**
   * `DELETE /me/calendar/events/{event-id}`
   *
   */
  async delete(
    body: Endpoints["DELETE /me/calendar/events/{event-id}"]["body"],
    params?: Endpoints["DELETE /me/calendar/events/{event-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "event-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /me/calendar/events/{event-id}"]["response"],
      );
  }

  /**
   * `GET /me/calendar/events`
   *
   * Retrieve a list of events in a calendar. The calendar can be one for a user, or the default calendar of a Microsoft 365 group. The list of events contains single instance meetings and series masters. To get expanded event instances, you can get the calendar view, or
get the instances of an event.
   */
  async list(params?: Endpoints["GET /me/calendar/events"]["parameters"]) {
    const url = getInjectedUrl(
      "/me/calendar/events",
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
        (res) => res.data as Endpoints["GET /me/calendar/events"]["response"],
      );
  }

  /**
   * `GET /me/calendar/events/{event-id}`
   *
   * The events in the calendar. Navigation property. Read-only.
   */
  async get(
    params?: Endpoints["GET /me/calendar/events/{event-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "event-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints["GET /me/calendar/events/{event-id}"]["response"],
      );
  }

  /**
   * `PATCH /me/calendar/events/{event-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /me/calendar/events/{event-id}"]["body"],
    params?: Endpoints["PATCH /me/calendar/events/{event-id}"]["parameters"],
  ) {
    const url = getInjectedUrl(
      "/me/calendar/events/{event-id}",
      [{ name: "event-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /me/calendar/events/{event-id}"]["response"],
      );
  }

  /**
   * `POST /me/calendar/events`
   *
   */
  async create(
    body: Endpoints["POST /me/calendar/events"]["body"],
    params?: Endpoints["POST /me/calendar/events"]["parameters"],
  ) {
    const url = getInjectedUrl("/me/calendar/events", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body)
      .then(
        (res) => res.data as Endpoints["POST /me/calendar/events"]["response"],
      );
  }
}
