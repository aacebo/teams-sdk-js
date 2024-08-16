import { Message } from '@teams/ai';
import { LocalStorage } from '@teams/common/storage';

export interface State {
  status: boolean;
  history: Message[];
}

export const storage = new LocalStorage<State>();
