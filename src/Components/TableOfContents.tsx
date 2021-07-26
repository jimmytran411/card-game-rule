import React, { useMemo } from "react";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";

import { useRuleBook } from "../Contexts/RuleBookContext";
import { NavItem, NestedNav } from "./Generic/NestedNav";

const useStyles = makeStyles(() => ({
  contentItem: {
    whiteSpace: "nowrap",
    overflow: "auto",
  },
}));

export const TableOfContents: React.FC = () => {
  const { chapters } = useRuleBook().ruleBook;
  const { contentItem } = useStyles();

  const navList = useMemo(() => {
    const navList: NavItem[] = chapters.map((chapter) => ({
      content: () => (
        <Typography variant="subtitle1" className={contentItem}>
          {chapter}
        </Typography>
      ),
      path: chapter.replace(/\s|\./g, "-"),
    }));
    return navList;
  }, [chapters, contentItem]);

  return (
    <>
      {!chapters.length && <CircularProgress />}
      {chapters.length && <NestedNav navList={navList} />}
    </>
  );
};
