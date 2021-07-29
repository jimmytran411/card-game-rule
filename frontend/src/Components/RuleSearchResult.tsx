import { RuleList } from "./Generic/RuleList";
import { useRule } from "../customHooks/useRule";
import { NestedRoutes } from "./Generic/NestedRoutes";
import { useRuleBook } from "../Contexts/RuleBookContext";

export const RuleSearchResult = () => {
  const { searchRule, searchParam } = useRule();
  const { chapters } = useRuleBook().ruleBook;

  return (
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
  );
};
