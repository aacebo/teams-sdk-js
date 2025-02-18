import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  pageNavButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 5px',

    '& :hover': {
      color: tokens.colorBrandForegroundLinkHover,
      textDecorationLine: 'none',
    },
    '& :active': {
      color: tokens.colorBrandForegroundLinkSelected,
      textDecorationLine: 'none',
    },
    '& :visited': {
      color: tokens.colorSubtleBackground,
      textDecorationLine: 'none',
    },
  },
  activeRoute: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: 'none',
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
    '& :active': {
      textDecorationLine: 'none',
    },
  },
});

export default useStyles;
