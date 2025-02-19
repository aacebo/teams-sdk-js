import { HTMLAttributes, forwardRef } from 'react';

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section';
}

const Chat = forwardRef<HTMLDivElement, ChatProps>(({ ...props }, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  return (
    <Component 
      ref={ref}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Chat;