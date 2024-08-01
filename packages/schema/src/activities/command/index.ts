import { CommandResultActivity } from './command-result';
import { CommandSendActivity } from './command-send';

export type CommandActivity<D = any> =
  | CommandSendActivity<D>
  | CommandResultActivity<D>;

export * from './command-result';
export * from './command-send';
