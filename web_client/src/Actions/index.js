import * as types from './types';

export const setTabIndex = (value) => {
    return {
        type: types.SET_TAB_INDEX,
        payload: {
            value
        }
    };
};

export const setAction = (value) => {
    return {
        type: types.SET_SELECTED_ACTION,
        payload: {
            value
        }
    };
};

export const setReaction = (value) => {
    return {
        type: types.SET_SELECTED_REACTION,
        payload: {
            value
        }
    };
};

export const setServiceList = (array) => {
    return {
        type: types.SET_SERVICE_LIST,
        payload: {
            array
        }
    };
};

export const setWallList = (array) => {
    return {
        type: types.SET_WALL_LIST,
        payload: {
            array
        }
    };
};

export const setActionList = (array) => {
    return {
        type: types.SET_ACTION_LIST,
        payload: {
            array
        }
    };
};

export const setParamList = (array) => {
    return {
        type: types.SET_ACTION_PARAM_LIST,
        payload: {
            array
        }
    }
};

export const setAppletList = (array) => {
    return {
        type: types.SET_APPLET_LIST,
        payload: {
            array
        }
    };
};

export const setReactionList = (array) => {
    return {
        type: types.SET_REACTION_LIST,
        payload: {
            array
        }
    };
};

export const setReactionParamList = (array) => {
    return {
        type: types.SET_REACTION_PARAM_LIST,
        payload: {
            array
        }
    };
};

export const setActionOfApplet = (action) => {
    return {
        type: types.SET_ACTION_OF_APPLET,
        payload: {
            action
        }
    };
};

export const setReactionOfApplet = (reaction) => {
    return {
        type: types.SET_REACTION_OF_APPLET,
        payload: {
            reaction
        }
    };
};

export const setDisplayDialog = (boolean) => {
    return {
        type: types.SET_DISPLAY_DALIOG,
        payload: {
            boolean
        }
    };
};

export const setFormCard = (card) => {
    return {
        type: types.SET_FORM_CARD,
        payload: {
            card
        }
    };
};

export const setAppletInformation = (infos) => {
    return {
        type: types.SET_INFOS_OF_APPLET,
        payload: {
            infos
        }
    };
};