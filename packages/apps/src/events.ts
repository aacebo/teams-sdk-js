import { Activity } from '@teams/schema';

export interface Events {
  activity?: (activity: Activity) => void | Promise<void>;
}
