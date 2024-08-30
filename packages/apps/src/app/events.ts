import { HttpRequest } from '@teams.sdk/common/http';
import { Logger } from '@teams.sdk/common/logging';
import {
  Activity,
  InvokeActivity,
  Client,
  Resource,
  InvokeResponse,
  ConversationReference,
  TokenResponse,
  MessageSendActivity,
  MentionEntity,
} from '@teams.sdk/api';

import { AppTokens } from './tokens';

export type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

export type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface ActivityEventArgs<T extends Activity> {
  /**
   * the inbound activity
   */
  readonly activity: T;

  /**
   * the inbound activity conversation reference
   */
  readonly conversation: ConversationReference;

  /**
   * the inbound request
   */
  readonly req: HttpRequest;

  /**
   * the app logger instance
   */
  readonly log: Logger;

  /**
   * the bot api client
   */
  readonly api: Client;

  /**
   * the apps tokens
   */
  readonly tokens: AppTokens;

  /**
   * send an activity to the conversation
   * @param activity activity to send
   */
  readonly say: (activity: Partial<Activity>) => Promise<Resource>;

  /**
   * reply to an activity
   * @param id the id of the activity to reply to
   * @param activity activity to send
   */
  readonly reply: (id: string, activity: Partial<Activity>) => Promise<Resource>;

  /**
   * trigger user signin flow for the activity sender
   * @param name auth connection name
   * @param text card text to display
   */
  readonly signin: (name: string, text?: string) => Promise<Resource>;
}

export type MentionEventArgs = ActivityEventArgs<MessageSendActivity> & {
  readonly mention: MentionEntity;
};

export type SignInEventArgs = ActivityEventArgs<Activity> & {
  readonly tokenResponse: TokenResponse;
};

export interface Events extends ActivityEvents, InvokeActivityEvents {
  error?: EventHandler<Error>;
  start?: EventHandler<void>;
  signin?: EventHandler<SignInEventArgs>;
  mention?: EventHandler<MentionEventArgs>;
  activity?: EventHandler<ActivityEventArgs<Activity>>;
}

export type ActivityEvents = {
  [K in Activity['type']]?: EventHandler<ActivityEventArgs<Extract<Activity, { type: K }>>>;
};

export type InvokeActivityEvents = {
  [K in InvokeActivity['name'] as InvokeAliases[K]]?: EventHandler<
    ActivityEventArgs<Extract<InvokeActivity, { name: K }>>,
    InvokeResponse<K>
  >;
};

interface InvokeAliases {
  'config/fetch': 'config.open';
  'config/submit': 'config.submit';
  'fileConsent/invoke': 'file.consent';
  'actionableMessage/executeAction': 'message.execute';
  'composeExtension/queryLink': 'message.ext.query-link';
  'composeExtension/anonymousQueryLink': 'message.ext.anon-query-link';
  'composeExtension/query': 'message.ext.query';
  'composeExtension/selectItem': 'message.ext.select.item';
  'composeExtension/submitAction': 'message.ext.submit';
  'composeExtension/fetchTask': 'message.ext.fetch-task';
  'composeExtension/querySettingUrl': 'message.ext.query-settings-url';
  'composeExtension/setting': 'message.ext.setting';
  'composeExtension/onCardButtonClicked': 'message.ext.card-button-clicked';
  'task/fetch': 'dialog.open';
  'task/submit': 'dialog.submit';
  'tab/fetch': 'tab.open';
  'tab/submit': 'tab.submit';
  'message/submitAction': 'message.submit';
  'handoff/action': 'handoff.action';
  'signin/tokenExchange': 'signin.token-exchange';
  'signin/verifyState': 'signin.verify-state';
  'adaptiveCard/action': 'card.action';
}

export const INVOKE_ALIASES: InvokeAliases = {
  'config/fetch': 'config.open',
  'config/submit': 'config.submit',
  'fileConsent/invoke': 'file.consent',
  'actionableMessage/executeAction': 'message.execute',
  'composeExtension/queryLink': 'message.ext.query-link',
  'composeExtension/anonymousQueryLink': 'message.ext.anon-query-link',
  'composeExtension/query': 'message.ext.query',
  'composeExtension/selectItem': 'message.ext.select.item',
  'composeExtension/submitAction': 'message.ext.submit',
  'composeExtension/fetchTask': 'message.ext.fetch-task',
  'composeExtension/querySettingUrl': 'message.ext.query-settings-url',
  'composeExtension/setting': 'message.ext.setting',
  'composeExtension/onCardButtonClicked': 'message.ext.card-button-clicked',
  'task/fetch': 'dialog.open',
  'task/submit': 'dialog.submit',
  'tab/fetch': 'tab.open',
  'tab/submit': 'tab.submit',
  'message/submitAction': 'message.submit',
  'handoff/action': 'handoff.action',
  'signin/tokenExchange': 'signin.token-exchange',
  'signin/verifyState': 'signin.verify-state',
  'adaptiveCard/action': 'card.action',
};
