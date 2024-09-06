import { Message } from '@teams.sdk/ai';
import { Activity } from '@teams.sdk/api';
import { Storage } from '@teams.sdk/common/storage';
import * as MSGraph from '@microsoft/microsoft-graph-types';

export class State {
  user: UserState;
  chat: ChatState;

  constructor(user: UserState, chat: ChatState) {
    this.user = user;
    this.chat = chat;
  }

  async save(activity: Activity, storage: Storage) {
    await storage.set(activity.from.id, this.user);
    await storage.set(activity.conversation.id, this.chat);
  }

  async delete(activity: Activity, storage: Storage) {
    await storage.delete(activity.from.id);
    await storage.delete(activity.conversation.id);
  }

  static async fromActivity(activity: Activity, storage: Storage) {
    return new State(
      (await storage.get(activity.from.id)) || {},
      (await storage.get(activity.conversation.id)) || { messages: [] }
    );
  }
}

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

export interface ChatState {
  id?: string;
  messages?: Message[];
}
