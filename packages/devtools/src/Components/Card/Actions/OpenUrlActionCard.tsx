import { OpenUrlAction } from '@teams.sdk/cards';
import classNames from 'classnames';

import Tooltip from '../../Tooltip';

export interface OpenUrlActionCardProps {
  readonly value: OpenUrlAction;
}

export default function OpenUrlActionCard({ value }: OpenUrlActionCardProps) {
  if (value.tooltip) {
    return (
      <Tooltip body={value.tooltip}>
        <OpenUrlActionCardContent value={value} />
      </Tooltip>
    );
  }

  return <OpenUrlActionCardContent value={value} />;
}

function OpenUrlActionCardContent({ value }: OpenUrlActionCardProps) {
  return (
    <a
      href={value.url}
      target="_blank"
      className={classNames('inline-flex px-3 py-1 gap-1 font-semibold border rounded text-sm', {
        'bg-stone-950 border-neutral-600 text-neutral-400':
          !value.style || value.style === 'default',
        'bg-sky-800 border-sky-700': value.style === 'positive',
        'bg-red-800 border-red-700': value.style === 'destructive',
      })}
    >
      {value.iconUrl && <img src={value.iconUrl} draggable={false} />}
      {value.title}
    </a>
  );
}
