import { MessageActivity } from './message';
import { EventActivity } from './event';

export type Event<D = any> =
  MessageActivity<D> |
  EventActivity<D>;

export * from './message';
export * from './event';
