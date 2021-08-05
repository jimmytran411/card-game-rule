import React, { useMemo } from "react";
import {
  makeStyles,
  Divider,
  Theme,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { useRuleBook } from "../../Contexts/RuleBookContext";
import { NavItem, NestedNav } from "./NestedNav";
import { Redirect } from "react-router-dom";
import { ListHeader } from "./ListHeader";
import { useSort } from "../../customHooks/useSort";

const useStyles = makeStyles((theme: Theme) => ({
  tableOfContentHeader: {
    padding: theme.spacing(2),
    fontSize: "1.5rem",
    fontWeight: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderBottom: "1px solid #0000003d",
    borderTop: "1px solid #0000003d",
    minHeight: "10%",
  },

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

  activeList: {
    "& > div": {
      fontWeight: 800,
      border: "3px solid #00000042",
    },
    "& div:hover": {
      backgroundColor: "#16263c",
      "& div": {
        backgroundColor: "inherit",
      },
    },
  },

  numberStyle: {
    marginLeft: "auto",
    width: "fit-content",
  },

  content: {
    height: "100%",
  },
}));

const TableOfContents: React.FC = () => {
  const { chapters } = useRuleBook().ruleBook;
  const {
    chapterContent,
    tableOfContentHeader,
    chapterTitleStyle,
    activeList,
    numberStyle,
    content,
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
          <Grid container className={chapterContent}>
            <Grid item xs={3}>
              <div className={numberStyle}>{number}</div>
            </Grid>

            <Grid item xs={9} className={chapterTitleStyle}>
              <Tooltip title={title} arrow placement="top-start">
                <span>{title}</span>
              </Tooltip>
            </Grid>
          </Grid>
        );
      },
      path: chapter.replace(/\s|\./g, "-"),
      activeClassName: activeList,
    }));
    return navList;
  }, [sortedData, activeList, chapterContent, numberStyle, chapterTitleStyle]);

  return (
    <>
      {!chapters.length && <Redirect to="/" />}
      {chapters.length && (
        <>
          <div className={tableOfContentHeader}>
            <Typography variant="h4">Table of Contents</Typography>
            <Typography variant="subtitle2">{`Number of chapters: ${chapters.length}`}</Typography>
          </div>
          <Divider />
          <ListHeader
            keys={[
              { key: "number", gridSize: 4 },
              { key: "title", gridSize: 8 },
            ]}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
          />
          <div className={content}>
            <NestedNav navList={navList} />
          </div>
        </>
      )}
    </>
  );
};

export default TableOfContents;
