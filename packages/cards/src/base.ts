import { Spacing } from './common';

export interface BaseElement {
  /**
   * A unique identifier associated with the item
   */
  id?: string;

  /**
   * If false, this item will be removed from the visual tree.
   */
  isVisible?: boolean;

  /**
   * A series of key/value pairs indicating features that the item requires with corresponding minimum version. When a feature is missing or of insufficient version, fallback is triggered.
   */
  requires?: Record<string, string>;

  /**
   * Specifies the height of the element.
   */
  height?: 'auto' | 'stretch' | Omit<string | number, 'auto' | 'stretch'>;

  /**
   * When `true`, draw a separating line at the top of the element.
   */
  separator?: boolean;

  /**
   * Controls the amount of spacing between this element and the preceding element.
   */
  spacing?: Spacing;

  /**
   * Describes what to do when an unknown item is encountered or the requires of this or any children can't be met.
   */
  fallback?: Element | 'drop' | Omit<string, 'drop'>;
}
