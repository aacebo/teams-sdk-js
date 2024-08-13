import { Events } from './events';

export interface Receiver {
  on<Event extends keyof Events>(event: Event, cb: Events[Event]): void;
}
