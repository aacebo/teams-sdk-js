/**
 * Describes the authentication pop-up parameters
 */
export interface AuthPopUpParams {
  /**
   * The URL for the authentication pop-up.
   */
  url: string;

  /**
   * The preferred width for the pop-up. This value can be ignored if outside the acceptable bounds.
   */
  width?: number;

  /**
   * The preferred height for the pop-up. This value can be ignored if outside the acceptable bounds.
   */
  height?: number;

  /**
   * Some identity providers restrict their authentication pages from being displayed in embedded browsers (e.g., a web view inside of a native application)
   * If the identity provider you are using prevents embedded browser usage, this flag should be set to `true` to enable the authentication page specified in
   * the {@link url} property to be opened in an external browser.
   * If this flag is `false`, the page will be opened directly within the current hosting application.
   *
   * This flag is ignored when the host for the application is a web app (as opposed to a native application) as the behavior is unnecessary in a web-only
   * environment without an embedded browser.
   */
  isExternal?: boolean;
}

/**
 * Describes authentication token request parameters
 */
export interface AuthTokenRequestParams {
  /**
   * An list of resources for which to acquire the access token; only for internal Microsoft usage
   */
  resources?: string[];

  /**
   * An optional list of claims which to pass to Microsoft Entra when requesting the access token.
   */
  claims?: string[];

  /**
   * An optional flag indicating whether to attempt the token acquisition silently or allow a prompt to be shown.
   */
  silent?: boolean;

  /**
   * An optional identifier of the home tenant for which to acquire the access token for (used in cross-tenant shared channels).
   */
  tenantId?: string;
}
