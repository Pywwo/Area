import { SET_DISPLAY_DALIOG } from '../Actions/types';

function setDisplayDialog(state, boolean) {
    state = boolean;
    return state;
}

const displayDialogReducer = (state = false, action) => {
    switch (action.type) {
        case SET_DISPLAY_DALIOG:
            return setDisplayDialog(state, action.payload.boolean);
        default:
            return state;
    }
};

export default displayDialogReducer;