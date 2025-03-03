import { ActionSet } from '@teams.sdk/cards';

import { ActionCard } from '../Actions/ActionCard';
import { useContainerClasses } from './Containers.styles';
import { mergeClasses } from '@fluentui/react-components';

export interface ActionSetCardProps {
  readonly value: ActionSet;
}

export default function ActionSetCard({ value }: ActionSetCardProps) {
  const classes = useContainerClasses();

  return (
    <div
      className={mergeClasses(
        classes.container,
        value.spacing ? classes[value.spacing] : classes.default
      )}
    >
      {value.actions?.map((action, index) => {
        return <ActionCard key={`action-${index}`} value={action} />;
      })}
    </div>
  );
}
