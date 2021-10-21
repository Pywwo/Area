import { SET_SERVICE_LIST } from '../Actions/types';

function setServiceList(state, action) {
    state = action.payload.array;
    return state;
}

const ServiceListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_SERVICE_LIST:
            return setServiceList(state, action);
        default:
            return state;
    }
};

export default ServiceListReducer;