import { Activity } from '@teams/schema';

export interface Events {
  error?: (err: Error) => void | Promise<void>;
  activity?: (activity: Activity) => void | Promise<void>;
}
