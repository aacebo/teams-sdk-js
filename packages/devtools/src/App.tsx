import { Button, Card, Title1, Body1, makeStyles } from '@fluentui/react-components';
import { BookmarkRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',
    margin: '20px',
  },
});

export default function App() {
  const styles = useStyles();

  return (
    <Card className={styles.root}>
      <Title1>Fluent UI React v9 + Vite</Title1>
      <Body1>Welcome to your new app!</Body1>
      <Button appearance="primary" icon={<BookmarkRegular />}>
        Click me
      </Button>
    </Card>
  );
}