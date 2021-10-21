import 'bootstrap/dist/css/bootstrap.css';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React  from "react";
import Typography from '@material-ui/core/Typography';

import "./Authentification.css";

export default function Authentification(props) {

    document.body.style.background = '#314DE1';

    return (
        <div className="Authentification">
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <Grid item>
                    <h1 id="area-logo">AREA</h1>
                </Grid>
                <Grid item>
                    <Grid className="authCard" container>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2" align={"center"}>
                                        {props.name}
                                    </Typography>
                                    <hr/>
                                    {props.card}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}