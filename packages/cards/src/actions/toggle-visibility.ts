import { TargetElement } from '../common';

import { BaseAction } from './base';

/**
 * An action that toggles the visibility of associated card elements.
 */
export interface ToggleVisibilityAction extends BaseAction {
  type: 'Action.ToggleVisibility';

  /**
   * "The array of TargetElements. It is not recommended to include Input elements with validation under Action.Toggle due to confusion that can arise from invalid inputs that are not currently visible. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more information.
   */
  targetElements: (string | TargetElement)[];
}
