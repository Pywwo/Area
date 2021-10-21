import Cookies from "js-cookie";
import axios from "axios";
import {ENABLE_APPLET, SERVER_URL} from "./ServerRoutes";
import {pushNotif} from "./Notifications/NotifPusher";
import * as notifTypes from "./Notifications/types";
import updateApplets from "./updateApplets";

export default function disableApplet(id, dispatch) {
    const token = Cookies.get("token");
    axios.put(SERVER_URL + ENABLE_APPLET,
        {applet_id: id},
        {headers: { 'x-access-token': token }})
        .then(() => {
            updateApplets(dispatch);
            pushNotif(notifTypes.SUCCESS, "Applet deletion", "Applet status modified.");
        })
        .catch(() => {
            pushNotif(notifTypes.WARNING, "Applet deletion", "Fail to modify applet status : " + id);
        });
}