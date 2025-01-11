import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

export class Client {
  private readonly _socket: Socket;

  constructor() {
    this._socket = io({
      autoConnect: false,
      path: '/devtools/sockets'
    });

    this._socket.on('connect', () => {
      console.log('connected...');
    });
  }

  connect() {
    this._socket.connect();
  }
}

export const ClientContext = createContext(new Client());
