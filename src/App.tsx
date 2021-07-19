import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Rules } from './Components/Rules';
import { TableOfContents } from './Components/TableOfContents';
import { RuleSearch } from './Components/RuleSearch';
import { RuleProvider } from './Contexts/RuleContext';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RuleProvider>
            <RuleSearch />
          </RuleProvider>
        </Route>
        <Route path="/rules">
          <RuleProvider>
            <Grid container>
              <Grid item xs={4}>
                <TableOfContents />
              </Grid>
              <Grid item xs={8}>
                <Rules />
              </Grid>
            </Grid>
          </RuleProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
