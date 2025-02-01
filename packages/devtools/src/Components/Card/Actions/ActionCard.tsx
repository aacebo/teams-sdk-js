import { Action } from '@teams.sdk/cards';

import OpenUrlActionCard from './OpenUrlActionCard';
import ExecuteActionCard from './ExecuteActionCard';

export interface ActionCardProps {
  readonly value: Action;
}

export default function ActionCard({ value }: ActionCardProps) {
  switch (value.type) {
    case 'Action.OpenUrl':
      return <OpenUrlActionCard value={value} />;
    case 'Action.Execute':
      return <ExecuteActionCard value={value} />;
  }

  return <>not found</>;
}
