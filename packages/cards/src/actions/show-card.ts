import { Card } from '../card';

import { BaseAction } from './base';

/**
 * Defines an AdaptiveCard which is shown to the user when the button or link is clicked.
 */
export interface ShowCardAction extends BaseAction {
  type: 'Action.ShowCard';
  card?: Card;
}

export type ShowCardActionParams = Omit<ShowCardAction, 'type'>;

/**
 * Defines an AdaptiveCard which is shown to the user when the button or link is clicked.
 */
export function ShowCardAction(params: ShowCardActionParams): ShowCardAction {
  return {
    type: 'Action.ShowCard',
    ...params,
  };
}
