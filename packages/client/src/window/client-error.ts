/**
 * an Error originating from
 * the parent window
 */
export interface ClientError {
  readonly errorCode: number;
  readonly message: string | Error;
}
