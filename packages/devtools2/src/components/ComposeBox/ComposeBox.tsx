import React, { useState } from 'react';
import { Textarea } from '@fluentui/react-components';
import NewMessageToolbar from '../Toolbar/NewMessageToolbar';
import type { TextareaOnChangeData } from '@fluentui/react-components';
import { useStyles } from './ComposeBox.styles';

interface ComposeBoxProps {
  onSend: (message: string) => void;
}

const ComposeBox: React.FC<ComposeBoxProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const classes = useStyles();

  const handleInputChange = (
    _event: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextareaOnChangeData
  ) => {
    setInputText(data.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={classes.composeBoxContainer}>
      <Textarea
        className={classes.composeInput}
        placeholder="Type a message..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="Compose box"
      />
      <NewMessageToolbar onSend={handleSendMessage} />
    </div>
  );
};

export default ComposeBox;
