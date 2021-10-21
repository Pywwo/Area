import Cookies from "js-cookie";
import axios from "axios";
import {GET_APPLETS, SERVER_URL} from "./ServerRoutes";
import Applet from "../Components/applet/applet";
import {setAppletList} from "../Actions";
import {pushNotif} from "./Notifications/NotifPusher";
import * as notifTypes from "./Notifications/types";
import React from "react";

function newApplet(appletInfos, index) {
    return (
        <Applet name={appletInfos.name}
                action_s_name={appletInfos.action_s_name}
                reaction_s_name={appletInfos.reaction_s_name}
                activated={appletInfos.enabled}
                id={appletInfos.id}
                description={appletInfos.description}
                reaction_name={appletInfos.reaction_name}
                action_name={appletInfos.action_name}
                link_oauth={appletInfos.link_oauth}
                key={index}
                isAuth={appletInfos.oauthed}
                needOAuth={appletInfos.oauth}
                background_color={appletInfos.color}
                style={{
                    maxHeight: '16em',
                }}/>
    );
}

export default function updateApplets(dispatch) {
    const token = Cookies.get("token");
    let appletArray = [];
    axios.get(SERVER_URL + GET_APPLETS, {headers: { 'x-access-token': token }})
        .then((response) => {
            if (response.data.message !== "OK")
                return;
            response.data.applets.forEach((appletInfos, index) => {
                appletArray.push(newApplet(appletInfos, index));
            });
            dispatch(setAppletList(appletArray));
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Applets", "Fail to get applets.");
        });
}