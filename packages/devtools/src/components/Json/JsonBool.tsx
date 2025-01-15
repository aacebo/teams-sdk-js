import { ComponentProps } from 'react';

export interface JsonBoolProps extends ComponentProps<'div'> {
  readonly value: boolean;
}

export default function JsonBool(props: JsonBoolProps) {
  const classes = props.className?.split(' ') || [];

  return (
    <div {...props} className={[...classes, 'text-violet-400'].join(' ')}>
      {props.value === true ? 'true' : 'false'}
    </div>
  );
}
