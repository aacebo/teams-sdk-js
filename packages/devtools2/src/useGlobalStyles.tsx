import { makeStyles, tokens } from '@fluentui/react-components';

const useGlobalStyles = makeStyles({
  default: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  box: { padding: tokens.spacingHorizontalM },
  horizontalLayout: {
    display: 'flex',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
  },
});

export default useGlobalStyles;
