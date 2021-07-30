import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

export interface NestedRoute {
  path: string;
  renderContent: () => JSX.Element;
}

interface NestedRoutesProps {
  routeList: NestedRoute[];
}

const NestedRoutes: React.FC<NestedRoutesProps> = ({ routeList }) => {
  const { path: matchPath } = useRouteMatch();

  return (
    <>
      {routeList.map(({ path, renderContent }) => (
        <Route key={uuidV4()} exact path={`${matchPath}/${path}`}>
          {renderContent()}
        </Route>
      ))}
    </>
  );
};

export default NestedRoutes;
