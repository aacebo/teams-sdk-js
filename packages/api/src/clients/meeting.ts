import { MeetingInfo, MeetingParticipant } from '../models';
import { ClientBase, ClientOptions } from './client-base';

export class MeetingClient extends ClientBase {
  constructor(options?: ClientOptions) {
    super({
      ...options,
      children: [],
    });
  }

  async getById(id: string) {
    const res = await this.http.get<MeetingInfo>(`/v1/meetings/${id}`);
    return res.data;
  }

  async getParticipant(meetingId: string, id: string) {
    const res = await this.http.get<MeetingParticipant>(
      `/v1/meetings/${meetingId}/participants/${id}`
    );
    return res.data;
  }
}
