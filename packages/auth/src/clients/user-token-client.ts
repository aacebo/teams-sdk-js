import { Activity } from '@teams/schema';

import { TokenStatus, TokenResponse, TokenExchangeRequest, SignInUrlResponse } from '../models';

/**
 * Client for access user token service.
 */
export interface UserTokenClient {
  /**
   * Attempts to retrieve the token for a user that's in a login flow.
   *
   * @param userId The user id that will be associated with the token.
   * @param connectionName Name of the auth connection to use.
   * @param channelId The channel Id that will be associated with the token.
   * @param magicCode (Optional) Optional user entered code to validate.
   * @returns {Promise<UserTokenClient>} A [TokenResponse](xref:botframework-schema.TokenResponse) object.
   */
  getUserToken(
    userId: string,
    connectionName: string,
    channelId: string,
    magicCode: string
  ): Promise<TokenResponse>;

  /**
   * Get the raw signin link to be sent to the user for signin for a connection name.
   *
   * @param connectionName Name of the auth connection to use.
   * @param activity The [Activity](xref:botframework-schema.Activity) from which to derive the token exchange state.
   * @param finalRediect The final URL that the OAuth flow will redirect to.
   * @returns {Promise<SignInUrlResponse>} A [SignInUrlResponse](xref:botframework-schema.SignInUrlResponse).
   */
  getSignInResource(
    connectionName: string,
    activity: Activity,
    finalRediect: string
  ): Promise<SignInUrlResponse>;

  /**
   * Signs the user out with the token server.
   *
   * @param userId The user id that will be associated with the token.
   * @param connectionName Name of the auth connection to use.
   * @param channelId The channel Id that will be associated with the token.
   */
  signOutUser(userId: string, connectionName: string, channelId: string): Promise<void>;

  /**
   * Retrieves the token status for each configured connection for the given user.
   *
   * @param userId The user id that will be associated with the token.
   * @param channelId The channel Id that will be associated with the token.
   * @param includeFilter The includeFilter.
   * @returns {Promise<TokenStatus[]>} A list of [TokenStatus](xref:botframework-schema.TokenStatus) objects.
   */
  getTokenStatus(userId: string, channelId: string, includeFilter: string): Promise<TokenStatus[]>;

  /**
   * Retrieves Azure Active Directory tokens for particular resources on a configured connection.
   *
   * @param userId The user id that will be associated with the token.
   * @param connectionName Name of the auth connection to use.
   * @param resourceUrls The list of resource URLs to retrieve tokens for.
   * @param channelId The channel Id that will be associated with the token.
   * @returns {Promise<Record<string, TokenResponse>>} A Dictionary of resourceUrls to the corresponding [TokenResponse](xref:botframework-schema.TokenResponse).
   */
  getAadTokens(
    userId: string,
    connectionName: string,
    resourceUrls: string[],
    channelId: string
  ): Promise<Record<string, TokenResponse>>;

  /**
   * Performs a token exchange operation such as for single sign-on.
   *
   * @param userId The user id that will be associated with the token.
   * @param connectionName Name of the auth connection to use.
   * @param channelId The channel Id that will be associated with the token.
   * @param exchangeRequest The exchange request details, either a token to exchange or a uri to exchange.
   * @returns {Promise<TokenResponse>} A [TokenResponse](xref:botframework-schema.TokenResponse) object.
   */
  exchangeToken(
    userId: string,
    connectionName: string,
    channelId: string,
    exchangeRequest: TokenExchangeRequest
  ): Promise<TokenResponse>;
}
