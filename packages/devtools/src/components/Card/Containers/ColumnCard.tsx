import { Column } from '@teams.sdk/cards';
import classNames from 'classnames';

import Card from '../Card';

export interface ColumnCardProps {
  readonly value: Column;
}

export default function ColumnCard({ value }: ColumnCardProps) {
  return (
    <div className={classNames(
      'flex', 'flex-col',
      {
        'gap-px': value.spacing === 'small',
        'gap-1': value.spacing === 'default',
        'gap-2': value.spacing === 'medium',
        'gap-3': value.spacing === 'large',
        'gap-4': value.spacing === 'extraLarge',
        'gap-5': value.spacing === 'padding',
      },
    )}>
      {value.items?.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
}
