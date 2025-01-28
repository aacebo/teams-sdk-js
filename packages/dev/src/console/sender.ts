import { ActivityParams } from '@teams.sdk/api';
import { ActivityContext, Sender } from '@teams.sdk/apps';
import qs from 'qs';

/**
 * a convenient `Sender` that can be used
 * to chat with your app in the console
 */
export class ConsoleSender implements Sender {
  protected readonly ctx: ActivityContext;

  constructor(ctx: ActivityContext) {
    this.ctx = ctx;
  }

  async send(activity: ActivityParams | string) {
    if (typeof activity === 'string') {
      activity = {
        type: 'message',
        text: activity
      };
    }

    if (activity.type === 'message' && activity.text) {
      this.ctx.log.info(activity.text);
    }

    return { id: '1' };
  }

  async reply(activity: ActivityParams | string) {
    return this.send(activity);
  }

  async signin() {
    const open = (await import('open')).default;
    const q = qs.stringify({
      client_id: this.ctx.clientId,
      response_type: 'code',
      response_mode: 'query',
      redirect_uri: 'https://social-ai.ngrok.io/auth/redirect',
      scope: 'https://graph.microsoft.com/mail.read',
      state: '12345',
    });

    await open(`https://login.microsoftonline.com/${this.ctx.tenantId}/oauth2/v2.0/authorize?${q}`);
    return { id: '1' };
  }
}
