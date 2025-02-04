import { Client, ClientOptions } from '@teams.sdk/common/http';

import { MeetingInfo, MeetingParticipant } from '../models';

export class MeetingClient {
  protected serviceUrl: string;
  protected http: Client;

  constructor(serviceUrl: string, options?: Client | ClientOptions) {
    this.serviceUrl = serviceUrl;

    if (!options) {
      this.http = new Client();
    } else if ('request' in options) {
      this.http = options;
    } else {
      this.http = new Client(options);
    }
  }

  async getById(id: string) {
    const res = await this.http.get<MeetingInfo>(`${this.serviceUrl}/v1/meetings/${id}`);
    return res.data;
  }

  async getParticipant(meetingId: string, id: string) {
    const res = await this.http.get<MeetingParticipant>(
      `${this.serviceUrl}/v1/meetings/${meetingId}/participants/${id}`
    );
    return res.data;
  }
}
