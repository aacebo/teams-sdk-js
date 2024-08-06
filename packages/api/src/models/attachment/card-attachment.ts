import { Card } from '@teams/cards';

import { AnimationCard, AudioCard, HeroCard, ThumbnailCard, VideoCard } from '../card';
import { OAuthCard } from '../oauth';
import { SigninCard } from '../sign-in';

export type CardAttachment =
  | AdaptiveCardAttachment
  | AnimationCardAttachment
  | AudioCardAttachment
  | HeroCardAttachment
  | OAuthCardAttachment
  | SignInCardAttachment
  | ThumbnailCardAttachment
  | VideoCardAttachment;

export interface AdaptiveCardAttachment {
  contentType: 'application/vnd.microsoft.card.adaptive';
  content: Card;
}

export interface AnimationCardAttachment {
  contentType: 'application/vnd.microsoft.card.animation';
  content: AnimationCard;
}

export interface AudioCardAttachment {
  contentType: 'application/vnd.microsoft.card.audio';
  content: AudioCard;
}

export interface HeroCardAttachment {
  contentType: 'application/vnd.microsoft.card.hero';
  content: HeroCard;
}

export interface OAuthCardAttachment {
  contentType: 'application/vnd.microsoft.card.oauth';
  content: OAuthCard;
}

export interface SignInCardAttachment {
  contentType: 'application/vnd.microsoft.card.signin';
  content: SigninCard;
}

export interface ThumbnailCardAttachment {
  contentType: 'application/vnd.microsoft.card.thumbnail';
  content: ThumbnailCard;
}

export interface VideoCardAttachment {
  contentType: 'application/vnd.microsoft.card.video';
  content: VideoCard;
}
