import { Container } from '@teams.sdk/cards';
import { mergeClasses } from '@fluentui/react-components';
import { useContainerClasses } from './Containers.styles';

import Card from '../Card';

export interface ContainerCardProps {
  readonly value: Container;
}

export default function ContainerCard({ value }: ContainerCardProps) {
  const classes = useContainerClasses();
  return (
    <div
      className={mergeClasses(
        classes.container,
        value.spacing ? classes[value.spacing] : classes.default
      )}
    >
      {value.items.map((item, index) => {
        return <Card key={`container-item-${index}`} value={item} />;
      })}
    </div>
  );
}
