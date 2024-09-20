import { Activity } from '@teams.sdk/api';
import { Sender, SenderContext } from '@teams.sdk/apps';
import qs from 'qs';

/**
 * a convenient `Sender` that can be used
 * to chat with your app in the console
 */
export class ConsoleSender implements Sender {
  protected readonly ctx: SenderContext;

  constructor(ctx: SenderContext) {
    this.ctx = ctx;
  }

  async send(activity: Partial<Activity>) {
    if (activity.type === 'message' && activity.text) {
      this.ctx.log.info(activity.text);
    }

    return { id: '1' };
  }

  async reply(activity: Partial<Activity>) {
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

    open(`https://login.microsoftonline.com/${this.ctx.tenantId}/oauth2/v2.0/authorize?${q}`);
    return { id: '1' };
  }
}
