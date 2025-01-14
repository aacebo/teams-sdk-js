import { Column } from '@teams.sdk/cards';

import Card from '../Card';

export interface ColumnCardProps {
  readonly value: Column;
}

export default function ColumnCard({ value }: ColumnCardProps) {
  return (
    <div className="flex flex-col">
      {value.items?.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
}
