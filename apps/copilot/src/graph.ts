import { Client, AuthProviderCallback } from '@microsoft/microsoft-graph-client';

export function graph(token: string) {
  return Client.init({
    authProvider: (callback: AuthProviderCallback) => {
      callback(null, token);
    },
  });
}
