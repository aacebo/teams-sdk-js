import CardDesigner from '../components/CardDesigner/CardDesigner';
import { useScreensClasses } from './Screens.styles';

export default function CardsScreen() {
  const screenClasses = useScreensClasses();
  return (
    <div className={screenClasses.screenContainer}>
      <div className={screenClasses.scrollbarContainer}>
        <CardDesigner />
      </div>
    </div>
  );
}
