import 'bootstrap/dist/css/bootstrap.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import {SERVER_URL} from "../../Utils/ServerRoutes";
import Cookies from 'js-cookie'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import disconnectFromService from "../../Utils/disconnectFromService";
import {useDispatch} from "react-redux";

export default function Service(props) {
    const dispatch = useDispatch();
    let state = {
        name: props.name,
        text: props.description,
        image: process.env.PUBLIC_URL + "/logo_service/" + props.name + ".png",
        isLoading: false,
        background_color: props.background_color,
        isAuth: props.isAuth,
        needOAuth: props.needOAuth,
        link_oauth: props.link_oauth,
    };

    function onToggleChange() {
        window.location.href = SERVER_URL + state.link_oauth + "?service=" + props.name + "&accessToken=" + Cookies.get("token");
    }

    function serviceLogout() {
        disconnectFromService(state.name, dispatch);
    }

    function displayAuthButton(theme) {
        if (state.needOAuth)
            if (state.isAuth)
                return (
                    <CardActions style={{justifyContent: 'center', color: 'white'}}>
                        <MuiThemeProvider theme={theme}>
                            <Button
                                variant="contained" color="secondary"
                                disabled
                                style={
                                    {
                                        backgroundColor:'#0bda73',
                                        contrastText: "#fff"
                                    }
                                }
                            >Connected</Button>
                            <Button id="logoutButton" onClick={() => {serviceLogout()}} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                                <ExitToAppIcon style={{ color: "white" }}/>
                            </Button>
                        </MuiThemeProvider>
                    </CardActions>
                );
            else
                return (
                    <CardActions style={{justifyContent: 'center', color: 'white'}}>
                        <MuiThemeProvider theme={theme}>
                            <Button
                                variant="contained" color="secondary"
                                onClick={() => onToggleChange()}
                            >Link account</Button>
                        </MuiThemeProvider>
                    </CardActions>
                );
        else
            return (
                <CardActions style={{justifyContent: 'center', color: 'white'}}>
                    <MuiThemeProvider theme={theme}>
                        <Button variant="contained" disabled>No OAuth</Button>
                    </MuiThemeProvider>
                </CardActions>
            );
    }

    const { isLoading } = state;

    if (isLoading) {
        return (
            <Card>
                <CardHeader
                    title="Loading..."
                />
            </Card>
        );
    }
    const STYLE = {
        background:state.background_color,
        padding:'20px',
        textAlign: 'center',
        minWidth: '13em'
    };
    const theme = createMuiTheme({
        palette: {
            primary: { main: "#f5eded", contrastText: "#fff" },
            secondary: { main: "#1c73d6", contrastText: "#fff" },
            action: {
                disabledBackground: { main: "#red", contrastText: "#fff" },
                disabled: "#red",
            }
        },
    });

    return (
        <Card style={STYLE}>
            <CardMedia
                component="img"
                alt="service"
                width={1}
                height={"100px"}
                image={state.image}
                title="Service"
            />
            <MuiThemeProvider theme={theme}>
                <CardContent>
                    <Typography variant="body2" color="primary" component="p">
                        {state.text}
                    </Typography>
                </CardContent>
            </MuiThemeProvider>
            { displayAuthButton(theme) }
        </Card>
    )
}
