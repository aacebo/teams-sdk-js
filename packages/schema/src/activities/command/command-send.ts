import { ActivityBase } from '../base';

export interface CommandSendActivity<D = any, T = any> extends ActivityBase<D> {
  readonly type: 'command';

  /**
   * The name of the event.
   */
  name: string;

  /**
   * The value for this command.
   */
  value?: CommandValue<T>;
}

/**
 * The value field of a ICommandActivity contains metadata related to a command.
 * An optional extensible data payload may be included if defined by the command activity name.
 */
export interface CommandValue<T = any> {
  /**
   * ID of the command.
   */
  commandId: string;

  /**
   * The data field containing optional parameters specific to this command activity,
   * as defined by the name. The value of the data field is a complex type.
   */
  data?: T;
}
