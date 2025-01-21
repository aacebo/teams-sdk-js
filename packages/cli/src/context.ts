import { Logger } from '@teams.sdk/common';

import { Storage } from './storage';
import { Config } from './config';

export interface Context {
  readonly log: Logger;
  readonly config: Config;
  readonly stores: Storage;
}
