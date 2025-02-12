import readline from 'readline';
import express from 'express';

import { ConsoleLogger, Logger } from '@teams.sdk/common/logging';
import { App, PluginEvents, Plugin } from '@teams.sdk/apps';
import { ActivityParams, MessageSendActivity, Token } from '@teams.sdk/api';
import { EventEmitter } from '@teams.sdk/common/events';

/**
 * Console Receiver Options
 */
export interface ConsoleOptions {
  /**
   * input stream
   * defaults to `process.stdin`
   */
  readonly stream?: NodeJS.ReadableStream;
}

/**
 * Can receive activities via the console
 */
export class ConsolePlugin extends EventEmitter<PluginEvents> implements Plugin {
  readonly name = 'console';

  protected app?: App;
  protected log: Logger;
  protected reader: readline.Interface;
  protected express: express.Application;

  constructor(protected options: ConsoleOptions = {}) {
    super();
    this.log = new ConsoleLogger('@teams.sdk/app/http');
    this.express = express();
    this.reader = readline.createInterface({
      input: this.options.stream || process.stdin,
      terminal: false,
    });

    this.express.get('/auth/redirect', this.onAuthRedirect.bind(this));
  }

  onInit(app: App) {
    this.app = app;
    this.log = app.log.child('console');
  }

  async onStart(port = 3000) {
    if (!this.app) {
      throw new Error('plugin not registered');
    }

    this.express.listen(port + 1, () => {
      this.reader.on('line', async (text) => {
        const activity: MessageSendActivity = {
          id: '1',
          type: 'message',
          text,
          channelId: 'msteams',
          conversation: {
            id: '1',
            conversationType: 'oneOnOne',
            isGroup: false,
            name: '',
          },
          from: {
            id: '1',
            name: 'user',
            role: 'user',
          },
          recipient: {
            id: '2',
            name: 'bot',
            role: 'bot',
          },
        };

        const token: Token = {
          appId: '1',
          from: 'azure',
          fromId: 'azure',
          serviceUrl: '',
        };

        try {
          const res = await this.app!.process({
            token,
            activity,
            sender: this,
          });

          if (res.body) {
            this.log.debug(res);
          }
        } catch (err) {
          this.log.error(err);
          this.emit('error', err);
        }
      });
    });
  }

  async onSend(activity: ActivityParams) {
    if (typeof activity === 'string') {
      activity = {
        type: 'message',
        text: activity,
      };
    }

    if (activity.type === 'message' && activity.text) {
      this.log.info(activity.text);
    }

    return { id: '1' };
  }

  protected onAuthRedirect(
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    console.log(req.url);
    console.log(req.query);
    res.status(200).send();
  }
}
