import { ColumnSet } from '@teams.sdk/cards';
import classNames from 'classnames';

import ColumnCard from './ColumnCard';

export interface ColumnSetCardProps {
  readonly value: ColumnSet;
}

export default function ColumnSetCard({ value }: ColumnSetCardProps) {
  return (
    <div className={classNames(
      'flex', 'flex-1',
      {
        'gap-px': value.spacing === 'small',
        'gap-1': value.spacing === 'default',
        'gap-2': value.spacing === 'medium',
        'gap-3': value.spacing === 'large',
        'gap-4': value.spacing === 'extraLarge',
        'gap-5': value.spacing === 'padding',
      },
    )}>
      {value.columns?.map((column) => {
        return <ColumnCard value={column} />;
      })}
    </div>
  );
}
