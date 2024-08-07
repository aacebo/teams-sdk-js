import { ExecuteAction, OpenUrlAction, SubmitAction, ToggleVisibilityAction } from '../actions';
import { BaseElement } from '../base';
import { HorizontalAlignment } from '../common';

/**
 * Displays an image. Acceptable formats are PNG, JPEG, and GIF
 */
export interface Image extends BaseElement {
  type: 'Image';

  /**
   * The URL to the image. Supports data URI in version 1.2+
   */
  url: string;

  /**
   * Alternate text describing the image.
   */
  altText?: string;

  /**
   * Applies a background to a transparent image. This property will respect the image style.
   */
  backgroundColor?: string;

  /**
   * Controls how this element is horizontally positioned within its parent. When not specified, the value of horizontalAlignment is inherited from the parent container. If no parent container has horizontalAlignment set, it defaults to Left.
   */
  horizontalAlignment?: HorizontalAlignment;

  /**
   * An Action that will be invoked when the Image is tapped or selected. Action.ShowCard is not supported.
   */
  selectAction?: ExecuteAction | OpenUrlAction | SubmitAction | ToggleVisibilityAction;

  /**
   * Controls the approximate size of the image. The physical dimensions will vary per host.
   */
  size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';

  /**
   * Controls how this Image is displayed.
   */
  style?: 'default' | 'person';

  /**
   * The desired on-screen width of the image, ending in ‘px’. E.g., 50px. This overrides the size property.
   */
  width?: string;
}
