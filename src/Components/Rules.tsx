import React from "react";
import { CircularProgress } from "@material-ui/core";

import { useRuleBook } from "../Contexts/RuleBookContext";
import { NestedRoute, NestedRoutes } from "./Generic/NestedRoutes";
import { RuleList } from "./Generic/RuleList";

export const Rules = () => {
  const { chapters, rules } = useRuleBook().ruleBook;

  const routeList = React.useMemo(() => {
    const rulesByChapters = chapters.map((chapter) =>
      rules.filter((rules) => {
        const chapterNum = chapter.slice(0, 3);
        const regex = new RegExp(`(?<!\s|\.)${chapterNum}`, "g");
        return rules.match(regex);
      })
    );

    return rulesByChapters.map((rules, index) => {
      const route: NestedRoute = {
        path: chapters[index].replace(/\s|\./g, "-"),
        renderContent: () => <RuleList ruleList={rules} ruleChapter={chapters[index]} />,
      };
      return route;
    });
  }, [chapters, rules]);

  return (
    <>
      {!rules.length && <CircularProgress />}
      {rules.length && <NestedRoutes routeList={routeList} />}
    </>
  );
};
