import { ActionSet } from '@teams.sdk/cards';
import classNames from 'classnames';

import { ActionCard } from '../Actions';

export interface ActionSetCardProps {
  readonly value: ActionSet;
}

export default function ActionSetCard({ value }: ActionSetCardProps) {
  return (
    <div className={classNames(
      'flex',
      {
        'gap-px': value.spacing === 'small',
        'gap-1': value.spacing === 'default',
        'gap-2': value.spacing === 'medium',
        'gap-3': value.spacing === 'large',
        'gap-4': value.spacing === 'extraLarge',
        'gap-5': value.spacing === 'padding',
      },
    )}>
      {value.actions?.map((action) => {
        return <ActionCard value={action} />;
      })}
    </div>
  );
}
