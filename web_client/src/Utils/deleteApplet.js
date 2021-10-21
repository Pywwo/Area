import Cookies from "js-cookie";
import axios from "axios";
import {DELETE_APPLET, SERVER_URL} from "./ServerRoutes";
import {pushNotif} from "./Notifications/NotifPusher";
import * as notifTypes from "./Notifications/types";
import updateApplets from "./updateApplets";

export default function deleteApplet(id, dispatch) {
    const token = Cookies.get("token");
    axios.delete(SERVER_URL + DELETE_APPLET+ "?applet_id=" + id,
        {headers: { 'x-access-token': token }})
        .then(() => {
            updateApplets(dispatch);
            pushNotif(notifTypes.SUCCESS, "Applet deletion", "Applet deleted.");
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Applet deletion", "Fail to delete applet : " + id);
        });
}