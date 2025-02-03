import { BotSignInClient } from './sign-in';

describe('BotSignInClient', () => {
  let client: BotSignInClient;

  beforeEach(() => {
    client = new BotSignInClient();
  });

  it('should get url', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});

    await client.getUrl({ state: 'test' });

    expect(spy).toHaveBeenCalledWith('/api/botsignin/GetSignInUrl?state=test');
  });

  it('should get resource', async () => {
    const spy = jest.spyOn(client.http, 'get').mockResolvedValueOnce({});
    await client.getResource({ state: 'test' });
    expect(spy).toHaveBeenCalledWith('/api/botsignin/GetSignInResource?state=test');
  });
});
