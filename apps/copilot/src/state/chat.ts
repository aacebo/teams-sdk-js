import { Activity } from '@teams/api';
import { Message } from '@teams/ai';
import { LocalStorage } from '@teams/common/storage';

const storage = new LocalStorage<ChatState>();

export interface ChatState {
  history: Message[];
}

export class ChatStorage {
  value: ChatState;

  private readonly _key: string;

  constructor(activity: Activity) {
    this._key = `${activity.from.id}/${activity.conversation.id}`;
    this.value = storage.get(this._key) || { history: [] };
  }

  save() {
    storage.set(this._key, this.value);
  }
}
