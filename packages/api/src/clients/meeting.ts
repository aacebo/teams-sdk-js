import axios from 'axios';

import { MeetingInfo, MeetingParticipant } from '../models';

export class MeetingClient {
  private readonly _http: axios.AxiosInstance;

  constructor(options?: axios.CreateAxiosDefaults) {
    this._http = axios.create(options);
  }

  async getById(id: string) {
    const res = await this._http.get<MeetingInfo>(`/v1/meetings/${id}`);
    return res.data;
  }

  async getParticipant(meetingId: string, id: string) {
    const res = await this._http.get<MeetingParticipant>(
      `/v1/meetings/${meetingId}/participants/${id}`
    );
    return res.data;
  }
}
