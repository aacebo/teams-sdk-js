import qs from "qs";
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

import pkg from "src/../package.json";
import type { Endpoints } from "./index-types.d.ts";
import { CountClient } from "./count";
import { Organizerv2Client } from "./organizerv2";
import { Participantsv2Client } from "./participantsv2";
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
 * /communications/callRecords
 * Provides operations to call the getPstnCalls method.
 */
export class CallRecordsClient {
  protected baseUrl = "/communications/callRecords";
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
   * `/communications/callRecords/count`
   *
   * Provides operations to count the resources in the collection.
   */
  get count() {
    return new CountClient(this.http);
  }

  /**
   * `/communications/callRecords/{callRecord-id}/organizerv2`
   *
   * Provides operations to manage the organizer_v2 property of the microsoft.graph.callRecords.callRecord entity.
   */
  organizerv2(callRecordId: string) {
    return new Organizerv2Client(callRecordId, this.http);
  }

  /**
   * `/communications/callRecords/{callRecord-id}/participantsv2`
   *
   * Provides operations to manage the participants_v2 property of the microsoft.graph.callRecords.callRecord entity.
   */
  participantsv2(callRecordId: string) {
    return new Participantsv2Client(callRecordId, this.http);
  }

  /**
   * `/communications/callRecords/{callRecord-id}/sessions`
   *
   * Provides operations to manage the sessions property of the microsoft.graph.callRecords.callRecord entity.
   */
  sessions(callRecordId: string) {
    return new SessionsClient(callRecordId, this.http);
  }

  /**
   * `DELETE /communications/callRecords/{callRecord-id}`
   *
   */
  async delete(
    params?: Endpoints["DELETE /communications/callRecords/{callRecord-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}",
      [
        { name: "If-Match", in: "header" },
        { name: "callRecord-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .delete(url, config)
      .then(
        (res) =>
          res.data as Endpoints["DELETE /communications/callRecords/{callRecord-id}"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords`
   *
   * Get the list of callRecord objects and their properties. The results can be optionally filtered using the $filter query parameter on the startDateTime and participant id properties. Note that the listed call records don&#x27;t include expandable relationships such as sessions and participants_v2. You can expand these relationships using Get callRecord for a specific record.
   */
  async list(
    params?: Endpoints["GET /communications/callRecords"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords",
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
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords/microsoft.graph.callRecords.getDirectRoutingCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})`
   *
   * Get a log of direct routing calls as a collection of directRoutingLogRow entries.
   */
  async get$1(
    params?: Endpoints["GET /communications/callRecords/microsoft.graph.callRecords.getDirectRoutingCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/microsoft.graph.callRecords.getDirectRoutingCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})",
      [
        { name: "fromDateTime", in: "path" },
        { name: "toDateTime", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords/microsoft.graph.callRecords.getDirectRoutingCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords/microsoft.graph.callRecords.getPstnCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})`
   *
   * Get a log of PSTN calls as a collection of pstnCallLogRow entries.
   */
  async get$2(
    params?: Endpoints["GET /communications/callRecords/microsoft.graph.callRecords.getPstnCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/microsoft.graph.callRecords.getPstnCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})",
      [
        { name: "fromDateTime", in: "path" },
        { name: "toDateTime", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords/microsoft.graph.callRecords.getPstnCalls(fromDateTime&#x3D;{fromDateTime},toDateTime&#x3D;{toDateTime})"]["response"],
      );
  }

  /**
   * `GET /communications/callRecords/{callRecord-id}`
   *
   * Retrieve the properties and relationships of a callRecord object. You can get the id of a callRecord in two ways:
   * Subscribe to change notifications to the /communications/callRecords endpoint.
   * Use the callChainId property of a call. The call record is available only after the associated call is completed.
   */
  async get(
    params?: Endpoints["GET /communications/callRecords/{callRecord-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}",
      [
        { name: "$select", in: "query" },
        { name: "$expand", in: "query" },
        { name: "callRecord-id", in: "path" },
      ],
      {
        ...(params || {}),
      },
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints["GET /communications/callRecords/{callRecord-id}"]["response"],
      );
  }

  /**
   * `PATCH /communications/callRecords/{callRecord-id}`
   *
   */
  async update(
    body: Endpoints["PATCH /communications/callRecords/{callRecord-id}"]["body"],
    params?: Endpoints["PATCH /communications/callRecords/{callRecord-id}"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl(
      "/communications/callRecords/{callRecord-id}",
      [{ name: "callRecord-id", in: "path" }],
      {
        ...(params || {}),
      },
    );

    return this.http
      .patch(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["PATCH /communications/callRecords/{callRecord-id}"]["response"],
      );
  }

  /**
   * `POST /communications/callRecords`
   *
   */
  async create(
    body: Endpoints["POST /communications/callRecords"]["body"],
    params?: Endpoints["POST /communications/callRecords"]["parameters"],
    config?: AxiosRequestConfig,
  ) {
    const url = getInjectedUrl("/communications/callRecords", [], {
      ...(params || {}),
    });

    return this.http
      .post(url, body, config)
      .then(
        (res) =>
          res.data as Endpoints["POST /communications/callRecords"]["response"],
      );
  }
}
