import { memo } from 'react';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { useClasses } from './AttachmentsContainer.styles';
import AdaptiveCard from '../Card/AdaptiveCard';
import { AttachmentType } from '../ComposeBox/ComposeBox';

// Memoized attachment component to prevent re-renders
const AttachmentItem = memo(({
  attachment,
  index,
  onRemove,
  showRemoveButton = true
}: {
  attachment: AttachmentType;
  index: number;
  onRemove: (index: number) => void;
  showRemoveButton?: boolean;
}) => {
  const classes = useClasses();

  // Create a stable key based on content
  const contentKey = typeof attachment.content === 'object'
    ? JSON.stringify(attachment.content).substring(0, 20)
    : String(attachment.content).substring(0, 20);

  return (
    <div
      key={`attachment-${index}-${contentKey}`}
      className={classes.inlineAttachmentCard}
    >
      {showRemoveButton && (
        <Button
          appearance="transparent"
          icon={<Dismiss24Regular />}
          onClick={() => onRemove(index)}
          aria-label="Remove attachment"
          className={classes.removeAttachmentButton}
        />
      )}
      <div className={classes.inlineCardContent}>
        {attachment.type === 'card' && attachment.content && (
          <AdaptiveCard value={attachment.content} />
        )}
      </div>
    </div>
  );
});

// Memoized attachments container
const AttachmentsContainer = memo(({
  attachments,
  onRemoveAttachment,
  showRemoveButtons = true
}: {
  attachments: AttachmentType[];
  onRemoveAttachment: (index: number) => void;
  showRemoveButtons?: boolean;
}) => {
  const classes = useClasses();

  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className={classes.inlineAttachmentsContainer}>
      {attachments.map((attachment, index) => (
        <AttachmentItem
          key={index}
          attachment={attachment}
          index={index}
          onRemove={onRemoveAttachment}
          showRemoveButton={showRemoveButtons}
        />
      ))}
    </div>
  );
});

export default AttachmentsContainer; 