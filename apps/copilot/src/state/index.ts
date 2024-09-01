import { Activity } from '@teams.sdk/api';

import { ChatStorage } from './chat';
import { UserStorage } from './user';

export class State {
  get chat() {
    return this._chat.value;
  }
  get user() {
    return this._user.value;
  }

  private readonly _chat: ChatStorage;
  private readonly _user: UserStorage;

  constructor(activity: Activity) {
    this._chat = new ChatStorage(activity);
    this._user = new UserStorage(activity);
  }

  save() {
    this._chat.save();
    this._user.save();
  }

  delete() {
    this._chat.delete();
  }
}

export * from './chat';
export * from './user';
