import { ComponentProps } from 'react';

export interface JsonStringProps extends ComponentProps<'div'> {
  readonly value: string;
}

export default function JsonString(props: JsonStringProps) {
  const classes = props.className?.split(' ') || [];

  return (
    <div
      {...props}
      className={[
        ...classes,
        'text-sky-300',
      ].join(' ')}
    >
      "{props.value}"
    </div>
  );
}
