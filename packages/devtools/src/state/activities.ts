import { createContext } from 'react';

import { ActivitySocketEvent } from '../socket-client';

export interface StateActivityEvent extends ActivitySocketEvent {
  updatedAt?: Date;
}

export interface ActivitiesState {
  readonly activities: Array<StateActivityEvent>;
  readonly setActivities: (value: Array<StateActivityEvent>) => void;
}

export const ActivitiesContext = createContext<ActivitiesState>({
  activities: [],
  setActivities: () => {},
});
