import Cookies from "js-cookie";
import axios from "axios";
import {DISCONNECT_FROM_SERVICE, SERVER_URL} from "./ServerRoutes";
import {pushNotif} from "./Notifications/NotifPusher";
import * as notifTypes from "./Notifications/types";
import updateServices from "./updateServices";

export default function disconnectFromService(name, dispatch) {
    const token = Cookies.get("token");
    axios.put(SERVER_URL + DISCONNECT_FROM_SERVICE, {service_name: name},
        {headers: { 'x-access-token': token }})
        .then(() => {
            updateServices(dispatch);
            pushNotif(notifTypes.SUCCESS, "Service", "Successfully disconnected.");
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Service", "Fail to disconnected.");
        });
}