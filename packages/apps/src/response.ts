/**
 * Represents a response returned by a bot when it receives an activity.
 */
export interface AppResponse<Body = any> {
  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * Optional. The body of the response.
   */
  body?: Body;
}
