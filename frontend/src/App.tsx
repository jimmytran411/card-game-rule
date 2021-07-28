import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RuleFetcher } from './Components/RuleFetcher';
import { RuleBookProvider } from './Contexts/RuleBookContext';
import { RuleSearchProvider } from './Contexts/RuleSearchContext';
import { RuleBook } from './Components/RuleBook';
import { NavBar } from './Components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <RuleBookProvider>
            <RuleFetcher />
          </RuleBookProvider>
        </Route>
        <Route path="/rules">
          <RuleSearchProvider>
            <RuleBookProvider>
              <RuleBook />
            </RuleBookProvider>
          </RuleSearchProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
