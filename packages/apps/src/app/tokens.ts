import { Token } from '@teams/api';

/**
 * App tokens used to make authorized api calls
 */
export interface AppTokens {
  /**
   * bot token used to send activities
   */
  bot?: Token;

  /**
   * graph token used to query the graph api
   */
  graph?: Token;
}
