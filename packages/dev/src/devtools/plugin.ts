import http from 'node:http';
import path from 'node:path';

import express from 'express';
import io from 'socket.io';
import * as uuid from 'uuid';
import { AxiosError } from 'axios';

import { ActivityContext, App, HttpSender, Plugin, PluginEvents } from '@teams.sdk/apps';
import { EventEmitter } from '@teams.sdk/common/events';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { router } from './routes';

export interface DevtoolsOptions {
  readonly port?: number;
}

export interface DevtoolsSocketEvent<T = any> {
  readonly id: string;
  readonly type: string;
  readonly body?: T;
  readonly error?: any;
  readonly sentAt: Date;
}

export class DevtoolsPlugin extends EventEmitter<PluginEvents> implements Plugin {
  readonly name = 'devtools';
  readonly version = '0.0.0';

  protected log: Logger;
  protected http: http.Server;
  protected express: express.Application;
  protected io: io.Server;
  protected sockets = new Map<string, io.Socket>();

  constructor(readonly options: DevtoolsOptions = {}) {
    super();
    this.log = new ConsoleLogger('@teams.sdk/app/devtools');
    this.express = express();
    this.http = http.createServer(this.express);
    this.io = new io.Server(this.http, { path: '/devtools/sockets' });
    this.io.on('connection', this.onConnection.bind(this));

    try {
      const dist = path.join(__dirname, '..', '..', 'devtools', 'dist');
      this.express.use('/devtools', express.static(dist));
      this.express.get('/devtools/*', (_, res) => {
        res.sendFile(path.join(dist, 'index.html'));
      });
    } catch (err) {
      this.log.warn(
        'failed to load devtools, please ensure you have installed `@teams.sdk/devtools`'
      );
      this.log.warn(err);
      this.emit('error', err);
    }
  }

  register(app: App) {
    this.log = app.log.child('devtools');
    this.express.use(
      router({
        port: this.options.port || 3001,
        log: this.log,
        process: app.process.bind(app),
        emit: this.emitToSockets.bind(this),
      })
    );

    app.on('activity', ({ activity, next }) => {
      this.emitToSockets('activity', {
        id: uuid.v4(),
        type: 'received',
        body: activity,
        sentAt: new Date(),
      });

      next();
    });
  }

  sender(ctx: ActivityContext) {
    ctx.api.use('request', {
      onSuccess: (config) => {
        const id = uuid.v4();
        const sentAt = new Date();

        config.headers.set('x-devtools-request-id', id);
        config.headers.set('x-devtools-sent-at', sentAt.toISOString());

        this.emitToSockets('activity', {
          id,
          type: 'sending',
          body: config.data,
          sentAt,
        });

        return config;
      },
    });

    ctx.api.use('response', {
      onSuccess: (res) => {
        const id = res.config.headers.get('x-devtools-request-id')?.toString();
        const sentAt = res.config.headers.get('x-devtools-sent-at')?.toString();

        if (id && sentAt) {
          this.emitToSockets('activity', {
            id,
            type: 'sent',
            body: {
              ...JSON.parse(res.config.data),
              ...res.data
            },
            sentAt: new Date(sentAt),
          });
        }

        return res;
      },
      onError: (err) => {
        if (!(err instanceof AxiosError)) return;

        const id = err.config?.headers.get('x-devtools-request-id')?.toString();
        const sentAt = err.config?.headers.get('x-devtools-sent-at')?.toString();

        if (id && sentAt) {
          this.emitToSockets('activity', {
            id,
            type: 'sent',
            body: null,
            error: err.response?.data,
            sentAt: new Date(sentAt),
          });
        }

        return Promise.reject(err);
      }
    });

    return new HttpSender(ctx);
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async start() {
    const port = this.options.port || 3001;

    return await new Promise<void>((resolve, reject) => {
      this.http.on('error', (err) => {
        this.emit('error', err);
        reject(err);
      });

      this.http.listen(port, async () => {
        this.log.info(`available at http://localhost:${port}/devtools`);
        resolve();
      });
    });
  }

  protected onConnection(socket: io.Socket) {
    this.sockets.set(socket.id, socket);

    socket.on('disconnect', () => {
      this.sockets.delete(socket.id);
    });
  }

  protected emitToSockets(name: string, event: DevtoolsSocketEvent) {
    for (const socket of this.sockets.values()) {
      socket.emit(name, event);
    }
  }
}
