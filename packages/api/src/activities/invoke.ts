import {
  AppBasedLinkQuery,
  ConfigResponse,
  ConversationReference,
  FileConsentCardResponse,
  MessagingExtensionAction,
  MessagingExtensionActionResponse,
  MessagingExtensionQuery,
  MessagingExtensionResponse,
  O365ConnectorCardActionQuery,
  TabRequest,
  TabResponse,
  TaskModuleRequest,
  TaskModuleResponse,
} from '../models';

import { ActivityBase } from './base';

export type InvokeActivityName = keyof InvokeActivitySchema;

export interface InvokeActivity<Name extends InvokeActivityName = any, Data = any>
  extends ActivityBase<Data> {
  readonly type: 'invoke';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name: Name;

  /**
   * A value that is associated with the activity.
   */
  value: InvokeActivitySchema[Name]['input'];

  /**
   * A reference to another conversation or activity.
   */
  relatesTo?: ConversationReference;
}

interface InvokeActivitySchema {
  'config/fetch': {
    input: any;
    output: ConfigResponse;
  };
  'config/submit': {
    input: any;
    output: ConfigResponse;
  };
  'fileConsent/invoke': {
    input: FileConsentCardResponse;
    output: void;
  };
  'actionableMessage/executeAction': {
    input: O365ConnectorCardActionQuery;
    output: void;
  };
  'composeExtension/queryLink': {
    input: AppBasedLinkQuery;
    output: MessagingExtensionResponse;
  };
  'composeExtension/anonymousQueryLink': {
    input: AppBasedLinkQuery;
    output: MessagingExtensionResponse;
  };
  'composeExtension/query': {
    input: MessagingExtensionQuery;
    output: MessagingExtensionResponse;
  };
  'composeExtension/selectItem': {
    input: any;
    output: MessagingExtensionResponse;
  };
  'composeExtension/submitAction': {
    input: MessagingExtensionAction;
    output: MessagingExtensionActionResponse;
  };
  'composeExtension/fetchTask': {
    input: MessagingExtensionAction;
    output: MessagingExtensionActionResponse;
  };
  'composeExtension/querySettingUrl': {
    input: MessagingExtensionQuery;
    output: MessagingExtensionResponse;
  };
  'composeExtension/setting': {
    input: MessagingExtensionQuery;
    output: MessagingExtensionResponse;
  };
  'composeExtension/onCardButtonClicked': {
    input: any;
    output: void;
  };
  'task/fetch': {
    input: TaskModuleRequest;
    output: TaskModuleResponse;
  };
  'task/submit': {
    input: TaskModuleRequest;
    output: TaskModuleResponse;
  };
  'tab/fetch': {
    input: TaskModuleRequest;
    output: TaskModuleResponse;
  };
  'tab/submit': {
    input: TabRequest;
    output: TabResponse;
  };
}
