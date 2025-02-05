import express from 'express';

import { Activity, InvokeResponse, JsonWebToken } from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { EventEmitter } from '@teams.sdk/common/events';

import { Plugin, PluginEvents } from '../../types';
import { App } from '../../app';
import { HttpSender } from './sender';

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

  protected app?: App;
  protected log: Logger;
  protected express: express.Application;

  constructor() {
    super();
    this.express = express();
    this.log = new ConsoleLogger('@teams.sdk/app/http');
    this.get = this.express.get.bind(this.express);
    this.post = this.express.post.bind(this.express);
    this.patch = this.express.patch.bind(this.express);
    this.put = this.express.put.bind(this.express);
    this.delete = this.express.delete.bind(this.express);
    this.route = this.express.route.bind(this.express);
    this.use = this.express.use.bind(this.express);
  }

  register(app: App) {
    this.app = app;
    this.log = app.log.child('http');
  }

  /**
   * start listening
   * @param port port to listen on
   */
  async start(port = 3000) {
    if (!this.app) {
      throw new Error('plugin not registered');
    }

    return await new Promise<void>((resolve, reject) => {
      this.express.use(express.json());
      this.express.post('/api/messages', this.onRequest.bind(this));
      this.express.on('error', (err) => {
        this.emit('error', err);
        reject(err);
      });

      this.express.listen(port, async () => {
        resolve();
      });
    });
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
        sender: (ctx) => new HttpSender(ctx),
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
