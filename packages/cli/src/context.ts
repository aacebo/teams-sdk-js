import { Logger } from '@teams.sdk/common';

import { FileStorage } from './storage';
import { Config } from './config';

export interface Context {
  readonly log: Logger;
  readonly config: Config;
  readonly stores: {
    readonly file: FileStorage;
  };
}
