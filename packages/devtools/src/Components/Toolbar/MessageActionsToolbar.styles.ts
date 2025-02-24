import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    margin: 0,
  },
  emojiButtonSelected: {},
  toolbarButton: {
    width: '2rem',
    height: '2rem',
    padding: '0',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorSubtleBackground}`,
  },
});
