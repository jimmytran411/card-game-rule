import React from "react";

import { RuleBook } from "../common/interfaces";

interface RuleBookContext {
  ruleBook: RuleBook;
  setRuleBook: React.Dispatch<React.SetStateAction<RuleBook>>;
}

const defaultValues: RuleBookContext = {
  ruleBook: {
    sections: [],
    chapters: [],
    rules: [],
  },
  setRuleBook: () => {},
};

const RuleBookContext = React.createContext<RuleBookContext>(defaultValues);

const RuleBookProvider = (props: React.PropsWithChildren<any>) => {
  const [ruleBook, setRuleBook] = React.useState<RuleBook>(
    defaultValues.ruleBook
  );

  React.useEffect(() => {
    const ruleFromStorage = localStorage.getItem("ruleBook");
    if (ruleFromStorage) {
      setRuleBook(JSON.parse(ruleFromStorage));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("ruleBook", JSON.stringify(ruleBook));
  }, [ruleBook]);

  return (
    <RuleBookContext.Provider value={{ ruleBook, setRuleBook }} {...props} />
  );
};

const useRuleBook = () => React.useContext(RuleBookContext);

export { RuleBookProvider, useRuleBook };
