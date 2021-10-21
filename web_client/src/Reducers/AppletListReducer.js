import { SET_APPLET_LIST } from '../Actions/types';

function setAppletList(state, action) {
    state = action.payload.array;
    return state;
}

const AppletListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_APPLET_LIST:
            return setAppletList(state, action);
        default:
            return state;
    }
};

export default AppletListReducer;