import { SET_REACTION_PARAM_LIST } from '../Actions/types';

function setParamList(state, action) {
    state = action.payload.array;
    return state;
}

const ReactionParamListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_REACTION_PARAM_LIST:
            return setParamList(state, action);
        default:
            return state;
    }
};

export default ReactionParamListReducer;