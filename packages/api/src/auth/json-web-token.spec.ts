import jwt from 'jsonwebtoken';

import { JsonWebToken } from './json-web-token';
import { CallerIds } from './caller';

describe('JsonWebToken', () => {
  it('should be from bot', () => {
    const token = new JsonWebToken(
      jwt.sign(
        {
          appid: 'test',
          serviceurl: 'https://smba.test.com/',
        },
        'test'
      )
    );

    expect(token).toBeDefined();
    expect(token.appId).toEqual('test');
    expect(token.from).toEqual('bot');
    expect(token.fromId).toEqual(`${CallerIds.bot}:test`);
    expect(token.serviceUrl).toEqual('https://smba.test.com');
  });

  it('should be from azure', () => {
    const token = new JsonWebToken(
      jwt.sign(
        {
          serviceurl: 'https://smba.test.com',
        },
        'test'
      )
    );

    expect(token).toBeDefined();
    expect(token.appId).toBeUndefined();
    expect(token.from).toEqual('azure');
    expect(token.fromId).toEqual(CallerIds.azure);
    expect(token.serviceUrl).toEqual('https://smba.test.com');
  });

  it('should have default serviceUrl', () => {
    const token = new JsonWebToken(jwt.sign({}, 'test'));

    expect(token).toBeDefined();
    expect(token.appId).toBeUndefined();
    expect(token.from).toEqual('azure');
    expect(token.fromId).toEqual(CallerIds.azure);
    expect(token.serviceUrl).toEqual('https://smba.trafficmanager.net/teams');
  });
});
