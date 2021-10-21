import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { FormGroup, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Login.css"
import Link from "@material-ui/core/Link";
import axios from "axios";
import {store} from "../../index";
import {push} from "react-router-redux";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import {LOGIN_PATH, SERVER_URL} from "../../Utils/ServerRoutes";
import Cookies from 'js-cookie'

function validateForm(ID, password) {
    return ID.length > 0 && password.length > 0;
}

function handleSubmit(ID, password) {
    axios.post(SERVER_URL + LOGIN_PATH, {username: ID, password})
        .then((response) => {
            Cookies.set("token", response.data.accessToken);
            store.dispatch(push('/home'));
            pushNotif(notifTypes.SUCCESS, "Login", "Successfully logged in.");
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Login", "Fail to log in.");
    });
}

export default function Login(props) {
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");

    Cookies.set("token", "");

    useEffect(() => {
        function trigger(event) {
            if (event.keyCode === 13) {
                if (validateForm(ID, password)) {
                    handleSubmit(ID, password);
                }
            }
        }
        window.addEventListener('keypress', trigger);
        return () => {
            window.removeEventListener('keypress', trigger);
        };
    }, [ID, password]);

    return (
        <div className="Login">
            <div>
                <Grid container
                      spacing={2}>
                    <Grid item xs={12}>
                        <FormGroup id="email">
                            <TextField
                                id="login-username-input"
                                label="Mail address or username"
                                variant="outlined"
                                value={ID}
                                onChange={e => setID(e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup id="password">
                            <TextField
                                id="login-password-input"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container
                              justify="flex-end"
                              alignItems="center"
                              spacing={2}>
                            <Grid item>
                                <Button color="primary" onClick={() => { store.dispatch(push('/register')); }}>
                                    <Link href='/register'>Register</Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained"
                                        color="primary"
                                        disabled={!validateForm(ID, password)}
                                        onClick={() =>handleSubmit(ID, password)}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}