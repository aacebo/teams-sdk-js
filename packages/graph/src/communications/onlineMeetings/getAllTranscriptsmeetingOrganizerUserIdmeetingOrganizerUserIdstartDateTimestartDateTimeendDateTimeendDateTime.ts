import qs from 'qs';
import * as http from '@teams.sdk/common/http';

import pkg from 'src/../package.json';
import type { Endpoints } from './getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime-types.d.ts';

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
 * /communications/onlineMeetings/getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime
 * Provides operations to call the getAllTranscripts method.
 */
export class GetAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTimeClient {
  protected baseUrl =
    '/communications/onlineMeetings/getAllTranscriptsmeetingOrganizerUserIdmeetingOrganizerUserIdstartDateTimestartDateTimeendDateTimeendDateTime';
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
      this.http = options.clone({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
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
   * `GET /communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)`
   *
   * Get all transcripts from scheduled onlineMeeting instances for which the specified user is the organizer. This API currently doesn&#x27;t support getting call transcripts from channel meetings. You can apply the delta function on getAllTranscripts to synchronize and get callTranscript resources as they&#x27;re added for onlineMeeting instances organized by the specified user. Delta query supports both full synchronization and incremental synchronization. Full synchronization gets all the transcripts for online meetings organized by the user. Incremental synchronization gets transcripts that are added since the last synchronization. Typically, you perform an initial full synchronization, and then get incremental changes to that recording view periodically. For more information, see delta query. For more examples, see callTranscript: delta. To learn more about using the Microsoft Teams export APIs to export content, see Export content with the Microsoft Teams export APIs.
   */
  async get(
    params?: Endpoints['GET /communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)']['parameters'],
    config?: http.RequestConfig
  ) {
    const url = getInjectedUrl(
      '/communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)',
      [
        { name: '$select', in: 'query' },
        { name: '$orderby', in: 'query' },
        { name: '$expand', in: 'query' },
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
          res.data as Endpoints['GET /communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId&#x3D;&#x27;@meetingOrganizerUserId&#x27;,startDateTime&#x3D;@startDateTime,endDateTime&#x3D;@endDateTime)']['response']
      );
  }
}
