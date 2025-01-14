import { BaseElement } from '../base';
import { Color } from '../common';

/**
 * A progress bar element, to represent a value within a range.
 */
export interface ProgressBar extends BaseElement {
  type: 'ProgressBar';

  /**
   * @default `accent`
   */
  color?: Color;

  /**
   * percentage
   */
  value?: number;

  /**
   * the max value
   */
  max?: number;
}
