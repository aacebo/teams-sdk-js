import { ImageSet } from '@teams.sdk/cards';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import ImageCard from '../Medias/ImageCard';

export interface ImageSetCardProps {
  readonly value: ImageSet;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
  },
  small: {
    gap: '0.125rem',
  },
  medium: {
    gap: '0.5rem',
  },
  large: {
    gap: '0.75rem',
  },
  extraLarge: {
    gap: '1rem',
  },
  padding: {
    gap: '1.25rem',
  },
});

export default function ImageSetCard({ value }: ImageSetCardProps) {
  const classes = useStyles();
  const gapClass = `${value.spacing}` || classes.medium;

  return (
    <div className={mergeClasses(classes.container, gapClass)}>
      {value.images.map((image, index) => {
        return <ImageCard key={`image-${index}`} value={image} />;
      })}
    </div>
  );
}
