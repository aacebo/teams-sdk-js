import React, { useState } from 'react';
import { Textarea } from '@fluentui/react-components';
import NewMessageToolbar from '../Toolbar/NewMessageToolbar';
import type { TextareaOnChangeData } from '@fluentui/react-components';
import { useClasses } from './ComposeBox.styles';

interface ComposeBoxProps {
  onSend: (message: string) => void;
}

const ComposeBox: React.FC<ComposeBoxProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const classes = useClasses();

  const handleInputChange = (
    _event: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextareaOnChangeData
  ) => {
    setInputText(data.value);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
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
      <NewMessageToolbar onSend={handleSend} />
    </div>
  );
};

export default ComposeBox;
