import React, { useMemo } from "react";
import { makeStyles, Divider, Theme } from "@material-ui/core";

import { useRuleBook } from "../../Contexts/RuleBookContext";
import { NavItem, NestedNav } from "./NestedNav";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  chapterContent: {
    display: "flex",
    position: "relative",
  },
  chapterTitle: {
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
    bottom: 20,
    right: 0,
    maxWidth: "26vw",
    textAlign: "center",
    [theme.breakpoints.up("xl")]: {
      maxWidth: 390,
    },
    [theme.breakpoints.up("xs")]: {
      maxWidth: "18vw",
    },
  },
}));

const TableOfContents: React.FC = () => {
  const [tooltip, setTooltip] = React.useState("");

  const { chapters } = useRuleBook().ruleBook;
  const { chapterContent, tableOfContentHeader, chapterTitle, tooltipStyle } =
    useStyles();

  const navList = useMemo(() => {
    const navList: NavItem[] = chapters.map((chapter) => ({
      content: () => {
        const chapterText = chapter.match(/(?!\d)\w.+/gm);
        return (
          <div
            className={chapterContent}
            onMouseOver={() => setTooltip(chapter)}
            onMouseOut={() => setTooltip("")}
          >
            {tooltip === chapter && (
              <span className={tooltipStyle}>{chapterText}</span>
            )}
            <span>{chapter.match(/\d/gm)}</span>
            <span className={chapterTitle}>{chapterText}</span>
          </div>
        );
      },
      path: chapter.replace(/\s|\./g, "-"),
    }));
    return navList;
  }, [chapters, chapterContent, tooltip, tooltipStyle, chapterTitle]);

  return (
    <>
      {!chapters.length && <Redirect to="/" />}
      {chapters.length && (
        <>
          <div className={tableOfContentHeader}>Table of Contents</div>
          <Divider />
          <NestedNav navList={navList} />
        </>
      )}
    </>
  );
};

export default TableOfContents;
