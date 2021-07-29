import React, { Suspense } from "react";
import {
  CircularProgress,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Rules } from "./Rules";
import { RuleSearchResult } from "./RuleSearchResult";
import { RuleSearch } from "./RuleSearch";
import { useDrawer } from "../customHooks/useDrawer";
const TableOfContents = React.lazy(() => import('./TableOfContents'))


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    drawer: {
      width: "33%",
      flexShrink: 0,
      marginTop: 74
    },
    drawerPaper: {
      width: "33%",
      marginTop: 74,
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      height: "80%"
    },

    drawerHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
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
      zIndex: theme.zIndex.tooltip,
      position: 'fixed',
      right: 0,
      backgroundColor: theme.palette.success.light,
      borderRadius: 20
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
  const { open, handleOpenDrawer, handleCloseDrawer } = useDrawer()

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
        <Suspense fallback={<CircularProgress />}>
          <TableOfContents />
        </Suspense>
      </Drawer>

      <span className={open ? closedButton : openButton}>
        {open ? (<IconButton className={iconButton} onClick={handleCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>) : (<IconButton className={iconButton} onClick={handleOpenDrawer}>
          <ChevronRightIcon />
        </IconButton>)}
      </span>

      <div className={open ? `${content} ${contentShift}` : content} >
        <Rules />
        <RuleSearchResult />
      </div>

      <span className={ruleSearch}>
        <RuleSearch />
      </span>
    </div>
  );
};
