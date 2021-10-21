import React from 'react';
import {Button, DialogContent, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setAppletInformation, setDisplayDialog, setFormCard} from "../../Actions";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import SelectActionForm from "./SelectActionForm";

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 14,
        color: '#242424',
        margin: 'auto'
    },
    input: {
        width: '40%',
    },
    number: {
        width: '10%',
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function InformationForm() {

    const dispatch = useDispatch();
    const classes = useStyles;

    function onClickQuit() {
        dispatch(setDisplayDialog(false));
    }

    function submitInfos() {
        dispatch(setAppletInformation({
            name: document.getElementById('appletTitle').value,
            description: document.getElementById('appletDescription').value
        }));
        dispatch(setFormCard(<SelectActionForm/>));
    }

    return (
        <DialogContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField label={'Applet title'}
                               fullWidth={true}
                               id={'appletTitle'}
                               className={classes.input}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label={'Applet description'}
                               fullWidth={true}
                               id={'appletDescription'}
                               className={classes.input}/>
                </Grid>
            </Grid>
            <Grid container style={{paddingTop: '2em'}}>
                <Grid item xs={6} align='center'>
                    <Button style={{width:'100%'}}
                            color="primary"
                            onClick={() => submitInfos()}
                    >
                        Continue
                    </Button>
                </Grid>
                <Grid item xs={6} align='center'>
                    <Button style={{width:'100%'}}
                            onClick={() => onClickQuit()}
                            color="primary">
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </DialogContent>
    );
}