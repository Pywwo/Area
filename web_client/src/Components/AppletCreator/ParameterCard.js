import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";
import {Grid} from "@material-ui/core";
import GetComponent from "./GetComponent";

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

export default function ParameterCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
    }, [dispatch]);

    return (
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      style={{paddingBottom: '1em'}}>
                    <Grid item xs={3} align="center">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {props.title.replace(/_/g, ' ').replace(/^./, props.title[0].toUpperCase())}
                        </Typography>
                    </Grid>
                    <Grid item xs={9} align="center">
                        { GetComponent(props.id, props.type, classes) }
                    </Grid>
                </Grid>
    );
}