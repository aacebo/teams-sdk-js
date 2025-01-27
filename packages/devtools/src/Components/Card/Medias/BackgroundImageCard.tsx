import { BackgroundImage } from '@teams.sdk/cards';

export interface BackgroundImageCardProps {
  readonly value: BackgroundImage;
}

export default function BackgroundImageCard({ value }: BackgroundImageCardProps) {
  return <img src={value.url} />;
}
