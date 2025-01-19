import { FileStorage, RepositoryStorage } from './storage';

export interface Context {
  readonly stores: {
    readonly repository: RepositoryStorage;
    readonly file: FileStorage;
  };
}
