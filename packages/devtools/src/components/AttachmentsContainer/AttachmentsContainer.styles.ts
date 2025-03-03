import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  inlineAttachmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '8px',
  },
  inlineAttachmentCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '4px',
    marginBottom: '4px',
    overflow: 'hidden',
    position: 'relative',
  },
  removeAttachmentButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    zIndex: 1,
  },
  inlineCardContent: {
    padding: '8px',
    maxWidth: '300px',
    maxHeight: '300px',
    overflow: 'auto',
  }
}); 