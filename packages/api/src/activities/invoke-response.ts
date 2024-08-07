import {
  ConfigResponse,
  MessagingExtensionActionResponse,
  MessagingExtensionResponse,
  TabResponse,
  TaskModuleResponse,
} from '../models';

import { ActivityBase } from './base';

export interface InvokeResponseActivity<T extends keyof InvokeResponseBody = any, D = any>
  extends ActivityBase<D> {
  type: 'invokeResponse';
  value: InvokeResponse<T>;
}

/**
 * Represents a response returned by a bot when it receives an `invoke` activity.
 *
 * This interface supports the framework and is not intended to be called directly for your code.
 */
export interface InvokeResponse<T extends keyof InvokeResponseBody = any> {
  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * Optional. The body of the response.
   */
  body?: InvokeResponseBody[T];
}

interface InvokeResponseBody {
  'config/fetch': ConfigResponse;
  'config/submit': ConfigResponse;
  'fileConsent/invoke': void;
  'actionableMessage/executeAction': void;
  'composeExtension/queryLink': MessagingExtensionResponse;
  'composeExtension/anonymousQueryLink': MessagingExtensionResponse;
  'composeExtension/query': MessagingExtensionResponse;
  'composeExtension/selectItem': MessagingExtensionResponse;
  'composeExtension/submitAction': MessagingExtensionActionResponse;
  'composeExtension/fetchTask': MessagingExtensionActionResponse;
  'composeExtension/querySettingUrl': MessagingExtensionResponse;
  'composeExtension/setting': MessagingExtensionResponse;
  'composeExtension/onCardButtonClicked': void;
  'task/fetch': TaskModuleResponse;
  'task/submit': TaskModuleResponse;
  'tab/fetch': TabResponse;
  'tab/submit': TabResponse;
}
