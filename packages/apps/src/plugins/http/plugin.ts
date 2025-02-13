import http from 'http';
import express from 'express';

import {
  Activity,
  ActivityParams,
  JsonWebToken,
  ConversationReference,
  Client,
} from '@teams.sdk/api';
import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';

import { Plugin, Streamer } from '../../types';
import { App } from '../../app';

import { HttpStream } from './stream';

/**
 * Can receive activities via http
 */
export class HttpPlugin implements Plugin {
  readonly name = 'http';

  readonly get: express.Application['get'];
  readonly post: express.Application['post'];
  readonly patch: express.Application['patch'];
  readonly put: express.Application['put'];
  readonly delete: express.Application['delete'];
  readonly route: express.Application['route'];
  readonly use: express.Application['use'];

  get server() {
    return this._server;
  }
  protected _server: http.Server;

  get port() {
    return this._port;
  }
  protected _port?: number;

  protected app?: App;
  protected log: Logger;
  protected express: express.Application;

  constructor() {
    this.log = new ConsoleLogger('@teams.sdk/app/http');
    this.express = express();
    this._server = http.createServer(this.express);
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
        reject(err);
      });

      this._server = this.express.listen(port, async () => {
        this.log.info(`listening on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async onSend(activity: ActivityParams, { bot, conversation, serviceUrl }: ConversationReference) {
    const api = new Client(serviceUrl, { token: this.app?.tokens.bot });

    activity = {
      ...activity,
      from: bot,
      conversation,
    };

    if (activity.id && !activity.channelData?.streamId) {
      const res = await api.conversations.activities(conversation.id).update(activity.id, activity);

      return { ...activity, ...res };
    }

    const res = await api.conversations.activities(conversation.id).create(activity);

    return { ...activity, ...res };
  }

  async onSendProactive(
    activity: ActivityParams,
    { bot, conversation, serviceUrl }: ConversationReference
  ) {
    const api = new Client(serviceUrl, { token: this.app?.tokens.bot });

    activity = {
      ...activity,
      from: bot,
      conversation,
    };

    const res = await api.conversations.activities(conversation.id).create(activity);

    return { ...activity, ...res };
  }

  onStreamOpen(ref: ConversationReference): Streamer {
    return new HttpStream((activity) => this.onSend(activity, ref));
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

    try {
      const authorization = req.headers.authorization?.replace('Bearer ', '');

      if (!authorization) {
        res.status(401).send('unauthorized');
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

      res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
      return next();
    } catch (err) {
      res.status(500).send('internal server error');
    }
  }
}
