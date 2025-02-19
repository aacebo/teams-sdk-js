import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  chatPaneContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0,
    gap: 0,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    minHeight: 0,
    flexGrow: 1,
  },
  scrollContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflowY: 'auto',
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: '495px',
    maxWidth: '1042px',
    margin: '0 auto',
    paddingBottom: '10px',
  },
  bannerContainer: {
    flex: 'none',
    margin: '10px 0',
    backgroundColor: tokens.colorSubtleBackground
  },
  composeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: tokens.colorNeutralBackground3,
  }
});

