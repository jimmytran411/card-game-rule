import React, { useMemo } from 'react';

import { useRule } from '../Contexts/RuleContext';
import { NestedNav, NavItem } from './NestedNav';
import { Redirect } from 'react-router-dom';

export const TableOfContents: React.FC = () => {
  const { sections, chapters } = useRule().ruleBook;

  const navList = useMemo(() => {
    const navList: NavItem[] = chapters.map((chapter) => ({
      content: chapter,
      path: chapter.replace(' ', '-').replace('.', ''),
    }));
    return navList;
  }, [chapters]);

  return (
    <>
      {!chapters.length && <Redirect to="/" />}
      {chapters.length && <NestedNav navList={navList} />}
    </>
  );
};
