import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { NavLink, useRouteMatch } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import { scrollToTop } from "../../utils/scroll";

const useStyles = makeStyles((theme: Theme) => ({
  defaultNav: {
    textDecoration: "none",
    color: "inherit",
  },

  defaultActiveNav: {
    "& div": { backgroundColor: theme.palette.action.hover },
  },

  listItemEven: {
    height: "100%",
    backgroundColor: "#f2f2f2",
    "&:hover": {
      color: "white",
      backgroundColor: "#16263c",
    },
  },

  listItemOdd: {
    height: "100%",
    "&:hover": {
      color: "white",
      backgroundColor: "#16263c",
    },
  },

  listItem: {
    padding: 0,
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
  const { defaultNav, defaultActiveNav, listItem, listItemOdd, listItemEven } =
    useStyles();

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          width={width}
          height={height - 49}
          itemCount={navList.length}
          itemSize={40}
          itemData={navList}
        >
          {({ index, data, style }) => {
            const {
              path,
              content,
              contentClassName,
              activeClassName,
              navClassName,
            } = data[index];
            return (
              <List style={style} className={listItem}>
                <NavLink
                  key={uuidV4()}
                  activeClassName={
                    activeClassName ? activeClassName : defaultActiveNav
                  }
                  className={navClassName ? navClassName : defaultNav}
                  to={`${url}/${path}`}
                >
                  <ListItem
                    button
                    onClick={scrollToTop}
                    className={index % 2 === 1 ? listItemOdd : listItemEven}
                  >
                    {typeof content === "string" ? (
                      <ListItemText
                        className={contentClassName}
                        primary={content}
                      />
                    ) : (
                      content()
                    )}
                  </ListItem>
                </NavLink>
              </List>
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
