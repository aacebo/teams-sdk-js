import { ImageSet } from '@teams.sdk/cards';

import { ImageCard } from '../Medias';

export interface ImageSetCardProps {
  readonly value: ImageSet;
}

export default function ImageSetCard({ value }: ImageSetCardProps) {
  return (
    <div className="flex">
      {value.images.map((image) => {
        return <ImageCard value={image} />;
      })}
    </div>
  );
}
