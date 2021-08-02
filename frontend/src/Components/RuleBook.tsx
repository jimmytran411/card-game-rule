import React, { Suspense } from "react";
import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";

import { RuleSearchResult } from "./RuleSearchResult";
const Rules = React.lazy(() => import("./Rules"));
const TableOfContents = React.lazy(() => import("./TableOfContents"));

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },

    tableOfContent: {
      width: "40%",
    },

    content: {
      width: "60%",
    },
  })
);

export const RuleBook: React.FC = () => {
  const { root, content, tableOfContent } = useStyles();

  return (
    <div className={root}>
      <div className={tableOfContent}>
        <Suspense fallback={<CircularProgress />}>
          <TableOfContents />
        </Suspense>
      </div>

      <div className={content}>
        <Suspense fallback={<CircularProgress />}>
          <Rules />
        </Suspense>
        <RuleSearchResult />
      </div>
    </div>
  );
};
