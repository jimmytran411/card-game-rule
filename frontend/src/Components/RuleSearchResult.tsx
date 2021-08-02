import React, { Suspense } from "react";

import { RuleList } from "./Rules/RuleList";
import { useRule } from "../customHooks/useRule";
import { useRuleBook } from "../Contexts/RuleBookContext";
import { CircularProgress } from "@material-ui/core";
const NestedRoutes = React.lazy(() => import("./Rules/NestedRoutes"));

export const RuleSearchResult: React.FC = () => {
  const { searchRule, searchParam } = useRule();
  const { chapters } = useRuleBook().ruleBook;

  return (
    <Suspense fallback={<CircularProgress />}>
      <NestedRoutes
        routeList={[
          {
            path: "search",
            renderContent: () => (
              <RuleList
                ruleList={searchRule}
                ruleChapter={`Search for: "${searchParam}"`}
                chapters={chapters}
              />
            ),
          },
        ]}
      />
    </Suspense>
  );
};
