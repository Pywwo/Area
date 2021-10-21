import { SET_SELECTED_ACTION } from '../Actions/types';

function setSelectedAction(state, action) {
    state = action.payload.value;
    return state;
}

const SelectedActionReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_SELECTED_ACTION:
            return setSelectedAction(state, action);
        default:
            return state;
    }
};

export default SelectedActionReducer;