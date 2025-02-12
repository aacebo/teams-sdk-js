import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    position: 'absolute',
    right: '0',
    top: '0',
    margin: '16px 0',
  },
  toolbarButton: {
    minWidth: '0',
    width: '32px',
    height: '32px',
    padding: '0',
  },
});

export default useStyles;
