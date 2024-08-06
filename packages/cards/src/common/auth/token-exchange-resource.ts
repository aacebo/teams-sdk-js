/**
 * Defines information required to enable on-behalf-of single sign-on user authentication. Maps to the TokenExchangeResource type defined by the Bot Framework (https://docs.microsoft.com/dotnet/api/microsoft.bot.schema.tokenexchangeresource)
 */
export interface TokenExchangeResource {
  /**
   * The unique identified of this token exchange instance.
   */
  id: string;

  /**
   * An application ID or resource identifier with which to exchange a token on behalf of. This property is identity provider- and application-specific.
   */
  uri: string;

  /**
   * An identifier for the identity provider with which to attempt a token exchange.
   */
  providerId: string;
}
