import 'bootstrap/dist/css/bootstrap.css';
import { Grid } from '@material-ui/core';
import React from "react";
import Header from "../../Components/Header/Header";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import Applets from "../../Components/Applets/Applets";
import TabPanel from "../../Components/TabPanel/TabPanel";
import Services from "../../Components/Services/Services";
import { setTabIndex } from "../../Actions";
import Wall from "../../Components/Wall/Wall";

import "./MainPage.css"

export default function MainPage(props) {
    const theme = useTheme();
    const tabIndex = useSelector(state => state.tabIndex);
    const dispatch = useDispatch();

    document.body.style.background = '#f5f5f5';

    function getIndex() {
        if (props.location.pathname.includes('services')) {
            dispatch(setTabIndex(2));
        }
        else if (props.location.pathname.includes('applets')) {
            dispatch(setTabIndex(1));
        }
        else {
            dispatch(setTabIndex(0));
        }
        return tabIndex;
    }

    return (
        <div className="MainPage">
            <Grid container
                  direction="column">
                <Grid item>
                    <Header history={props.history}/>
                </Grid>
                <Grid item>
                    <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={getIndex()}>
                        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                            <Wall/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                            <Applets/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2} dir={theme.direction}>
                            <Services/>
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
            </Grid>
        </div>
    );
}