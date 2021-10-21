import { SET_ACTION_PARAM_LIST } from '../Actions/types';

function setParamList(state, action) {
    state = action.payload.array;
    return state;
}

const ActionParamListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ACTION_PARAM_LIST:
            return setParamList(state, action);
        default:
            return state;
    }
};

export default ActionParamListReducer;