import { Fact } from '@teams.sdk/cards';
import { Body1, Caption1Strong } from '@fluentui/react-components';
import { useContainerClasses } from './Containers.styles';

export interface FactCardProps {
  readonly value: Fact;
}

export default function FactCard({ value }: FactCardProps) {
  const classes = useContainerClasses();
  return (
    <div className={classes.container}>
      <Caption1Strong>{value.title}</Caption1Strong>

      <Body1>{value.value}</Body1>
    </div>
  );
}
