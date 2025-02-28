import { makeStyles } from '@fluentui/react-components';

export const useClasses = makeStyles({
  toolbar: {
    position: 'absolute',
    right: '0',
    top: '0',
    margin: '16px 0',
  },
  toolbarButton: {
    minWidth: '0',
    width: '2rem',
    height: '2rem',
    padding: '0',
  },
});
