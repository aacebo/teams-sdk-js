import { Column } from '@teams.sdk/cards';
import { mergeClasses } from '@fluentui/react-components';
import { useContainerClasses } from './Containers.styles';

import Card from '../Card';

export interface ColumnCardProps {
  readonly value: Column;
}

export default function ColumnCard({ value }: ColumnCardProps) {
  const classes = useContainerClasses();
  return (
    <div
      className={mergeClasses(
        classes.container,
        value.spacing ? classes[value.spacing] : classes.default
      )}
    >
      {value.items?.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
}
