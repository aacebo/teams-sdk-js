import { Activity } from '@teams.sdk/api';
import { LocalStorage } from '@teams.sdk/common/storage';
import * as MSGraph from '@microsoft/microsoft-graph-types';

const storage = new LocalStorage<UserState>();

export interface UserState {
  auth?: {
    token?: string;
    expiration?: string;
    conversationId?: string;
  };
  user?: MSGraph.User & {
    timezone?: string;
  };
}

export class UserStorage {
  value: UserState;

  private readonly _key: string;

  constructor(activity: Activity) {
    this._key = activity.from.id;
    this.value = storage.get(this._key) || {};
  }

  save() {
    storage.set(this._key, this.value);
  }

  delete() {
    storage.delete(this._key);
  }
}
