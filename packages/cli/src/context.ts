import { Logger } from '@teams.sdk/common';

import { FileStorage, RepositoryStorage } from './storage';

export interface Context {
  readonly log: Logger;
  readonly stores: {
    readonly repository: RepositoryStorage;
    readonly file: FileStorage;
  };
}
