import React, { useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';

import { useRuleBook } from '../Contexts/RuleBookContext';
import { NavItem, NestedNav } from './Generic/NestedNav';

export const TableOfContents: React.FC = () => {
  const { chapters } = useRuleBook().ruleBook;

  const navList = useMemo(() => {
    const navList: NavItem[] = chapters.map((chapter) => ({
      content: chapter,
      path: chapter.replace(' ', '-').replace('.', ''),
    }));
    return navList;
  }, [chapters]);

  return (
    <>
      {!chapters.length && <CircularProgress />}
      {chapters.length && <NestedNav navList={navList} />}
    </>
  );
};
