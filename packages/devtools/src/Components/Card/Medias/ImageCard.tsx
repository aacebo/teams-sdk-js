import { Image } from '@teams.sdk/cards';
import { makeStyles } from '@fluentui/react-components';

export interface ImageCardProps {
  readonly value: Image;
}

const useStyles = makeStyles({
  small: {
    width: '4rem',
  },
  medium: {
    width: '8rem',
  },
  large: {
    width: '11rem',
  },
  stretch: {
    objectFit: 'cover',
  },
});

export default function ImageCard({ value }: ImageCardProps) {
  const classes = useStyles();

  const imageStyle = value.size === 'small' ? classes.small :
                     value.size === 'medium' ? classes.medium :
                     value.size === 'large' ? classes.large :
                     value.size === 'stretch' ? classes.stretch : '';

  return (
    <img
      src={value.url}
      draggable={false}
      className={imageStyle}
    />
  );
}
