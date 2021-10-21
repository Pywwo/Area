import React, { useState }  from 'react';
import Card from '@material-ui/core/Card';
import 'bootstrap/dist/css/bootstrap.css';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./applet.css"
import Button from "@material-ui/core/Button";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import deleteApplet from "../../Utils/deleteApplet";
import disableApplet from "../../Utils/disableApplet";

export default function Applet (props)
{
    const [isDisable, setIsDisable] = useState((!props.activated) ? 'enable' : 'disable');
    const dispatch = useDispatch();
    let state = {
            isLoading: false,
            image_action:  process.env.PUBLIC_URL + "/logo_service/" + props.action_s_name + ".png",
            image_reaction:  process.env.PUBLIC_URL + "/logo_service/" + props.reaction_s_name + ".png",
            name_applet: props.name,
            id: props.id,
            action_s_name: props.action_s_name,
            reaction_s_name: props.reaction_s_name,
            reaction_name: props.reaction_name,
            action_name: props.action_name,
            description: props.description,
            blurValue: 0,
        };

    function onDelete(id) {
        deleteApplet(id, dispatch);
    }

    const STYLE = {
        padding:'1em',
        minWidth: '13em',
        background: 'linear-gradient(to right bottom, #ffffff, #e9e9e9)',
        filter: "blur(" + state.blurValue + "px)",
    };

    const style_image = {
        width: '120px',
        objectFit: 'cover'
    };

    function onDisable(id) {
        try {
            disableApplet(id, dispatch);
            setIsDisable(isDisable === 'disable' ? 'enable' : 'disable');
        } catch (e) {
        }
    }
    return (
        <div className="myContainer">
            <div className="image-hover-opacity">
                <Card style={STYLE}>
                    <Grid container align={'center'} >
                        <Grid item xs={12}>
                            <CardMedia>
                                <img src={state.image_action} style={style_image} alt="logo"/>
                            </CardMedia>
                            <Typography gutterBottom variant="subtitle1" color="textSecondary">
                                {
                                    state.action_name
                                        .replace(/_/g, ' ')
                                        .replace(/^./, state.action_name[0].toUpperCase())
                                }
                            </Typography>
                            <hr/>
                            <CardMedia>
                                <img src={state.image_reaction} style={style_image} alt="logo"/>
                            </CardMedia>
                            <Typography gutterBottom variant="subtitle1" color="textSecondary">
                                {
                                    state.reaction_name
                                        .replace(/_/g, ' ')
                                        .replace(/^./, state.reaction_name[0].toUpperCase())
                                }
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" align="right" color="textSecondary">
                                    {isDisable === 'enable' ? 'disabled' : 'enabled'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </div>
            <div className="overlay">
                <h2>{state.name_applet}</h2>
                <p>{state.description}</p>
                <Button onClick={() => {onDelete(state.id)}}>
                    <Delete style={{ color: "black" }}/>
                </Button>
                <Button onClick={() => {onDisable(state.id)}}>
                    {isDisable}
                </Button>
            </div>
        </div>
    );
}