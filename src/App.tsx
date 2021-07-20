import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import { Rules } from './Components/Rules';
import { TableOfContents } from './Components/TableOfContents';
import { RuleFetcher } from './Components/RuleFetcher';
import { RuleBookProvider } from './Contexts/RuleBookContext';
import { RuleSearch } from './Components/RuleSearch';
import { RuleSearchProvider } from './Contexts/RuleSearchContext';
import { RuleSearchResult } from './Components/RuleSearchResult';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RuleBookProvider>
            <RuleFetcher />
          </RuleBookProvider>
        </Route>
        <Route path="/rules">
          <RuleSearchProvider>
            <RuleBookProvider>
              <RuleSearch />
              <Grid container>
                <Grid item xs={4}>
                  <TableOfContents />
                </Grid>
                <Grid item xs={8}>
                  <Rules />
                  <RuleSearchResult />
                </Grid>
              </Grid>
            </RuleBookProvider>
          </RuleSearchProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
