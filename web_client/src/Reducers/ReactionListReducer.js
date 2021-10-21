import { SET_REACTION_LIST } from '../Actions/types';

function setReactionList(state, action) {
    state = action.payload.array;
    return state;
}

const ReactionListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_REACTION_LIST:
            return setReactionList(state, action);
        default:
            return state;
    }
};

export default ReactionListReducer;