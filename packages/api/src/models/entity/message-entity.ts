export interface MessageEntity {
  readonly type: 'message';

  /**
   * additional content type tags
   */
  additionalTypes: string[];
}
