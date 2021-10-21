import { SET_TAB_INDEX } from '../Actions/types';

function setTabIndex(state, value) {
    state = value;
    return state;
}

const tabIndexReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_TAB_INDEX:
            return setTabIndex(state, action.payload.value);
        default:
            return state;
    }
};

export default tabIndexReducer;