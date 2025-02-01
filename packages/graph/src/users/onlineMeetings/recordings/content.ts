import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import type { Endpoints } from './content-types.d.ts';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  for (const param of params) {
    if (param.in !== 'path') continue;
    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return url;
}

/**
 * /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content
 * Provides operations to manage the media for the user entity.
 */
export class ContentClient {
  protected baseUrl =
    '/users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content';
  protected http: AxiosInstance;

  constructor(
    protected readonly callRecordingId: string,
    options?: GraphClientOptions
  ) {
    if (!options) {
      this.http = axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('get' in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content`
   *
   * The content of the recording. Read-only.
   */
  async delete(
    body: Endpoints['DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['body'],
    params?: Endpoints['DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content',
      [
        { name: 'If-Match', in: 'header' },
        { name: 'user-id', in: 'path' },
        { name: 'onlineMeeting-id', in: 'path' },
        { name: 'callRecording-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecording-id': this.callRecordingId,
      }
    );

    return this.http
      .delete(url, body)
      .then(
        (res) =>
          res.data as Endpoints['DELETE /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['response']
      );
  }

  /**
   * `GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content`
   *
   * The content of the recording. Read-only.
   */
  async get(
    params?: Endpoints['GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content',
      [
        { name: 'user-id', in: 'path' },
        { name: 'onlineMeeting-id', in: 'path' },
        { name: 'callRecording-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecording-id': this.callRecordingId,
      }
    );

    return this.http
      .get(url)
      .then(
        (res) =>
          res.data as Endpoints['GET /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['response']
      );
  }

  /**
   * `PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content`
   *
   * The content of the recording. Read-only.
   */
  async set(
    body: Endpoints['PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['body'],
    params?: Endpoints['PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['parameters']
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content',
      [
        { name: 'user-id', in: 'path' },
        { name: 'onlineMeeting-id', in: 'path' },
        { name: 'callRecording-id', in: 'path' },
      ],
      {
        ...(params || {}),
        'callRecording-id': this.callRecordingId,
      }
    );

    return this.http
      .put(url, body)
      .then(
        (res) =>
          res.data as Endpoints['PUT /users/{user-id}/onlineMeetings/{onlineMeeting-id}/recordings/{callRecording-id}/content']['response']
      );
  }
}
