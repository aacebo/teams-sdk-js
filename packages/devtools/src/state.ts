import { createContext } from 'react';

import { ActivitySocketEvent } from './client';

export interface State {
  activities: Array<ActivitySocketEvent>;
}

export const StateContext = createContext<State>({
  activities: [],
});
