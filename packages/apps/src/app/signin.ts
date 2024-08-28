import { Logger } from '@teams/common/logging';
import {
  Activity,
  cardAttachment,
  Client,
  ConversationAccount,
  ConversationReference,
  TokenExchangeState,
} from '@teams/api';

export interface SignInArgs {
  readonly appId: string;
  readonly api: Client;
  readonly activity: Activity;
  readonly conversation: ConversationReference;
  readonly log: Logger;
}

/**
 * trigger user signin flow for the activity sender
 * @param args sign in arguments
 */
export function signin(args: SignInArgs) {
  const { appId, api, activity, conversation } = args;

  return async (name: string, text = 'Sign In') => {
    let convo = { ...conversation };

    // create new 1:1 conversation with user to do SSO
    // because groupchats don't support it.
    if (activity.conversation.isGroup) {
      const res = await api.conversations.create({
        tenantId: activity.conversation.tenantId,
        isGroup: false,
        bot: { id: activity.recipient.id },
        members: [activity.from],
      });

      await api.conversations.activities(res.id).create({
        type: 'message',
        text,
      });

      convo.conversation = { id: res.id } as ConversationAccount;
    }

    const tokenExchangeState: TokenExchangeState = {
      connectionName: name,
      conversation: convo,
      relatesTo: activity.relatesTo,
      msAppId: appId,
    };

    const state = Buffer.from(JSON.stringify(tokenExchangeState)).toString('base64');
    const resource = await api.bots.signIn.getResource({ state });

    return api.conversations.activities(convo.conversation.id).create({
      type: 'message',
      inputHint: 'acceptingInput',
      recipient: activity.from,
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
  };
}
