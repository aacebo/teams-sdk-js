import http from 'http';
import querystring from 'querystring';
import { URL } from 'url';

import { StatusCodes } from './status-codes';
import { Request } from './request';

export type NextFunction = () => void | Promise<void>;
export type RouteHandler = (
  req: Request,
  res: http.ServerResponse,
  next: NextFunction
) => void | Promise<void>;

interface Route {
  readonly select: (req: Request) => boolean;
  readonly handler: RouteHandler;
}

/**
 * Http Server
 */
export class HttpServer extends http.Server {
  protected readonly routes: Route[] = [];

  constructor(requestListener?: http.RequestListener);
  constructor(options: http.ServerOptions, requestListener?: http.RequestListener);
  constructor(
    listenerOrOptions?: http.RequestListener | http.ServerOptions,
    maybeListener?: http.RequestListener
  ) {
    let options = typeof listenerOrOptions === 'object' ? listenerOrOptions : undefined;
    let listener = typeof listenerOrOptions === 'function' ? listenerOrOptions : maybeListener;

    if (typeof listenerOrOptions === 'function') {
      listener = listenerOrOptions;
    }

    super(options as http.ServerOptions, listener);
    this.on('request', async (req, res) => {
      if (!req.url) {
        res.statusCode = StatusCodes.NOT_FOUND;
        return res.end('not found');
      }

      try {
        const chunks: any[] = [];
        const request: Request = req;
        request.uri = new URL(req.url, 'http://localhost/');
        let queryString = request.uri?.search || '';

        if (queryString.startsWith('?')) {
          queryString = queryString.slice(1);
        }

        request.query = querystring.parse(queryString);

        req.on('data', (chunk) => {
          chunks.push(chunk);
        });

        req.on('end', () => {
          const routes = this.select(request);

          if (req.headers['content-type'] === 'application/json' && chunks.length > 0) {
            request.body = JSON.parse(Buffer.concat(chunks).toString());
          }

          if (routes.length === 0) {
            res.writeHead(StatusCodes.NOT_FOUND, 'not found');
            res.end('not found');
            return;
          }

          let i = 0;
          const next = () => {
            if (i === routes.length - 1) return;
            i++;
            return routes[i](req, res, next);
          };

          routes[i](req, res, next);
        });
      } catch (err) {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        res.end('internal server error');
      }
    });
  }

  /**
   * register a middleware
   * @param handlers handlers
   */
  use(...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: () => true,
      });
    }

    return this;
  }

  /**
   * register a get route
   * @param path the path
   * @param handlers handlers
   */
  get(path: string, ...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === 'get' && req.uri?.pathname === path,
      });
    }

    return this;
  }

  /**
   * register a post route
   * @param path the path
   * @param handlers handlers
   */
  post(path: string, ...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === 'post' && req.uri?.pathname === path,
      });
    }

    return this;
  }

  /**
   * register a patch route
   * @param path the path
   * @param handlers handlers
   */
  patch(path: string, ...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === 'patch' && req.uri?.pathname === path,
      });
    }

    return this;
  }

  /**
   * register a put route
   * @param path the path
   * @param handlers handlers
   */
  put(path: string, ...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === 'put' && req.uri?.pathname === path,
      });
    }

    return this;
  }

  /**
   * register a delete route
   * @param path the path
   * @param handlers handlers
   */
  delete(path: string, ...handlers: RouteHandler[]) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === 'delete' && req.uri?.pathname === path,
      });
    }

    return this;
  }

  /**
   * register a route
   * @param method the http method
   * @param path the path
   * @param handlers handlers
   */
  route(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    path: string,
    ...handlers: RouteHandler[]
  ) {
    for (const handler of handlers) {
      this.routes.push({
        handler,
        select: (req) => req.method?.toLowerCase() === method && req.uri?.pathname === path,
      });
    }

    return this;
  }

  protected select(req: Request) {
    return this.routes.filter((route) => route.select(req)).map((r) => r.handler);
  }
}
