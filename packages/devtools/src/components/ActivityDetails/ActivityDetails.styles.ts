import { makeStyles } from '@fluentui/react-components';

const useActivityDetailsClasses = makeStyles({
  selectedContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectedHeader: {
    display: 'flex',
    padding: '0.5rem 1rem',
  },
  copyButtonContainer: {
    marginRight: '0.5rem',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  jsonContainer: {
    overflowY: 'auto',
    padding: '0.5rem',
  },
  json: {
    margin: '0.5rem',
  },
});

export default useActivityDetailsClasses; 