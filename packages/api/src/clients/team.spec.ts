import { TeamClient } from './team';

describe('TeamClient', () => {
  let client: TeamClient;

  beforeEach(() => {
    client = new TeamClient();
  });

  it('should get by id', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getById('1');
    expect(spy).toHaveBeenCalledWith('/v3/teams/1');
  });

  it('should get conversations', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getConversations('1');
    expect(spy).toHaveBeenCalledWith('/v3/teams/1/conversations');
  });
});
