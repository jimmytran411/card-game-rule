import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { RuleFetcher } from "./Components/RuleFetcher";
import { RuleBookProvider } from "./Contexts/RuleBookContext";
import { RuleSearchProvider } from "./Contexts/RuleSearchContext";
import { RuleBook } from "./Components/RuleBook";
import { NavBar } from "./Components/NavBar";

function App() {
  return (
    <Router>
      <Switch>
        <RuleBookProvider>
          <RuleSearchProvider>
            <Route exact path="/">
              <NavBar />
              <RuleFetcher />
            </Route>
            <Route path="/rules">
              <NavBar />
              <RuleBook />
            </Route>
          </RuleSearchProvider>
        </RuleBookProvider>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
