import React from 'react';

import { useRuleBook } from '../Contexts/RuleBookContext';
import { useRuleSearch } from '../Contexts/RuleSearchContext';

export const useRule = () => {
  const { rules: fetchedRules } = useRuleBook().ruleBook;
  const { searchParam } = useRuleSearch();

  const searchRule = React.useMemo(() => {
    if (searchParam.length) {
      return fetchedRules.filter((rule) => rule.includes(searchParam));
    } else {
      return [];
    }
  }, [fetchedRules, searchParam]);

  return [searchRule];
};
