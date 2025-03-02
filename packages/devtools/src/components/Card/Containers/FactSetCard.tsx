import { FactSet } from '@teams.sdk/cards';
import { mergeClasses } from '@fluentui/react-components';
import { useContainerClasses } from './Containers.styles';

import FactCard from './FactCard';

export interface FactSetCardProps {
  readonly value: FactSet;
}

export default function FactSetCard({ value }: FactSetCardProps) {
  const classes = useContainerClasses();
  return (
    <div
      className={mergeClasses(
        classes.container,
        value.spacing ? classes[value.spacing] : classes.default
      )}
    >
      {value.facts?.map((fact) => {
        return <FactCard value={fact} />;
      })}
    </div>
  );
}
