import http from 'http';
import url from 'url';

import { Activity, InvokeResponse, Token } from '@teams/api';
import { ConsoleLogger, Logger } from '@teams/common/logging';
import { HttpRequest, StatusCodes } from '@teams/common/http';

import { Receiver, ReceiverActivityArgs } from './receiver';

export interface HttpReceiverOptions {
  readonly logger?: Logger;
}

export interface HttpReceiverActivityArgs extends ReceiverActivityArgs {
  readonly req: HttpRequest;
}

export class HttpReceiver implements Receiver {
  readonly log: Logger;

  private readonly _server: http.Server;
  private _onActivity?: (args: ReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>;

  constructor(readonly options: HttpReceiverOptions) {
    this.log = this.options.logger || new ConsoleLogger({ name: '@teams/app/receiver' });
    this._server = http.createServer();
  }

  async start(port = 3000) {
    return await new Promise<void>((resolve, reject) => {
      this._server.on('request', this.onIncomingRequest.bind(this));
      this._server.on('error', (err) => {
        reject(err);
      });

      this._server.listen(port, undefined, undefined, () => {
        this.log.info('listening 🚀');
        resolve();
      });
    });
  }

  onActivity(cb: (args: ReceiverActivityArgs) => InvokeResponse | Promise<InvokeResponse>) {
    this._onActivity = cb;
  }

  protected onIncomingRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) {
    if (req.method !== 'POST') {
      res.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
      return res.end();
    }

    if (!req.url) {
      res.statusCode = StatusCodes.NOT_FOUND;
      return res.end('not found');
    }

    const uri = url.parse(req.url, true);

    if (uri.path !== '/api/messages') {
      res.statusCode = StatusCodes.NOT_FOUND;
      return res.end('not found');
    }

    try {
      const chunks: any[] = [];

      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', async () => {
        const response = await this.onRequest(
          new HttpRequest({
            method: req.method!,
            url: req.url!,
            headers: req.headers,
            body: JSON.parse(Buffer.concat(chunks).toString()),
          }),
          res
        );

        res.statusCode = response?.status || 200;
        res.end(JSON.stringify(response?.body || null));
      });
    } catch (err) {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('internal server error');
    }
  }

  protected async onRequest(req: HttpRequest, res: http.ServerResponse<http.IncomingMessage>) {
    const authorization = req.headers['authorization']?.replace('Bearer ', '');

    if (!authorization) {
      res.statusCode = StatusCodes.UNAUTHORIZED;
      res.end('unauthorized');
      return;
    }

    const token = new Token(authorization);
    const activity: Activity = req.body;
    const args: HttpReceiverActivityArgs = {
      req,
      token,
      activity,
    };

    const cb =
      this._onActivity ||
      (() => {
        return { status: 200, body: null };
      });

    return await cb(args);
  }
}
