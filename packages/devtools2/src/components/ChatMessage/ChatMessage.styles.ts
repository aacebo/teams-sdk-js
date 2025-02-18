import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  messageGroup: {
    display: 'flex',
    marginLeft: tokens.spacingHorizontalL,
    marginRight: tokens.spacingHorizontalL,
    alignItems: 'flex-end',
  },
  messageGroupSent: {
    flexDirection: 'row-reverse',
  },
  messageGroupReceived: {
    flexDirection: 'row',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalS,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.2s',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    border: '1px solid transparent',
  },
  received: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sent: {
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
    animation: 'pulse 1s infinite'
  },
  feedbackContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
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
  attachments: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalXS,
  },
  avatar: {
    display: 'flex',
    margin: tokens.spacingHorizontalS,
  },
  directionSent: {
    alignItems: 'flex-end',
  },
  directionReceived: {
    alignItems: 'flex-start',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageInner: {
    display: 'flex',
    flexDirection: 'column',
  },
}); 