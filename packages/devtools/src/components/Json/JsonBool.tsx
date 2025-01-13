import { ComponentProps } from 'react';

export interface JsonBoolProps extends ComponentProps<'div'> {
  readonly value: boolean;
}

export default function JsonBool(props: JsonBoolProps) {
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
