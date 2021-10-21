import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {GET_ABOUT_REACTIONS, SERVER_URL} from "../../Utils/ServerRoutes";
import Cookies from "js-cookie";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import {setReaction, setReactionList, setReactionParamList} from "../../Actions";
import {Grid} from "@material-ui/core";
import ParameterCard from "./ParameterCard";
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles({
    root: {
        backgroundColor: '#314DE1',
        paddingBottom: '2em'
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

export default function ReactionPickerCard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const reactionArray = useSelector(state => state.reactionList);
    const [selectedReaction, setSelectedReaction] = useState(0);
    const [description, setDescription] = useState("");


    useEffect(() => {
        let reaction = reactionArray[selectedReaction];
        let paramArray = [];

        if (reaction && reaction.params) {
            let index = 0;
            reaction.params.forEach(item => {
                paramArray.push(
                    <Grid item xs={12} sm={12} key={index} value={index}>
                        <ParameterCard
                            title={item.name}
                            type={item.type}
                            id={reaction.name + 'Param' + index}
                        />
                    </Grid>
                );
                index++;
            });
        }
        dispatch(setReactionParamList(paramArray));
    }, [dispatch, reactionArray, selectedReaction]);

    useEffect(() => {
        const token = Cookies.get("token");
        let array = [];
        let paramArray = [];

        axios.get(SERVER_URL + GET_ABOUT_REACTIONS, {headers: { 'x-access-token': token }})
            .then((response) => {
                let index1 = 0;
                response.data.reactions.forEach(reaction => {
                    array.push({
                        name: reaction.name,
                        value: index1,
                        service: reaction.service,
                        params: reaction.params
                    });
                    if (reaction && reaction.params && index1 === selectedReaction) {
                        let index2 = 0;
                        reaction.params.forEach((item) => {
                            paramArray.push(
                                <Grid item xs={12} sm={12} key={index2} value={index2}>
                                    <ParameterCard
                                        title={item.name}
                                        type={item.type}
                                        id={reaction.name + 'Param' + index2}
                                    />
                                </Grid>
                            );
                            index2++;
                        });
                        setDescription(reaction.description);
                    }
                    dispatch(setReactionParamList(paramArray));
                    index1++;
                });
                dispatch(setReactionList(array));
            })
            .catch(() => {
                pushNotif(notifTypes.WARNING, "Applet creation", "Fail to get actions.");
            });
    }, [selectedReaction, dispatch]);

    function getServiceList() {
        let array = [];

        reactionArray.forEach(function (reaction) {
            if (array.indexOf(reaction.service) <= -1) {
                array.push(reaction.service);
            }
        });
        return array;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Select a reaction
                </Typography>
            </CardContent>
            <CardActions className={classes.centered}>
                <Grid container>
                    <Grid item xs={12} align='center'>
                        <Select native value={selectedReaction} input={<Input id="grouped-native-select" />}
                                onChange={(event) => {
                                    setSelectedReaction(parseInt(event.target.value, 10));
                                    dispatch(setReaction(parseInt(event.target.value, 10)))
                                }}
                        >
                            {
                                getServiceList().map((value, index) => (
                                    <optgroup key={index} label={value}>
                                        {
                                            reactionArray.map((reaction, index) => {
                                                if (reaction.service === value)
                                                    return (
                                                        <option key={index} value={reaction.value}>
                                                            {reaction.name.replace(/_/g, ' ').replace(/^./, reaction.name[0].toUpperCase())}
                                                        </option>
                                                    );
                                                return <option hidden={true} key={index}/>
                                            })
                                        }
                                    </optgroup>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} align='center' style={{paddingTop:'1em'}}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{description}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}