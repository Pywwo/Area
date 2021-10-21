import 'bootstrap/dist/css/bootstrap.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {SERVER_URL, DELETE_DISPLAY} from "../../Utils/ServerRoutes";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import {CardActions} from "@material-ui/core";

class WallComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            title: this.props.title,
            content: this.props.content,
            id: this.props.id
        };
    }

    hexToRgb(hex, a, rp, gp, bp) {
        hex = hex.substring(1);
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        r += rp;
        g += gp;
        b += bp;
        return r + "," + g + "," + b + "," + a;
    }

    render() {
        const { isLoading } = this.state;

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
            background: 'linear-gradient(to right bottom, '
                + 'rgba(' + this.hexToRgb(this.state.color, 1, 0, 0, 0) + ')'
                + ', '
                + 'rgba(' + this.hexToRgb(this.state.color, 1, 100, 40, 10) + ')'
        };
        const theme = createMuiTheme({
            palette: {
              primary: { main: "#f5eded", contrastText: "#fff" },
              secondary: { main: "#c4c4d4", contrastText: "#fff" }
            }
          });
        return (
            <Card style={STYLE}>
                <MuiThemeProvider theme={theme}>
                <CardHeader
                    action={
                        <CardActions>
                            <Button style={{backgroundColor: 'white'}}
                                    aria-label="delete"
                                    className={"delete_button"}
                                    onClick={this.deleteButtonClicked.bind(this)}
                            >
                                <DeleteIcon style={{color:this.state.color}}/>
                            </Button>
                        </CardActions>
                    }
                    
                    title={
                        <Typography align='center' variant="h4" color="primary">
                            {this.state.title}
                        </Typography>
                    }
                />
                <CardContent className={"header"} style={{backgroundColor: 'rgba(245, 245, 245, 0)'}}>
                    <Typography align="left" variant="h5" component="p" color="primary">
                        {this.state.content}
                    </Typography>
                </CardContent>
                </MuiThemeProvider>
            </Card>
        );
    }

    deleteButtonClicked() {
        const token = Cookies.get("token");

        axios.delete(SERVER_URL + DELETE_DISPLAY + "?display_id=" + this.state.id, {
            headers: { 'x-access-token': token }
        }
        )
        .then(function(response) {
            this.props.method(this.props.dispatch);
        }.bind(this))
        .catch(function(error) {
        });
    }
}

export default WallComponent;