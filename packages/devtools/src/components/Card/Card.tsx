import { Element } from '@teams.sdk/cards';

import { ContainerCard, ColumnSetCard, FactSetCard, ImageSetCard } from './Containers';
import { BadgeCard, CodeBlockCard, IconCard, ImageCard } from './Medias';

export interface CardProps {
  readonly value: Element;
}

export default function Card({ value }: CardProps) {
  switch (value.type) {
  case 'Container':
    return <ContainerCard value={value} />;
  case 'ColumnSet':
    return <ColumnSetCard value={value} />;
  case 'FactSet':
    return <FactSetCard value={value} />;
  case 'ImageSet':
    return <ImageSetCard value={value} />;
  case 'Badge':
    return <BadgeCard value={value} />;
  case 'CodeBlock':
    return <CodeBlockCard value={value} />;
  case 'Icon':
    return <IconCard value={value} />;
  case 'Image':
    return <ImageCard value={value} />;
  }

  return <>not found</>;
}
