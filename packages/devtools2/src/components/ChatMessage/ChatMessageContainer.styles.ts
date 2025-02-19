import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
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
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: tokens.spacingHorizontalM,
  },
  timestamp: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalS,
  },
  timeMessageContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.2s',
  },

}); 