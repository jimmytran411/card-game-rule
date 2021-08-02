import React from "react";
import { makeStyles, createStyles, Theme, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useRuleBook } from "../Contexts/RuleBookContext";
import { RuleSearch } from "./RuleSearch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      alignItems: "center",
      padding: 8,
      borderBottom: "1px dashed #327abf",
    },
    navButton: {
      flexGrow: 1,
      color: "#327abf",
      borderRadius: 8,
      fontFamily: "'Dosis', sans-serif",
      fontSize: 24,
      padding: 4,
    },
    activeNav: {
      borderBottom: `1px solid #327abf`,
    },
    nav: {
      textDecoration: "none",
      borderRadius: 8,
      margin: 8,
    },
    ruleSearch: {
      position: "absolute",
      right: 24,
    },
  })
);

export const NavBar: React.FC = () => {
  const { root, navButton, activeNav, nav, ruleSearch } = useStyles();
  const { ruleBook } = useRuleBook();
  const [isRuleBookEmpty, setIsRuleBookEmpty] = React.useState<boolean>(true);

  React.useEffect(() => {
    const { chapters, rules } = ruleBook;
    if (!chapters.length || !rules.length) {
      setIsRuleBookEmpty(true);
    } else {
      setIsRuleBookEmpty(false);
    }
  }, [ruleBook]);

  return (
    <nav className={root}>
      <NavLink className={nav} activeClassName={activeNav} to="/" exact>
        <Button className={navButton} variant="text">
          Home
        </Button>
      </NavLink>
      {!isRuleBookEmpty && (
        <NavLink className={nav} activeClassName={activeNav} to="/rules">
          <Button className={navButton} variant="text">
            Rules
          </Button>
        </NavLink>
      )}
      {!isRuleBookEmpty && (
        <span className={ruleSearch}>
          <RuleSearch />
        </span>
      )}
    </nav>
  );
};
