import { Icon } from '@teams.sdk/cards';
import { fluentuiSystemFilled as filled, fluentuiSystemRegular as regular } from 'styled-icons';

export interface IconCardProps {
  readonly value: Icon;
}

export default function IconCard({ value }: IconCardProps) {
  const Icons = value.style === 'Filled' ? filled : regular;
  const Icon = Icons[value.name as keyof typeof Icons];
  return <Icon />;
}
