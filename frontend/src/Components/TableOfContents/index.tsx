import React, { useMemo } from "react";
import { makeStyles, Divider, Theme, Grid } from "@material-ui/core";

import { useRuleBook } from "../../Contexts/RuleBookContext";
import { NavItem, NestedNav } from "./NestedNav";
import { Redirect } from "react-router-dom";
import { Header } from "./Header";
import { useSort } from "../../customHooks/useSort";

const useStyles = makeStyles((theme: Theme) => ({
  chapterContent: {
    position: "relative",
  },

  chapterTitleStyle: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "27vw",
    paddingLeft: "2vw",
    [theme.breakpoints.up("xl")]: {
      maxWidth: 405,
    },
    [theme.breakpoints.up("xs")]: {
      maxWidth: "20vw",
    },
  },

  tableOfContentHeader: {
    padding: theme.spacing(2),
    fontSize: "1.5rem",
    fontWeight: 500,
  },

  tooltipStyle: {
    position: "absolute",
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: "4px 8px",
    borderRadius: 4,
    top: 20,
    maxWidth: "26vw",
    textAlign: "center",
    [theme.breakpoints.up("xl")]: {
      maxWidth: 390,
      left: "25%",
    },
    [theme.breakpoints.up("xs")]: {
      maxWidth: "18vw",
    },
    zIndex: theme.zIndex.tooltip,
  },

  activeList: {
    "& div": {
      backgroundColor: "#327abf",
      color: "white",
    },
    "& div:hover": {
      backgroundColor: "#5c91c2",
      "& div": {
        backgroundColor: "inherit",
      },
    },
  },
}));

const TableOfContents: React.FC = () => {
  const [tooltip, setTooltip] = React.useState<string | number>("");

  const { chapters } = useRuleBook().ruleBook;
  const {
    chapterContent,
    tableOfContentHeader,
    chapterTitleStyle,
    tooltipStyle,
    activeList,
  } = useStyles();

  const splitChapters = React.useMemo(
    () =>
      chapters.map((chapter) => {
        const chapterNumber = chapter.match(/\d{3}/g);
        const chapterTitle = chapter.match(/(?!\d)\w.+/g);

        return {
          number: chapterNumber ? chapterNumber[0] : 0,
          title: chapterTitle ? chapterTitle[0] : "",
          chapter,
        };
      }),
    [chapters]
  );
  const { handleSort, order, orderBy, sortedData } = useSort(splitChapters);

  const navList = useMemo(() => {
    const navList: NavItem[] = sortedData.map(({ title, chapter, number }) => ({
      content: () => {
        return (
          <Grid
            container
            className={chapterContent}
            onMouseOver={() => setTooltip(number)}
            onMouseOut={() => setTooltip("")}
          >
            {tooltip === number && (
              <span className={tooltipStyle}>{title}</span>
            )}
            <Grid item xs={3}>
              {number}
            </Grid>
            <Grid item xs={9} className={chapterTitleStyle}>
              {title}
            </Grid>
          </Grid>
        );
      },
      path: chapter.replace(/\s|\./g, "-"),
      activeClassName: activeList,
    }));
    return navList;
  }, [
    sortedData,
    activeList,
    chapterContent,
    tooltip,
    tooltipStyle,
    chapterTitleStyle,
  ]);

  return (
    <>
      {!chapters.length && <Redirect to="/" />}
      {chapters.length && (
        <>
          <div className={tableOfContentHeader}>Table of Contents</div>
          <Divider />
          <Header
            keys={[
              { key: "number", gridSize: 4 },
              { key: "title", gridSize: 8 },
            ]}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
          />
          <NestedNav navList={navList} />
        </>
      )}
    </>
  );
};

export default TableOfContents;
