import { FC } from 'react';
import { AttachRegular, Send20Regular, Send20Filled, bundleIcon } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';
import useStyles from './Toolbar.styles';

interface NewMessageToolbarProps extends ToolbarProps {
  onSend: () => void;
}
const Send = bundleIcon(Send20Filled, Send20Regular);

const NewMessageToolbar: FC<NewMessageToolbarProps> = ({ onSend, ...props }) => {
  const classes = useStyles();

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
