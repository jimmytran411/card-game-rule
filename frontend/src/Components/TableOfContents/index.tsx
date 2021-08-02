import React, { useMemo } from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { useRuleBook } from "../../Contexts/RuleBookContext";
import { NavItem, NestedNav } from "./NestedNav";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  contentItem: {
    whiteSpace: "nowrap",
    overflow: "auto",
  },
}));

const TableOfContents: React.FC = () => {
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
      {!chapters.length && <Redirect to="/" />}
      {chapters.length && <NestedNav navList={navList} />}
    </>
  );
};

export default TableOfContents;
