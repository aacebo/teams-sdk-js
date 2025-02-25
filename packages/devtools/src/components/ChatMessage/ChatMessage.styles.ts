import { makeStyles, tokens } from '@fluentui/react-components';

export const useChatMessageStyles = makeStyles({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageBody: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    border: `2px solid ${tokens.colorSubtleBackground}`,
    width: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'normal',
    '&:focus-visible': {
      outline: `2px solid ${tokens.colorNeutralForeground2Link}`,
      borderRadius: tokens.borderRadiusMedium,
    },
    '& a': {
      color: tokens.colorBrandForegroundLink,
      borderRadius: tokens.borderRadiusMedium,

      '&:hover': {
        color: tokens.colorBrandForegroundLinkHover,
      },
      '&:active': {
        color: tokens.colorBrandForegroundLinkPressed,
      },
      '&:focus': {
        color: tokens.colorBrandForegroundLinkSelected,
      },
    },
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground1,
  },
  streaming: {
    position: 'relative',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  streamingIndicator: {
    display: 'inline-flex',
    backgroundColor: 'white',
    width: '5px',
    height: '13px',
    marginLeft: '4px',
    animation: 'pulse 1s infinite',
    animationName: {
      '0%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
      '100%': {
        opacity: 1,
      },
    },
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  attachments: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalXS,
  },
  popoverSurface: {
    padding: '0',
  },
  feedbackContainer: {
    display: 'flex',
    gap: '0.5rem',
  },

  reactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    visibility: 'hidden',
    gap: '0.5rem',
  },
  reactionContainerSent: {
    justifyContent: 'flex-end',
  },
  reactionContainerVisible: {
    visibility: 'visible',
  },
  reactionButton: {
    minHeight: '1rem',
    minWidth: '1rem',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  reactionFromUser: {
    border: `1px solid ${tokens.colorNeutralStrokeAccessibleSelected}`,
  },
});
