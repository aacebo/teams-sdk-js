import {
  Action,
  ExecuteAction,
  OpenUrlAction,
  SubmitAction,
  ToggleVisibilityAction,
} from './actions';
import { Auth, Refresh, VerticalAlignment } from './common';
import { BackgroundImage, Element } from './elements';

export interface Card {
  type: 'AdaptiveCard';

  /**
   * The Adaptive Card schema.
   */
  $schema?: string;

  /**
   * Schema version that this card requires. If a client is lower than this version, the fallbackText will be rendered. NOTE: Version is not required for cards within an Action.ShowCard. However, it is required for the top-level card.
   */
  version: '1.0' | '1.1' | '1.2' | '1.3' | '1.4' | '1.5' | '1.6';

  /**
   * Defines how the card can be refreshed by making a request to the target Bot.
   */
  refresh?: Refresh;

  /**
   * Defines authentication information to enable on-behalf-of single sign on or just-in-time OAuth.
   */
  authentication?: Auth;

  /**
   * The card elements to show in the primary card region.
   */
  body?: Element[];

  /**
   * The Actions to show in the card’s action bar.
   */
  actions?: Action[];

  /**
   * An Action that will be invoked when the card is tapped or selected. Action.ShowCard is not supported.
   */
  selectAction?: ExecuteAction | OpenUrlAction | SubmitAction | ToggleVisibilityAction;

  /**
   * Text shown when the client doesn’t support the version specified (may contain markdown).
   */
  fallbackText?: string;

  /**
   * Specifies the background image of the card.
   */
  backgroundImage?: BackgroundImage | string;

  /**
   * Specifies the minimum height of the card.
   */
  minHeight?: string;

  /**
   * When true content in this Adaptive Card should be presented right to left. When ‘false’ content in this Adaptive Card should be presented left to right. If unset, the default platform behavior will apply.
   */
  rtl?: boolean;

  /**
   * Specifies what should be spoken for this entire card. This is simple text or SSML fragment.
   */
  speak?: string;

  /**
   * The 2-letter ISO-639-1 language used in the card. Used to localize any date/time functions.
   */
  lang?: string;

  /**
   * Defines how the content should be aligned vertically within the container. Only relevant for fixed-height cards, or cards with a minHeight specified.
   */
  verticalContentAlignment?: VerticalAlignment;
}
