import { FC } from 'react';
import { NavLink } from 'react-router';
import { Link, mergeClasses } from '@fluentui/react-components';
import {
  Chat20Regular,
  Chat20Filled,
  CardUi20Regular,
  CardUi20Filled,
  Search20Regular,
  Search20Filled,
  DocumentBulletList20Regular,
  DocumentBulletList20Filled,
} from '@fluentui/react-icons';
import useStyles from './PageNavButton.styles';

type IconType = 'chat' | 'cards' | 'activities' | 'logs';

const iconMap: Record<IconType, { default: JSX.Element; active: JSX.Element }> = {
  chat: { default: <Chat20Regular />, active: <Chat20Filled /> },
  cards: { default: <CardUi20Regular />, active: <CardUi20Filled /> },
  activities: { default: <Search20Regular />, active: <Search20Filled /> },
  logs: { default: <DocumentBulletList20Regular />, active: <DocumentBulletList20Filled /> },
};

interface PageNavButtonProps {
  to: string;
  iconType: IconType;
  label: string;
}

const PageNavButton: FC<PageNavButtonProps> = ({ to, iconType, label }) => {
  const classes = useStyles();
  const icons = iconMap[iconType];

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div className={classes.pageNavButton}>
          <Link
            appearance="subtle"
            className={
              isActive
                ? mergeClasses(classes.linkWithIcon, classes.activeRoute)
                : classes.linkWithIcon
            }
            tabIndex={-1}
          >
            {isActive ? icons.active : icons.default}
            {label}
          </Link>
        </div>
      )}
    </NavLink>
  );
};

export default PageNavButton;
