import { SET_ACTION_LIST } from '../Actions/types';

function setActionList(state, action) {
    state = action.payload.array;
    return state;
}

const ActionListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ACTION_LIST:
            return setActionList(state, action);
        default:
            return state;
    }
};

export default ActionListReducer;