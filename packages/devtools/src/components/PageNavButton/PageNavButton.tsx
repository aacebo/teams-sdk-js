import { FC } from 'react';
import { NavLink } from 'react-router';
import { mergeClasses } from '@fluentui/react-components';
import {
  Chat20Regular,
  Chat20Filled,
  CardUi20Regular,
  CardUi20Filled,
  Search20Regular,
  Search20Filled,
  DocumentBulletList20Regular,
  DocumentBulletList20Filled,
} from '@fluentui/react-icons/lib/fonts';
import { useClasses } from './PageNavButton.styles';

type IconType = 'chat' | 'cards' | 'activities' | 'logs';

const iconMap: Record<IconType, { default: JSX.Element; active: JSX.Element }> = {
  chat: { default: <Chat20Regular tabIndex={-1} />, active: <Chat20Filled tabIndex={-1} /> },
  cards: { default: <CardUi20Regular tabIndex={-1} />, active: <CardUi20Filled tabIndex={-1} /> },
  activities: {
    default: <Search20Regular tabIndex={-1} />,
    active: <Search20Filled tabIndex={-1} />,
  },
  logs: {
    default: <DocumentBulletList20Regular tabIndex={-1} />,
    active: <DocumentBulletList20Filled tabIndex={-1} />,
  },
};

interface PageNavButtonProps {
  to: string;
  iconType: IconType;
  label: string;
}

const PageNavButton: FC<PageNavButtonProps> = ({ to, iconType, label }) => {
  const classes = useClasses();
  const icons = iconMap[iconType];

  return (
    <NavLink to={to} className={classes.pageNavButton}>
      {({ isActive }) => (
        <div
          role="presentation"
          className={mergeClasses(isActive ? classes.activeRoute : '', classes.linkWithIcon)}
        >
          {isActive ? icons.active : icons.default}
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default PageNavButton;
