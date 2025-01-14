import { TargetWidth } from '../common';

/**
 * A layout that stacks elements on top of each other. Layout.Stack is the default layout used by AdaptiveCard and all containers.
 */
export interface StackLayout {
  type: 'Layout.Stack';

  /**
   * Controls for which card width the layout should be used.
   */
  targetWidth?: TargetWidth;
}
