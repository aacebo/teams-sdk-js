import { Icon } from '@teams.sdk/cards';
import * as icons from '@fluentui/react-icons';

export interface IconCardProps {
  readonly value: Icon;
}

export default function IconCard({ value }: IconCardProps) {
  const name = `${value.name}${value.style || 'Regular'}`;
  const Icon = (icons as any as Record<string, icons.FluentIcon>)[name as string];
  return <Icon />;
}
