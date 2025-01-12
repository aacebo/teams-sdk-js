import http from 'node:http';
import path from 'node:path';

import express from 'express';
import io from 'socket.io';

import { ActivityContext, App, HttpSender, Plugin, PluginEvents } from '@teams.sdk/apps';
import { EventEmitter } from '@teams.sdk/common/events';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { Activity } from '@teams.sdk/api';

export interface DevtoolsOptions {
  readonly port?: number;
}

export class DevtoolsPlugin extends EventEmitter<PluginEvents> implements Plugin {
  readonly name = 'devtools';
  readonly version = '0.0.0';

  protected log: Logger;
  protected http: http.Server;
  protected express: express.Application;
  protected io: io.Server;
  protected sockets = new Map<string, io.Socket>();

  constructor(readonly options: DevtoolsOptions = { }) {
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
      this.log.warn('failed to load devtools, please ensure you have installed `@teams.sdk/devtools`');
      this.log.warn(err);
      this.emit('error', err);
    }
  }

  register(app: App) {
    this.log = app.log.child('devtools');

    app.on('activity', ctx => {
      this.emitToSockets('activity.receive', ctx.activity);
      ctx.next();
    });
  }

  sender(ctx: ActivityContext) {
    const sender = new HttpSender(ctx);
    ctx.api.use('request', {
      onSuccess: (config) => {
        this.emitToSockets('request.send', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          body: config.data,
        });

        return config;
      },
      onError: (err) => {
        this.emitToSockets('request.error', err);
      },
    });

    ctx.api.use('response', {
      onSuccess: (res) => {
        this.emitToSockets('response.receive', {
          request: {
            url: res.config.url,
            method: res.config.method,
          },
          status: res.status,
          headers: res.headers,
          body: res.data,
        });

        return res;
      },
      onError: (err) => {
        this.emitToSockets('response.error', err);
      },
    });

    return {
      send: async (activity: Partial<Activity>) => {
        const res = await sender.send(activity);
        this.emitToSockets('activity.send', {
          ...activity,
          id: res.id,
        });

        return res;
      },
      reply: async (activity: Partial<Activity>) => {
        const res = await sender.reply(activity);
        this.emitToSockets('activity.send', {
          ...activity,
          id: res.id,
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
    return await new Promise<void>((resolve, reject) => {
      this.http.on('error', (err) => {
        this.emit('error', err);
        reject(err);
      });

      this.http.listen(this.options.port || 3001, async () => {
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

  protected emitToSockets(event: string, value: any) {
    for (const socket of this.sockets.values()) {
      socket.emit(event, value);
    }
  }
}
