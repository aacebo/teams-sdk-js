import { MeetingClient } from './meeting';

describe('MeetingClient', () => {
  let client: MeetingClient;

  beforeEach(() => {
    client = new MeetingClient();
  });

  it('should get by id', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getById('1');
    expect(spy).toHaveBeenCalledWith('/v1/meetings/1');
  });

  it('should get participant', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getParticipant('1', '2');
    expect(spy).toHaveBeenCalledWith('/v1/meetings/1/participants/2');
  });
});
