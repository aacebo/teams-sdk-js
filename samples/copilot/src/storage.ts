import { Message } from '@teams/ai';
import { LocalStorage } from '@teams/common/storage';
import * as MSGraph from '@microsoft/microsoft-graph-types';

export interface State {
  auth?: {
    token?: string;
    expiration?: string;
  };
  user?: MSGraph.User & {
    timezone?: string;
  };
  history: Message[];
}

export const storage = new LocalStorage<State>();
