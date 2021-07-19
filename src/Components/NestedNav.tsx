import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

export interface NavItem {
  path: string;
  content: string | (() => JSX.Element);
  contentClassName?: string;
  activeClassName?: string;
}

interface NestedNavProps {
  navList: NavItem[];
}

export const NestedNav: React.FC<NestedNavProps> = ({ navList }) => {
  const { url } = useRouteMatch();

  return (
    <List>
      {navList.map(({ path, content, contentClassName, activeClassName }) => (
        <ListItem key={uuidV4()} button>
          <NavLink activeClassName={activeClassName} to={`${url}/${path}`}>
            {typeof content === 'string' ? <ListItemText className={contentClassName} primary={content} /> : content()}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};
