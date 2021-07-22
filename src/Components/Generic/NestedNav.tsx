import React, { useRef } from "react";
import { List, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { NavLink, useRouteMatch } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnScrollProps } from "react-window";

const useStyles = makeStyles((theme: Theme) => ({
  defaultNav: {
    textDecoration: "none",
    color: "inherit",
  },
  defaultActiveNav: {
    "& div": { backgroundColor: theme.palette.action.hover },
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
  const { defaultNav, defaultActiveNav } = useStyles();

  const [isBottom, setIsBottom] = React.useState(false);
  const outerRef = useRef<{ offsetHeight: number; scrollHeight: number } | null>();

  const onScroll = ({ scrollOffset, scrollUpdateWasRequested }: ListOnScrollProps) => {
    if (scrollUpdateWasRequested === false) {
      setIsBottom(false);
    }

    if (!outerRef.current) {
      return;
    }

    if (scrollOffset + outerRef.current.offsetHeight === outerRef.current.scrollHeight) {
      setIsBottom(true);
    }
  };
  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          width={width}
          height={height}
          itemCount={navList.length}
          itemSize={40}
          itemData={navList}
          onScroll={onScroll}
          useIsScrolling={!isBottom}
          outerRef={outerRef}
        >
          {({ index, data, style, isScrolling }) => {
            const { path, content, contentClassName, activeClassName, navClassName } =
              data[index];
            return (
              <List style={style}>
                {isScrolling ? (
                  "Loading ..."
                ) : (
                  <NavLink
                    key={uuidV4()}
                    activeClassName={activeClassName ? activeClassName : defaultActiveNav}
                    className={navClassName ? navClassName : defaultNav}
                    to={`${url}/${path}`}
                  >
                    <ListItem button>
                      {typeof content === "string" ? (
                        <ListItemText className={contentClassName} primary={content} />
                      ) : (
                        content()
                      )}
                    </ListItem>
                  </NavLink>
                )}
              </List>
            );
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
