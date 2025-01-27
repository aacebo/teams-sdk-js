import { FactSet } from '@teams.sdk/cards';
import classNames from 'classnames';

import FactCard from './FactCard';

export interface FactSetCardProps {
  readonly value: FactSet;
}

export default function FactSetCard({ value }: FactSetCardProps) {
  return (
    <div className={classNames(
      'flex', 'flex-col', 'flex-1',
      {
        'gap-px': value.spacing === 'small',
        'gap-1': value.spacing === 'default',
        'gap-2': value.spacing === 'medium',
        'gap-3': value.spacing === 'large',
        'gap-4': value.spacing === 'extraLarge',
        'gap-5': value.spacing === 'padding',
      },
    )}>
      {value.facts?.map((fact) => {
        return <FactCard value={fact} />;
      })}
    </div>
  );
}
