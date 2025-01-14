import { Image } from '@teams.sdk/cards';

export interface ImageCardProps {
  readonly value: Image;
}

export default function ImageCard({ value }: ImageCardProps) {
  return <img src={value.url} />;
}
