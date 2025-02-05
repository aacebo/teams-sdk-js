import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime-types.d.ts';

interface Param {
  readonly in: string;
  readonly name: string;
}

function getInjectedUrl(url: string, params: Array<Param>, data: Record<string, any>) {
  const query: Record<string, any> = {};

  for (const param of params) {
    if (param.in === 'query') {
      query[param.name] = data[param.name];
    }

    if (param.in !== 'path') {
      continue;
    }

    url = url.replace(`{${param.name}}`, data[param.name]);
  }

  return `${url}${qs.stringify(query, { addQueryPrefix: true })}`;
}

/**
 * /users/{user-id}/onlineMeetings/getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime
 * Provides operations to call the getAllRecordings method.
 */
export class GetAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient {
  protected baseUrl =
    '/users/{user-id}/onlineMeetings/getAllRecordingsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime';
  protected http: http.Client;

  constructor(options?: http.Client | http.ClientOptions) {
    if (!options) {
      this.http = new http.Client({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new http.Client({
        ...options,
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `GET /users/{user-id}/onlineMeetings/getAllRecordings(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)`
   *
   * Get all recordings from scheduled onlineMeeting instances for which the specified user is the organizer. This API currently doesn&#x27;t support getting call recordings from channel meetings. You can apply the delta function on getAllRecordings to synchronize and get callRecording resources as they&#x27;re added for onlineMeeting instances organized by the specified user. The delta query supports both full synchronization and incremental synchronization. Full synchronization gets all the recordings for online meetings organized by the user. Incremental synchronization gets recordings that are added since the last synchronization. Typically, you perform an initial full synchronization, and then get incremental changes to that recording view periodically. Find more information in the delta query documentation. For more examples, see callRecording: delta. To learn more about using the Microsoft Teams export APIs to export content, see Export content with the Microsoft Teams export APIs.
   */
  async get(
    params?: Endpoints['GET /users/{user-id}/onlineMeetings/getAllRecordings(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/users/{user-id}/onlineMeetings/getAllRecordings(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
        { name: 'user-id', in: 'path' },
        { name: 'meetingOrganizerUserId', in: 'query' },
        { name: 'startDateTime', in: 'query' },
        { name: 'endDateTime', in: 'query' },
      ],
      {
        ...(params || {}),
      }
    );

    return this.http
      .get(url, config)
      .then(
        (res) =>
          res.data as Endpoints['GET /users/{user-id}/onlineMeetings/getAllRecordings(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)']['response']
      );
  }
}
