import React from "react";
import {
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Rules } from "./Rules";
import { RuleSearchResult } from "./RuleSearchResult";
import { TableOfContents } from "./TableOfContents";
import { RuleSearch } from "./RuleSearch";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    drawer: {
      width: "33%",
      flexShrink: 0,
    },

    drawerPaper: {
      width: "33%",
    },
    content: {
      flexGrow: 2,
      padding: theme.spacing(3),
      height: "100%",
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: "-33%",
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    ruleSearch: {
      marginBottom: "1.5rem",
      alignSelf: 'center',
      width: "70%"
    },
    drawerHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
    },
    closedButton: {
      position: 'fixed',
      marginLeft: '33vw',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      top: '50vh'
    },
    openButton: {
      position: 'fixed',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      top: '50vh'
    },
    iconButton: {
      padding: 1
    }
  })
);

export const RuleBook: React.FC = () => {
  const { root, drawer, drawerPaper, content, ruleSearch, contentShift, drawerHeader, closedButton, openButton, iconButton } = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={root}>
      <CssBaseline />
      <Drawer
        className={drawer}
        variant="persistent"
        open={open}
        classes={{
          paper: drawerPaper,
        }}
      >
        <div className={drawerHeader}>
          <Typography variant='h6'>Table of Content</Typography>
        </div>
        <Divider />
        <TableOfContents />
      </Drawer>

      <span className={open ? closedButton : openButton}>
        {open ? (<IconButton className={iconButton} onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>) : (<IconButton className={iconButton} onClick={handleDrawerOpen}>
          <ChevronRightIcon />
        </IconButton>)}
      </span>

      <Grid className={open ? `${content} ${contentShift}` : content} container direction="column" spacing={2}>
        <Grid className={ruleSearch} item xs>
          <RuleSearch />
        </Grid>
        <Grid item xs>
          <Rules />
          <RuleSearchResult />
        </Grid>
      </Grid>
    </div>
  );
};
