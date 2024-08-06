import { ExecuteAction, OpenUrlAction, SubmitAction, ToggleVisibilityAction } from '../actions';
import { Spacing, VerticalAlignment } from '../common';
import { Element } from '../elements';
import { BackgroundImage } from '../elements';

import { ContainerStyle } from './container';

/**
 * Defines a container that is part of a ColumnSet.
 */
export interface Column {
  type: 'Column';

  /**
   * The card elements to render inside the `Column`.
   */
  items?: Element[];

  /**
   * Specifies the background image. Acceptable formats are PNG, JPEG, and GIF
   */
  backgroundImage?: BackgroundImage | string;

  /**
   * Determines whether the column should bleed through its parent's padding.
   */
  bleed?: boolean;

  /**
   * Describes what to do when an unknown item is encountered or the requires of this or any children can't be met.
   */
  fallback?: Column | string;

  /**
   * Specifies the minimum height of the column in pixels, like `\"80px\"`.
   */
  minHeight?: string;

  /**
   * When `true` content in this column should be presented right to left. When 'false' content in this column should be presented left to right. When unset layout direction will inherit from parent container or column. If unset in all ancestors, the default platform behavior will apply.
   */
  rtl?: boolean | null;

  /**
   * When `true`, draw a separating line between this column and the previous column.
   */
  separator?: boolean;

  /**
   * Controls the amount of spacing between this column and the preceding column.
   */
  spacing?: Spacing;

  /**
   * An Action that will be invoked when the `Column` is tapped or selected. `Action.ShowCard` is not supported.
   */
  selectAction?: ExecuteAction | OpenUrlAction | SubmitAction | ToggleVisibilityAction;

  /**
   * Style hint for `Column`.
   */
  style?: ContainerStyle | null;

  /**
   * Defines how the content should be aligned vertically within the column. When not specified, the value of verticalContentAlignment is inherited from the parent container. If no parent container has verticalContentAlignment set, it defaults to Top.
   */
  verticalContentAlignment?: VerticalAlignment | null;

  /**
   * `\"auto\"`, `\"stretch\"`, a number representing relative width of the column in the column group, or in version 1.1 and higher, a specific pixel width, like `\"50px\"`.
   */
  width?: string | number;
}
