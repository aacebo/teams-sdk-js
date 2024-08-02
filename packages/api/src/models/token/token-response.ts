/**
 * A response that includes a user token
 */
export interface TokenResponse {
  /**
   * @member {string} [channelId]
   */
  channelId?: string;

  /**
   * The connection name
   */
  connectionName: string;

  /**
   * The user token
   */
  token: string;

  /**
   * Expiration for the token, in ISO 8601 format (e.g. "2007-04-05T14:30Z")
   */
  expiration: string;

  /**
   * A collection of properties about this response, such as token polling parameters
   */
  properties?: Record<string, any>;
}
