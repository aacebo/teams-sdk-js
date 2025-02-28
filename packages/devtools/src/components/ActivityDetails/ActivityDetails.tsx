import { Button, Tooltip, Switch, InfoLabel } from '@fluentui/react-components';
import { CopyRegular } from '@fluentui/react-icons/lib/fonts';
import Json from '../Json/Json';
import useActivityDetailsClasses from './ActivityDetails.styles';
import { ActivityEvent } from '../../types/Event';

interface ActivityDetailsProps {
  selected: ActivityEvent;
  view: 'preview' | 'json';
  setView: (view: 'preview' | 'json') => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ selected, view, setView }) => {
  const classes = useActivityDetailsClasses();

  return (
    <div className={classes.selectedContainer}>
      <div className={classes.selectedHeader}>
        <div className={classes.copyButtonContainer}>
          <Tooltip content="Copy to clipboard" relationship="label">
            <Button
              aria-label="Copy to clipboard"
              icon={<CopyRegular />}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(selected));
              }}
            />
          </Tooltip>
        </div>

        <div className={classes.checkboxContainer}>
          <InfoLabel
            info={
              <>
                Use this switch to toggle between Preview and JSON view of the activity payload.
                Preview shows a tree view of the activity, while JSON shows the raw JSON payload.
              </>
            }
          >
            <Switch
              checked={view === 'json'}
              onChange={(event) => {
                setView(event.target.checked ? 'json' : 'preview');
              }}
              label={view === 'json' ? 'JSON' : 'Preview'}
              aria-label="Toggle between Preview and JSON"
            />
          </InfoLabel>
        </div>
      </div>

      <div className={classes.jsonContainer}>
        <Json
          className={classes.json}
          value={selected.type === 'activity.error' ? selected.error : selected.body}
          stringify={view === 'json'}
        />
      </div>
    </div>
  );
};

export default ActivityDetails;
