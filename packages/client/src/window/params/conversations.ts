export interface OpenConversationParams {
  /**
   * The Id of the subEntity where the conversation is taking place
   */
  subEntityId: string;

  /**
   * The title of the conversation
   */
  title: string;

  /**
   * The Id of the conversation. This is optional and should be specified whenever a previous conversation about a specific sub-entity has already been started before
   */
  conversationId?: string;

  /**
   * The Id of the channel. This is optional and should be specified whenever a conversation is started or opened in a personal app scope
   */
  channelId?: string;

  /**
   * The entity Id of the tab
   */
  entityId: string;
}
