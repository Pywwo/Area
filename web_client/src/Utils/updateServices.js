import Cookies from "js-cookie";
import axios from "axios";
import {SERVER_URL, SERVICES} from "./ServerRoutes";
import {setServiceList} from "../Actions";
import {pushNotif} from "./Notifications/NotifPusher";
import * as notifTypes from "./Notifications/types";
import React from "react";
import Service from "../Components/Service/Service";

function newService(element, index) {
    return (
        <Service name={element.name}
                 description={element.description}
                 link_oauth={element.link_oauth}
                 key={index}
                 isAuth={element.oauthed}
                 needOAuth={element.oauth}
                 background_color={element.color}
        />
    );
}

export default function updateServices(dispatch) {
    const token = Cookies.get("token");
    let serviceArray = [];

    axios.get(SERVER_URL + SERVICES, {headers: { 'x-access-token': token }})
        .then((response) => {
            response.data.services.forEach((element, index) => {
                serviceArray.push(newService(element, index));
            });
            dispatch(setServiceList(serviceArray));
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Service", "Fail to get services.");
        });
}