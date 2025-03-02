import { ExecuteAction } from '@teams.sdk/cards';
import { Button, Tooltip, mergeClasses } from '@fluentui/react-components';
import { useExecuteActionCardClasses } from './Actions.styles';

export interface ExecuteActionCardProps {
  readonly value: ExecuteAction;
}

export default function ExecuteActionCard({ value }: ExecuteActionCardProps) {
  if (value.tooltip) {
    return (
      <Tooltip content={value.tooltip} relationship="label">
        <ExecuteActionCardContent value={value} />
      </Tooltip>
    );
  }

  return <ExecuteActionCardContent value={value} />;
}

function ExecuteActionCardContent({ value }: ExecuteActionCardProps) {
  const classes = useExecuteActionCardClasses();

  // Determine which style variant to use based on action style
  const styleVariant =
    value.style === 'default'
      ? ''
      : value.style === 'positive'
        ? classes.positiveStyle
        : classes.destructiveStyle;

  return (
    <Button
      icon={value.iconUrl ? value.iconUrl : undefined}
      className={mergeClasses(classes.button, styleVariant)}
    >
      {value.title}
    </Button>
  );
}
