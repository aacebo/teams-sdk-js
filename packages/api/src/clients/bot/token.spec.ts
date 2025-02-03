import { BotTokenClient } from './token';

describe('BotTokenClient', () => {
  let client: BotTokenClient;

  beforeEach(() => {
    client = new BotTokenClient();
  });

  describe('get', () => {
    it('should get multi-tenant', async () => {
      const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

      await client.get({
        clientId: 'test',
        clientSecret: '123',
      });

      expect(spy).toHaveBeenCalledWith(
        '/botframework.com/oauth2/v2.0/token',
        'grant_type=client_credentials&client_id=test&client_secret=123&scope=https%3A%2F%2Fapi.botframework.com%2F.default',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    });

    it('should get single-tenant', async () => {
      const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

      await client.get({
        clientId: 'test',
        clientSecret: '123',
        tenantId: 'test-tenant',
      });

      expect(spy).toHaveBeenCalledWith(
        '/test-tenant/oauth2/v2.0/token',
        'grant_type=client_credentials&client_id=test&client_secret=123&scope=https%3A%2F%2Fapi.botframework.com%2F.default',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    });
  });

  describe('getGraph', () => {
    it('should get multi-tenant', async () => {
      const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

      await client.getGraph({
        clientId: 'test',
        clientSecret: '123',
      });

      expect(spy).toHaveBeenCalledWith(
        '/botframework.com/oauth2/v2.0/token',
        'grant_type=client_credentials&client_id=test&client_secret=123&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    });

    it('should get single-tenant', async () => {
      const spy = jest.spyOn(client.http, 'post').mockResolvedValueOnce({});

      await client.getGraph({
        clientId: 'test',
        clientSecret: '123',
        tenantId: 'test-tenant',
      });

      expect(spy).toHaveBeenCalledWith(
        '/test-tenant/oauth2/v2.0/token',
        'grant_type=client_credentials&client_id=test&client_secret=123&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    });
  });
});
