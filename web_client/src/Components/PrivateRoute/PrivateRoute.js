import React from "react";
import {Route, Redirect} from "react-router-dom";
import axios from "axios";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import { SERVER_URL, CHECK_TOKEN_PATH } from "../../Utils/ServerRoutes"
import Cookies from 'js-cookie'

class PrivateRoute extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isLoggedIn: false
        };

        const token = Cookies.get("token");

        axios.get(SERVER_URL + CHECK_TOKEN_PATH, {
            headers: {
                'x-access-token': token
            }})
            .then(() => {
                this.setState(() => ({ isLoading: false, isLoggedIn: true }));
            })
            .catch(() => {
                this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                pushNotif(notifTypes.WARNING, "Token", "Invalid Token");
            });
    }

    render() {
        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
                <Route path={this.props.path} render={this.props.component} exact={this.props.exact}/> :
                <Redirect to='/login'/>

    }
}

export default PrivateRoute;