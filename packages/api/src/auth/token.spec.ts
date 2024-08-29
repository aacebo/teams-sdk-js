import jwt from 'jsonwebtoken';

import { Token } from './token';
import { CallerIds } from './caller';

describe('Token', () => {
  it('should be from bot', () => {
    const token = new Token(
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
    const token = new Token(
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
    const token = new Token(jwt.sign({}, 'test'));

    expect(token).toBeDefined();
    expect(token.appId).toBeUndefined();
    expect(token.from).toEqual('azure');
    expect(token.fromId).toEqual(CallerIds.azure);
    expect(token.serviceUrl).toEqual('https://smba.trafficmanager.net/teams');
  });
});
