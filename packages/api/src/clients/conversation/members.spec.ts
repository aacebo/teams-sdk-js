import { ConversationMemberClient } from './member';

describe('ConversationMemberClient', () => {
  let client: ConversationMemberClient;

  beforeEach(() => {
    client = new ConversationMemberClient('1');
  });

  it('should get', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.get();
    expect(spy).toHaveBeenCalledWith('/members');
  });

  it('should get by id', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getById('2');
    expect(spy).toHaveBeenCalledWith('/members/2');
  });

  it('should delete', async () => {
    const spy = jest.spyOn(client.http, 'delete').mockResolvedValueOnce({});
    await client.delete('2');
    expect(spy).toHaveBeenCalledWith('/members/2');
  });
});
