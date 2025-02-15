import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  devtoolsLandmark: {
    fontWeight: tokens.fontWeightSemibold,
    display: 'flex',
    justifyContent: 'center',
    height: 'auto',
    alignItems: 'center',
    padding: '12px 0',
    color: tokens.colorNeutralForeground1,
  },
  teamsImg: {
    width: '2.5rem',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  badge: {
    position: 'relative',
    margin: 'auto 10px',
    opacity: 1,
  },
  pingAnimation: {
    position: 'absolute',
    display: 'inline-flex',
    backgroundColor: tokens.colorPaletteLightGreenBackground3,
    width: '12px',
    height: '12px',
    borderRadius: '100%',
    opacity: 0.75,
    animationName: {
      '0%': {
        transform: 'scale(1)',
        opacity: 0.75,
      },
      '50%': {
        transform: 'scale(1.5)',
        opacity: 0.5,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0.75,
      },
    },
    animationDuration: '1s',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    animationIterationCount: 'infinite',
    animationDelay: '0s',
  },
  
});



export default useStyles;
