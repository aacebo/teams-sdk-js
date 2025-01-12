import express from 'express';

import { App, HttpPlugin } from '@teams.sdk/apps';
import { Activity, JsonWebToken } from '@teams.sdk/api';

import {
  TurnContext,
  CloudAdapter,
  ConfigurationBotFrameworkAuthentication,
  ConfigurationServiceClientCredentialFactory,
} from 'botbuilder';

export class BotBuilderPlugin extends HttpPlugin {
  protected adapter?: CloudAdapter;

  constructor() {
    super();
    this.on('error', (err) => {
      this.adapter?.onTurnError(new TurnContext(this.adapter!, {}), err);
    });
  }

  register(app: App) {
    super.register(app);
    this.adapter = new CloudAdapter(
      new ConfigurationBotFrameworkAuthentication(
        {},
        new ConfigurationServiceClientCredentialFactory({
          MicrosoftAppType: app.options.type,
          MicrosoftAppId: app.options.clientId,
          MicrosoftAppPassword: app.options.clientSecret,
        })
      )
    );
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
        this.emit('activity', context.activity as Activity);
        const response = await this.app!.process({
          token: new JsonWebToken(authorization),
          activity: context.activity as Activity,
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
