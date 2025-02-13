import http from 'http';
import path from 'path';

import express from 'express';
import io from 'socket.io';
import * as uuid from 'uuid';

import { ActivityParams, ConversationReference } from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { ActivityContext, App, HttpPlugin, HttpStream, Plugin, Streamer } from '@teams.sdk/apps';

import { router } from './routes';
import { ActivityEvent, Event } from './event';

export interface DevtoolsOptions {
  readonly port?: number;
}

export class DevtoolsPlugin implements Plugin {
  readonly name = 'devtools';

  protected log: Logger;
  protected http: http.Server;
  protected express: express.Application;
  protected io: io.Server;
  protected sockets = new Map<string, io.Socket>();
  protected httpPlugin = new HttpPlugin();

  constructor(readonly options: DevtoolsOptions = {}) {
    this.log = new ConsoleLogger('@teams.sdk/app/devtools');
    this.express = express();
    this.http = http.createServer(this.express);
    this.io = new io.Server(this.http, { path: '/devtools/sockets' });
    this.io.on('connection', this.onConnection.bind(this));

    try {
      const dist = path.join(__dirname, '..', 'devtools-web');
      this.express.use('/devtools', express.static(dist));
      this.express.get('/devtools/*', (_, res) => {
        res.sendFile(path.join(dist, 'index.html'));
      });
    } catch (err) {
      this.log.warn(
        'failed to load devtools, please ensure you have installed `@teams.sdk/devtools`'
      );
      this.log.warn(err);
    }
  }

  onInit(app: App) {
    const httpPlugin = app.getPlugin('http');

    if (httpPlugin && httpPlugin instanceof HttpPlugin) {
      this.httpPlugin = httpPlugin;
    }

    this.log = app.log.child('devtools');
    this.express.use(
      router({
        port: this.options.port || 3001,
        log: this.log,
        process: (token, activity) => {
          return app.process({
            token,
            activity,
            sender: this,
          });
        },
      })
    );
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async onStart(port = 3000) {
    port = (this.options.port || port || 3000) + 1;

    return await new Promise<void>((resolve, reject) => {
      this.http.on('error', (err) => {
        reject(err);
      });

      this.http.listen(port, async () => {
        this.log.info(`available at http://localhost:${port}/devtools`);
        resolve();
      });
    });
  }

  onActivity({ activity, next }: ActivityContext) {
    this.sendActivity({
      id: uuid.v4(),
      type: 'activity.received',
      chat: activity.conversation,
      body: activity,
      sentAt: new Date(),
    });

    return next();
  }

  async onSend(activity: ActivityParams, ref: ConversationReference) {
    const res = await this.httpPlugin.onSend(activity, ref);

    this.sendActivity({
      id: uuid.v4(),
      type: 'activity.sent',
      chat: ref.conversation,
      body: res as any,
      sentAt: new Date(),
    });

    return res;
  }

  async onSendProactive(activity: ActivityParams, ref: ConversationReference) {
    const res = await this.httpPlugin.onSendProactive(activity, ref);

    this.sendActivity({
      id: uuid.v4(),
      type: 'activity.sent',
      chat: ref.conversation,
      body: res as any,
      sentAt: new Date(),
    });

    return res;
  }

  onStreamOpen(ref: ConversationReference): Streamer {
    return new HttpStream((activity) => {
      return this.onSend(activity, ref);
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
