import React from 'react';
import { NavLink } from 'react-router';

interface TopNavButtonProps {
  to: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  label: string;
}

const TopNavButton: React.FC<TopNavButtonProps> = ({ to, icon, activeIcon, label }) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'App__route active' : 'App__route')}>
      {({ isActive }) => (
        <div className="flex">
          {isActive ? activeIcon && activeIcon : icon}
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default TopNavButton;
