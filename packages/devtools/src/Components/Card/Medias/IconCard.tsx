import { ComponentProps, lazy, Suspense } from 'react';
import { Icon } from '@teams.sdk/cards';
import { FluentIcon } from '@fluentui/react-icons';
import classNames from 'classnames';

const loadIcon = (name: string) => {
  return lazy(() =>
    import('@fluentui/react-icons/fonts').then((module) => ({
      default: (module as any as Record<string, FluentIcon>)[name as string],
    }))
  );
};

export interface IconCardProps extends ComponentProps<'div'> {
  readonly value: Icon;
}

export default function IconCard(props: IconCardProps) {
  const { value, className } = props;
  const name = `${value.name}${value.style || 'Regular'}`;
  const Icon = loadIcon(name);

  return (
    <Suspense>
      <Icon
        className={classNames(className, {
          'text-lg': value.size === 'xxSmall',
          'text-xl': value.size === 'xSmall',
          'text-2xl': value.size === 'Standard' || value.size === 'Medium',
          'text-4xl': value.size === 'Large',
          'text-8xl': value.size === 'xLarge',
          'text-9xl': value.size === 'xxLarge',
        })}
      />
    </Suspense>
  );
}
