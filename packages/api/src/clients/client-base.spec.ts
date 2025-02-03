import { ClientBase, ClientOptions } from './client-base';

class Client extends ClientBase {
  get interceptorCount() {
    return Object.keys(this.interceptors).length;
  }

  constructor(options?: ClientOptions) {
    super({
      ...options,
      children: [new SubClient(options)],
    });
  }
}

class SubClient extends ClientBase {}

describe('ClientBase', () => {
  it('should initialize with interceptors', () => {
    const client = new Client({
      interceptors: {
        request: [
          {
            onSuccess: (config) => config,
          },
        ],
        response: [
          {
            onSuccess: (res) => res,
          },
        ],
      },
    });

    expect(client.interceptorCount).toEqual(2);
  });

  it('should eject interceptor', () => {
    const client = new Client();
    client.use('request', {
      onSuccess: (config) => config,
    });

    const id = client.use('request', {
      onSuccess: (config) => config,
    });

    expect(client.interceptorCount).toEqual(2);
    client.eject('request', id);
    expect(client.interceptorCount).toEqual(1);
  });

  it('should clear all interceptors', () => {
    const client = new Client();
    client.use('request', {
      onSuccess: (config) => config,
    });

    client.use('request', {
      onSuccess: (config) => config,
    });

    expect(client.interceptorCount).toEqual(2);
    client.clear('request');
    expect(client.interceptorCount).toEqual(0);
  });
});
