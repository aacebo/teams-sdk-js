import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

export class Client {
  private readonly _socket: Socket;

  constructor() {
    this._socket = io({
      autoConnect: false,
      path: '/devtools/sockets',
    });

    this._socket.on('connect', () => {
      console.log('connected...');
    });
  }

  connect() {
    this._socket.connect();
  }

  on(event: string, handler: (value: any) => void | Promise<void>) {
    this._socket.on(event, handler);
  }
}

export const ClientContext = createContext(new Client());
