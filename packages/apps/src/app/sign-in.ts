import {
  Activity,
  cardAttachment,
  Client,
  ConversationReference,
  TokenExchangeState,
} from '@teams/api';

export interface SignInArgs {
  readonly appId: string;
  readonly api: Client;
  readonly activity: Activity;
  readonly conversation: ConversationReference;
}

export function signin(args: SignInArgs) {
  const { appId, api, activity, conversation } = args;

  return async (name: string, text = 'Sign In') => {
    const tokenExchangeState: TokenExchangeState = {
      connectionName: name,
      conversation: conversation,
      relatesTo: activity.relatesTo,
      msAppId: appId,
    };

    const state = Buffer.from(JSON.stringify(tokenExchangeState)).toString('base64');
    const resource = await api.bots.signIn.getResource({ state });

    return api.conversations.activities(activity.conversation.id).create({
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
