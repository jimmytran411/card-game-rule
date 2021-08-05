import React from "react";

import { useRuleBook } from "../Contexts/RuleBookContext";
import { useRuleSearch } from "../Contexts/RuleSearchContext";

export const useRule = () => {
  const { rules: fetchedRules } = useRuleBook().ruleBook;
  const { searchParam } = useRuleSearch();

  const searchRule = React.useMemo(() => {
    if (searchParam.length) {
      return fetchedRules.filter(
        ({ ruleContent, ruleId, chapterId }) =>
          ruleContent.toLowerCase().includes(searchParam.toLowerCase()) ||
          `${chapterId}.${ruleId}`
            .toLowerCase()
            .includes(searchParam.toLowerCase())
      );
    } else {
      return [];
    }
  }, [fetchedRules, searchParam]);

  return { searchRule, searchParam };
};
