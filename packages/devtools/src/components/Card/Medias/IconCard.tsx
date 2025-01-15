import { Icon } from '@teams.sdk/cards';
import * as icons from '@fluentui/react-icons';
import classNames from 'classnames';

export interface IconCardProps {
  readonly value: Icon;
}

export default function IconCard({ value }: IconCardProps) {
  const name = `${value.name}${value.style || 'Regular'}`;
  const Icon = (icons as any as Record<string, icons.FluentIcon>)[name as string];
  return <Icon
    className={classNames({
      'text-lg': value.size === 'xxSmall',
      'text-xl': value.size === 'xSmall',
      'text-2xl': value.size === 'Standard' || value.size === 'Medium',
      'text-4xl': value.size === 'Large',
      'text-8xl': value.size === 'xLarge',
      'text-9xl': value.size === 'xxLarge',
    })}
  />;
}
