import { store } from "../../index";
import * as types from "./types";
import {error, info, success, warning} from "react-notification-system-redux/lib/actions";

const notificationOpts = {
    title: "",
    message: "",
    position: 'tr',
    autoDismiss: 5,
};

export function pushNotif(type, title, message) {
    notificationOpts.title = title;
    notificationOpts.message = message;
    switch (type) {
        case types.ERROR:
            store.dispatch(error(notificationOpts));
            break;
        case types.SUCCESS:
            store.dispatch(success(notificationOpts));
            break;
        case types.WARNING:
            store.dispatch(warning(notificationOpts));
            break;
        default:
            store.dispatch(info(notificationOpts));
            break;
    }
}