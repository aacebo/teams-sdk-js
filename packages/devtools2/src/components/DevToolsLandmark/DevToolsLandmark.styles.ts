import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  devtoolsLandmark: {
    fontWeight: tokens.fontWeightSemibold,
    display: 'flex',
    height: '100%',
    alignItems: 'center',
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
    backgroundColor: tokens.colorPaletteLightGreenBackground3,
    width: '12px',
    height: '12px',
    borderRadius: '100%',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    animationDelay: '0.5s',
    '& @keyframes ping': {
      '&0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '&50%': {
        transform: 'scale(1.5)',
        opacity: 1,
      },
      '&100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
  },
});

export default useStyles;