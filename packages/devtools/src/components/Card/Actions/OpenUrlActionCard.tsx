import { OpenUrlAction } from '@teams.sdk/cards';
import { Tooltip, Button } from '@fluentui/react-components';
import { useOpenUrlActionCardClasses } from './Actions.styles';

export interface OpenUrlActionCardProps {
  readonly value: OpenUrlAction;
}

export default function OpenUrlActionCard({ value }: OpenUrlActionCardProps) {
  if (value.tooltip) {
    return (
      <Tooltip content={value.tooltip} relationship="label">
        <OpenUrlActionCardContent value={value} />
      </Tooltip>
    );
  }

  return <OpenUrlActionCardContent value={value} />;
}

function OpenUrlActionCardContent({ value }: OpenUrlActionCardProps) {
  const classes = useOpenUrlActionCardClasses();

  // Determine which style variant to use based on action style
  const styleVariant =
    value.style === 'positive'
      ? classes.positiveStyle
      : value.style === 'destructive'
        ? classes.destructiveStyle
        : '';

  return (
    <Button
      appearance="transparent"
      onClick={() => window.open(value.url, '_blank')}
      className={styleVariant}
    >
      {value.iconUrl && <img alt="" src={value.iconUrl} draggable={false} />}
      {value.title}
    </Button>
  );
}
