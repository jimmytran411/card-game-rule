import React, { Suspense } from "react";
import { CircularProgress } from "@material-ui/core";

import { useRuleBook } from "../../Contexts/RuleBookContext";
import { NestedRoute } from "./NestedRoutes";
import { RuleList } from "./RuleList";
const NestedRoutes = React.lazy(() => import("./NestedRoutes"));

const Rules: React.FC = () => {
  const { chapters, rules } = useRuleBook().ruleBook;

  const routeList = React.useMemo(() => {
    const rulesByChapters = chapters.map((chapter) =>
      rules.filter(({ chapterId }) => chapterId === chapter.chapterId)
    );

    return rulesByChapters.map((rules, index) => {
      const route: NestedRoute = {
        path: `${chapters[index].chapterId}-${chapters[
          index
        ].chapterTitle.replace(/\s|\./g, "-")}`,
        renderContent: () => (
          <RuleList
            ruleList={rules}
            ruleChapter={`${chapters[index].chapterId}. ${chapters[index].chapterTitle}`}
            chapters={chapters}
          />
        ),
      };
      return route;
    });
  }, [chapters, rules]);

  return (
    <>
      {!rules.length && <CircularProgress />}
      {rules.length && (
        <Suspense fallback={<CircularProgress />}>
          <NestedRoutes routeList={routeList} />
        </Suspense>
      )}
    </>
  );
};
export default Rules;
