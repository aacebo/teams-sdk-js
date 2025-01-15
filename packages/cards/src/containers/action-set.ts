import { Action } from '../actions';
import { BaseElement } from '../base';

/**
 * Displays a set of actions.
 */
export interface ActionSet extends BaseElement {
  type: 'ActionSet';

  /**
   * The array of `Action` elements to show.
   */
  actions: Action[];
}
