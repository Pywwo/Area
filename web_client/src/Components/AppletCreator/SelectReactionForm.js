import React from 'react';
import {Button, DialogContent, Grid} from "@material-ui/core";
import ReactionPickerCard from "./ReactionPickerCard";
import {useDispatch, useSelector} from "react-redux";
import {setAction, setDisplayDialog, setFormCard, setReaction, setReactionOfApplet} from "../../Actions";
import axios from "axios";
import Cookies from "js-cookie";
import {CREATE_APPLET, SERVER_URL} from "../../Utils/ServerRoutes";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import InformationForm from "./InformationForm";
import OutputsCard from "./OutputsCard";
import updateApplets from "../../Utils/updateApplets";


export default function SelectReactionForm() {

    const parametersFields = useSelector(state => state.reactionParamList);
    const reactionArray = useSelector(state => state.reactionList);
    const selectedReaction = useSelector(state => state.selectedReaction);
    let applet = useSelector(state => state.applet);
    const dispatch = useDispatch();

    function postApplet() {
        const token = Cookies.get("token");
        axios.post(SERVER_URL + CREATE_APPLET, applet, {headers: { 'x-access-token': token }})
            .then(() =>
                updateApplets(dispatch))
            .catch(() => {
                pushNotif(notifTypes.WARNING, "Applet creation.", "Applet creation failed.")
            });
    }

    function submitReaction() {
        let reaction = {service: "", name: "", params: []};
        let index = 0;

        reaction.service = reactionArray[selectedReaction].service;
        reaction.name = reactionArray[selectedReaction].name;
        try
        {
            reactionArray[selectedReaction].params.forEach((param) =>
            {
                let paramPair = {};
                let HTML_element = document.getElementById(reaction.name + 'Param' + index);
                if (!HTML_element)
                    throw Object.assign(
                        new Error("Fatal error"),
                        { code : 500}
                    );
                paramPair[param.name] = HTML_element.value;
                reaction.params = ({...reaction.params, ...paramPair});
                index++;
            });
        }
        catch (error) {
            window.location.reload();
        }
        dispatch(setReactionOfApplet(reaction)) ;
        dispatch(setFormCard(<InformationForm/>));
        dispatch(setDisplayDialog(false));
        dispatch(setAction(0));
        dispatch(setReaction(0));
        postApplet();
    }

    function onClickQuit() {
        dispatch(setDisplayDialog(false));
        dispatch(setFormCard(<InformationForm/>));
    }

    return (
        <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <ReactionPickerCard/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <OutputsCard/>
                    </Grid>
                    {
                        parametersFields
                    }
                </Grid>
            <Grid container style={{paddingTop: '1em'}}>
                <Grid item xs={6} align='center'>
                    <Button style={{width:'100%'}}
                            onClick={() => {submitReaction()}}
                            color="primary">
                        Confirm
                    </Button>
                </Grid>
                <Grid item xs={6} align='center'>
                    <Button style={{width:'100%'}}
                            onClick={() => {onClickQuit()}}
                            color="primary">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </DialogContent>
    );
}
