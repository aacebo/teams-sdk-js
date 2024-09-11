import { HttpClient } from '@teams.sdk/common/http';

import { ClientOptions } from '../client-options';
import { MeetingInfo, MeetingParticipant } from '../models';

export class MeetingClient {
  private readonly _http: HttpClient;

  constructor(private readonly _options?: ClientOptions) {
    this._http = new HttpClient(this._options);
  }

  async getById(id: string) {
    const res = await this._http.get<MeetingInfo>(`/v1/meetings/${id}`);
    return res.json();
  }

  async getParticipant(meetingId: string, id: string) {
    const res = await this._http.get<MeetingParticipant>(
      `/v1/meetings/${meetingId}/participants/${id}`
    );
    return res.json();
  }
}
