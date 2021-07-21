import React from 'react';
import {  ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme: Theme) => ({
  defaultNav: {
    textDecoration: 'none',
    color: 'inherit',
   
  },
  defaultActiveNav: {
    "& div" : {backgroundColor: theme.palette.action.hover,}
  },
 
}));

export interface NavItem {
  path: string;
  content: string | (() => JSX.Element);
  contentClassName?: string;
  activeClassName?: string;
  navClassName?: string;
}

interface NestedNavProps {
  navList: NavItem[];
}

export const NestedNav: React.FC<NestedNavProps> = ({ navList }) => {
  const { url } = useRouteMatch();
  const { defaultNav, defaultActiveNav,  } = useStyles();

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList width={width} height={height} itemCount={navList.length} itemSize={40} itemData={navList}>
          {({ index, data, style }) => {
            const { path, content, contentClassName, activeClassName, navClassName } = data[index];
            return (
             
                <NavLink 
                style={style}
                key={uuidV4()}
                activeClassName={activeClassName ? activeClassName : defaultActiveNav}
                className={navClassName ? navClassName : defaultNav}
                to={`${url}/${path}`}
              >
                <ListItem button >
                  {typeof content === 'string' ? (
                    <ListItemText className={contentClassName} primary={content} />
                  ) : (
                    content()
                  )}
                </ListItem>              
              </NavLink>
             
              
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
