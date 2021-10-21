import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect} from "react";
import axios from "axios";
import {WALL, SERVER_URL} from "../../Utils/ServerRoutes";
import {pushNotif} from "../../Utils/Notifications/NotifPusher";
import * as notifTypes from "../../Utils/Notifications/types";
import WallComponent from "../WallComponent/WallComponent";
import StackGrid from "react-stack-grid";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {setWallList} from "../../Actions";

function update(dispatch) {
    const token = Cookies.get("token");
    let wallArray = [];

    axios.get(SERVER_URL + WALL, {headers: { 'x-access-token': token }})
        .then((response) => {
            response.data.displays.forEach(element => {
                wallArray.push(
                    <WallComponent title={element.title}
                        color={element.color}
                        content={element.content}
                        key={Math.random()}
                        id={element.id}
                        method={whenDeleted}
                        dispatch={dispatch}
                    />
                );
            });
            dispatch(setWallList(wallArray));
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Wall", "Fail to get wall display.");
        });
}

function whenDeleted(dispatch) {
    update(dispatch);
}

export default function Wall() {
    const dispatch = useDispatch();
    const wallArray = useSelector(state => state.wallList);

    useEffect(() => {
        update(dispatch);
    }, [dispatch]);

    return (
        <div>
            <StackGrid columnWidth={"100%"} vendorPrefix={true} gutterHeight={25}>
                {wallArray}
            </StackGrid>
        </div>
    );
}