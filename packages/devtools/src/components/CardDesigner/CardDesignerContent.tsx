import { Card } from '@teams.sdk/cards';

import AdaptiveCard from '../Card/AdaptiveCard';

export interface CardDesignerContentProps {
  readonly value: Card;
}

export default function CardDesignerContent({ value }: CardDesignerContentProps) {
  return (
    <div className="flex flex-col justify-center flex-1 px-5">
      <AdaptiveCard value={value} />
    </div>
  );
}
