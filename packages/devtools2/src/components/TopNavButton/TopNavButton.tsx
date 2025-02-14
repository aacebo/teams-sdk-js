import React from 'react';
import { NavLink } from 'react-router';
import { Link } from '@fluentui/react-components';
import useStyles from './TopNavButton.styles';

interface TopNavButtonProps {
  to: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  label: string;
}

const TopNavButton: React.FC<TopNavButtonProps> = ({ to, icon, activeIcon, label }) => {
  const classes = useStyles();
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}>
      {({ isActive }) => (
        <div className={classes.topNavButton}>
          <Link appearance="subtle" className={classes.linkWithIcon} tabIndex={-1}>
            {isActive ? activeIcon && activeIcon : icon}
            {label}
          </Link>
        </div>
      )}
    </NavLink>
  );
};

export default TopNavButton;
