import { createContext } from 'react';
import * as uuid from 'uuid';
import { Activity } from '@teams.sdk/api';

import { Chat } from '../types';

export interface ChatState {
  readonly chats: Array<Chat>;
  readonly setChats: (value: Array<Chat>) => void;

  readonly chat: Chat;
  readonly setChat: (value: Chat) => void;

  readonly activities: Record<string, Array<Activity>>;
  readonly setActivities: (value: Record<string, Array<Activity>>) => void;
}

export const DEFAULT_CHAT = {
  id: uuid.v4(),
  name: 'Default',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const ChatContext = createContext<ChatState>({
  chats: [DEFAULT_CHAT],
  setChats: () => {},

  chat: DEFAULT_CHAT,
  setChat: () => {},

  activities: { },
  setActivities: () => {},
});
