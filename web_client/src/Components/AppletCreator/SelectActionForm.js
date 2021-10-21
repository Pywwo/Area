import React from 'react';
import ActionPickerCard from "./ActionPickerCard";
import {Button, DialogContent, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setActionOfApplet, setDisplayDialog, setFormCard} from "../../Actions";
import SelectReactionForm from "./SelectReactionForm";
import InformationForm from "./InformationForm";

export default function SelectActionForm() {

    const parametersFields = useSelector(state => state.actionParamList);
    const selectedAction = useSelector(state => state.selectedAction);
    const actionArray = useSelector(state => state.actionList);
    const dispatch = useDispatch();

    function submitAction()
    {
        let action = {service: "", name: "", params: []};
        let index = 0;

        action.service = actionArray[selectedAction].service;
        action.name = actionArray[selectedAction].name;
        try
        {
            actionArray[selectedAction].params.forEach((param) =>
            {
                let paramPair = {};
                let HTML_parameter = document.getElementById(action.name + 'Param' + index);
                if (!HTML_parameter)
                    throw Object.assign(
                        new Error("Fatal error"),
                        { code : 500}
                    );
                console.log(HTML_parameter.value);
                paramPair[param.name] = HTML_parameter.value;
                action.params = ({...paramPair, ...action.params});
                index++;
            });
        }
        catch (error) {
            window.location.reload();
        }
        dispatch(setActionOfApplet(action)) ;
        dispatch(setFormCard(<SelectReactionForm/>))
    }

    function onClickQuit() {
        dispatch(setFormCard(<InformationForm/>));
        dispatch(setDisplayDialog(false));
    }

    return (
        <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <ActionPickerCard/>
                    </Grid>
                    {
                        parametersFields
                    }
                </Grid>
                <Grid container style={{paddingTop: '1em'}}>
                    <Grid item xs={6} align='center'>
                        <Button style={{width:'100%'}}
                                color="primary"
                                onClick={() => {submitAction()}}
                        >
                            Continue
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