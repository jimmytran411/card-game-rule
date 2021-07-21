import React from 'react';
import { createStyles, CssBaseline, Divider, Drawer, Grid, makeStyles, Theme } from '@material-ui/core';

import { Rules } from './Rules';
import { RuleSearchResult } from './RuleSearchResult';
import { TableOfContents } from './TableOfContents';
import { RuleSearch } from './RuleSearch';

const drawerWidth = '33%';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: "100%"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },

    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100%",
    },
    ruleSearch: {
      marginBottom: "2rem",
      
    }
  })
);

export const RuleBook: React.FC = () => {
  const {root, drawer, drawerPaper, content, ruleSearch} = useStyles();

  return (
    <div className={root}>
      <CssBaseline />
      <nav className={drawer}>
        <Drawer
          classes={{
            paper: drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Divider />
          <TableOfContents />
        </Drawer>
      </nav>
        <Grid className={content} container direction="column" spacing={2}>
          <Grid className={ruleSearch} item xs>
            <RuleSearch />
          </Grid>
          <Grid item xs>
            <Rules />
          </Grid>
          <Grid item xs >        
            <RuleSearchResult />
          </Grid>
        </Grid>
    </div>
  );
};
