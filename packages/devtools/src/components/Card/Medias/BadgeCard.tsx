import { Badge } from '@teams.sdk/cards';

export interface BadgeCardProps {
  readonly value: Badge;
}

export default function BadgeCard({ value }: BadgeCardProps) {
  return (
    <div className="flex">
      {value.text}
    </div>
  );
}
