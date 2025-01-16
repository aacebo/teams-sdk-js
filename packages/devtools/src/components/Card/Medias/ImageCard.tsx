import { Image } from '@teams.sdk/cards';
import classNames from 'classnames';

export interface ImageCardProps {
  readonly value: Image;
}

export default function ImageCard({ value }: ImageCardProps) {
  return (
    <img
      src={value.url}
      draggable={false}
      className={classNames({
        'w-16': value.size === 'small',
        'w-32': value.size === 'medium',
        'w-44': value.size === 'large',
        'object-cover': value.size === 'stretch',
      })}
    />
  );
}
