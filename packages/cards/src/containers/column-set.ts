import { ExecuteAction, OpenUrlAction, SubmitAction, ToggleVisibilityAction } from '../actions';
import { BaseElement } from '../base';
import { HorizontalAlignment } from '../common';

import { Column } from './column';
import { ContainerStyle } from './container';

/**
 * ColumnSet divides a region into Columns, allowing elements to sit side-by-side.
 */
export interface ColumnSet extends BaseElement {
  type: 'ColumnSet';

  /**
   * The array of `Columns` to divide the region into.
   */
  columns?: Column[];

  /**
   * Determines whether the column should bleed through its parent's padding.
   */
  bleed?: boolean;

  /**
   * Specifies the minimum height of the column in pixels, like `\"80px\"`.
   */
  minHeight?: string;

  /**
   * An Action that will be invoked when the `ColumnSet` is tapped or selected. `Action.ShowCard` is not supported.
   */
  selectAction?: ExecuteAction | OpenUrlAction | SubmitAction | ToggleVisibilityAction;

  /**
   * Style hint for `ColumnSet`.
   */
  style?: ContainerStyle | null;

  /**
   * Controls the horizontal alignment of the ColumnSet. When not specified, the value of horizontalAlignment is inherited from the parent container. If no parent container has horizontalAlignment set, it defaults to Left.
   */
  horizontalAlignment?: HorizontalAlignment | null;
}
