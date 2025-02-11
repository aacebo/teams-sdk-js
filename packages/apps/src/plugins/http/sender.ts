import {
  ActivityParams,
  cardAttachment,
  ConversationAccount,
  TokenExchangeState,
  ActivityBuilder,
  toActivityParams,
} from '@teams.sdk/api';

import { Sender } from '../../types';
import { ActivityContext } from '../../activity-context';
import { HttpStream } from './stream';
import { Card } from '@teams.sdk/cards';

/**
 * the default `Sender` implementation that
 * sends activities to `Teams` via HTTP
 */
export class HttpSender implements Sender {
  readonly stream: HttpStream;

  protected readonly ctx: ActivityContext;

  constructor(ctx: ActivityContext) {
    this.ctx = ctx;
    this.stream = new HttpStream(this.ctx);
  }

  send(activity: ActivityParams | string | ActivityBuilder | Card) {
    activity = toActivityParams(activity);

    if (activity.id) {
      return this.ctx.api.conversations
        .activities(this.ctx.activity.conversation.id)
        .update(activity.id, {
          ...activity,
          from: this.ctx.activity.recipient,
          conversation: this.ctx.activity.conversation,
        });
    }

    return this.ctx.api.conversations.activities(this.ctx.activity.conversation.id).create({
      ...activity,
      from: this.ctx.activity.recipient,
      conversation: this.ctx.activity.conversation,
    });
  }

  reply(activity: ActivityParams | string) {
    if (typeof activity === 'string') {
      activity = {
        type: 'message',
        text: activity,
      };
    }

    return this.ctx.api.conversations
      .activities(this.ctx.activity.conversation.id)
      .reply(this.ctx.activity.id, {
        ...activity,
        from: this.ctx.activity.recipient,
        conversation: this.ctx.activity.conversation,
      });
  }

  async signin(name = 'graph', text = 'Please Sign In...') {
    let convo = { ...this.ctx.ref };

    try {
      const res = await this.ctx.api.users.token.get({
        channelId: this.ctx.activity.channelId,
        userId: this.ctx.activity.from.id,
        connectionName: name,
      });

      return res.token;
    } catch (err) {}

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
      msAppId: this.ctx.apiId,
    };

    const state = Buffer.from(JSON.stringify(tokenExchangeState)).toString('base64');
    const resource = await this.ctx.api.bots.signIn.getResource({ state });

    await this.ctx.api.conversations.activities(convo.conversation.id).create({
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

  async signout(name = 'graph') {
    await this.ctx.api.users.token.signOut({
      channelId: this.ctx.activity.channelId,
      userId: this.ctx.activity.from.id,
      connectionName: name,
    });
  }
}
