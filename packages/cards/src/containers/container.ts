import { ExecuteAction, OpenUrlAction, SubmitAction, ToggleVisibilityAction } from '../actions';
import { BaseElement } from '../base';
import { VerticalAlignment } from '../common';
import { Element } from '../elements';
import { BackgroundImage } from '../elements';

/**
 * Style hint for `Container`.
 */
export type ContainerStyle = 'default' | 'emphasis' | 'good' | 'attention' | 'warning' | 'accent';

/**
 * Containers group items together.
 */
export interface Container extends BaseElement {
  type: 'Container';

  /**
   * The card elements to render inside the `Container`.
   */
  items: Element[];

  /**
   * Specifies the background image. Acceptable formats are PNG, JPEG, and GIF
   */
  backgroundImage?: BackgroundImage | string;

  /**
   * Determines whether the column should bleed through its parent's padding.
   */
  bleed?: boolean;

  /**
   * An Action that will be invoked when the `Container` is tapped or selected. `Action.ShowCard` is not supported.
   */
  selectAction?: ExecuteAction | OpenUrlAction | SubmitAction | ToggleVisibilityAction;

  /**
   * Style hint for `Container`.
   */
  style?: ContainerStyle | null;

  /**
   * Defines how the content should be aligned vertically within the container. When not specified, the value of verticalContentAlignment is inherited from the parent container. If no parent container has verticalContentAlignment set, it defaults to Top.
   */
  verticalContentAlignment?: VerticalAlignment | null;

  /**
   * Specifies the minimum height of the container in pixels, like `\"80px\"`.
   */
  minHeight?: string;

  /**
   * When `true` content in this container should be presented right to left. When 'false' content in this container should be presented left to right. When unset layout direction will inherit from parent container or column. If unset in all ancestors, the default platform behavior will apply.
   */
  rtl?: boolean | null;
}
