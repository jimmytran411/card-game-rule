import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

export interface NestedRoute {
  path: string;
  renderContent: () => JSX.Element;
}

interface NestedRoutesProps {
  routeList: NestedRoute[];
}

export const NestedRoutes: React.FC<NestedRoutesProps> = ({ routeList }) => {
  const { path: matchPath } = useRouteMatch();

  return (
    <Switch>
      {routeList.map(({ path, renderContent }) => (
        <Route key={uuidV4()} exact path={`${matchPath}/${path}`}>
          {renderContent()}
        </Route>
      ))}
    </Switch>
  );
};
