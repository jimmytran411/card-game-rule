import React from 'react';

import { getRule } from '../api/rule';
import { RuleBook } from '../common/intefaces';

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
  const [ruleBook, setRuleBook] = React.useState<RuleBook>(defaultValues.ruleBook);

  React.useEffect(() => {
    const fetchRuleBook = async () => {
      const url = process.env.REACT_APP_DEFAULT_RULE_BOOK_URL;
      if (url) {
        try {
          const { data } = await getRule(url);
          setRuleBook(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchRuleBook();
  }, []);

  return <RuleBookContext.Provider value={{ ruleBook, setRuleBook }} {...props} />;
};

const useRuleBook = () => React.useContext(RuleBookContext);

export { RuleBookProvider, useRuleBook };
