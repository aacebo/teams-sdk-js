import express from 'express';

import { App, HttpPlugin } from '@teams.sdk/apps';
import { Activity, JsonWebToken } from '@teams.sdk/api';

import {
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
  }

  onInit(app: App) {
    super.onInit(app);

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

    try {
      const authorization = req.headers.authorization?.replace('Bearer ', '');

      if (!authorization) {
        res.status(401).send('unauthorized');
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
          sender: this,
        });

        res.status(response?.status || 200).send(JSON.stringify(response?.body || null));
        return next();
      });
    } catch (err) {
      this.log.error(err);
      res.status(500).send('internal server error');
    }
  }
}
