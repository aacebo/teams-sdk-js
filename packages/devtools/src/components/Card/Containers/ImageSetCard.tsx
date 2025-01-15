import { ImageSet } from '@teams.sdk/cards';
import classNames from 'classnames';

import { ImageCard } from '../Medias';

export interface ImageSetCardProps {
  readonly value: ImageSet;
}

export default function ImageSetCard({ value }: ImageSetCardProps) {
  return (
    <div className={classNames(
      'flex', 'flex-wrap',
      {
        'gap-px': value.spacing === 'small',
        'gap-1': value.spacing === 'default',
        'gap-2': value.spacing === 'medium',
        'gap-3': value.spacing === 'large',
        'gap-4': value.spacing === 'extraLarge',
        'gap-5': value.spacing === 'padding',
      },
    )}>
      {value.images.map((image) => {
        return <ImageCard value={image} />;
      })}
    </div>
  );
}
