import React from 'react';
import { RuleBook } from '../common/intefaces';

interface RuleContextProps {
  ruleBook: RuleBook;

  setRuleBook: React.Dispatch<React.SetStateAction<RuleBook>>;
}

const defaultValues: RuleContextProps = {
  ruleBook: {
    sections: [],
    chapters: [],
    rules: [],
  },
  setRuleBook: () => {},
};

const RuleContext = React.createContext<RuleContextProps>(defaultValues);

const RuleProvider = (props: React.PropsWithChildren<any>) => {
  const [ruleBook, setRuleBook] = React.useState<RuleBook>(defaultValues.ruleBook);

  return <RuleContext.Provider value={{ ruleBook, setRuleBook }} {...props} />;
};

const useRule = () => React.useContext(RuleContext);

export { RuleProvider, useRule };
