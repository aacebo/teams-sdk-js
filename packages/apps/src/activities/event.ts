import { ActivityBase } from "./base";

export interface EventActivity<D = any> extends ActivityBase<D> {
  readonly type: 'event';

  /**
   * The name of the operation associated with an invoke or event activity.
   */
  name?: string;

  /**
   * A value that is associated with the activity.
   */
  value?: any;
}
