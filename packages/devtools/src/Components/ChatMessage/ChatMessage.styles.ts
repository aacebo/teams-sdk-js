import { makeStyles, tokens } from '@fluentui/react-components';

export const useChatMessageStyles = makeStyles({
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    border: '1px solid transparent',
    '& a': {
      color: tokens.colorBrandForegroundLink,
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
    color: tokens.colorNeutralForegroundOnBrand,
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
  feedbackContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  attachments: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalXS,
  },
}); 