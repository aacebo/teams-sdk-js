import { Activity } from '@teams.sdk/api';
import { Message } from '@teams.sdk/ai';
import { LocalStorage } from '@teams.sdk/common/storage';

const storage = new LocalStorage<ChatState>();

export interface ChatState {
  id: string;
  history: Message[];
}

export class ChatStorage {
  value: ChatState;

  private readonly _key: string;

  constructor(activity: Activity) {
    this._key = `${activity.from.id}/${activity.conversation.id}`;
    this.value = storage.get(this._key) || {
      id: activity.conversation.id,
      history: [],
    };
  }

  save() {
    storage.set(this._key, this.value);
  }
}
