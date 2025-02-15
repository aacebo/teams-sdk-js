import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  chatPaneContainer: {
    margin: 'auto 0',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    minWidth: '500px',
    flexGrow: 1,
  },
  chatPane: {
    flexGrow: 1,
    maxWidth: '1042px',
    justifyContent: 'flex-end',
    overflow: 'auto',
    paddingBottom: '10px',
  },
  /**
   * Placeholder for banner like OOF messags, etc.
   */
  bannerContainer: {
    flex: 0,
    margin: '10px 0',
  },
});

export default useStyles;
