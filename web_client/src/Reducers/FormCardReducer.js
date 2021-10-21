import React from "react";
import { SET_FORM_CARD } from '../Actions/types';
import InformationForm from "../Components/AppletCreator/InformationForm";

function setFormCard(state, card) {
    state = card;
    return state;
}

const FormCardReducer = (state = <InformationForm/>, action) => {
    switch (action.type) {
        case SET_FORM_CARD:
            return setFormCard(state, action.payload.card);
        default:
            return state;
    }
};

export default FormCardReducer;