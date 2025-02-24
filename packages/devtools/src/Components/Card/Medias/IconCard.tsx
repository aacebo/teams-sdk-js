import { ComponentProps } from 'react';
import { Icon } from '@teams.sdk/cards';

// const loadIcon = (name: string) => {
//   return lazy(() =>
//     import('@fluentui/react-icons/fonts').then((module) => ({
//       default: (module as any as Record<string, FluentIcon>)[name as string],
//     }))
//   );
// };

export interface IconCardProps extends ComponentProps<'div'> {
  readonly value: Icon;
}

// const useStyles = makeStyles({
//   icon: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // Add any additional styles you want for the icon
//   },
//   size: {
//     'text-lg': {
//       fontSize: '1.125rem', // Adjust size for 'xxSmall'
//     },
//     'text-xl': {
//       fontSize: '1.25rem', // Adjust size for 'xSmall'
//     },
//     'text-2xl': {
//       fontSize: '1.5rem', // Adjust size for 'Standard' or 'Medium'
//     },
//     'text-4xl': {
//       fontSize: '2rem', // Adjust size for 'Large'
//     },
//     'text-8xl': {
//       fontSize: '3rem', // Adjust size for 'xLarge'
//     },
//     'text-9xl': {
//       fontSize: '4rem', // Adjust size for 'xxLarge'
//     },
//   },
// });

// export default function IconCard(props: IconCardProps) {
//   const { value, className } = props;
//   const classes = useStyles();
//   const name = `${value.name}${value.style || 'Regular'}`;
//   const Icon = loadIcon(name);

//   return (
//     <Suspense>
//       <Icon
//         className={mergeClasses(classes.icon, classes.size, `text-${value.size}`, className)}
//       />
//     </Suspense>
//   );
// }

export interface IconCardProps extends ComponentProps<'div'> {
  readonly value: Icon;
}

export default function IconCard(_: IconCardProps) {
  return <></>;
}
