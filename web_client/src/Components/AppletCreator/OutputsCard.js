import React from 'react';
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

export default function OutputsCard() {
    const selectedAction = useSelector(state => state.selectedAction);
    const actions = useSelector(state => state.actionList);

    function getOutputs() {
        let array = [];
        actions[selectedAction].outputs.forEach((param, index) => {
            array.push(
                <Grid key={index} item>
                    <Chip
                        key={index}
                        label={"@" + param.name}
                        color="primary"
                    />
                </Grid>
            );
        });
        return array;
    }

    return (
        <Grid container justify='center' spacing={1} style={{
            paddingBottom: '1em',
            paddingTop: '1em',
        }}>
            {
                getOutputs()
            }
        </Grid>
    );
}