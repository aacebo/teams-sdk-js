export interface OpenChatParams {
  /**
   * Array containing [Microsoft Entra UPNs](https://learn.microsoft.com/entra/identity/hybrid/connect/plan-connect-userprincipalname) (usually but not always an e-mail address)
   * of users with whom to begin a chat
   */
  members: string[];

  /**
   * An optional message used when initiating chat
   */
  message?: string;

  /**
   * The display name of a conversation for 3 or more users (chats with fewer than three users will ignore this field)
   */
  topic?: string;
}
