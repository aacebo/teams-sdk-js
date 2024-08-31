import { Activity } from '@teams.sdk/api';

import { ChatStorage } from './chat';
import { UserStorage } from './user';

export class State {
  get chat() {
    return this._chatStorage.value;
  }
  get user() {
    return this._userStorage.value;
  }

  private readonly _chatStorage: ChatStorage;
  private readonly _userStorage: UserStorage;

  constructor(activity: Activity) {
    this._chatStorage = new ChatStorage(activity);
    this._userStorage = new UserStorage(activity);
  }

  save() {
    this._chatStorage.save();
    this._userStorage.save();
  }

  delete() {
    this._chatStorage.delete();
  }
}

export * from './chat';
export * from './user';
