import { makeStyles, tokens } from '@fluentui/react-components';

const useGlobalStyles = makeStyles({
  default: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  horizontalLayout: {
    display: 'flex',
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexGrow: {
    flexGrow: 1,
  },
  // App.tsx containers styles
  appContainer: {
    height: '100vh',
  },
  topNav: {
    flex: '0 1 auto',
    justifyContent: 'flex-end',
    height: 'auto',
    padding: '1rem 0'
  },
  navButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginRight: tokens.spacingHorizontalM,
  },
});

export default useGlobalStyles;
