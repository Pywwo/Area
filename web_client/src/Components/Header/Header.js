import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HeaderTabs from "./HeaderTabs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { store } from "../../index";
import { push } from "react-router-redux";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default function Header(history) {
    const classes = useStyles();

    function logout() {
       store.dispatch(push('/login'));
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: '#f5f5f5' }}>
                    <Grid  container
                           direction="row"
                           justify="center"
                           alignItems="center">
                        <Grid item align="left" xs={4}>
                            <HeaderTabs history={history}/>
                        </Grid>
                        <Grid item align="center" xs={4}>
                            <Typography className={classes.title} variant="h6" noWrap style={{color: '#314DE1'}}>
                                AREA
                            </Typography>
                        </Grid>
                        <Grid item align="right" xs={4}>
                            <Button id="logoutButton" onClick={() => logout()}>
                                <ExitToAppIcon style={{ color: "#314DE1" }}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}