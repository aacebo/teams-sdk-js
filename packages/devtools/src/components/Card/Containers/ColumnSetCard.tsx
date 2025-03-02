import { ColumnSet } from '@teams.sdk/cards';
import { mergeClasses } from '@fluentui/react-components';

import ColumnCard from './ColumnCard';
import { useContainerClasses } from './Containers.styles';

export interface ColumnSetCardProps {
  readonly value: ColumnSet;
}

export default function ColumnSetCard({ value }: ColumnSetCardProps) {
  const classes = useContainerClasses();
  return (
    <div
      className={mergeClasses(
        classes.container,
        value.spacing ? classes[value.spacing] : classes.default
      )}
    >
      {value.columns?.map((column) => {
        return <ColumnCard value={column} />;
      })}
    </div>
  );
}
