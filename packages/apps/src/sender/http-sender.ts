import { Activity, cardAttachment, ConversationAccount, TokenExchangeState } from '@teams.sdk/api';

import { Sender, SenderContext } from './sender';

/**
 * the default `Sender` implementation that
 * sends activities to `Teams` via HTTP
 */
export class HttpSender implements Sender {
  protected readonly ctx: SenderContext;

  constructor(ctx: SenderContext) {
    this.ctx = ctx;
  }

  send(activity: Partial<Activity>) {
    if (activity.id) {
      return this.ctx.api.conversations
        .activities(this.ctx.activity.conversation.id)
        .update(activity.id, activity);
    }

    return this.ctx.api.conversations
      .activities(this.ctx.activity.conversation.id)
      .create(activity);
  }

  reply(activity: Partial<Activity>) {
    return this.ctx.api.conversations
      .activities(this.ctx.activity.conversation.id)
      .reply(this.ctx.activity.id, activity);
  }

  async signin(name: string, text = 'Please Sign In...') {
    let convo = { ...this.ctx.conversation };

    // create new 1:1 conversation with user to do SSO
    // because groupchats don't support it.
    if (this.ctx.activity.conversation.isGroup) {
      const res = await this.ctx.api.conversations.create({
        tenantId: this.ctx.activity.conversation.tenantId,
        isGroup: false,
        bot: { id: this.ctx.activity.recipient.id },
        members: [this.ctx.activity.from],
      });

      await this.ctx.api.conversations.activities(res.id).create({
        type: 'message',
        text,
      });

      convo.conversation = { id: res.id } as ConversationAccount;
    }

    const tokenExchangeState: TokenExchangeState = {
      connectionName: name,
      conversation: convo,
      relatesTo: this.ctx.activity.relatesTo,
      msAppId: this.ctx.appId,
    };

    const state = Buffer.from(JSON.stringify(tokenExchangeState)).toString('base64');
    const resource = await this.ctx.api.bots.signIn.getResource({ state });

    return this.ctx.api.conversations.activities(convo.conversation.id).create({
      type: 'message',
      inputHint: 'acceptingInput',
      recipient: this.ctx.activity.from,
      attachments: [
        cardAttachment('oauth', {
          text,
          connectionName: name,
          tokenExchangeResource: resource.tokenExchangeResource,
          tokenPostResource: resource.tokenPostResource,
          buttons: [
            {
              type: 'signin',
              title: 'Sign In',
              value: resource.signInLink,
            },
          ],
        }),
      ],
    });
  }
}
