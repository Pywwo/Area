import { SET_INFOS_OF_APPLET, SET_ACTION_OF_APPLET, SET_REACTION_OF_APPLET } from '../Actions/types';

let data = {
    name: 'NewApplet',
    action_service: "",
    action_name: "",
    action_params: {},
    description:"Description",
    reaction_service: "",
    reaction_name: "",
    action_polling: true,
    reaction_params: {}
};

function setActionOfApplet(state, action) {
    const object = action.payload.action;

    state.action_service = object.service;
    state.action_name = object.name;
    state.action_params = object.params;
    return state;
}

function setReactionOfApplet(state, action) {
    const object = action.payload.reaction;

    state.reaction_service = object.service;
    state.reaction_name = object.name;
    state.reaction_params = object.params;
    return state;
}

function setAppletInfos(state, action) {
    const infos = action.payload.infos;

    state.name = infos.name;
    state.description = infos.description;
    return state;
}

const AppletReducer = (state = data, action) => {
    switch (action.type) {
        case SET_ACTION_OF_APPLET:
            return setActionOfApplet(state, action);
        case SET_REACTION_OF_APPLET:
            return setReactionOfApplet(state, action);
        case SET_INFOS_OF_APPLET:
            return setAppletInfos(state, action);
        default:
            return state;
    }
};

export default AppletReducer;