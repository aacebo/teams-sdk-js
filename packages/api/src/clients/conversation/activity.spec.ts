import { ConversationActivityClient } from './activity';

describe('ConversationActivityClient', () => {
  let client: ConversationActivityClient;

  beforeEach(() => {
    client = new ConversationActivityClient();
  });

  it('should create', async () => {
    const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

    await client.create('1', {
      type: 'message',
      text: 'hi',
    });

    expect(spy).toHaveBeenCalledWith('/v3/conversations/1/activities', {
      type: 'message',
      text: 'hi',
    });
  });

  it('should update', async () => {
    const spy = jest.spyOn(client.http, 'put').mockResolvedValueOnce({});

    await client.update('1', '2', {
      type: 'message',
      text: 'hi',
    });

    expect(spy).toHaveBeenCalledWith('/v3/conversations/1/activities/2', {
      type: 'message',
      text: 'hi',
    });
  });

  it('should reply', async () => {
    const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

    await client.reply('1', '2', {
      type: 'message',
      text: 'hi',
    });

    expect(spy).toHaveBeenCalledWith('/v3/conversations/1/activities/2', {
      type: 'message',
      text: 'hi',
      replyToId: '2',
    });
  });

  it('should delete', async () => {
    const spy = jest.spyOn(client.http, 'delete').mockResolvedValueOnce({});
    await client.delete('1', '2');
    expect(spy).toHaveBeenCalledWith('/v3/conversations/1/activities/2');
  });

  describe('members', () => {
    it('should get', async () => {
      const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
      await client.members('1', '2').get();
      expect(spy).toHaveBeenCalledWith('/v3/conversations/1/activities/2/members');
    });
  });
});
