import { Badge } from '@teams.sdk/cards';
import classNames from 'classnames';

import Tooltip from '../../Tooltip';
import IconCard from './IconCard';

export interface BadgeCardProps {
  readonly value: Badge;
}

export default function BadgeCard({ value }: BadgeCardProps) {
  if (value.tooltip) {
    return (
      <Tooltip body={value.tooltip}>
        <BadgeCardContent value={value} />
      </Tooltip>
    );
  }

  return <BadgeCardContent value={value} />;
}

function BadgeCardContent({ value }: BadgeCardProps) {
  return (
    <div
      className={classNames(
        'inline-flex px-2 py-0.5 gap-1 font-semibold border',
        {
          'flex-row': value.iconPosition === 'before',
          'flex-row-reverse': value.iconPosition === 'after',
        },
        {
          'rounded-full': value.shape === 'circular',
          rounded: value.shape === 'rounded',
        },
        {
          'text-xs': !value.size || value.size === 'medium',
          'text-base': value.size === 'large',
          'text-lg': value.size === 'extraLarge',
        },
        {
          'bg-stone-600 border-stone-600 text-neutral-200': value.style === 'default',
          'bg-stone-950 border-stone-950 text-neutral-400': value.style === 'subtle',
          'bg-stone-700 border-stone-700': value.style === 'informative',
          'bg-sky-800 border-sky-800': value.style === 'accent',
          'bg-green-700 border-green-700': value.style === 'good',
          'bg-red-800 border-red-800': value.style === 'attention',
          'bg-yellow-600 border-yellow-600 text-black': value.style === 'warning',
        },
        {
          'bg-opacity-50 text-neutral-300': value.appearance === 'tint',
        }
      )}
    >
      {value.icon && (
        <IconCard
          className="my-auto"
          value={{
            type: 'Icon',
            name: value.icon,
          }}
        />
      )}
      <span className="ml-1 my-auto">{value.text}</span>
    </div>
  );
}
