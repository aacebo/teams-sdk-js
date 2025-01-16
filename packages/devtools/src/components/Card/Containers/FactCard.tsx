import { Fact } from '@teams.sdk/cards';

export interface FactCardProps {
  readonly value: Fact;
}

export default function FactCard({ value }: FactCardProps) {
  return (
    <div className="flex flex-1 text-black dark:text-stone-300">
      <div className="font-semibold mr-2">{value.title}</div>

      {value.value}
    </div>
  );
}
