import {createStore, applyMiddleware} from "redux";
import allReducer from "../Reducers";
import multi from 'redux-multi'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'


const ConfigStore = (browserHistory) => {

    let middleware = [
        thunkMiddleware, // lets us dispatch() functions
        routerMiddleware(browserHistory), // <-- here I put createHistory() response/value
        multi
    ];

    return createStore(
        allReducer,
        applyMiddleware(
            ...middleware
        ))
};

export default ConfigStore;