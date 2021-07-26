import React from 'react'
import { makeStyles, createStyles, AppBar, Toolbar, Theme, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            zIndex: theme.zIndex.drawer + 1,

        },
        navButton: {
            flexGrow: 1,
            color: theme.palette.common.white,
            fontWeight: 600,
            borderRadius: 8
        },
        activeNav: {
            backgroundColor: theme.palette.primary.light
        },
        nav: {
            textDecoration: "none",
            borderRadius: 8
        }
    }),
);

export const NavBar: React.FC = () => {
    const { root, navButton, activeNav, nav } = useStyles()
    return (
        <div className={root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink className={nav} activeClassName={activeNav} to="/" exact>
                        <Button className={navButton} variant="text">
                            Home
                        </Button>
                    </NavLink>
                    <NavLink className={nav} activeClassName={activeNav} to="/rules">
                        <Button className={navButton} variant="text">
                            Rules
                        </Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}