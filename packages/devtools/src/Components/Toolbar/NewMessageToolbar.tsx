import { FC } from 'react';
import {
  AttachRegular,
  bundleIcon,
  FluentIcon,
  SendFilled,
  SendRegular,
} from '@fluentui/react-icons/lib/fonts';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';
import { useClasses } from './Toolbar.styles';

interface NewMessageToolbarProps extends ToolbarProps {
  onSend: () => void;
}

const Send = bundleIcon(SendFilled as FluentIcon, SendRegular as FluentIcon);

const NewMessageToolbar: FC<NewMessageToolbarProps> = ({ onSend, ...props }) => {
  const classes = useClasses();

  return (
      <Toolbar aria-label="New message actions" {...props} className={classes.toolbar}>
        <ToolbarButton
          aria-label="Attach file"
          icon={<AttachRegular />}
          className={classes.toolbarButton}
        />
        <ToolbarDivider />
        <ToolbarButton
          data-tid="send-button"
          aria-label="Send message"
          className={classes.toolbarButton}
          onClick={onSend}
          icon={<Send />}
        />
      </Toolbar>
  );
};

export default NewMessageToolbar;
