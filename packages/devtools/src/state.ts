import { createContext } from 'react';

import { ActivitySocketEvent } from './client';

export interface StateActivityEvent extends ActivitySocketEvent {
  updatedAt?: Date;
}

export interface State {
  activities: Array<StateActivityEvent>;
}

export const StateContext = createContext<State>({
  activities: [],
});
