import { Logger } from '@teams.sdk/common/logging';

export interface ErrorEventArgs {
  /**
   * the error
   */
  err: Error;

  /**
   * the app logger instance
   */
  log: Logger;
}

export function error({ err, log }: ErrorEventArgs) {
  log.error(err);
}
