export interface Attachment {
  /**
   * mimetype/Contenttype for the file
   */
  contentType: string;

  /**
   * Content Url
   */
  contentUrl?: string;

  /**
   * Embedded content
   */
  content?: any; // eslint-disable-line

  /**
   * (OPTIONAL) The name of the attachment
   */
  name?: string;

  /**
   * (OPTIONAL) Thumbnail associated with attachment
   */
  thumbnailUrl?: string;
}
