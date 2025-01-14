import { Fact } from '@teams.sdk/cards';

export interface FactCardProps {
  readonly value: Fact;
}

export default function FactCard({ value }: FactCardProps) {
  return (
    <div className="flex">
      <div className="text-bold mr-2">
        {value.title}
      </div>

      {value.value}
    </div>
  );
}
