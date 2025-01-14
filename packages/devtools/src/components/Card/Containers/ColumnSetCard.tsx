import { ColumnSet } from '@teams.sdk/cards';

import ColumnCard from './ColumnCard';

export interface ColumnSetCardProps {
  readonly value: ColumnSet;
}

export default function ColumnSetCard({ value }: ColumnSetCardProps) {
  return (
    <div className="flex">
      {value.columns?.map((column) => {
        return <ColumnCard value={column} />;
      })}
    </div>
  );
}
