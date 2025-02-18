import { HTMLAttributes, forwardRef } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: '1rem',
    gap: '0.5rem'
  }
});

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section';
}

export const Chat = forwardRef<HTMLDivElement, ChatProps>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;
  const styles = useStyles();

  return (
    <Component 
      ref={ref}
      className={`${styles.root} ${className || ''}`}
      {...rest}
    >
      {children}
    </Component>
  );
});

Chat.displayName = 'Chat'; 