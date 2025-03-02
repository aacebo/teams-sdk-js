import { OpenUrlAction } from '@teams.sdk/cards';
import { Link, Tooltip } from '@fluentui/react-components';
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
    value.style === 'default'
      ? ''
      : value.style === 'positive'
        ? classes.positiveStyle
        : classes.destructiveStyle;

  return (
    <Link href={value.url} target="_blank" className={styleVariant}>
      {value.iconUrl && <img alt="" src={value.iconUrl} draggable={false} />}
      {value.title}
    </Link>
  );
}
