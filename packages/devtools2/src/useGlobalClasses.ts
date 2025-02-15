import { makeStyles, tokens } from '@fluentui/react-components';

const useGlobalClasses = makeStyles({
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
    overflow: 'hidden',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  mainNav: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: '175px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStencil1}`,
  },
  topNav: {
    justifyContent: 'flex-end',
    height: 'auto',
    padding: '1rem 0',
  },
  navButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginRight: tokens.spacingHorizontalM,
  },
});

export default useGlobalClasses;
