import { RuleList } from './Generic/RuleList';
import { useRule } from '../customHooks/useRule';
import { NestedRoutes } from './Generic/NestedRoutes';

export const RuleSearchResult = () => {
  const { searchRule, searchParam } = useRule();

  return <NestedRoutes
    routeList={[{
      path: 'search',
      renderContent: () => <RuleList
        ruleList={searchRule}
        ruleChapter={`Search for: "${searchParam}"`}
        searchParam={searchParam} />
    }]} />;
};
