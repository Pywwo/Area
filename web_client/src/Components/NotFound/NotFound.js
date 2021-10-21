import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import {Grid} from "@material-ui/core";

export default function NotFound(props) {
    document.body.style.backgroundColor = "#314DE1";
    return (
        <Card style={{height:'12em', width:'22em',
            margin: 'auto',
            top:'50%',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            marginTop: '50vh',
            transform: 'translateY(-50%)'
        }}>
            <Grid container justify={'center'} style={{padding: '2em'}}>
                <Grid item align='center'>
                    <CardMedia
                        component="img"
                        alt="service"
                        width={1}
                        height={"100px"}
                        image={process.env.PUBLIC_URL + "/logo_service/area.png"}
                        title="Service"
                    />
                </Grid>
                <Grid item align='center'>
                    <h3>404 not found</h3>
                </Grid>
            </Grid>
        </Card>
    );
}