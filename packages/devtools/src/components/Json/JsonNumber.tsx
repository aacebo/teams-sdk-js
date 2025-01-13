import { ComponentProps } from 'react';

export interface JsonNumberProps extends ComponentProps<'div'> {
  readonly value: number;
}

export default function JsonNumber(props: JsonNumberProps) {
  const classes = props.className?.split(' ') || [];

  return (
    <div
      {...props}
      className={[
        ...classes,
        'text-violet-600',
      ].join(' ')}
    >
      {props.value}
    </div>
  );
}
