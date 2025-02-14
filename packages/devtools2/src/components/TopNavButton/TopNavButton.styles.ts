import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  topNavButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 5px',

    '& :hover': {
      color: tokens.colorBrandForegroundLink,
      textDecorationLine: 'none',
    }
  },
  linkWithIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    '& svg': {
      marginRight: '5px',
    },
  },
});

export default useStyles;
