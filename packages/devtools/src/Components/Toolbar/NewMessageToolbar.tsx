import * as React from 'react';
import { AttachRegular, Send20Regular, Send20Filled } from '@fluentui/react-icons';
import { mergeClasses, Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';
import useStyles from './Toolbar.styles';
import { useState } from 'react';

interface NewMessageToolbarProps extends ToolbarProps {
  onSend: () => void;
}

const NewMessageToolbar: React.FC<NewMessageToolbarProps> = ({ onSend, ...props }) => {
  const styles = useStyles();
  const [isSendHovered, setIsSendHovered] = useState(false);

  return (
    <Toolbar aria-label="New message actions" {...props} className={styles.toolbar}>
      <ToolbarButton
        aria-label="Attach file"
        icon={<AttachRegular />}
        className={styles.toolbarButton}
      />
      <ToolbarDivider />
      <ToolbarButton
        data-tid="send-button"
        aria-label="Send message"
        className={mergeClasses(styles.toolbarButton, styles.sendButtonFilled)}
        onMouseEnter={() => setIsSendHovered(true)}
        onMouseLeave={() => setIsSendHovered(false)}
        onClick={onSend}
      >
        {isSendHovered ? <Send20Filled className={styles.sendButtonFilled} /> : <Send20Regular />}
      </ToolbarButton>
    </Toolbar>
  );
};

export default NewMessageToolbar;
