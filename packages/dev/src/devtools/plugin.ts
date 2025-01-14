import http from 'node:http';
import path from 'node:path';

import express from 'express';
import io from 'socket.io';
import * as uuid from 'uuid';

import { ActivityContext, App, HttpSender, Plugin, PluginEvents } from '@teams.sdk/apps';
import { EventEmitter } from '@teams.sdk/common/events';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { Activity } from '@teams.sdk/api';

import { router } from './routes';

export interface DevtoolsOptions {
  readonly port?: number;
}

export interface DevtoolsSocketEvent<T = any> {
  readonly id: string;
  readonly type: string;
  readonly body?: T;
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
    const sender = new HttpSender(ctx);

    return {
      send: async (activity: Partial<Activity>) => {
        const id = uuid.v4();
        this.emitToSockets('activity', {
          id,
          type: 'sending',
          body: {
            ...activity,
            conversation: ctx.activity.conversation,
          },
          sentAt: new Date(),
        });

        const res = await sender.send(activity);

        this.emitToSockets('activity', {
          id,
          type: 'sent',
          body: {
            ...activity,
            id: res.id,
            conversation: ctx.activity.conversation,
          },
          sentAt: new Date(),
        });

        return res;
      },
      reply: async (activity: Partial<Activity>) => {
        const id = uuid.v4();
        this.emitToSockets('activity', {
          id,
          type: 'sending',
          body: {
            ...activity,
            conversation: ctx.activity.conversation,
          },
          sentAt: new Date(),
        });

        const res = await sender.reply(activity);

        this.emitToSockets('activity', {
          id,
          type: 'sent',
          body: {
            ...activity,
            id: res.id,
            conversation: ctx.activity.conversation,
          },
          sentAt: new Date(),
        });

        return res;
      },
      signin: async (name: string, text?: string) => {
        return sender.signin(name, text);
      },
    };
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
