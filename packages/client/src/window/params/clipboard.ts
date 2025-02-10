/**
 * Currently supported Mime type
 */
export type ClipboardMimeType = 'text/plain' | 'text/html' | 'image/png' | 'image/jpeg';

/**
 * Clipboard write parameters
 */
export interface ClipboardWriteParams {
  /** Mime Type of data to be copied to Clipboard */
  mimeType: ClipboardMimeType;

  /** Blob content in Base64 string format */
  content: string;
}
