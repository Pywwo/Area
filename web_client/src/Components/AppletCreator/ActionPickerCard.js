import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {GET_ABOUT_ACTIONS, SERVER_URL} from "../../Utils/ServerRoutes";
import Cookies from "js-cookie";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import {setAction, setActionList, setParamList} from "../../Actions";
import {Grid} from "@material-ui/core";
import ParameterCard from "./ParameterCard";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#314DE1',
        paddingBottom: '3em'
    },
    title: {
        fontSize: 14,
        color: 'white'
    },
    input: {
        width: '40%',
    },
    inputContent: {
        color: 'white',
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notchedOutline: {
        borderColor: 'white !important',
        borderBottomColor: 'white !important',
    },
});

export default function ActionPickerCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const actionArray = useSelector(state => state.actionList);
    const [selectedAction, setSelectedAction] = useState(0);
    const [description, setDescription] = useState("");

    function newParamCard(action, param, index) {
        return (
            <Grid item xs={12} sm={12} key={index} value={index}>
                <ParameterCard
                    title={param.name}
                    type={param.type}
                    id={action.name + 'Param' + index}
                />
            </Grid>
        )
    }

    useEffect(() => {
        let action = actionArray[selectedAction];
        let paramCardArray = [];

        if (action && action.params)
        {
            action.params.forEach((item, index) =>
                paramCardArray.push(newParamCard(action, item, index))
            );
        }
        dispatch(setParamList(paramCardArray));
    }, [selectedAction, actionArray, dispatch]);

    useEffect(() => {
        const token = Cookies.get("token");
        let array = [];
        let paramArray = [];

        axios.get(SERVER_URL + GET_ABOUT_ACTIONS, {headers: { 'x-access-token': token }})
            .then((response) =>
            {
                response.data.actions.forEach((action, index1) =>
                {
                    array.push({value: index1, ...action});
                    if (action && action.params && index1 === selectedAction)
                    {
                        action.params.forEach((item, index2) => {
                            paramArray.push(newParamCard(action, item, index2));
                        });
                        setDescription(action.description);
                    }
                    dispatch(setParamList(paramArray));
                });
                dispatch(setActionList(array));
            })
            .catch(() =>
            {
                pushNotif(notifTypes.WARNING, "Applet creation", "Fail to get actions.");
            });
    }, [selectedAction, dispatch]);

    function getServiceList() {
        let array = [];

        actionArray.forEach(function (action, index) {
            if (array.indexOf(action.service) <= -1) {
                array.push(action.service);
            }
        });
        return array;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Select an action
                </Typography>
            </CardContent>
            <Grid container>
                <Grid item xs={12}>
                    <CardActions className={classes.centered}>
                        <Select native value={selectedAction}
                                input={<Input id="grouped-native-select"/>}
                                onChange={(event) => {
                                    setSelectedAction(parseInt(event.target.value, 10));
                                    dispatch(setAction(parseInt(event.target.value, 10)))
                                }}
                        >
                            {
                                getServiceList().map((value, index) => (
                                    <optgroup key={index} label={value}>
                                        {
                                            actionArray.map((action, index) => {
                                                if (action.service === value)
                                                    return (
                                                        <option key={index} value={action.value}>
                                                            {action.name.replace(/_/g, ' ').replace(/^./, action.name[0].toUpperCase())}
                                                        </option>
                                                    );
                                                return <option hidden={true} key={index}/>
                                            })
                                        }
                                    </optgroup>
                                ))
                            }
                        </Select>
                    </CardActions>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>{description}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
}