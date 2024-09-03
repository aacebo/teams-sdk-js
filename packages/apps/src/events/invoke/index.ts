import { InvokeActivity, InvokeResponse } from '@teams.sdk/api';

import { Context } from '../../context';
import { EventHandler } from '../../types';

import { FileConsentActivityEvents } from './file-consent';
import { MessageExtensionSubmitActivityEvents } from './message-extension-submit';

export type InvokeActivityEvents = {
  [K in InvokeActivity['name'] as InvokeAliases[K]]?: EventHandler<
    Context<Extract<InvokeActivity, { name: K }>>,
    InvokeResponse<K>
  >;
} & FileConsentActivityEvents &
  MessageExtensionSubmitActivityEvents;

interface InvokeAliases {
  'config/fetch': 'config.open';
  'config/submit': 'config.submit';
  'fileConsent/invoke': 'file.consent';
  'actionableMessage/executeAction': 'message.execute';
  'composeExtension/queryLink': 'message.ext.query-link';
  'composeExtension/anonymousQueryLink': 'message.ext.anon-query-link';
  'composeExtension/query': 'message.ext.query';
  'composeExtension/selectItem': 'message.ext.select-item';
  'composeExtension/submitAction': 'message.ext.submit';
  'composeExtension/fetchTask': 'message.ext.open';
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
  'composeExtension/selectItem': 'message.ext.select-item',
  'composeExtension/submitAction': 'message.ext.submit',
  'composeExtension/fetchTask': 'message.ext.open',
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

export * from './file-consent';
export * from './message-extension-submit';
