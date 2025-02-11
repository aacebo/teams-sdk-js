/**
 * Describes errors that caused app initialization to fail
 */
export type FailedReason = 'AuthFailed' | 'Timeout' | 'Other';

/**
 * Describes errors that caused app initialization to fail
 */
export enum FailedReasons {
  /**
   * Authentication failed
   */
  AuthFailed = 'AuthFailed',

  /**
   * The application timed out
   */
  Timeout = 'Timeout',

  /**
   * The app failed for a different reason
   */
  Other = 'Other',
}

/**
 * Describes expected errors that occurred during an otherwise successful
 * app initialization
 */
export type ExpectedFailureReason =
  | 'PermissionError'
  | 'NotFound'
  | 'Throttling'
  | 'Offline'
  | 'Other';

/**
 * Describes expected errors that occurred during an otherwise successful
 * app initialization
 */
export enum ExpectedFailureReasons {
  /**
   * There was a permission error
   */
  PermissionError = 'PermissionError',

  /**
   * The item was not found
   */
  NotFound = 'NotFound',

  /**
   * The network is currently throttled
   */
  Throttling = 'Throttling',

  /**
   * The application is currently offline
   */
  Offline = 'Offline',

  /**
   * The app failed for a different reason
   */
  Other = 'Other',
}

/**
 * Represents the failed request sent during a failed app initialization.
 */
export interface FailedParams {
  /**
   * The reason for the failure
   */
  reason: FailedReason;

  /**
   * This property is currently unused.
   */
  message?: string;
}

/**
 * Represents the failure request sent during an erroneous app initialization.
 */
export interface ExpectedFailureParams {
  /**
   * The reason for the failure
   */
  reason: ExpectedFailureReason;

  /**
   * A message that describes the failure
   */
  message?: string;
}
