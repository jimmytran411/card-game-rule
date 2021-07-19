import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';

import { useRule } from '../Contexts/RuleContext';
import { NestedRoute, NestedRoutes } from './NestedRoutes';
import { Redirect } from 'react-router-dom';

export const Rules = () => {
  const { chapters, rules } = useRule().ruleBook;

  const routeList = React.useMemo(() => {
    const rulesByChapters = chapters.map((chapter) =>
      rules.filter((rules) => {
        const chapterNum = chapter.slice(0, 3);
        const regex = new RegExp(`(?<!\s|\.)${chapterNum}`, 'g');
        return rules.match(regex);
      })
    );

    const routeList: NestedRoute[] = rulesByChapters.map((rules, index) => {
      const route: NestedRoute = {
        path: chapters[index].replace(' ', '-').replace('.', ''),
        renderContent: () => (
          <List>
            {rules.map((rule) => (
              <ListItem key={uuidV4()}>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
        ),
      };
      return route;
    });

    return routeList;
  }, [chapters, rules]);
  return (
    <>
      {!rules.length && <Redirect to="/" />}

      {rules.length && <NestedRoutes routeList={routeList} />}
    </>
  );
};
