import { RuleList } from './RuleList';
import { useRule } from '../customHooks/useRule';
import { NestedRoutes } from './Generic/NestedRoutes';

export const RuleSearchResult = () => {
  const [searchRule] = useRule();

  return <NestedRoutes routeList={[{ path: 'search', renderContent: () => <RuleList ruleList={searchRule} /> }]} />;
};
