import { Container } from '@teams.sdk/cards';

import Card from '../Card';

export interface ContainerCardProps {
  readonly value: Container;
}

export default function ContainerCard({ value }: ContainerCardProps) {
  return (
    <div className="flex">
      {value.items.map((item) => {
        return <Card value={item} />;
      })}
    </div>
  );
}
