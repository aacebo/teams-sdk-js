import { UserTokenClient } from './token';

describe('UserTokenClient', () => {
  let client: UserTokenClient;

  beforeEach(() => {
    client = new UserTokenClient();
  });

  it('should get token', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});

    await client.get({
      connectionName: 'graph',
      userId: '1',
      channelId: 'msteams',
      code: '123',
    });

    expect(spy).toHaveBeenCalledWith(
      '/GetToken?connectionName=graph&userId=1&channelId=msteams&code=123'
    );
  });

  it('should get AAD token', async () => {
    const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

    await client.getAad({
      connectionName: 'graph',
      userId: '1',
      channelId: 'msteams',
      resourceUrls: [],
    });

    expect(spy).toHaveBeenCalledWith(
      '/GetAadTokens?connectionName=graph&userId=1&channelId=msteams',
      {
        connectionName: 'graph',
        userId: '1',
        channelId: 'msteams',
        resourceUrls: [],
      }
    );
  });

  it('should get token status', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});

    await client.getStatus({
      userId: '1',
      channelId: 'msteams',
      includeFilter: '',
    });

    expect(spy).toHaveBeenCalledWith('/GetTokenStatus?userId=1&channelId=msteams&includeFilter=');
  });

  it('should delete token', async () => {
    const spy = jest.spyOn(client.http, 'delete').mockResolvedValueOnce({});

    await client.signOut({
      channelId: 'msteams',
      connectionName: 'graph',
      userId: '1',
    });

    expect(spy).toHaveBeenCalledWith('/SignOut', {
      data: {
        channelId: 'msteams',
        connectionName: 'graph',
        userId: '1',
      },
    });
  });

  it('should exchange token', async () => {
    const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

    await client.exchange({
      channelId: 'msteams',
      connectionName: 'graph',
      userId: '1',
      exchangeRequest: {
        uri: 'http://localhost',
        token: 'test',
      },
    });

    expect(spy).toHaveBeenCalledWith('/exchange?userId=1&connectionName=graph&channelId=msteams', {
      exchangeRequest: {
        uri: 'http://localhost',
        token: 'test',
      },
    });
  });
});
