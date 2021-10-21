import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { FormGroup, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Register.css";
import Link from "@material-ui/core/Link";
import axios from "axios";
import {store} from "../../index";
import {push} from "react-router-redux";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import {REGISTER_PATH, SERVER_URL} from "../../Utils/ServerRoutes";

function validateForm(username, email, password) {
    return username.length > 0 && email.length > 0 && password.length > 0;
}

function handleSubmit(username, email, password) {
    axios.post(SERVER_URL + REGISTER_PATH, {
        username: username,
        email: email,
        password: password
    })
    .then((response) => {
        store.dispatch(push('/login'));
        pushNotif(notifTypes.SUCCESS, "Register", "Successfully registered.");
    }).catch((error) => {
        pushNotif(notifTypes.WARNING, "Register", error.response.data.error);
    });
}

export default function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        function trigger(event) {
            if (event.keyCode === 13) {
                if (validateForm(username, email, password))
                    handleSubmit( username, email, password);
            }
        }
        window.addEventListener('keypress', trigger);
        return () => {
            window.removeEventListener('keypress', trigger);
        };
    }, [username, email, password]);

    return (
        <div className="Register">
            <div>
                <Grid container
                      spacing={2}>
                    <Grid item xs={12}>
                        <FormGroup id="username">
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup id="password">
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup id="mailAddress">
                            <TextField
                                label="Mail address"
                                variant="outlined"
                                type="mailAddress"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container
                              justify="flex-end"
                              alignItems="center"
                              spacing={2}>
                            <Grid item>
                                <Button color="primary" onClick={() => { store.dispatch(push('/login')); }}>
                                    <Link href='/login'>Login</Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained"
                                        color="primary"
                                        disabled={!validateForm(username, email, password)}
                                        onClick={() => handleSubmit(username, email, password)}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}