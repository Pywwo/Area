import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {setTabIndex} from "../../Actions";
import {useDispatch, useSelector } from "react-redux";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HeaderTabs(props) {
    const classes = useStyles();
    const tabIndex = useSelector(state => state.tabIndex);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        if (newValue === 1)
            props.history.history.push('/home/applets');
        else if (newValue === 2)
            props.history.history.push('/home/services');
        else
            props.history.history.push('/home/wall');
        dispatch(setTabIndex(newValue));
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation={0}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Wall" {...a11yProps(0)} />
                    <Tab label="Applets" {...a11yProps(1)} />
                    <Tab label="Services" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
        </div>
    );
}