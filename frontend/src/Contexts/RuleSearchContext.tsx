import * as React from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

interface RuleSearchContext {
  searchParam: string;
  handleSearch: (searchParam: string) => void;
}

const initialState: RuleSearchContext = {
  searchParam: "",
  handleSearch: () => {},
};

const RuleSearchContext = React.createContext<RuleSearchContext>(initialState);

const RuleSearchProvider: React.FC = (props: any) => {
  const [searchParam, setSearchParam] = React.useState<string>("");

  const { search } = useLocation();

  const handleSearch = (searchParam: string) => {
    setSearchParam(searchParam);
  };

  React.useEffect(() => {
    const param = qs.parse(search.slice(1));
    param.rule ? setSearchParam(param.rule.toString()) : setSearchParam("");
  }, [search]);

  return <RuleSearchContext.Provider value={{ searchParam, handleSearch }} {...props} />;
};
const useRuleSearch = (): RuleSearchContext => React.useContext(RuleSearchContext);

export { RuleSearchProvider, useRuleSearch, RuleSearchContext };
