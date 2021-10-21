import { SET_WALL_LIST } from '../Actions/types';

function setWallList(state, action) {
    state = action.payload.array;
    return state;
}

const WallListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_WALL_LIST:
            return setWallList(state, action);
        default:
            return state;
    }
};

export default WallListReducer;