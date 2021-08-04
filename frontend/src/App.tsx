import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core";

import { RuleFetcher } from "./Components/RuleFetcher";
import { RuleBookProvider } from "./Contexts/RuleBookContext";
import { RuleSearchProvider } from "./Contexts/RuleSearchContext";
import { RuleBook } from "./Components/RuleBook";
import { NavBar } from "./Components/NavBar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    maxWidth: 1500,
    height: "100vh",
    margin: "0 auto",
  },
  nav: {
    maxWidth: 250,
    width: "16.7%",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
  },
  main: {
    maxWidth: 1250,
    width: "83.3%",
    backgroundColor: theme.palette.action.hover,
  },
}));

function App() {
  const { root, nav, main } = useStyles();
  return (
    <Router>
      <RuleBookProvider>
        <RuleSearchProvider>
          <div className={root}>
            <div className={nav}>
              <NavBar />
            </div>
            <div className={main}>
              <Switch>
                <Route exact path="/">
                  <RuleFetcher />
                </Route>
                <Route path="/rules">
                  <RuleBook />
                </Route>
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </div>
        </RuleSearchProvider>
      </RuleBookProvider>
    </Router>
  );
}

export default App;
