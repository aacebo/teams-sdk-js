import express from 'express';

import { App, HttpPlugin, HttpSender } from '@teams.sdk/apps';
import { Activity, JsonWebToken } from '@teams.sdk/api';

import {
  TurnContext,
  ActivityHandler,
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
  ConfigurationServiceClientCredentialFactory,
} from 'botbuilder';

export interface BotBuilderPluginOptions {
  readonly adapter?: CloudAdapter;
  readonly handler?: ActivityHandler;
}

export class BotBuilderPlugin extends HttpPlugin {
  protected adapter?: CloudAdapter;
  protected handler?: ActivityHandler;

  constructor(options?: BotBuilderPluginOptions) {
    super();
    this.adapter = options?.adapter;
    this.handler = options?.handler;
    this.on('error', (err) => {
      this.adapter?.onTurnError(new TurnContext(this.adapter!, {}), err);
    });
  }

  register(app: App) {
    super.register(app);

    if (!this.adapter) {
      this.adapter = new CloudAdapter(
        new ConfigurationBotFrameworkAuthentication(
          {},
          new ConfigurationServiceClientCredentialFactory({
            MicrosoftAppType: app.credentials?.tenantId ? 'SingleTenant' : 'MultiTenant',
            MicrosoftAppId: app.credentials?.clientId,
            MicrosoftAppPassword: app.credentials?.clientSecret,
            MicrosoftAppTenantId: app.credentials?.tenantId,
          })
        )
      );
    }
  }

  protected async onRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!this.app || !this.adapter) {
      throw new Error('plugin not registered');
    }

    const start = Date.now();
    this.emit('request', req);

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

      await this.adapter.process(req, res, async (context) => {
        if (this.handler) {
          await this.handler.run(context);
        }

        if (res.headersSent) {
          return next();
        }

        const response = await this.app!.process({
          token: new JsonWebToken(authorization),
          activity: context.activity as Activity,
          sender: (ctx) => new HttpSender(ctx),
        });

        this.emit('response', {
          res,
          body: response,
          elapse: Date.now() - start,
        });

        res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
        return next();
      });
    } catch (err) {
      this.log.error(err);
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
