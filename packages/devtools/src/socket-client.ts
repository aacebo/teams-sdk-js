import { Activity } from '@teams.sdk/api';
import io, { Socket } from 'socket.io-client';

export interface SocketEvent<T = any> {
  readonly id: string;
  readonly body: T;
  readonly sentAt: Date;
}

export interface ActivitySocketEvent extends SocketEvent<Activity> {
  readonly type: 'received' | 'sending' | 'sent';
}

interface SocketEventTypes {
  readonly activity: ActivitySocketEvent;
}

export class SocketClient {
  private readonly _socket: Socket;

  constructor() {
    this._socket = io({
      autoConnect: false,
      path: '/devtools/sockets',
    });
  }

  connect(callback?: (...args: any[]) => void | Promise<void>) {
    if (callback) {
      this._socket.on('connect', callback);
    }

    this._socket.connect();
  }

  disconnect(callback: (...args: any[]) => void | Promise<void>) {
    this._socket.on('disconnect', callback);
  }

  on<Event extends keyof SocketEventTypes>(
    event: Event,
    handler: (value: SocketEventTypes[Event]) => void | Promise<void>
  ) {
    this._socket.on(event as string, handler);
  }

  off<Event extends keyof SocketEventTypes>(event: Event) {
    this._socket.off(event);
  }
}
