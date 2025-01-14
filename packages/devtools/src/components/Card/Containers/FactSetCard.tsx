import { FactSet } from '@teams.sdk/cards';

import FactCard from './FactCard';

export interface FactSetCardProps {
  readonly value: FactSet;
}

export default function FactSetCard({ value }: FactSetCardProps) {
  return (
    <div className="flex flex-col">
      {value.facts?.map((fact) => {
        return <FactCard value={fact} />;
      })}
    </div>
  );
}
