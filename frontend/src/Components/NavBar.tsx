import React from "react";
import { makeStyles, createStyles, Theme, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import { useRuleBook } from "../Contexts/RuleBookContext";
import { RuleSearch } from "./RuleSearch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 1,
      display: "flex",
      flexDirection: "column",
      padding: 8,
    },
    navButton: {
      flexGrow: 1,
      color: "#ffffff",
      borderRadius: 8,
      fontFamily: "'Dosis', sans-serif",
      fontSize: 24,
      padding: "8px 16px",
      "&:hover": {
        borderRadius: 8,
        color: "#6ae7fd",
      },
    },
    activeNav: {
      "& button": {
        borderBottom: "1px solid #ffffff",
        borderRadius: 0,
      },
    },
    nav: {
      textDecoration: "none",
      borderRadius: 8,
      margin: 8,
    },
    ruleSearch: {
      paddingTop: 16,
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
          <HomeIcon />
          <span>Home</span>
        </Button>
      </NavLink>
      {!isRuleBookEmpty && (
        <NavLink
          className={nav}
          activeClassName={activeNav}
          to={`/rules/${ruleBook.chapters[0].replace(/\s|\./g, "-")}`}
        >
          <Button className={navButton} variant="text">
            <MenuBookIcon />
            <span>Rules</span>
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
