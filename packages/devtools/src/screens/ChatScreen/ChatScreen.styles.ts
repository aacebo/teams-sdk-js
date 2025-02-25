import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  chatPaneContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
  },
  scrollbarContainer: {
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  messagesList: {
    maxWidth: '1042px',
    minWidth: '495px',
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: '10px 0',
    flex: 1,
  },
  composeContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  composeInner: {
    maxWidth: '1042px',
    minWidth: '495px',
    margin: '0 auto',
  },
  typingIndicator: {
    height: '30px',
    paddingLeft: '50px',
  },
  bannerContainer: {
    backgroundColor: tokens.colorSubtleBackground,
    margin: '10px 0',
  },
});
