import { SET_SELECTED_REACTION } from '../Actions/types';

function setSelectedReaction(state, action) {
    state = action.payload.value;
    return state;
}

const SelectedReactionReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_SELECTED_REACTION:
            return setSelectedReaction(state, action);
        default:
            return state;
    }
};

export default SelectedReactionReducer;