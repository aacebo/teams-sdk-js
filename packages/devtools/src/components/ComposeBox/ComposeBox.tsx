import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Textarea } from '@fluentui/react-components';
import { useClasses } from './ComposeBox.styles';
import NewMessageToolbar from './ComposeBoxToolbar/ComposeBoxToolbar';
import { useCardStore } from '../../stores/CardStore';
import AttachmentsContainer from '../AttachmentsContainer/AttachmentsContainer';

export interface ComposeBoxProps {
  onSend: (message: string, attachments?: AttachmentType[]) => void;
}

export interface AttachmentType {
  type: 'card' | 'file' | 'image';
  content: any;
  name?: string;
}

const ComposeBox: React.FC<ComposeBoxProps> = ({ onSend }) => {
  const classes = useClasses();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentCard, clearCurrentCard } = useCardStore();

  // Track if we've processed the current card
  const processedCardRef = useRef<any>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Process currentCard only once when it changes
  useEffect(() => {
    if (currentCard && JSON.stringify(processedCardRef.current) !== JSON.stringify(currentCard)) {
      console.log('Processing new card from CardStore:', currentCard);
      processedCardRef.current = currentCard;

      const newAttachment: AttachmentType = {
        type: 'card',
        content: currentCard
      };

      setAttachments(prev => [...prev, newAttachment]);

      // Clear the current card from the store
      clearCurrentCard();
    }
  }, [currentCard, clearCurrentCard]);

  // Handle sending message with text and attachments
  const handleSendMessage = useCallback(() => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage('');
      setAttachments([]);
      // Reset the processed card reference
      processedCardRef.current = null;
    }
  }, [message, attachments, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handle toolbar actions
  const handleToolbarAction = useCallback((toolbarAttachments?: any[]) => {
    if (toolbarAttachments && toolbarAttachments.length > 0) {
      console.log('Processing attachments from toolbar:', toolbarAttachments);

      // If we have new attachments, add them directly
      const newAttachments: AttachmentType[] = toolbarAttachments.map(attachment => ({
        type: 'card' as const,
        content: attachment.content || attachment
      }));

      // Add attachments directly without checking for duplicates
      // This is safe because we're handling toolbar actions directly
      setAttachments(prev => [...prev, ...newAttachments]);
    } else {
      // If no attachments, this is a send action
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleRemoveAttachment = useCallback((index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  }, [attachments]);

  // Memoized message input handler to prevent re-renders
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const memoizedToolbar = React.useMemo(() => (
    <NewMessageToolbar onSend={handleToolbarAction} />
  ), [handleToolbarAction]);

  return (
    <div className={classes.composeBoxContainer}>
      <div className={classes.textareaContainer}>
        <Textarea
          ref={textareaRef}
          className={classes.composeInput}
          placeholder="Type a message..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
        />
        {memoizedToolbar}

        <AttachmentsContainer
          attachments={attachments}
          onRemoveAttachment={handleRemoveAttachment}
          showRemoveButtons={true}
        />
      </div>
    </div>
  );
};

export default ComposeBox; 