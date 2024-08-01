import { ActivityBase } from '../base';

/**
 * Asynchronous external command result.
 */
export interface CommandResultActivity<D = any, T = any> extends ActivityBase<D> {
  readonly type: 'commandResult';

  name: string;
  value?: CommandResultValue<T>;
}

/**
 * The value field of a ICommandResultActivity contains metadata related to a command result.
 * An optional extensible data payload may be included if defined by the command activity name.
 * The presence of an error field indicates that the original command failed to complete.
 */
export interface CommandResultValue<T = any> {
  /**
   * ID of the command.
   */
  commandId: string;

  /**
   * The data field containing optional parameters specific to this command activity,
   * as defined by the name. The value of the data field is a complex type.
   */
  data?: T;

  /**
   * The optional error, if the command result indicates a failure.
   */
  error?: Error;
}
