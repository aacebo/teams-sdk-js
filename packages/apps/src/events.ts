import { Activity, InvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { Context, MentionContext, SignInContext } from './context';

export type Prefixed<T, P extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as P extends string ? `${P}${K}` : K]?: T[K];
};

export type Suffixed<T, S extends string | undefined = undefined> = {
  [K in Extract<keyof T, string> as S extends string ? `${K}${S}` : K]?: T[K];
};

type EventHandler<In = any, Out = void> = (value: In) => Out | Promise<Out>;

export interface Events extends ActivityEvents, InvokeActivityEvents {
  error?: EventHandler<Error>;
  start?: EventHandler<void>;
  signin?: EventHandler<SignInContext>;
  mention?: EventHandler<MentionContext>;
  activity?: EventHandler<Context<Activity>>;
}

export type ActivityEvents = {
  [K in Activity['type']]?: EventHandler<Context<Extract<Activity, { type: K }>>>;
};

export type InvokeActivityEvents = {
  [K in InvokeActivity['name'] as InvokeAliases[K]]?: EventHandler<
    Context<Extract<InvokeActivity, { name: K }>>,
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
