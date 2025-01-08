import { Logger } from '@teams.sdk/common/logging';

import { ErrorMiddlewareContext, SignInMiddlewareContext } from '../middleware-context';
import { EventHandler } from '../types';

import { error, ErrorEventArgs } from './error';
import { start } from './start';
import { signin } from './signin';

export interface Events {
  start: EventHandler<Logger>;
  signin: EventHandler<SignInMiddlewareContext>;
  error: EventHandler<ErrorEventArgs>;
  'activity.error': EventHandler<ErrorMiddlewareContext>;
}

export const DEFAULT_EVENTS: Events = {
  start,
  signin,
  error,
  'activity.error': error,
};

export { ErrorEventArgs };
