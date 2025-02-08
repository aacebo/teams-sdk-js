import http from 'http';
import path from 'path';

import express from 'express';
import io from 'socket.io';
import * as uuid from 'uuid';

import { App, HttpSender, MiddlewareContext, Plugin, PluginEvents } from '@teams.sdk/apps';
import { EventEmitter } from '@teams.sdk/common/events';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { router } from './routes';
import { ActivityEvent, Event } from './event';
import { ActivityParams } from '@teams.sdk/api';

export interface DevtoolsOptions {
  readonly port?: number;
}

export class DevtoolsPlugin extends EventEmitter<PluginEvents> implements Plugin {
  readonly name = 'devtools';

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

  onInit(app: App) {
    this.log = app.log.child('devtools');
    this.express.use(
      router({
        port: this.options.port || 3001,
        log: this.log,
        process: (token, activity) => {
          return app.process({
            token,
            activity,
            sender: (ctx) => new HttpSender(ctx),
          });
        },
      })
    );
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async onStart() {
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

  onActivity({ activity }: MiddlewareContext) {
    this.sendActivity({
      id: uuid.v4(),
      type: 'activity.received',
      chat: activity.conversation,
      body: activity,
      sentAt: new Date(),
    });
  }

  onBeforeSend(activity: ActivityParams, ctx: MiddlewareContext) {
    const id = uuid.v4();
    const sentAt = new Date();

    this.sendActivity({
      id,
      type: 'activity.sending',
      chat: ctx.activity.conversation,
      body: {
        ...activity,
        conversation: ctx.activity.conversation,
      } as any,
      sentAt,
    });

    ctx.devtoolsRequestId = id;
    ctx.devtoolsRequestSentAt = sentAt;
  }

  onAfterSend(activity: ActivityParams, ctx: MiddlewareContext) {
    this.sendActivity({
      id: ctx.devtoolsRequestId,
      type: 'activity.sent',
      chat: ctx.activity.conversation,
      body: {
        ...activity,
        conversation: ctx.activity.conversation,
      } as any,
      sentAt: new Date(ctx.devtoolsRequestSentAt),
    });
  }

  protected onConnection(socket: io.Socket) {
    this.sockets.set(socket.id, socket);

    socket.on('disconnect', () => {
      this.sockets.delete(socket.id);
    });
  }

  protected send(event: Event) {
    for (const socket of this.sockets.values()) {
      socket.emit(event.type, event);
    }
  }

  protected sendActivity(event: ActivityEvent) {
    for (const socket of this.sockets.values()) {
      socket.emit('activity', event);
      socket.emit(event.type, event);
    }
  }
}
