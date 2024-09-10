import { BaseElement } from '../base';
import { HorizontalAlignment } from '../common';

import { IconName } from './icon';

export type BadgeAppearance = 'Filled' | 'Tint';
export type BadgeStyle =
  | 'Default'
  | 'Subtle'
  | 'Informative'
  | 'Accent'
  | 'Good'
  | 'Attention'
  | 'Warning';

/**
 * A badge element to show an icon and/or text in a compact form over a colored background.
 */
export interface Badge extends BaseElement {
  type: 'Badge';

  /**
   * Controls the strength of the background color.
   */
  appearance?: BadgeAppearance;

  /**
   * Describes how the image should be aligned if it must be cropped or if using repeat fill mode.
   */
  horizontalAlignment?: HorizontalAlignment;

  /**
   * The name of the icon to display.
   */
  icon?: IconName;

  /**
   * Controls the position of the icon.
   */
  iconPosition?: 'Before' | 'After';

  /**
   * Controls the shape of the badge.
   */
  shape?: 'Square' | 'Rounded' | 'Circular';

  /**
   * The size of the badge.
   */
  size?: 'Medium' | 'Large' | 'ExtraLarge';

  /**
   * The style of the badge.
   */
  style?: BadgeStyle;

  /**
   * The text to display.
   */
  text?: string;

  /**
   * Controls the tooltip text to display when the badge is hovered over.
   */
  tooltip?: string;
}
