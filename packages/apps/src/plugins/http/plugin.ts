import http from 'http';
import express from 'express';

import { Activity, ActivityParams, InvokeResponse, JsonWebToken } from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { EventEmitter } from '@teams.sdk/common/events';

import { Plugin, PluginEvents, Streamer } from '../../types';
import { App } from '../../app';
import { ActivityContext } from '../../activity-context';
import { HttpStream } from './stream';

export interface HttpEvents extends PluginEvents {
  request: express.Request;
  response: {
    res: express.Response;
    body: InvokeResponse;
    elapse: number;
  };
}

/**
 * Can receive activities via http
 */
export class HttpPlugin extends EventEmitter<HttpEvents> implements Plugin {
  readonly name = 'http';

  readonly get: express.Application['get'];
  readonly post: express.Application['post'];
  readonly patch: express.Application['patch'];
  readonly put: express.Application['put'];
  readonly delete: express.Application['delete'];
  readonly route: express.Application['route'];
  readonly use: express.Application['use'];

  get http() {
    return this._http;
  }
  protected _http: http.Server;

  get port() {
    return this._port;
  }
  protected _port?: number;

  protected app?: App;
  protected log: Logger;
  protected express: express.Application;

  constructor() {
    super();
    this.log = new ConsoleLogger('@teams.sdk/app/http');
    this.express = express();
    this._http = http.createServer(this.express);
    this.get = this.express.get.bind(this.express);
    this.post = this.express.post.bind(this.express);
    this.patch = this.express.patch.bind(this.express);
    this.put = this.express.put.bind(this.express);
    this.delete = this.express.delete.bind(this.express);
    this.route = this.express.route.bind(this.express);
    this.use = this.express.use.bind(this.express);

    this.express.use('/api*', express.json());
    this.express.post('/api/messages', this.onRequest.bind(this));
  }

  /**
   * serve static files
   * @param path the url path to serve
   * @param dist the dist file path to serve
   */
  static(path: string, dist: string) {
    this.express.use(path, express.static(dist));
    return this;
  }

  onInit(app: App) {
    this.app = app;
    this.log = app.log.child('http');
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async onStart(port = 3000) {
    if (!this.app) {
      throw new Error('plugin not registered');
    }

    this._port = port;
    this.express.get('/', (_, res) => {
      res.send(this.app?.manifest);
    });

    return await new Promise<void>((resolve, reject) => {
      this.express.on('error', (err) => {
        this.emit('error', err);
        reject(err);
      });

      this._http = this.express.listen(port, async () => {
        resolve();
      });
    });
  }

  onSend(activity: ActivityParams, ctx: ActivityContext) {
    if (activity.id && !activity.channelData?.streamId) {
      return ctx.api.conversations.activities(ctx.activity.conversation.id).update(activity.id, {
        ...activity,
        from: ctx.activity.recipient,
        conversation: ctx.activity.conversation,
      });
    }

    return ctx.api.conversations.activities(ctx.activity.conversation.id).create({
      ...activity,
      from: ctx.activity.recipient,
      conversation: ctx.activity.conversation,
    });
  }

  onStreamOpen(ctx: ActivityContext): Streamer {
    return new HttpStream((activity) => this.onSend(activity, ctx));
  }

  /**
   * validates an incoming http request
   * @param req the incoming http request
   * @param res the http response
   */
  protected async onRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!this.app) {
      throw new Error('plugin not registered');
    }

    this.emit('request', req);
    const start = Date.now();

    try {
      const authorization = req.headers.authorization?.replace('Bearer ', '');

      if (!authorization) {
        res.status(401).send('unauthorized');
        this.emit('response', {
          res,
          body: { status: 401 },
          elapse: Date.now() - start,
        });

        return;
      }

      const token = new JsonWebToken(authorization);
      const activity: Activity = req.body;
      const response = await this.app.process({
        req,
        token,
        activity,
        sender: this,
      });

      this.emit('response', {
        res,
        body: response,
        elapse: Date.now() - start,
      });

      res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
      return next();
    } catch (err) {
      this.emit('error', err);
      this.emit('response', {
        res,
        body: { status: 500 },
        elapse: Date.now() - start,
      });

      res.status(500).send('internal server error');
    }
  }
}
